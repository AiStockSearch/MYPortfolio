import { getAllProjects } from "../../content/projects/index.js";
import {
  homeAbout,
  homeCareer,
  homeExp,
  homeHero,
  homeSkills,
  homeTypewriter,
  homeWork,
} from "../../content/siteContent.jsx";
import { useLocale } from "../../i18n.jsx";
import HomeView from "./Home.view.jsx";
import { useHomePage } from "./useHomePage.js";

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

  const { typewriterText, typewriterDone, addExp, addRev } = useHomePage(lines);

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
