"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  HAIR_CHECK_MAX_MESSAGE_LENGTH,
  HAIR_CHECK_MAX_NOTE_LENGTH,
  ageOptions,
  concernOptions,
  durationOptions,
  genderOptions,
  hairCheckSteps,
  initialHairCheckAnswers,
  interestOptions,
  ongoingOptions,
  optionLabel,
  optionLabels,
  photoSlots,
  preferredContactOptions,
  previousTreatmentOptions,
  progressionOptions,
  timeframeOptions,
  type HairCheckAnswers,
  type HairCheckOption,
  type HairCheckStep,
  type HairPhotoSlotId,
} from "../_data/hair-check";
import { emitHairCheckEvent } from "../_lib/hair-check-analytics";
import { submitHairConsultation } from "../_lib/hair-check-submission";
import { validateCompleteHairCheck, validateHairCheckStep, validateHairPhoto, type HairCheckErrors } from "../_lib/hair-check-validation";

function RadioGroup<T extends string>({ legend, name, options, value, onChange, optional = false, error }: { legend: string; name: string; options: HairCheckOption<T>[]; value: T | null; onChange: (value: T) => void; optional?: boolean; error?: string }) {
  return <fieldset className="hair-check-fieldset" aria-describedby={error ? `${name}-error` : undefined}>
    <legend>{legend} {optional ? <small>Optional</small> : null}</legend>
    <div className="hair-check-options">{options.map((option) => <label key={option.id} className="hair-check-option"><input type="radio" name={name} aria-label={option.label} checked={value === option.id} onChange={() => onChange(option.id)}/><span><strong>{option.label}</strong>{option.description ? <small>{option.description}</small> : null}</span></label>)}</div>
    {error ? <p className="field-error" id={`${name}-error`} role="alert">{error}</p> : null}
  </fieldset>;
}

function CheckboxGroup<T extends string>({ legend, name, options, values, onChange, error }: { legend: string; name: string; options: HairCheckOption<T>[]; values: T[]; onChange: (value: T) => void; error?: string }) {
  return <fieldset className="hair-check-fieldset" aria-describedby={error ? `${name}-error` : undefined}>
    <legend>{legend} <small>Mehrfachauswahl möglich</small></legend>
    <div className="hair-check-options">{options.map((option) => <label key={option.id} className="hair-check-option"><input type="checkbox" aria-label={option.label} checked={values.includes(option.id)} onChange={() => onChange(option.id)}/><span><strong>{option.label}</strong></span></label>)}</div>
    {error ? <p className="field-error" id={`${name}-error`} role="alert">{error}</p> : null}
  </fieldset>;
}

const stepCopy: Record<Exclude<HairCheckStep, "start" | "review" | "success">, { eyebrow: string; title: string; intro: string }> = {
  basics: { eyebrow: "01 · Ausgangssituation", title: "Ein paar Grundlagen vorab.", intro: "Eine grobe Einordnung genügt. Geschlecht ist freiwillig; daraus wird keine automatische Bewertung abgeleitet." },
  concern: { eyebrow: "02 · Hauptanliegen", title: "Welcher Bereich beschäftigt Sie?", intro: "Wählen Sie alle Bereiche, die Sie derzeit besonders wahrnehmen." },
  progression: { eyebrow: "03 · Verlauf", title: "Wie hat sich die Situation entwickelt?", intro: "Ihre Angaben strukturieren das spätere Gespräch. Eine Interpretation findet hier nicht statt." },
  treatments: { eyebrow: "04 · Bisherige Wege", title: "Was haben Sie bereits ausprobiert?", intro: "Bitte nennen Sie nur Behandlungsarten, keine konkreten Medikamente oder Dosierungen." },
  interest: { eyebrow: "05 · Interesse", title: "Wofür interessieren Sie sich aktuell?", intro: "Mehrere Perspektiven dürfen gleichzeitig relevant sein." },
  timeframe: { eyebrow: "06 · Zeitraum", title: "Wann möchten Sie sich beraten lassen?", intro: "Diese Angabe erzeugt keine Dringlichkeit und verpflichtet Sie zu nichts." },
  photos: { eyebrow: "07 · Fotos", title: "Möchten Sie Aufnahmen vorbereiten?", intro: "Freiwillig. Ihre Auswahl bleibt bis zum Absenden als lokale Vorschau im Browser und wird nur mit Ihrer ausdrücklichen Foto-Einwilligung sicher übertragen." },
  contact: { eyebrow: "08 · Kontakt", title: "Wie können wir Sie erreichen?", intro: "Erfasst werden nur die Kontaktdaten, die für eine spätere persönliche Rückmeldung erforderlich sind." },
};

function toggleValue<T extends string>(values: T[], value: T, exclusive?: T) {
  if (value === exclusive) return values.includes(value) ? [] : [value];
  return values.includes(value) ? values.filter((item) => item !== value) : [...values.filter((item) => item !== exclusive), value];
}

function ReviewRow({ label, value, onEdit }: { label: string; value: string; onEdit: () => void }) {
  return <div className="hair-review-row"><span>{label}</span><strong>{value}</strong><button type="button" onClick={onEdit}>Ändern</button></div>;
}

export function HairCheck() {
  const [step, setStep] = useState<HairCheckStep>("start");
  const [answers, setAnswers] = useState<HairCheckAnswers>(initialHairCheckAnswers);
  const [errors, setErrors] = useState<HairCheckErrors>({});
  const [uploadErrors, setUploadErrors] = useState<Partial<Record<HairPhotoSlotId, string>>>({});
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [submissionReference, setSubmissionReference] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const photosRef = useRef(answers.photos);

  const currentIndex = hairCheckSteps.indexOf(step as (typeof hairCheckSteps)[number]);
  const progress = step === "review" || step === "success" ? 100 : currentIndex >= 0 ? ((currentIndex + 1) / hairCheckSteps.length) * 100 : 0;
  const photoCount = Object.keys(answers.photos).length;

  useEffect(() => () => {
    Object.values(photosRef.current).forEach((photo) => photo && URL.revokeObjectURL(photo.previewUrl));
  }, []);

  useEffect(() => {
    photosRef.current = answers.photos;
  }, [answers.photos]);

  useEffect(() => {
    if (step !== "start") headingRef.current?.focus();
  }, [step]);

  const update = <K extends keyof HairCheckAnswers>(key: K, value: HairCheckAnswers[K]) => {
    setAnswers((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "" }));
    setSubmissionMessage("");
  };

  const start = () => {
    emitHairCheckEvent({ name: "hair_check_started" });
    setStep("basics");
  };

  const next = () => {
    if (currentIndex < 0) return;
    const nextErrors = validateHairCheckStep(step, answers);
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }
    emitHairCheckEvent({ name: "hair_check_step_completed", step: currentIndex + 1 });
    if (currentIndex === hairCheckSteps.length - 1) {
      emitHairCheckEvent({ name: "hair_check_completed" });
      setStep("review");
    } else setStep(hairCheckSteps[currentIndex + 1]);
  };

  const back = () => {
    setSubmissionMessage("");
    if (step === "review") return setStep("contact");
    if (currentIndex <= 0) return setStep("start");
    setStep(hairCheckSteps[currentIndex - 1]);
  };

  const setPhoto = (slotId: HairPhotoSlotId, file: File | null) => {
    const existing = answers.photos[slotId];
    if (!file) return;
    const error = validateHairPhoto(file);
    if (error) {
      setUploadErrors((current) => ({ ...current, [slotId]: error }));
      return;
    }
    if (existing) URL.revokeObjectURL(existing.previewUrl);
    const previewUrl = URL.createObjectURL(file);
    setAnswers((current) => ({ ...current, photos: { ...current.photos, [slotId]: { slotId, file, previewUrl } }, photoConsent: false }));
    setUploadErrors((current) => ({ ...current, [slotId]: "" }));
    emitHairCheckEvent({ name: "hair_photo_added", slot: photoSlots.findIndex((slot) => slot.id === slotId) + 1 });
    emitHairCheckEvent({ name: "hair_check_photo_added", slot: photoSlots.findIndex((slot) => slot.id === slotId) + 1 });
  };

  const removePhoto = (slotId: HairPhotoSlotId) => {
    const photo = answers.photos[slotId];
    if (photo) URL.revokeObjectURL(photo.previewUrl);
    setAnswers((current) => {
      const photos = { ...current.photos };
      delete photos[slotId];
      return { ...current, photos, photoConsent: Object.keys(photos).length > 0 ? current.photoConsent : false };
    });
  };

  const reviewErrors = useMemo(() => validateCompleteHairCheck(answers), [answers]);
  const submit = async () => {
    if (Object.keys(reviewErrors).length) {
      setSubmissionMessage("Bitte prüfen Sie die noch fehlenden Angaben.");
      return;
    }
    setIsSubmitting(true);
    emitHairCheckEvent({ name: "hair_check_submit_started" });
    const result = await submitHairConsultation(answers);
    setIsSubmitting(false);
    if (result.ok) {
      emitHairCheckEvent({ name: "hair_consultation_submitted" });
      emitHairCheckEvent({ name: "hair_check_submit_success" });
      setSubmissionReference(result.reference);
      setStep("success");
    } else {
      emitHairCheckEvent({ name: "hair_check_submit_error", code: result.code });
      if (result.fields) {
        const nextUploadErrors = Object.fromEntries(result.fields.flatMap((field) => field.startsWith("photo:") ? [[field.slice(6), "Diese Datei konnte serverseitig nicht sicher geprüft werden. Bitte ersetzen oder entfernen Sie sie."]] : []));
        setUploadErrors((current) => ({ ...current, ...nextUploadErrors }));
      }
      setSubmissionMessage(result.message);
    }
  };

  if (step === "start") return <section className="hair-check-start" aria-labelledby="hair-check-title">
    <div><p className="eyebrow">Haar-Check · 2–4 Minuten</p><h1 id="hair-check-title">Ihre Haarberatung<br/><em>beginnt hier.</em></h1><p>Beantworten Sie einige Fragen und bereiten Sie Ihre Angaben für eine persönliche Beratung vor. Optional können Sie Fotos für die persönliche Sichtung hinzufügen.</p><button className="button button-light" type="button" onClick={start}>Haar-Check starten <span aria-hidden="true">→</span></button></div>
    <aside aria-label="Hinweise zum Haar-Check"><span>Keine automatische Diagnose</span><span>Keine KI-Bildauswertung</span><span>Ärztliche Einschätzung im Gespräch</span><span>Fotos freiwillig</span></aside>
  </section>;

  if (step === "success") return <section className="hair-check-success" aria-labelledby="hair-check-success-title"><p className="eyebrow">Anfrage sicher eingegangen</p><h1 id="hair-check-success-title" ref={headingRef} tabIndex={-1}>Vielen Dank – Ihre Anfrage ist eingegangen.</h1><p>Ihre Angaben wurden für die persönliche Bearbeitung gespeichert. Dies ist keine medizinische Bewertung und keine Bestätigung einer Eignung.</p>{submissionReference ? <p className="hair-check-reference"><span>Ihre Referenz</span><strong>{submissionReference}</strong></p> : null}<div><Link className="button button-dark" href="/termin/" onClick={() => emitHairCheckEvent({ name: "hair_booking_clicked" })}>Termin vereinbaren</Link><Link className="button button-secondary" href="/haare/">Zur Haarmedizin</Link></div></section>;

  const copy = step !== "review" ? stepCopy[step] : null;
  return <section className="hair-check-shell" aria-labelledby="hair-check-heading">
    <div className="hair-check-progress" aria-label={`Fortschritt: ${Math.round(progress)} Prozent`}><div><span>{step === "review" ? "Zusammenfassung" : `Schritt ${currentIndex + 1} von ${hairCheckSteps.length}`}</span><span>{Math.round(progress)}%</span></div><div aria-hidden="true"><span style={{ width: `${progress}%` }}/></div></div>
    <div className="hair-check-panel">
      <header><p className="eyebrow">{step === "review" ? "Ihre Angaben" : copy?.eyebrow}</p><h1 id="hair-check-heading" ref={headingRef} tabIndex={-1}>{step === "review" ? "Alles noch einmal in Ruhe prüfen." : copy?.title}</h1><p>{step === "review" ? "Der Haar-Check enthält keine medizinische Bewertung. Sie können jeden Bereich vor einer geplanten Übermittlung ändern." : copy?.intro}</p></header>

      {step === "basics" ? <div className="hair-check-fields"><RadioGroup legend="Wie alt sind Sie?" name="ageRange" options={ageOptions} value={answers.ageRange} onChange={(value) => update("ageRange", value)} error={errors.ageRange}/><RadioGroup legend="Geschlecht" optional name="gender" options={genderOptions} value={answers.gender} onChange={(value) => update("gender", value)}/><RadioGroup legend="Seit wann beobachten Sie die Veränderung?" name="duration" options={durationOptions} value={answers.duration} onChange={(value) => update("duration", value)} error={errors.duration}/></div> : null}
      {step === "concern" ? <CheckboxGroup legend="Wo liegt Ihr Hauptanliegen?" name="concernAreas" options={concernOptions} values={answers.concernAreas} onChange={(value) => update("concernAreas", toggleValue(answers.concernAreas, value))} error={errors.concernAreas}/> : null}
      {step === "progression" ? <div className="hair-check-fields"><RadioGroup legend="Wie hat sich die Situation entwickelt?" name="progression" options={progressionOptions} value={answers.progression} onChange={(value) => update("progression", value)} error={errors.progression}/><RadioGroup legend="Besteht aktuell weiterer Haarverlust?" name="ongoingLoss" options={ongoingOptions} value={answers.ongoingLoss} onChange={(value) => update("ongoingLoss", value)} error={errors.ongoingLoss}/></div> : null}
      {step === "treatments" ? <div className="hair-check-fields"><CheckboxGroup legend="Welche Wege haben Sie bereits genutzt?" name="previousTreatments" options={previousTreatmentOptions} values={answers.previousTreatments} onChange={(value) => update("previousTreatments", toggleValue(answers.previousTreatments, value, "none"))} error={errors.previousTreatments}/><label className="hair-text-field"><span>Optionaler Hinweis <small>Keine Medikamente oder Dosierungen</small></span><textarea maxLength={HAIR_CHECK_MAX_NOTE_LENGTH} value={answers.previousTreatmentNote} onChange={(event) => update("previousTreatmentNote", event.target.value)}/><small>{answers.previousTreatmentNote.length}/{HAIR_CHECK_MAX_NOTE_LENGTH}</small>{errors.previousTreatmentNote ? <b className="field-error" role="alert">{errors.previousTreatmentNote}</b> : null}</label></div> : null}
      {step === "interest" ? <CheckboxGroup legend="Wofür interessieren Sie sich aktuell?" name="interest" options={interestOptions} values={answers.interest} onChange={(value) => update("interest", toggleValue(answers.interest, value))} error={errors.interest}/> : null}
      {step === "timeframe" ? <RadioGroup legend="Wann möchten Sie sich beraten oder behandeln lassen?" name="timeframe" options={timeframeOptions} value={answers.timeframe} onChange={(value) => update("timeframe", value)} error={errors.timeframe}/> : null}

      {step === "photos" ? <div><div className="hair-photo-notice" role="note"><strong>Freiwillige, private Übertragung</strong><p>JPEG oder PNG, maximal 5 MB je Aufnahme. HEIC wird nicht akzeptiert. Bis zum Absenden sehen Sie eine lokale Vorschau; mit Ihrer Foto-Einwilligung werden ausgewählte Aufnahmen privat gespeichert. Es findet keine KI-Auswertung statt.</p></div><div className="hair-photo-grid">{photoSlots.map((slot, index) => { const photo = answers.photos[slot.id]; return <article key={slot.id} className={photo ? "has-photo" : ""}><div className="hair-photo-visual">{photo ? <Image src={photo.previewUrl} alt={`Lokale Vorschau: ${slot.label}`} fill unoptimized sizes="(max-width: 768px) 100vw, 20vw"/> : <div className={`hair-silhouette hair-silhouette-${slot.id}`} aria-hidden="true"><span/><i/></div>}</div><span>{String(index + 1).padStart(2, "0")}</span><h2>{slot.label}</h2><p>{slot.instruction}</p><label className="hair-upload-button"><input type="file" accept="image/jpeg,image/png" aria-label={`${slot.label}: Foto auswählen`} onChange={(event) => { setPhoto(slot.id, event.target.files?.[0] ?? null); event.currentTarget.value = ""; }}/><span>{photo ? "Foto ersetzen" : "Foto auswählen"}</span></label>{photo ? <button type="button" className="hair-photo-remove" onClick={() => removePhoto(slot.id)}>Foto entfernen</button> : null}{uploadErrors[slot.id] ? <p className="field-error" role="alert">{uploadErrors[slot.id]}</p> : null}</article>})}</div></div> : null}

      {step === "contact" ? <div className="hair-contact-fields"><div className="hair-contact-grid"><label className="hair-text-field"><span>Vorname</span><input autoComplete="given-name" value={answers.firstName} onChange={(event) => update("firstName", event.target.value)} aria-describedby={errors.firstName ? "firstName-error" : undefined}/>{errors.firstName ? <b className="field-error" id="firstName-error" role="alert">{errors.firstName}</b> : null}</label><label className="hair-text-field"><span>Nachname</span><input autoComplete="family-name" value={answers.lastName} onChange={(event) => update("lastName", event.target.value)} aria-describedby={errors.lastName ? "lastName-error" : undefined}/>{errors.lastName ? <b className="field-error" id="lastName-error" role="alert">{errors.lastName}</b> : null}</label><label className="hair-text-field"><span>E-Mail</span><input type="email" autoComplete="email" value={answers.email} onChange={(event) => update("email", event.target.value)} aria-describedby={errors.email ? "email-error" : undefined}/>{errors.email ? <b className="field-error" id="email-error" role="alert">{errors.email}</b> : null}</label><label className="hair-text-field"><span>Telefon</span><input type="tel" autoComplete="tel" value={answers.phone} onChange={(event) => update("phone", event.target.value)} aria-describedby={errors.phone ? "phone-error" : undefined}/>{errors.phone ? <b className="field-error" id="phone-error" role="alert">{errors.phone}</b> : null}</label></div><RadioGroup legend="Bevorzugte Kontaktmöglichkeit" optional name="preferredContact" options={preferredContactOptions} value={answers.preferredContact} onChange={(value) => update("preferredContact", value)}/><label className="hair-text-field"><span>Zusätzliche Information <small>Optional</small></span><textarea maxLength={HAIR_CHECK_MAX_MESSAGE_LENGTH} value={answers.message} onChange={(event) => update("message", event.target.value)}/><small>{answers.message.length}/{HAIR_CHECK_MAX_MESSAGE_LENGTH}</small>{errors.message ? <b className="field-error" role="alert">{errors.message}</b> : null}</label><div className="hair-consents"><p><strong>Rechtlicher Prüfstatus</strong> Die finalen Einwilligungstexte sind vor Produktivbetrieb juristisch freizugeben (<code>needs_review</code>).</p><label><input type="checkbox" checked={answers.consent} onChange={(event) => update("consent", event.target.checked)}/><span>Vorbereitete Pflicht-Einwilligung zur Verarbeitung der Beratungsanfrage. <Link href="/datenschutz/">Datenschutzhinweise</Link></span></label>{errors.consent ? <p className="field-error" role="alert">{errors.consent}</p> : null}{photoCount > 0 ? <><label><input type="checkbox" checked={answers.photoConsent} onChange={(event) => update("photoConsent", event.target.checked)}/><span>Separate vorbereitete Zustimmung zur späteren sicheren Übermittlung der ausgewählten Bilder.</span></label>{errors.photoConsent ? <p className="field-error" role="alert">{errors.photoConsent}</p> : null}</> : null}</div></div> : null}

      {step === "review" ? <div className="hair-review"><ReviewRow label="Altersgruppe" value={optionLabel(ageOptions, answers.ageRange)} onEdit={() => setStep("basics")}/><ReviewRow label="Hauptanliegen" value={optionLabels(concernOptions, answers.concernAreas).join(", ")} onEdit={() => setStep("concern")}/><ReviewRow label="Dauer" value={optionLabel(durationOptions, answers.duration)} onEdit={() => setStep("basics")}/><ReviewRow label="Verlauf" value={optionLabel(progressionOptions, answers.progression)} onEdit={() => setStep("progression")}/><ReviewRow label="Bisherige Behandlung" value={optionLabels(previousTreatmentOptions, answers.previousTreatments).join(", ")} onEdit={() => setStep("treatments")}/><ReviewRow label="Interesse" value={optionLabels(interestOptions, answers.interest).join(", ")} onEdit={() => setStep("interest")}/><ReviewRow label="Zeitraum" value={optionLabel(timeframeOptions, answers.timeframe)} onEdit={() => setStep("timeframe")}/><ReviewRow label="Fotos" value={`${photoCount} von 5 vorbereitet`} onEdit={() => setStep("photos")}/><ReviewRow label="Kontakt" value={`${answers.firstName} ${answers.lastName} · ${answers.email} · ${answers.phone}`} onEdit={() => setStep("contact")}/><div className="hair-review-safety" role="note"><strong>Sichere Übermittlung</strong><p>Erst mit „Beratungsanfrage senden“ werden Ihre Angaben serverseitig validiert und – bei konfiguriertem privaten Storage – gespeichert. Ohne sichere Speicherung erscheint kein Erfolgszustand.</p></div>{submissionMessage ? <div className="hair-submission-message" role="alert"><strong>Nicht gesendet</strong><p>{submissionMessage}</p><div><Link className="button button-dark" href="/termin/" onClick={() => emitHairCheckEvent({ name: "hair_booking_clicked" })}>Termin vereinbaren</Link><Link className="button button-secondary" href="/haare/">Zur Haarmedizin</Link></div></div> : null}</div> : null}

      <div className="hair-check-controls"><button type="button" className="hair-check-back" onClick={back}><span aria-hidden="true">←</span> Zurück</button>{step === "review" ? <button type="button" className="button button-dark" onClick={submit} disabled={isSubmitting}>{isSubmitting ? "Wird geprüft …" : "Beratungsanfrage senden"}</button> : <button type="button" className="button button-dark" onClick={next}>{step === "photos" ? "Ohne weitere Fotos weiter" : "Weiter"} <span aria-hidden="true">→</span></button>}</div>
    </div>
  </section>;
}
