"use client";

import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import { emitAssistantEvent } from "../_lib/assistant-analytics";

type AssistantAction = { label: string; href: string };
type AssistantMode = "provider" | "fallback" | "guardrail";
type Message = { id: number; role: "user" | "assistant"; text: string; actions?: AssistantAction[]; mode?: AssistantMode };
type AssistantApiResponse = { ok: true; answer: { mode: AssistantMode; code: string; text: string; actions: AssistantAction[] } } | { ok: false; code: string; message: string };

const suggestions = [
  { label: "Welche Behandlung passt zu meinem Anliegen?", message: "Ich weiß nicht, welche Behandlung zu meinem Anliegen passt." },
  { label: "Behandlungen für Haare", message: "Welche Behandlungen bietet Melimedics für Haare an?" },
  { label: "Termin vereinbaren", message: "Wie kann ich einen Termin buchen?" },
  { label: "Preise ansehen", message: "Wo finde ich die Preise?" },
  { label: "Haar-Check starten", message: "Wo kann ich den Haar-Check starten?" },
];

const fallbackAnswer = {
  mode: "fallback" as const,
  code: "network_unavailable",
  text: "Der digitale Assistent ist momentan nicht verfügbar. Sie können direkt eine Behandlung auswählen oder einen Termin vereinbaren.",
  actions: [{ label: "Behandlungen ansehen", href: "/behandlungen/" }, { label: "Termin vereinbaren", href: "/termin/" }],
};

let messageId = 0;

export function PracticeAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const feedRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpen(false); emitAssistantEvent({ name: "assistant_closed" }); } };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (messages.length) feedRef.current?.scrollTo({ top: feedRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, pending]);

  const openAssistant = () => { setOpen(true); emitAssistantEvent({ name: "assistant_opened" }); };
  const closeAssistant = () => { setOpen(false); emitAssistantEvent({ name: "assistant_closed" }); };

  const ask = async (rawMessage: string) => {
    const question = rawMessage.trim();
    if (pending || question.length < 2) return;
    setInput("");
    setPending(true);
    setMessages((current) => [...current, { id: ++messageId, role: "user", text: question }]);
    emitAssistantEvent({ name: "assistant_question_submitted" });
    let answer: { mode: AssistantMode; code: string; text: string; actions: AssistantAction[] } = fallbackAnswer;
    try {
      const response = await fetch("/api/assistant/", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ message: question, history: [], website: "" }),
      });
      const result = await response.json() as AssistantApiResponse;
      if (response.ok && result.ok) answer = result.answer;
    } catch { /* The privacy-safe navigation fallback remains available. */ }
    setMessages((current) => [...current, { id: ++messageId, role: "assistant", text: answer.text, actions: answer.actions, mode: answer.mode }]);
    setPending(false);
    emitAssistantEvent({ name: "assistant_answer_received", mode: answer.mode });
    if (answer.mode === "fallback") emitAssistantEvent({ name: "assistant_fallback", code: answer.code });
  };

  const submit = (event: FormEvent) => { event.preventDefault(); void ask(input); };

  return <div className={`practice-assistant ${open ? "is-open" : ""}`}>
    {open ? <section className="assistant-panel" role="dialog" aria-modal="false" aria-labelledby="assistant-title">
      <header className="assistant-header">
        <div><span aria-hidden="true">M</span><div><p>Digitale Orientierung</p><h2 id="assistant-title">Melimedics Assistent</h2></div></div>
        <button type="button" onClick={closeAssistant} aria-label="Assistent schließen">×</button>
      </header>
      <div className="assistant-feed" ref={feedRef} aria-live="polite" aria-busy={pending}>
        {messages.length === 0 ? <div className="assistant-welcome">
          <p className="eyebrow">Wobei dürfen wir helfen?</p>
          <h3>Schnell zur passenden Information.</h3>
          <p>Ich helfe bei Praxisinformationen und Navigation. Medizinische Entscheidungen gehören in die persönliche ärztliche Beratung.</p>
          <div className="assistant-suggestions">{suggestions.map((suggestion) => <button type="button" key={suggestion.label} onClick={() => void ask(suggestion.message)}>{suggestion.label}<span aria-hidden="true">→</span></button>)}</div>
        </div> : messages.map((message) => <article key={message.id} className={`assistant-message is-${message.role}`}>
          <span>{message.role === "assistant" ? "Melimedics" : "Sie"}</span>
          <p>{message.text}</p>
          {message.actions?.length ? <div>{message.actions.map((action) => <Link key={`${message.id}-${action.href}`} href={action.href} onClick={() => emitAssistantEvent({ name: "assistant_cta_clicked", target: action.href })}>{action.label}<span aria-hidden="true">↗</span></Link>)}</div> : null}
        </article>)}
        {pending ? <div className="assistant-thinking" role="status"><span/><span/><span/><b className="sr-only">Antwort wird vorbereitet</b></div> : null}
      </div>
      <form className="assistant-form" onSubmit={submit}>
        <label htmlFor="assistant-input">Ihre Frage</label>
        <div><input ref={inputRef} id="assistant-input" value={input} onChange={(event) => setInput(event.target.value)} maxLength={600} placeholder="Zum Beispiel: Wie buche ich einen Termin?" autoComplete="off" disabled={pending}/><button type="submit" disabled={pending || input.trim().length < 2} aria-label="Frage senden">→</button></div>
        <input className="assistant-honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" hidden/>
        <small>Keine Diagnose · Keine Chat-Speicherung · Bitte keine persönlichen Daten eingeben</small>
      </form>
    </section> : null}
    {!open ? <button className="assistant-launcher" type="button" onClick={openAssistant} aria-label="Melimedics Assistent öffnen"><span aria-hidden="true">M</span><strong>Fragen?</strong></button> : null}
  </div>;
}
