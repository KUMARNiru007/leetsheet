import React , {useState} from 'react'
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { Link, useNavigate } from 'react-router-dom' // Add useNavigate
import {
  Code,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
} from "lucide-react";

import {z} from "zod";
import { useAuthStore } from "../store/useAuthStore";
import google from "./assets/google.svg";

const SignUpSchema = z.object({
  email:z.string().email("Enter a valid email"),
  password:z.string().min(6 , "Password must be atleast of 6 characters"),
  name:z.string().min(3 , "Name must be atleast 3 character")
})

const SignUpPage = () => {

  const [showPassword , setShowPassword] = useState(false);
  const navigate = useNavigate(); // Add this

  const {signup,isSigninUp} = useAuthStore()

  const {
    register,
    handleSubmit,
    formState:{errors},
  } = useForm({
    resolver:zodResolver(SignUpSchema)
  })

  const onSubmit = async (data)=>{
   try {
    await signup(data)
    console.log("signup data" , data)
    // Redirect to home page after successful signup
    navigate('/');
   } catch (error) {
     console.error("SignUp failed:", error);
   }
  }


  return (
   <div className='h-screen grid lg:grid-cols-2 bg-[#1a1a1a]'>
  <div className="flex flex-col justify-center items-center p-6 sm:p-12">
    <div className="w-full max-w-md space-y-8">
      {/* Logo */}
      <div className="text-center mb-8">
        <div className="flex flex-col items-center gap-2 group">
          <div className="w-12 h-12 rounded-xl bg-[#ffa116]/10 flex items-center justify-center group-hover:bg-[#ffa116]/20 transition-colors">
            <Code className="w-6 h-6 text-[#ffa116]" />
          </div>
          <h1 className="text-4xl font-bold mt-2 text-white">Welcome</h1>
          <p className="text-[#b3b3b3]">Sign Up to your account</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium text-white">Name</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Code className="h-5 w-5 text-[#8c8c8c]" />
            </div>
            <input
              type="text"
              {...register("name")}
              className={`input-leetsheet w-full pl-10 ${
                errors.name ? "border-[#ff4d4f]" : ""
              }`}
              placeholder="John Doe"
            />
          </div>
          {errors.name && (
            <p className="text-[#ff4d4f] text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium text-white">Email</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-[#8c8c8c]" />
            </div>
            <input
              type="email"
              {...register("email")}
              className={`input-leetsheet w-full pl-10 ${
                errors.email ? "border-[#ff4d4f]" : ""
              }`}
              placeholder="you@example.com"
            />
          </div>
          {errors.email && (
            <p className="text-[#ff4d4f] text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium text-white">Password</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-[#8c8c8c]" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className={`input-leetsheet w-full pl-10 ${
                errors.password ? "border-[#ff4d4f]" : ""
              }`}
              placeholder="••••••••"
            />
            <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-[#8c8c8c]" />
              ) : (
                <Eye className="h-5 w-5 text-[#8c8c8c]" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-[#ff4d4f] text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Submit */}
        <button type="submit"
          className="btn-leetsheet-primary w-full"
          disabled={isSigninUp}
        >
          {isSigninUp ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Loading...
            </>
          ) : (
            "Sign Up"
          )}
        </button>
        <a
  href={`http://localhost:8080/api/v1/auth/google`}
  className="w-full py-2 rounded-lg font-semibold text-white bg-[#4285f4] hover:bg-[#3367d6] transition flex items-center justify-center gap-2 cursor-pointer"
>
  <img
    src={google}
    alt="Google"
    className="w-6 h-6 bg-white mr-2"
  />
  Continue with Google
</a>
      </form>


      {/* Footer */}
      <div className="text-center">
        <p className="text-[#b3b3b3]">
          Already have an account?{" "}
          <Link to="/login" className="text-[#ffa116] hover:text-[#ff8c00] transition-colors">
            Login
          </Link>
        </p>
      </div>
    </div>
  </div>
</div>

  )
}

export default SignUpPage