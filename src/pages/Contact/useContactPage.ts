import { useMemo, useState } from "react";
import {
  buildContactChannels,
  buildContactMailto,
  validateContactForm,
} from "./contactFormUtils";

export function useContactPage(ui) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "job",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const channels = useMemo(() => buildContactChannels(ui), [ui]);

  const setField = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const openMailto = () => {
    const errs = validateContactForm(form, ui);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    window.location.href = buildContactMailto(form, ui);
  };

  return { form, errors, channels, setField, openMailto };
}
