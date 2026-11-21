import { z } from "zod";
import {
  GENDER_OPTIONS,
  NAME_MAX_LENGTH,
  STORY_MAX_LENGTH,
} from "@/constants/form";

// Accepts "+91 98765-43210", "(0674) 123 4567" etc. We strip spaces, dashes and brackets
// and then require an optional "+" followed by 10 to 15 digits.
const PHONE_REGEX = /^\+?\d{10,15}$/;
const cleanPhone = (value) => value.replace(/[\s\-()]/g, "");

export const registrationSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name")
    .max(NAME_MAX_LENGTH, `Name must be at most ${NAME_MAX_LENGTH} characters`),

  // transform() runs after validation and returns the cleaned value
  phone: z
    .string()
    .trim()
    .transform(cleanPhone)
    .refine((v) => PHONE_REGEX.test(v), "Please enter a valid phone number"),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .max(254, "Email is too long")
    .pipe(z.email("Please enter a valid email address")),

  gender: z.enum(GENDER_OPTIONS.map((g) => g.value), {
    error: "Please select an option",
  }),

  // Optional but encouraged. An empty string is allowed.
  story: z
    .string()
    .trim()
    .max(STORY_MAX_LENGTH, `Story must be at most ${STORY_MAX_LENGTH} characters`)
    .optional()
    .default(""),

  // z.literal(true) means the checkbox must be ticked, otherwise it fails
  consent: z.literal(true, {
    error: "You must agree before submitting",
  }),

  // Honeypot: a hidden field real users never see. Bots tend to fill it in.
  website: z.string().max(0).optional().default(""),
});