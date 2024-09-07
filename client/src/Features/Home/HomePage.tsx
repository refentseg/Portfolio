import Contact from "../Contact/Contact";
import AboutSection from "./AboutSection";
import ProjectSection from "./Project/ProjectSection";
import SkillsSection from "./SkillsSection";


export default function HomePage() {
  return (
    <div >
      <AboutSection />
      <ProjectSection />
      <SkillsSection/>
      <Contact />
    </div>
  )
}
