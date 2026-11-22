import { Resend } from "resend";
import { readFile } from "node:fs/promises";
import path from "node:path";

// ---- Team: edit the values in this block only ----
const BRAND = {
  pink: "#ff46a2",
  dark: "#0e0e0e",
  text: "#222222",
  muted: "#666666",
  bgBase: "#f6effc", // soft lavender, same family as the site background
  bgGlow: "#fbd0e8", // soft fuchsia glow
};
const REPLY_TO = ""; // a mailbox that a person reads, for example "hello@kanyakiran.com". Empty = no reply-to
const SOCIAL_LINKS = [
  { label: "X (Twitter)", url: "https://x.com/Kanya_Kiran" },
  // { label: "Instagram", url: "" },   // add when the team has the URL
];
// Logo files live in public/email/. Missing file = that logo is skipped.
// Remove one line to remove that logo. Width is in pixels.
const LOGOS = [
  { file: "kanya-kiran-logo.png", cid: "kk-logo", alt: "Kanya Kiran", width: 72 },
  { file: "kiss-logo.png", cid: "kiss-logo", alt: "KISS - Kalinga Institute of Social Sciences", width: 72 },
];
// TODO(team): final wording is still to be confirmed (brief, section 13).
const COPY = {
  subject: "Thank you for joining the Kanya Kiran movement",
  intro: "Thank you for registering with Kanya Kiran. We have received your response.",
  next: "Our team will contact you with invites for our next campaign. If you shared a story, we will share it anonymously. We will never publish your name, phone number or email.",
  hashtags: "#AbAurNahi   #GirlsWhoInspire",
  signoff: "Kanya Kiran",
};
// ---------------------------------------------------

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

// Reads the logo files. Returns [{ cid, alt, width, content }] for the files that exist.
export async function loadLogos() {
  const loaded = [];
  for (const logo of LOGOS) {
    try {
      const content = await readFile(path.join(process.cwd(), "public", "email", logo.file));
      loaded.push({ ...logo, content });
    } catch {
      // File not found: skip this logo. The email still sends.
    }
  }
  return loaded;
}

export function buildConfirmationEmail(fullName, logos = []) {
  const firstName = fullName.split(" ")[0];
  const name = escapeHtml(firstName);
  const font = "Arial, Helvetica, sans-serif";

  const links = SOCIAL_LINKS.filter((l) => l.url)
    .map((l) => `<a href="${escapeHtml(l.url)}" style="color:${BRAND.pink};text-decoration:none;">${escapeHtml(l.label)}</a>`)
    .join(" &nbsp;|&nbsp; ");

  // Header: the name on the left, the small logos on the right.
  // If no logo file loaded, only the name is shown.
  const logoImg = (l) =>
    `<img src="cid:${l.cid}" alt="${escapeHtml(l.alt)}" width="${l.width}" style="display:block;border:0;height:auto;width:${l.width}px;">`;
  const logoCells = logos
    .map((l, i) => `<td valign="middle" style="${i > 0 ? "padding-left:14px;" : ""}">${logoImg(l)}</td>`)
    .join("");
  const logoRow =
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>` +
    `<td align="left" valign="middle" style="font-family:${font};font-size:22px;font-weight:bold;letter-spacing:1px;color:${BRAND.dark};white-space:nowrap;">` +
    `KANYA <span style="color:${BRAND.pink};">KIRAN</span></td>` +
    (logos.length
      ? `<td align="right" valign="middle"><table role="presentation" cellpadding="0" cellspacing="0" align="right"><tr>${logoCells}</tr></table></td>`
      : "") +
    `</tr></table>`;

  // Email clients need table layout and inline styles. Do not replace them with CSS classes.
  const html = `<!DOCTYPE html>
<html lang="en">
<body style="margin:0;padding:0;background-color:${BRAND.bgBase};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="${BRAND.bgBase}" style="background-color:${BRAND.bgBase};background-image:linear-gradient(135deg, ${BRAND.bgGlow} 0%, ${BRAND.bgBase} 55%);padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 8px 30px rgba(255,70,162,0.15);">
        <tr>
          <td style="background:#ffffff;padding:22px 32px;font-family:${font};">
            ${logoRow}
          </td>
        </tr>
        <tr><td style="height:4px;background:${BRAND.pink};font-size:0;line-height:0;">&nbsp;</td></tr>
        <tr>
          <td style="padding:32px;font-family:${font};color:${BRAND.text};font-size:16px;line-height:1.6;">
            <p style="margin:0 0 16px;font-size:20px;font-weight:bold;">Dear ${name},</p>
            <p style="margin:0 0 16px;">${escapeHtml(COPY.intro)}</p>
            <p style="margin:0 0 24px;">${escapeHtml(COPY.next)}</p>
            <p style="margin:0 0 24px;font-size:18px;font-weight:bold;color:${BRAND.pink};">${escapeHtml(COPY.hashtags)}</p>
            <p style="margin:0;">${escapeHtml(COPY.signoff)}</p>
          </td>
        </tr>
        <tr>
          <td style="background:#fafafa;padding:20px 32px;font-family:${font};font-size:12px;line-height:1.5;color:${BRAND.muted};border-top:1px solid #eeeeee;">
            ${links ? `<div style="margin-bottom:8px;">${links}</div>` : ""}
            A flagship initiative of KIIT and KISS. You received this email because you registered on the Kanya Kiran website.
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const text =
    `Dear ${firstName},\n\n${COPY.intro}\n\n${COPY.next}\n\n${COPY.hashtags}\n\n${COPY.signoff}\n\n` +
    "A flagship initiative of KIIT and KISS. You received this email because you registered on the Kanya Kiran website.";

  return { subject: COPY.subject, text, html };
}

export async function sendConfirmationEmail({ fullName, email }) {
  const { RESEND_API_KEY, EMAIL_FROM } = process.env;
  if (!RESEND_API_KEY || !EMAIL_FROM) throw new Error("Email is not configured");

  const resend = new Resend(RESEND_API_KEY);
  const logos = await loadLogos();
  const { subject, text, html } = buildConfirmationEmail(fullName, logos);

  const message = { from: EMAIL_FROM, to: email, subject, text, html };
  // contentId makes the image "inline": the html shows it with src="cid:<contentId>"
  if (logos.length) {
    message.attachments = logos.map((l) => ({
      filename: l.file,
      content: l.content,
      contentType: "image/png",
      contentId: l.cid,
    }));
  }
  if (REPLY_TO) message.reply_to = REPLY_TO;

  // The Resend SDK returns { data, error } instead of throwing, so check it ourselves
  const { error } = await resend.emails.send(message);
  if (error) throw new Error(`Resend error: ${error.name} - ${error.message}`);
}