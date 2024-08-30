import { useEffect, useRef, useState } from "react";
import AnimatedGridPattern from "../../components/magicui/animated-grid-pattern";
import cn from 'classnames';
import HyperText from "../../components/magicui/hyper-text";

export default function AboutSection() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const sectionRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      const updatePosition = (e:any) => {
        if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            setPosition({ x, y });
          }
      };
  
      const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const sectionElement = sectionRef.current;
    if (sectionElement) {
      sectionElement.addEventListener('mousemove', updatePosition);
      sectionElement.addEventListener('mouseenter', handleMouseEnter);
      sectionElement.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (sectionElement) {
        sectionElement.removeEventListener('mousemove', updatePosition);
        sectionElement.removeEventListener('mouseenter', handleMouseEnter);
        sectionElement.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
    }, []);
  return (
    <div ref={sectionRef} className="relative md:h-[60vh] w-100">
    
    {isHovering && (
        <div 
          style={{
            position: 'absolute',
            left: position.x,
            top: position.y,
            pointerEvents: 'none',
            zIndex: 10,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <img 
            src="/grogu.png" 
            alt="Grogu cursor" 
            style={{
              width: '60px',
              height: '60px',
              animation: 'float 3s ease-in-out infinite',
            }}
          />
        </div>
      )}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
   <div id="about" className='flex mt-[6em] justify-center p-8 items-center flex-col md:flex-row gap-x-8 about-section'>
        <div className='md:1/2 mb-8 md:mb-0 md:pr-8'>
            <img src="/Me.jpg"
            className="relative z-30 rounded-lg shadow-lg w-[300px] h-auto object-cover"/>
        </div>
        <div className='md:1/2'>
            <div className='text-3xl font-bold'>Refentse Gaonnwe <br />
            <HyperText
              className="z-30 text-3xl font-bold text-green-700 "
              text="Full-Stack Developer"
            />
    </div>
            <div className='mt-2 mb-6 z-10'>
                <p className='whitespace-pre-line text-lg text-gray-200'>
                {`A Dedicated web development enthusiast with hands-on experience in creating and launching websites. 
                I utilize skills in HTML, CSS, JavaScript, and backend technologies like Node.js and ASP.NET. Eager to 
                contribute innovative solutions, expand technical expertise, and drive impactfulprojects in a collaborative,
                growth-oriented environment`}
                </p>
                <button className='relative z-30 mt-4 bg-white p-4 text-black rounded-md items-center justify-center text-md hover:border-2 hover:border-green-400 hover:bg-transparent hover:text-white'>Contact Me</button>
            </div>
        </div>
   </div>
   </div>
  )
}
