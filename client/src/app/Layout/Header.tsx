import { Menu } from "lucide-react";

export default function Header(){
  function scrollToElement(id:any, offset = 0) {
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      const hamburgerToggle = document.getElementById('hamburger-toggle') as HTMLInputElement;
      if (hamburgerToggle) {
        hamburgerToggle.checked = false;
      }
    }
  }
    return(
    <>
    <nav className="navbar">
      <div className="container">
        <div className="mt-[8px] md:mt-1 text-2xl font-bold md:mr-10">
          <a href="/"><span>R</span><span className="text-neutral-300">G</span></a>
        </div>
        <div className="navbar-items">
          <input type="checkbox" id="hamburger-toggle" />
          <label htmlFor="hamburger-toggle" className="hamburger-icon mt-3">
          <Menu />
          </label>
          <ul className="navbar-links">
            <li className="navbar-item">
              <a href="#about" onClick={(e) => { e.preventDefault();scrollToElement('about',80); }}>About </a>
            </li>
            <li className="navbar-item">
              <a href="#projects" onClick={(e) => { e.preventDefault();scrollToElement('projects',50); }}>Projects</a>
            </li>
            <li className="navbar-item"><a href="#skills" onClick={(e) => { e.preventDefault();scrollToElement('skills',40); }}>Skills</a></li>
            <li>
              <div className="btn">
                <a href="#contact" onClick={(e) => { e.preventDefault();scrollToElement('contact',40); }}>Contact Me</a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </>
    )
}