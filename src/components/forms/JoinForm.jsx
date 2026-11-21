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

const inputClass =
  "w-full rounded border border-neutral-400 bg-white px-3 py-2 text-neutral-900 focus:outline-2 focus:outline-offset-2 focus:outline-black";
const errorClass = "mt-1 text-sm text-red-700";

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
      <div role="status" className="py-6 text-center">
        <p className="text-lg font-medium">{THANK_YOU_MESSAGE}</p>
        <button
          type="button"
          onClick={onDone}
          className="mt-6 rounded bg-black px-5 py-2 text-white"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <p className="text-neutral-700">{FORM_INTRO}</p>

      <div>
        <label htmlFor="fullName" className="mb-1 block font-medium">Full name *</label>
        <input id="fullName" autoComplete="name" className={inputClass} aria-invalid={!!errors.fullName} {...register("fullName")} />
        {errors.fullName && <p className={errorClass}>{errors.fullName.message}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="mb-1 block font-medium">Phone number *</label>
        <input id="phone" type="tel" autoComplete="tel" className={inputClass} aria-invalid={!!errors.phone} {...register("phone")} />
        {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block font-medium">Email address *</label>
        <input id="email" type="email" autoComplete="email" className={inputClass} aria-invalid={!!errors.email} {...register("email")} />
        {errors.email && <p className={errorClass}>{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="gender" className="mb-1 block font-medium">Gender *</label>
        <select id="gender" className={inputClass} aria-invalid={!!errors.gender} {...register("gender")}>
          <option value="">Select…</option>
          {GENDER_OPTIONS.map((g) => (
            <option key={g.value} value={g.value}>{g.label}</option>
          ))}
        </select>
        {errors.gender && <p className={errorClass}>{errors.gender.message}</p>}
      </div>

      <div>
        <label htmlFor="story" className="mb-1 block font-medium">Your story</label>
        <p id="story-help" className="mb-1 text-sm text-neutral-600">{STORY_PROMPT}</p>
        <textarea id="story" rows={5} aria-describedby="story-help" className={inputClass} {...register("story")} />
        <p className="mt-1 text-right text-xs text-neutral-500">{storyLength}/{STORY_MAX_LENGTH}</p>
        {errors.story && <p className={errorClass}>{errors.story.message}</p>}
      </div>

      {/* Honeypot: hidden from people and screen readers, bots tend to fill it in */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px" }}>
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div>
        <label className="flex items-start gap-2">
          <input type="checkbox" className="mt-1" aria-invalid={!!errors.consent} {...register("consent")} />
          <span className="text-sm">{CONSENT_TEXT} *</span>
        </label>
        {errors.consent && <p className={errorClass}>{errors.consent.message}</p>}
      </div>

      {serverError && <p role="alert" className="text-red-700">{serverError}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded bg-black px-5 py-3 font-medium text-white disabled:opacity-60"
      >
        {isSubmitting ? "Submitting…" : "Submit"}
      </button>
    </form>
  );
}