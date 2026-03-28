import {
  CONTACT_EMAIL,
  GITHUB_URL,
  HABR_CAREER_URL,
  TELEGRAM_URL,
} from "../../constants/links.js";

export const CHANNEL_ORDER = ["tg", "email", "gh", "habr"];

export function validateContactForm(form, ui) {
  const errs = {};
  if (!form.name.trim()) errs.name = ui.errors.name;
  if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
    errs.email = ui.errors.email;
  if (!form.message.trim() || form.message.trim().length < 20)
    errs.message = ui.errors.message;
  return errs;
}

export function buildContactMailto(form, ui) {
  const subj = ui.subjects[form.subject] || ui.subjects.other;
  const subject = encodeURIComponent(`[Portfolio] ${subj}`);
  const body = encodeURIComponent(
    `${form.message}\n\n— ${form.name} <${form.email}>`
  );
  return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
}

export function buildContactChannels(ui) {
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
    return {
      icon: "◈",
      label: ch.label,
      val: ch.val,
      href: HABR_CAREER_URL,
      external: true,
    };
  });
}
