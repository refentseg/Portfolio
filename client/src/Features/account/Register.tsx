import {useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../app/Store/configureStore';
import { registerUser } from './accountSlice';
import { toast } from 'react-toastify';




export default function Register() {
  const history = useNavigate();
  const dispatch = useAppDispatch();
    const {register,handleSubmit,formState:{isSubmitting,errors,isValid}} = useForm({
        mode:'onTouched'
    })

    async function submitForm(data: FieldValues) {
      try {
        await dispatch(registerUser(data));
        history('/login'); // redirect to login page or any other page after successful registration
      } catch (error: any) {
        console.log(error);
        toast.error(error)
      }
    }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-24 text-gray-700 mb-12">
  <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
  <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
    <div className="flex flex-col">
      <label htmlFor="firstName" className="mb-1 text-sm font-medium">First Name:</label>
      <input
        id="firstName"
        type="text"
        {...register('firstName', { required: 'First name is required' })}
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors.firstName && <p className="mt-1 text-red-600 text-sm">{errors.firstName.message as string}</p>}
    </div>

    <div className="flex flex-col">
      <label htmlFor="lastName" className="mb-1 text-sm font-medium">Last Name:</label>
      <input
        id="lastName"
        type="text"
        {...register('lastName', { required: 'Last name is required' })}
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors.lastName && <p className="mt-1 text-red-600 text-sm">{errors.lastName.message as string}</p>}
    </div>

    <div className="flex flex-col">
      <label htmlFor="email" className="mb-1 text-sm font-medium">Email:</label>
      <input
        id="email"
        type="email"
        {...register('email', { required: 'Email is required' })}
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors.email && <p className="mt-1 text-red-600 text-sm">{errors.email.message as string}</p>}
    </div>

    <div className="flex flex-col">
      <label htmlFor="password" className="mb-1 text-sm font-medium">Password:</label>
      <input
        id="password"
        type="password"
        {...register('password', { required: 'Password is required' })}
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors.password && <p className="mt-1 text-red-600 text-sm">{errors.password.message as string}</p>}
    </div>

    <div className="flex flex-col">
      <label htmlFor="passwordConfirm" className="mb-1 text-sm font-medium">Confirm Password:</label>
      <input
        id="passwordConfirm"
        type="password"
        {...register('passwordConfirm', { required: 'Password confirmation is required' })}
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors.passwordConfirm && <p className="mt-1 text-red-600 text-sm">{errors.passwordConfirm.message as string}</p>}
    </div>

    <button
      type="submit"
      disabled={isSubmitting || !isValid}
      className="w-full py-2 mt-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 disabled:opacity-50"
    >
      Register
    </button>
  </form>
</div>

  );
}