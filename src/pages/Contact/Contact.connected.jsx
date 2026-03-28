import { contactContent } from "../../content/siteContent.jsx";
import { useLocale } from "../../i18n.jsx";
import ContactView from "./Contact.view.jsx";
import { useContactPage } from "./useContactPage.js";

export default function ContactConnected() {
  const { locale } = useLocale();
  const ui = contactContent[locale];
  const { form, errors, channels, setField, openMailto } = useContactPage(ui);

  return (
    <ContactView
      ui={ui}
      form={form}
      errors={errors}
      channels={channels}
      setField={setField}
      openMailto={openMailto}
    />
  );
}
