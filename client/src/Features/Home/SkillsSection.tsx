
const skills = [
    { name: 'React', imgSrc: 'https://res.cloudinary.com/duzqlkgil/image/upload/v1724838316/React_xxotyx.png' },
    { name: 'TypeScript', imgSrc: 'https://res.cloudinary.com/duzqlkgil/image/upload/v1724926291/Typescript-02-2724720032_mxunjz.png' },
    { name: 'Node.js', imgSrc: 'https://res.cloudinary.com/duzqlkgil/image/upload/v1724838459/Node.js_yrfxd0.png' },
    { name: '.Net', imgSrc: 'https://res.cloudinary.com/duzqlkgil/image/upload/v1724838105/Net-PNG_eplbbg.png' },
    { name: 'PostgreSQL', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
    { name: 'Docker', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    { name: 'Prisma', imgSrc: 'https://res.cloudinary.com/duzqlkgil/image/upload/v1724838647/prisma_logo-freelogovectors.net_-3504337767_y4mfte.png' },
    { name: 'Tailwind CSS', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
    { name: 'Python', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'Git', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    { name: 'Linux', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
    
  ];

export default function SkillsSection() {

  return (
    <div id="skills" className='h-full mb-10 my-skills-background'>
    <div className='container mt-6'>
        <div className='text-3xl font-bold '><span>My Skills</span>
        <hr className='mt-2 border-neutral-400'/>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-8'>
          {skills.map((skill, index) => (
            <div key={index} className='skill-card p-8 skills-card shadow-md rounded-md text-center '>
              <img src={skill.imgSrc} alt={skill.name} className='mx-auto w-auto h-16 mb-4' />
              <span className='font-semibold text-md'>{skill.name}</span>
            </div>
          ))}
        </div>
    </div>
      
    </div>
  )
}
