import React from "react";
import { doSocialLogin } from "@/app/actions";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaSpotify } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdLogin } from "react-icons/md";

const LoginForm = () => {
  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(to right, #1e2a38, #2c3e50, #34495e, #3b4a6d, #2a3a5d), url('https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80')",
      }}
    >
      <form
        action={doSocialLogin}
        className="bg-gray-900 p-10 rounded-3xl shadow-2xl w-full max-w-md animate-fadeIn"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-purple-500 to-pink-500">
          Welcome to Velocity <MdLogin className="inline-block text-pink-500" />
        </h2>

        <p className="text-center text-gray-300 mb-6">
          Sign in to continue{" "}
          <RiLockPasswordLine className="inline-block text-blue-400" />
        </p>
        <div className="flex flex-col items-center space-y-4">
          <button
            className="flex items-center justify-center bg-gray-200 hover:scale-105 py-1.5 px-4 rounded-md w-full transition duration-300 text-gray-900 border border-[#4285F4]"
            type="submit"
            name="action"
            value="google"
          >
            <FcGoogle className="mr-2 scale-110" />
            <span className="font-semibold">Sign In With Google </span>
          </button>
          <button
            className="flex items-center justify-center hover:scale-105 py-1.5 px-4 rounded-md w-full transition duration-300 text-gray-900 border border-[#6e5494] bg-gray-200"
            type="submit"
            name="action"
            value="github"
          >
            <FaGithub className="mr-2 scale-110" />
            <span className="font-semibold">Sign In With GitHub</span>
          </button>
          <button
            className="flex items-center justify-center hover:scale-105 py-1.5 px-4 rounded-md w-full transition duration-300 text-gray-900 border border-[#1DB954] bg-gray-200
            "
            type="submit"
            name="action"
            value="spotify"
          >
            <FaSpotify className="mr-2 scale-110 text-green-700" />
            <span className="font-semibold">Sign In With Spotify</span>
          </button>
        </div>
        <div className="mt-8 text-center text-gray-300">
          <p className="mb-2">
            We only support Google for now.<span> </span>
            <RiLockPasswordLine className="inline-block text-blue-400" />
            <a href="#" className="text-blue-300 hover:underline"></a>
          </p>
          <div className="-mb-4">Made with ❤️ by Harsh</div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
