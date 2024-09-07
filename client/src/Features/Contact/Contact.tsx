
import { useForm } from 'react-hook-form';
import VideoBG from '/video.mp4'
import { AlertTriangle, X } from 'lucide-react';
import { useState } from 'react';

interface SubmitStatus {
  type: 'success' | 'error';
  message: string;
}
export default function Contact() {
  const [status, setStatus] = useState<SubmitStatus | null>(null)
  const [isSubmitting, setSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };


  const { register, handleSubmit, formState: { errors } } = useForm({
    mode:'onTouched'
  });
  const onSubmit = (data:any) => {
    setSubmitting(true);
    try{
      console.log(data);
      setStatus({ type: 'success', message: 'Message sent successfully!' });
      setIsVisible(true);
    }catch(err){
      setStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
      setIsVisible(true);
    }
    setSubmitting(false);
  };
  return (
    <div className="flex mb-6 md:mb-0 md:min-h-screen items-center justify-start contact-background" id="contact">
      <div className="hidden md:block overlay"></div>
       <video className="hidden md:block video-overlay"src={VideoBG} autoPlay loop muted></video>
    <div className="md:absolute z-10 mx-auto w-full max-w-lg mt-6 md:mt-0 rounded-md p-8 bg-[#00041b] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 backdrop-saturate-50 backdrop-contrast-50">
      <h1 className="text-4xl font-medium">Contact me</h1>
      <p className="mt-3">Email me at me@refentsegaonnwe.co.za or message me here:</p>
  
      <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="relative z-0">
            <input type="text" id="name"{...register('name',{ required: 'Please fill out this field.'})} className={`block w-full appearance-none border-0 border-b ${errors.name ? 'border-red-500' : 'border-gray-600'} bg-transparent py-2.5 px-0 text-md text-gray-200 focus:border-blue-600 focus:outline-none focus:ring-0 `} placeholder=" " required/>
            <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-lg duration-300">Name</label>
            {errors.name && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertTriangle size={16} className="mr-1" />
              {errors.name.message as string}
            </p>
          )}
          </div>
          <div className="relative z-0">
            <input type="email"
              id="email"
            {...register('email', { required: 'Please fill out this field.', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address.' } })}
             className={`block w-full appearance-none border-0 border-b ${errors.email ? 'border-red-500' : 'border-gray-600'} bg-transparent py-2.5 px-0 text-md text-gray-200 focus:border-blue-600 focus:outline-none focus:ring-0 `} placeholder=" " required/>
            <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-lg duration-300">Email</label>
            {errors.email && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertTriangle size={16} className="mr-1" />
              {errors.email.message as string}
            </p>
          )}
          </div>
          <div className="relative z-0 col-span-2">
            <input type="text" id="subject" {...register('subject',{ required: 'Please fill out this field.'})} className={`block w-full appearance-none border-0 border-b ${errors.subject ? 'border-red-500' : 'border-gray-600'} bg-transparent py-2.5 px-0 text-md text-gray-200 focus:border-blue-600 focus:outline-none focus:ring-0 `} placeholder=" " required/>
            <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-lg duration-300">Subject</label>
            {errors.subject && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertTriangle size={16} className="mr-1" />
              {errors.subject.message as string}
            </p>
          )}
          </div>
          <div className="relative z-0 col-span-2">
            <textarea id="message" {...register('message',{ required: 'Please fill out this field.'})} rows={5} className={`block w-full appearance-none border-0 border-b ${errors.message ? 'border-red-500' : 'border-gray-600'} bg-transparent py-2.5 px-0 text-md text-gray-200 focus:border-blue-600 focus:outline-none focus:ring-0 `} placeholder=" " required></textarea>
            <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-lg duration-300">Message</label>
            {errors.message && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertTriangle size={16} className="mr-1" />
              {errors.message.message as string}
            </p>
          )}
          </div>
        </div>
        <button type="submit" className="mt-5 rounded-md bg-white px-10 py-2 text-black">{isSubmitting ? 'Sending...':'Send Message'}</button>
      </form>
      {status && isVisible && (
        <div className={`flex mt-4 p-2 h-10 rounded justify-between ${status.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
          <div className='mt-0.5'>{status.message}</div>
          <div> <button 
            onClick={handleClose} 
            className="inline-block text-white hover:text-gray-200 focus:outline-none "
            aria-label="Close"
          >
           <X />
          </button></div>
         
        </div>
      )}
    </div>
  </div>
  )
}
