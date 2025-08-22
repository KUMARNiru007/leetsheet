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
   <div className='h-screen grid lg:grid-cols-2'>
  <div className="flex flex-col justify-center items-center p-6 sm:p-12">
    <div className="w-full max-w-md space-y-8">
      {/* Logo */}
      <div className="text-center mb-8">
        <div className="flex flex-col items-center gap-2 group">
          <div className="w-12 h-12 rounded-xl bg-[var(--color-secondary-bg)] flex items-center justify-center group-hover:bg-[var(--color-secondary-hover-bg)] transition-colors">
            <Code className="w-6 h-6 text-[var(--color-accent)]" />
          </div>
          <h1 className="text-4xl font-bold mt-2">Welcome</h1>
          <p className="text-[#9BA8C7]">Sign Up to your account</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium text-[#FFFFFF]">Name</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Code className="h-5 w-5 text-[#5F6E8B]" />
            </div>
            <input
              type="text"
              {...register("name")}
              className={`input bg-[#0F172A] border-[var(--color-text-muted)] text-white w-full pl-10 ${
                errors.name ? "input-error" : ""
              }`}
              placeholder="John Doe"
            />
          </div>
          {errors.name && (
            <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium text-[#FFFFFF]">Email</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-[#5F6E8B]" />
            </div>
            <input
              type="email"
              {...register("email")}
              className={`input bg-[#0F172A] border-[var(--color-text-muted)] text-white w-full pl-10 ${
                errors.email ? "input-error" : ""
              }`}
              placeholder="you@example.com"
            />
          </div>
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium text-[#FFFFFF]">Password</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-[#5F6E8B]" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className={`input bg-[#0F172A] border-[var(--color-text-muted)] text-white w-full pl-10 ${
                errors.password ? "input-error" : ""
              }`}
              placeholder="••••••••"
            />
            <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-[#5F6E8B]" />
              ) : (
                <Eye className="h-5 w-5 text-[#5F6E8B]" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Submit */}
        <button type="submit"
          className="w-full bg-[var(--color-accent)] text-white py-2 rounded-md font-medium hover:bg-[var(--color-accent-hover)]"
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
        <button
              type="button"
              onClick={() =>
                (window.location.href =
                  "http://localhost:8080/oauth2/redirect/google")
              }
              className="w-full py-2 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-600/80 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <img
                src={google}
                alt="Google logo"
                className="w-6 h-6 bg-white"
              />
              Continue with Google
            </button>
      </form>


      {/* Footer */}
      <div className="text-center">
        <p className="text-[#9BA8C7]">
          Already have an account?{" "}
          <Link to="/login" className="text-[var(--color-accent)] hover:text-[var(--color-accent-border)]">
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