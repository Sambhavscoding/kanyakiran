// Constants for the registration form. Used by BOTH the browser form and the API route,
// so the limits can never drift apart.
// The three texts come from content.js, so the team edits the copy in ONE place.
import { REGISTRATION_FORM_CONTENT } from "@/constants/content";

export const GENDER_OPTIONS = [
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
  { value: "non-binary", label: "Non-binary" },
  { value: "prefer-not-to-say", label: "Prefer not to say" },
];

export const STORY_MAX_LENGTH = 2000;
export const NAME_MAX_LENGTH = 100;

export const FORM_INTRO = REGISTRATION_FORM_CONTENT.headerMessage;
export const STORY_PROMPT = REGISTRATION_FORM_CONTENT.storyPrompt;
export const CONSENT_TEXT = REGISTRATION_FORM_CONTENT.consentText;

export const THANK_YOU_MESSAGE =
  "Thank you for joining the movement. Your response has been received, and our team will be in touch.";