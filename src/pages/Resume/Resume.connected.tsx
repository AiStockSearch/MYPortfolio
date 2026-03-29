import { getResumeData } from "../../content/resume/index";
import { useLocale } from "../../i18n";
import ResumeView from "./Resume.view";
import { useResumePage } from "./useResumePage";

export default function ResumeConnected() {
  const { locale } = useLocale();
  const cv = getResumeData(locale);
  const { cvRef, handlePrint } = useResumePage();

  return <ResumeView cv={cv} cvRef={cvRef} handlePrint={handlePrint} />;
}
