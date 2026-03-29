import { contactContent } from "../../content/siteContent";
import { useLocale } from "../../i18n";
import ContactView from "./Contact.view";
import { useContactPage } from "./useContactPage";

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
