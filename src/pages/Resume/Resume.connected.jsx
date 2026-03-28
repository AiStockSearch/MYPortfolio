import { getResumeData } from "../../content/resume/index.js";
import { useLocale } from "../../i18n.jsx";
import ResumeView from "./Resume.view.jsx";
import { useResumePage } from "./useResumePage.js";

export default function ResumeConnected() {
  const { locale } = useLocale();
  const cv = getResumeData(locale);
  const { cvRef, handlePrint } = useResumePage();

  return <ResumeView cv={cv} cvRef={cvRef} handlePrint={handlePrint} />;
}
