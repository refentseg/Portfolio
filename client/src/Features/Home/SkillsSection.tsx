import React from 'react'

const skills = [
    { name: '.Net', imgSrc: 'https://res.cloudinary.com/duzqlkgil/image/upload/v1724838105/Net-PNG_eplbbg.png' },
    { name: 'React', imgSrc: 'https://res.cloudinary.com/duzqlkgil/image/upload/v1724838316/React_xxotyx.png' },
    { name: 'Angular', imgSrc: 'https://res.cloudinary.com/duzqlkgil/image/upload/v1724838378/angular-icon_a2g58s.png' },
    { name: 'TypeScript', imgSrc: 'https://res.cloudinary.com/duzqlkgil/image/upload/v1724926291/Typescript-02-2724720032_mxunjz.png' },
    { name: 'Node.js', imgSrc: 'https://res.cloudinary.com/duzqlkgil/image/upload/v1724838459/Node.js_yrfxd0.png' },
    { name: 'Next.js', imgSrc: 'https://res.cloudinary.com/duzqlkgil/image/upload/v1724838564/Next.js-900x0-1144654219_ssuzqp.png' },
    { name: 'Prisma', imgSrc: 'https://res.cloudinary.com/duzqlkgil/image/upload/v1724838647/prisma_logo-freelogovectors.net_-3504337767_y4mfte.png' },
    { name: 'HTML', imgSrc: 'https://res.cloudinary.com/duzqlkgil/image/upload/v1724838755/HTML_5-423173984_bidzpi.png' },
    { name: 'CSS', imgSrc: 'https://res.cloudinary.com/duzqlkgil/image/upload/v1724838754/css3-logo-png-transparent-308037898_xt4jev.png' },
    
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
