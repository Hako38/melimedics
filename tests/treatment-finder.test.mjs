import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

const source = await readFile(new URL("../app/_data/treatment-finder.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  fileName: "treatment-finder.ts",
}).outputText;
const finder = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`);

test("finder data model is complete and internally valid", () => {
  assert.deepEqual(finder.finderCategories.map(({ id }) => id), ["face", "skin", "hair", "health", "unsure"]);
  const concernIds = finder.finderCategories.flatMap(({ concerns }) => concerns.map(({ id }) => id));
  const resultIds = new Set(finder.finderResultGroups.map(({ id }) => id));
  assert.equal(new Set(concernIds).size, concernIds.length, "concern ids must be unique");
  for (const concernId of concernIds) assert.ok(finder.finderMappings[concernId]?.length, `${concernId} has no mapping`);
  assert.ok(finder.finderMappings["unsure-general"]?.length, "unsure fallback is missing");
  for (const [concernId, mappings] of Object.entries(finder.finderMappings)) {
    assert.ok(mappings.length <= 3, `${concernId} maps to more than three results`);
    for (const mapping of mappings) {
      assert.ok(resultIds.has(mapping.resultId), `${concernId} references unknown result ${mapping.resultId}`);
      assert.ok(["approved", "needs_review", "missing"].includes(mapping.medicalApprovalStatus));
      assert.ok(mapping.internalRationale.length > 8);
    }
  }
  for (const result of finder.finderResultGroups) {
    assert.match(result.href, /^\/[a-z0-9/-]+\/$/);
    assert.ok(result.description.length > 40);
  }
});

test("required Phase 2A journeys return neutral non-empty result groups", () => {
  const journeys = [
    ["face-forehead-lines", "botulinumtoxin"],
    ["face-lips", "hyaluronsaeure"],
    ["skin-acne-scars", "co2-laser"],
    ["hair-temples", "hair-consultation"],
    ["hair-transplant-interest", "hair-transplantation"],
    ["health-diagnostics", "diagnostics-consultation"],
    ["unsure-general", "general-consultation"],
  ];
  for (const [concernId, expectedId] of journeys) {
    const results = finder.getFinderResults({ concernId });
    assert.ok(results.length >= 1 && results.length <= 3, `${concernId} result count is invalid`);
    assert.ok(results.some(({ id }) => id === expectedId), `${concernId} does not include ${expectedId}`);
  }
});

test("every concern has results and consultation preference remains non-diagnostic", () => {
  for (const category of finder.finderCategories) {
    for (const concern of category.concerns) {
      const results = finder.getFinderResults({ concernId: concern.id });
      assert.ok(results.length > 0, `${concern.id} returns an empty state`);
      assert.ok(results.length <= 3, `${concern.id} returns too many results`);
    }
  }
  const consultationFirst = finder.getFinderResults({ concernId: "face-lips", priorityId: "consultation" });
  assert.equal(consultationFirst[0].id, "general-consultation");
  assert.doesNotMatch(source, /Sie brauchen|für Sie geeignet|garantiert|Diagnose:/i);
});

test("finder state machine supports back navigation and the shorter unsure path", () => {
  assert.equal(finder.getNextFinderStep("category", "face"), "concern");
  assert.equal(finder.getNextFinderStep("category", "unsure"), "priority");
  assert.equal(finder.getNextFinderStep("timing", "hair"), "results");
  assert.equal(finder.getPreviousFinderStep("results", "hair"), "timing");
  assert.equal(finder.getPreviousFinderStep("priority", "face"), "concern");
  assert.equal(finder.getPreviousFinderStep("priority", "unsure"), "category");
});
