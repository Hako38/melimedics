"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  finderCategories,
  finderFollowUpQuestions,
  getFinderCategory,
  getNextFinderStep,
  getPreviousFinderStep,
  getFinderResults,
  type FinderCategoryId,
  type FinderOption,
  type FinderPriorityId,
  type FinderStep,
  type FinderTimingId,
} from "../_data/treatment-finder";
import { emitFinderEvent } from "../_lib/finder-analytics";

type FinderAnswers = {
  categoryId: FinderCategoryId | null;
  concernId: string | null;
  priorityId: FinderPriorityId | null;
  timingId: FinderTimingId | null;
};

const initialAnswers: FinderAnswers = { categoryId: null, concernId: null, priorityId: null, timingId: null };

function OptionCards({ name, options, value, onChange, spacious = false }: { name: string; options: FinderOption[]; value: string | null; onChange: (id: string) => void; spacious?: boolean }) {
  return <div className={`finder-options ${spacious ? "finder-options-spacious" : ""}`}>
    {options.map((option, index) => <label className="finder-option" key={option.id}>
      <input type="radio" name={name} value={option.id} checked={value === option.id} onChange={() => onChange(option.id)}/>
      <span className="finder-option-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
      <span className="finder-option-copy"><strong>{option.label}</strong>{option.description ? <small>{option.description}</small> : null}</span>
    </label>)}
  </div>;
}

export function TreatmentFinder() {
  const [step, setStep] = useState<FinderStep>("category");
  const [answers, setAnswers] = useState<FinderAnswers>(initialAnswers);
  const headingRef = useRef<HTMLElement | null>(null);
  const category = getFinderCategory(answers.categoryId);
  const results = useMemo(() => getFinderResults({ concernId: answers.concernId, priorityId: answers.priorityId }), [answers.concernId, answers.priorityId]);
  const questionSteps = answers.categoryId === "unsure" ? ["category", "priority", "timing"] : ["category", "concern", "priority", "timing"];
  const activeQuestionIndex = step === "results" ? questionSteps.length : Math.max(0, questionSteps.indexOf(step));
  const progress = step === "results" ? 100 : ((activeQuestionIndex + 1) / questionSteps.length) * 100;

  useEffect(() => {
    emitFinderEvent({ name: "finder_started" });
  }, []);

  useEffect(() => {
    if (step !== "category") headingRef.current?.focus();
  }, [step]);

  const selectCategory = (id: string) => {
    const categoryId = id as FinderCategoryId;
    setAnswers({
      categoryId,
      concernId: categoryId === "unsure" ? "unsure-general" : null,
      priorityId: null,
      timingId: null,
    });
  };

  const continueForward = () => {
    if (step === "category" && answers.categoryId) {
      emitFinderEvent({ name: "category_selected", category: answers.categoryId });
      setStep(getNextFinderStep(step, answers.categoryId));
    } else if (step === "concern" && answers.concernId) {
      setStep(getNextFinderStep(step, answers.categoryId));
    } else if (step === "priority" && answers.priorityId) {
      setStep(getNextFinderStep(step, answers.categoryId));
    } else if (step === "timing" && answers.timingId) {
      emitFinderEvent({ name: "finder_completed", category: answers.categoryId ?? undefined });
      setStep(getNextFinderStep(step, answers.categoryId));
    }
  };

  const goBack = () => {
    setStep(getPreviousFinderStep(step, answers.categoryId));
  };

  const restart = () => {
    setAnswers(initialAnswers);
    setStep("category");
    emitFinderEvent({ name: "finder_started" });
  };

  const canContinue = (step === "category" && Boolean(answers.categoryId))
    || (step === "concern" && Boolean(answers.concernId))
    || (step === "priority" && Boolean(answers.priorityId))
    || (step === "timing" && Boolean(answers.timingId));

  return <section className="finder-shell" aria-labelledby="finder-panel-title">
    <div className="finder-progress" aria-label={`Fortschritt: ${Math.round(progress)} Prozent`}>
      <div><span>{step === "results" ? "Orientierung" : `Frage ${activeQuestionIndex + 1} von ${questionSteps.length}`}</span><span>{Math.round(progress)}%</span></div>
      <div className="finder-progress-track" aria-hidden="true"><span style={{ width: `${progress}%` }}/></div>
    </div>

    <div className="finder-panel">
      {step === "category" ? <fieldset>
        <legend id="finder-panel-title">Was möchten Sie behandeln oder verbessern?</legend>
        <p className="finder-intro">Wählen Sie den Bereich, der Ihrem Anliegen am nächsten kommt. Sie können Ihre Auswahl jederzeit ändern.</p>
        <OptionCards name="finder-category" options={finderCategories} value={answers.categoryId} onChange={selectCategory} spacious/>
      </fieldset> : null}

      {step === "concern" && category ? <fieldset>
        <legend id="finder-panel-title" tabIndex={-1} ref={(element) => { headingRef.current = element; }}>Worum geht es Ihnen im Bereich {category.label}?</legend>
        <p className="finder-intro">Eine grobe Einordnung genügt. Die medizinische Beurteilung erfolgt später persönlich.</p>
        <OptionCards name="finder-concern" options={category.concerns} value={answers.concernId} onChange={(concernId) => setAnswers((current) => ({ ...current, concernId, priorityId: null, timingId: null }))}/>
      </fieldset> : null}

      {step === "priority" ? <fieldset>
        <legend id="finder-panel-title" tabIndex={-1} ref={(element) => { headingRef.current = element; }}>{finderFollowUpQuestions.priority.question}</legend>
        <p className="finder-intro">Ihre Antwort dient nur dazu, das anschließende Beratungsgespräch besser zu strukturieren.</p>
        <OptionCards name="finder-priority" options={finderFollowUpQuestions.priority.options} value={answers.priorityId} onChange={(priorityId) => setAnswers((current) => ({ ...current, priorityId: priorityId as FinderPriorityId, timingId: null }))}/>
      </fieldset> : null}

      {step === "timing" ? <fieldset>
        <legend id="finder-panel-title" tabIndex={-1} ref={(element) => { headingRef.current = element; }}>{finderFollowUpQuestions.timing.question}</legend>
        <p className="finder-intro">Das Timing verändert keine medizinische Einordnung und verpflichtet Sie zu nichts.</p>
        <OptionCards name="finder-timing" options={finderFollowUpQuestions.timing.options} value={answers.timingId} onChange={(timingId) => setAnswers((current) => ({ ...current, timingId: timingId as FinderTimingId }))}/>
      </fieldset> : null}

      {step === "results" ? <div className="finder-results" aria-live="polite">
        <p className="eyebrow">Ihre Orientierung</p>
        <h2 id="finder-panel-title" tabIndex={-1} ref={(element) => { headingRef.current = element; }}>Diese Bereiche könnten für ein ärztliches Beratungsgespräch relevant sein.</h2>
        <p className="finder-intro">Die Auswahl ist keine Diagnose und keine Behandlungsempfehlung. Sie hilft lediglich dabei, mögliche Gesprächsbereiche zu strukturieren.</p>
        <div className="finder-result-grid">
          {results.map((result, index) => <article key={result.id}>
            <span>{String(index + 1).padStart(2, "0")} · {result.eyebrow}</span>
            <h3>{result.title}</h3>
            <p>{result.description}</p>
            <Link href={result.href} onClick={() => emitFinderEvent({ name: "result_clicked", result: result.id })}>Mehr erfahren <span aria-hidden="true">↗</span></Link>
          </article>)}
        </div>
        <div className="finder-safety" role="note"><strong>Wichtig</strong><p>Die endgültige Beurteilung erfolgt nach ärztlicher Beratung. Der Finder bestätigt weder eine Eignung noch schließt er Risiken oder Kontraindikationen aus.</p></div>
        <div className="finder-result-actions">
          <Link className="button button-light" href="/termin/" onClick={() => emitFinderEvent({ name: "booking_clicked" })}>Beratungstermin vereinbaren <span aria-hidden="true">↗</span></Link>
          {answers.categoryId === "hair" ? <><Link className="button button-ghost-light" href="/haare/haar-check/">Haar-Check starten</Link><Link className="button button-ghost-light" href="/haare/">Haarmedizin ansehen</Link></> : null}
        </div>
      </div> : null}

      <div className="finder-controls">
        {step !== "category" ? <button type="button" className="finder-back" onClick={goBack}><span aria-hidden="true">←</span> Zurück</button> : <span/>}
        {step !== "results" ? <button type="button" className="button button-dark" disabled={!canContinue} onClick={continueForward}>Weiter <span aria-hidden="true">→</span></button> : <button type="button" className="finder-restart" onClick={restart}>Finder neu starten</button>}
      </div>
    </div>
  </section>;
}
