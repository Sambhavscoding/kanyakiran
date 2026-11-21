import { Resend } from "resend";

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

// TODO(team): the Kanya Kiran team will supply the final wording (brief, section 13).
export function buildConfirmationEmail(fullName) {
  const firstName = fullName.split(" ")[0];
  return {
    subject: "Thank you for joining the Kanya Kiran movement",
    text:
      `Dear ${firstName},\n\n` +
      "Thank you for registering with Kanya Kiran. We have received your response, " +
      "and our team will contact you with invites for our next campaign.\n\n" +
      "#AbAurNahi  #GirlsWhoInspire\n\nKanya Kiran",
    html:
      `<p>Dear ${escapeHtml(firstName)},</p>` +
      "<p>Thank you for registering with Kanya Kiran. We have received your response, " +
      "and our team will contact you with invites for our next campaign.</p>" +
      "<p>#AbAurNahi &nbsp; #GirlsWhoInspire</p><p>Kanya Kiran</p>",
  };
}

export async function sendConfirmationEmail({ fullName, email }) {
  const { RESEND_API_KEY, EMAIL_FROM } = process.env;
  if (!RESEND_API_KEY || !EMAIL_FROM) throw new Error("Email is not configured");

  const resend = new Resend(RESEND_API_KEY);
  const { subject, text, html } = buildConfirmationEmail(fullName);

  // The Resend SDK returns { data, error } instead of throwing, so check it ourselves
  const { error } = await resend.emails.send({ from: EMAIL_FROM, to: email, subject, text, html });
  if (error) throw new Error(`Resend error: ${error.name}`);
}