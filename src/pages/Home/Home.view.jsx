import HomeAboutSection from "../../components/organisms/home/HomeAboutSection.jsx";
import HomeExperienceSection from "../../components/organisms/home/HomeExperienceSection.jsx";
import HomeFeaturedProjectsSection from "../../components/organisms/home/HomeFeaturedProjectsSection.jsx";
import HomeHeroSection from "../../components/organisms/home/HomeHeroSection.jsx";
import HomeSkillsSection from "../../components/organisms/home/HomeSkillsSection.jsx";
import { HOME_PAGE_STYLES } from "../../styles/homePageStyles.js";

export default function HomeView({
  typewriterText,
  typewriterDone,
  addExp,
  addRev,
  hero,
  about,
  work,
  skills,
  career,
  exp,
  featList,
}) {
  return (
    <>
      <style>{HOME_PAGE_STYLES}</style>
      <HomeHeroSection
        typewriterText={typewriterText}
        typewriterDone={typewriterDone}
        hero={hero}
      />
      <HomeAboutSection about={about} addRev={addRev} />
      <HomeFeaturedProjectsSection
        work={work}
        featList={featList}
        addRev={addRev}
      />
      <HomeSkillsSection skills={skills} addRev={addRev} />
      <HomeExperienceSection
        career={career}
        exp={exp}
        addExp={addExp}
        addRev={addRev}
      />
    </>
  );
}
