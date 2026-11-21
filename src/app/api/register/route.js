import { NextResponse } from "next/server";
import { registrationSchema } from "@/lib/validation";
import { isRateLimited } from "@/lib/rateLimit";
import { appendRegistration } from "@/services/sheets";
import { sendConfirmationEmail } from "@/services/email";

export const runtime = "nodejs"; // the Google client needs Node APIs

export async function POST(request) {
  // 1. Rate limit by IP (x-forwarded-for is set by the host, e.g. Vercel)
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, message: "Too many attempts. Please try again in a few minutes." },
      { status: 429 }
    );
  }

  // 2. Read the JSON body
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }

  // 3. Honeypot: bots fill the hidden field. Pretend it worked, store nothing.
  if (typeof body?.website === "string" && body.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  // 4. Validate with the SAME schema the browser uses (never trust the browser alone)
  const parsed = registrationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "Please check the form.", errors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }
  const data = parsed.data;

  // 5. Save to Google Sheets. If this fails the submission is NOT successful.
  try {
    await appendRegistration(data);
  } catch (err) {
    // Log only the error message, never the submitted data (it is personal)
    console.error("Sheets append failed:", err?.message);
    return NextResponse.json(
      { ok: false, message: "We could not save your response. Please try again." },
      { status: 500 }
    );
  }

  // 6. Confirmation email. The row is already saved, so an email failure must not
  //    turn a successful registration into an error for the user.
  try {
    await sendConfirmationEmail(data);
  } catch (err) {
    console.error("Confirmation email failed:", err?.message);
  }

  return NextResponse.json({ ok: true });
}