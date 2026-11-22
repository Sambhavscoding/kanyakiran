"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema } from "@/lib/validation";
import { submitRegistration } from "@/lib/api";
import {
  CONSENT_TEXT,
  FORM_INTRO,
  GENDER_OPTIONS,
  STORY_MAX_LENGTH,
  STORY_PROMPT,
  THANK_YOU_MESSAGE,
} from "@/constants/form";

// Shared look for text inputs: glass field, fuchsia glow when focused
const fieldClass =
  "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder-white/35 transition focus:border-fuchsia-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/40 aria-[invalid=true]:border-rose-400/70";

// One label + input + error message, so the form below stays short
function Field({ id, label, required, help, error, counter, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-white/90">
        {label}
        {required && <span className="text-fuchsia-300"> *</span>}
      </label>
      {help && <p id={`${id}-help`} className="mb-2 text-xs leading-relaxed text-white/55">{help}</p>}
      {children}
      <div className="mt-1 flex justify-between gap-3">
        <p id={`${id}-error`} className="min-h-[1rem] text-xs text-rose-300">{error}</p>
        {counter && <p className="shrink-0 text-xs text-white/40">{counter}</p>}
      </div>
    </div>
  );
}

export default function JoinForm({ onDone }) {
  const [serverError, setServerError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      gender: "",
      story: "",
      consent: false,
      website: "",
    },
  });

  const storyLength = watch("story")?.length ?? 0;

  // `values` here has already passed the same schema the server uses
  async function onSubmit(values) {
    setServerError("");
    const result = await submitRegistration(values);

    if (result.ok) {
      setSubmitted(true);
      return;
    }
    // If the server rejected specific fields, show the messages next to them
    if (result.errors) {
      for (const [field, messages] of Object.entries(result.errors)) {
        setError(field, { message: messages?.[0] });
      }
    }
    setServerError(result.message || "Something went wrong. Please try again.");
  }

  if (submitted) {
    return (
      <div role="status" className="py-8 text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-fuchsia-600/40">
          <svg viewBox="0 0 24 24" className="h-8 w-8 text-white" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-lg font-medium leading-relaxed text-white/95">{THANK_YOU_MESSAGE}</p>
        <button
          type="button"
          onClick={onDone}
          className="mt-8 rounded-xl border border-white/20 bg-white/10 px-8 py-3 font-medium text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <p className="mb-6 text-sm leading-relaxed text-white/75">{FORM_INTRO}</p>

      <div className="space-y-2">
        <Field id="fullName" label="Full name" required error={errors.fullName?.message}>
          <input id="fullName" autoComplete="name" placeholder="Your full name" aria-invalid={!!errors.fullName} aria-describedby="fullName-error" className={fieldClass} {...register("fullName")} />
        </Field>

        <div className="grid gap-x-4 sm:grid-cols-2">
          <Field id="phone" label="Phone number" required error={errors.phone?.message}>
            <input id="phone" type="tel" autoComplete="tel" placeholder="+91 98765 43210" aria-invalid={!!errors.phone} aria-describedby="phone-error" className={fieldClass} {...register("phone")} />
          </Field>
          <Field id="email" label="Email address" required error={errors.email?.message}>
            <input id="email" type="email" autoComplete="email" placeholder="you@example.com" aria-invalid={!!errors.email} aria-describedby="email-error" className={fieldClass} {...register("email")} />
          </Field>
        </div>

        {/* Gender as pill buttons (radio inputs). The hidden radio keeps keyboard and screen reader support */}
        <fieldset>
          <legend className="mb-1.5 block text-sm font-medium text-white/90">
            Gender<span className="text-fuchsia-300"> *</span>
          </legend>
          <div className="flex flex-wrap gap-2">
            {GENDER_OPTIONS.map((g) => (
              <label key={g.value} className="cursor-pointer">
                <input type="radio" value={g.value} className="peer sr-only" {...register("gender")} />
                <span className="block rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:border-fuchsia-400/60 peer-checked:border-transparent peer-checked:bg-gradient-to-r peer-checked:from-violet-600 peer-checked:to-fuchsia-500 peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-fuchsia-400">
                  {g.label}
                </span>
              </label>
            ))}
          </div>
          <p className="mt-1 min-h-[1rem] text-xs text-rose-300">{errors.gender?.message}</p>
        </fieldset>

        <Field id="story" label="Your story" help={STORY_PROMPT} error={errors.story?.message} counter={`${storyLength}/${STORY_MAX_LENGTH}`}>
          <textarea id="story" rows={5} aria-describedby="story-help story-error" className={`${fieldClass} resize-y`} {...register("story")} />
        </Field>
      </div>

      {/* Honeypot: hidden from people and screen readers, bots tend to fill it in */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px" }}>
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div className="mt-2 rounded-xl border border-white/10 bg-white/5 p-4">
        <label className="flex cursor-pointer items-start gap-3">
          <input type="checkbox" className="mt-1 h-4 w-4 shrink-0 accent-fuchsia-500" aria-invalid={!!errors.consent} {...register("consent")} />
          <span className="text-xs leading-relaxed text-white/75">{CONSENT_TEXT} <span className="text-fuchsia-300">*</span></span>
        </label>
        <p className="mt-1 min-h-[1rem] pl-7 text-xs text-rose-300">{errors.consent?.message}</p>
      </div>

      {serverError && (
        <p role="alert" className="mt-4 rounded-xl border border-rose-400/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 w-full rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-500 px-6 py-3.5 text-sm font-semibold uppercase tracking-widest text-white shadow-lg shadow-fuchsia-600/30 transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Submitting…" : "Submit"}
      </button>
    </form>
  );
}