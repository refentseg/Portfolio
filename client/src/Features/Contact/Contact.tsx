
import VideoBG from '/video.mp4'
export default function Contact() {
  return (
    <div className="flex md:min-h-screen mb-6 items-center justify-start contact-background">
      <div className="hidden md:block overlay"></div>
       <video className="hidden md:block video-overlay"src={VideoBG} autoPlay loop muted></video>
    <div className="md:absolute z-10 mx-auto w-full max-w-lg mt-6 md:mt-0 rounded-md p-8 bg-[#00041b] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 backdrop-saturate-50 backdrop-contrast-50">
      <h1 className="text-4xl font-medium">Contact me</h1>
      <p className="mt-3">Email me at me@refentsegaonnwe.co.za or message me here:</p>
  
      <form className="mt-10">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="relative z-0">
            <input type="text" name="name" className="block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-md text-gray-200 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " required/>
            <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-lg duration-300">Name</label>
          </div>
          <div className="relative z-0">
            <input type="email" name="email" className="block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-md text-gray-200 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " required/>
            <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-lg duration-300">Email</label>
          </div>
          <div className="relative z-0 col-span-2">
            <input type="text" name="Subject" className="block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-md text-gray-200 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " required/>
            <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-lg duration-300">Subject</label>
          </div>
          <div className="relative z-0 col-span-2">
            <textarea name="message" rows={5} className="block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-md text-gray-200 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " required></textarea>
            <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-lg duration-300">Message</label>
          </div>
        </div>
        <button type="submit" className="mt-5 rounded-md bg-white px-10 py-2 text-black">Send Message</button>
      </form>
    </div>
  </div>
  )
}
