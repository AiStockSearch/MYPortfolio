import { CONTACT_EMAIL, GITHUB_URL, TELEGRAM_URL } from "../../constants/links";

export const CHANNEL_ORDER = ["tg", "email", "gh"];

export function validateContactForm(
  form: { name: string; email: string; message: string },
  ui: { errors: { name: string; email: string; message: string } }
) {
  const errs: Record<string, string> = {};
  if (!form.name.trim()) errs.name = ui.errors.name;
  if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
    errs.email = ui.errors.email;
  if (!form.message.trim() || form.message.trim().length < 20)
    errs.message = ui.errors.message;
  return errs;
}

export function buildContactMailto(
  form: { name: string; email: string; message: string; subject: string },
  ui: { subjects: Record<string, string> }
) {
  const subj = ui.subjects[form.subject] || ui.subjects.other;
  const subject = encodeURIComponent(`[Portfolio] ${subj}`);
  const body = encodeURIComponent(
    `${form.message}\n\n— ${form.name} <${form.email}>`
  );
  return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
}

export function buildContactChannels(ui: {
  channels: Record<string, { label: string; val: string }>;
}) {
  return CHANNEL_ORDER.map((key) => {
    const ch = ui.channels[key];
    if (key === "tg") {
      return {
        icon: "✈",
        label: ch.label,
        val: ch.val,
        href: TELEGRAM_URL,
        external: true,
      };
    }
    if (key === "email") {
      return {
        icon: "✉",
        label: ch.label,
        val: CONTACT_EMAIL,
        href: `mailto:${CONTACT_EMAIL}`,
        external: false,
      };
    }
    if (key === "gh") {
      return {
        icon: "⬡",
        label: ch.label,
        val: ch.val,
        href: GITHUB_URL,
        external: true,
      };
    }
    throw new Error(`Unknown contact channel: ${key}`);
  });
}
