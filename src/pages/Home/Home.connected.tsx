import { getAllProjects } from "../../content/projects/index";
import {
  homeAbout,
  homeCareer,
  homeExp,
  homeHero,
  homeSkills,
  homeTypewriter,
  homeWork,
} from "../../content/siteContent";
import { useLocale } from "../../i18n";
import HomeView from "./Home.view";
import { useHomePage } from "./useHomePage";

export default function HomeConnected() {
  const { locale } = useLocale();
  const lines = homeTypewriter[locale];
  const hero = homeHero[locale];
  const about = homeAbout[locale];
  const work = homeWork[locale];
  const skills = homeSkills[locale];
  const career = homeCareer[locale];
  const exp = homeExp[locale];
  const allLoc = getAllProjects(locale);
  const featFeatured = allLoc.filter((p) => p.featured).slice(0, 3);
  const featList = featFeatured.length ? featFeatured : allLoc.slice(0, 3);

  const { typewriterText, typewriterDone, addExp, addRev } = useHomePage(
    lines,
    locale
  );

  return (
    <HomeView
      typewriterText={typewriterText}
      typewriterDone={typewriterDone}
      addExp={addExp}
      addRev={addRev}
      hero={hero}
      about={about}
      work={work}
      skills={skills}
      career={career}
      exp={exp}
      featList={featList}
    />
  );
}
