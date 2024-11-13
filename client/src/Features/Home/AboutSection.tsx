import { useEffect, useRef, useState } from "react";
import HyperText from "../../components/magicui/hyper-text";
import { Download } from "lucide-react";

export default function AboutSection() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDownload = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch('https://refentsegaonnwe.co.za/CV/Refentse_Gaonnwe_CV.pdf');
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Refentse_Gaonnwe_CV.pdf';
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      } catch (err) {
          setError('Failed to download CV. Please try again later.');
          console.error('Download error:', err);
      } finally {
          setIsLoading(false);
      }
  };

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

    function scrollToElement(id:any, offset = 0) {
      const element = document.getElementById(id);
      if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
    
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
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
   <div id="about" className='container flex mt-[6em] justify-center p-8 items-center flex-col md:flex-row gap-x-8 about-section mb-4'>
        <div className=' mb-8 md:mb-0 md:pr-8'>
            <img src="/Me.jpg"
            className="relative z-30 rounded-lg shadow-lg w-[300px] h-auto object-cover"/>
        </div>
        <div className='text-center md:text-left'>
            <div className='text-3xl font-bold'>Refentse Gaonnwe <br />
            <div className="flex justify-center md:justify-start">
                <HyperText
                  className="z-30 text-xl md:text-3xl font-bold text-green-700"
                  text="Full-Stack Developer"
                />
              </div>
            </div>
            <div className=' mt-2 mb-6 z-10'>
                <p className='whitespace-normal md:whitespace-pre-line  text-md md:text-lg text-gray-200 break-words'>
                {`A Dedicated web development enthusiast with hands-on experience in creating and launching websites. 
                I utilize skills in HTML, CSS, JavaScript, and backend technologies like Node.js and ASP.NET. Eager to 
                contribute innovative solutions, expand technical expertise, and drive impactful projects in a collaborative,
                growth-oriented environment`}
                </p>
                <div className="flex justify-center lg:justify-start mt-4">
                  <button className="z-30 bg-white p-4 text-black rounded-md flex items-center justify-center text-md hover:border-2 hover:border-green-400 hover:bg-transparent hover:text-white" 
                    onClick={(e) => { 
                      e.preventDefault();
                      scrollToElement('contact', 40); 
                    }}>
                    Contact Me
                  </button>
                  <button onClick={handleDownload}
                  disabled={isLoading} className="z-30 bg-white p-4 gap-3 ml-7 text-black rounded-md flex items-center justify-center text-md hover:border-2 hover:border-white hover:bg-transparent hover:text-white">
                  <Download size={16} className="mb-2"/> {isLoading ? 'Downloading...' : 'Download CV'}
                  </button>
                  
                </div>
                <p className="mt-2 text-red-500 text-md">{error? error :''}</p>
            </div>
        </div>
   </div>
   </div>
  )
}
