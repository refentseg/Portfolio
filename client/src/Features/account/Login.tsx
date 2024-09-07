import { useLocation } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/Store/configureStore';
import { signInUser } from './accountSlice';

type LocationState = {
  from?: string;
};

export default function Login() {
  const history = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
    const {register,handleSubmit,formState:{isSubmitting,errors}} = useForm({
        mode:'onTouched'
    })
    async function submitForm(data:FieldValues){
      try{
        await dispatch(signInUser(data));
       history((location.state as LocationState)?.from || '/admin')
      }catch(error:any){
        console.log(error);
      }
      
    }

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-700 text-gray-700">
      <div className="container w-[400px] py-6 mt-4 text-left bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Login</h2>
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="mt-4">
            <label className="block text-gray-700" htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email.message as string}</div>}
          </div>
          <div className="mt-4">
            <label className="block text-gray-700" htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password.message as string}</div>}
          </div>
          <div className="flex items-center justify-center mt-6">
            <button
              type="submit"
              className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting? 'Loading...': 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>

  );
}