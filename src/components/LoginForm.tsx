import React from "react";
import { doSocialLogin } from "@/app/actions";
import { Button } from "./ui/button";
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
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-100">
          Welcome to Velocity <MdLogin className="inline-block text-blue-400" />
        </h2>
        <p className="text-center text-gray-300 mb-6">
          Sign in to continue{" "}
          <RiLockPasswordLine className="inline-block text-blue-400" />
        </p>
        <div className="flex flex-col items-center space-y-4">
          <Button
            variant="outline"
            className="flex items-center justify-center hover:bg-blue-700 py-2 px-4 rounded-md w-full transition duration-300 text-gray-900 border border-blue-500"
            type="submit"
            name="action"
            value="google"
          >
            <FcGoogle className="mr-2 text-[#4285F4] scale-110" />
            <span className="text-white">Sign In With Google</span>
          </Button>
          <Button
            variant="outline"
            className="flex items-center justify-center hover:bg-purple-700 py-2 px-4 rounded-md w-full transition duration-300 text-gray-900 border border-purple-500"
            type="submit"
            name="action"
            value="github"
          >
            <FaGithub className="mr-2 text-white scale-110" />
            <span className="text-white">Sign In With GitHub</span>
          </Button>
          <Button
            variant="outline"
            className="flex items-center justify-center hover:bg-green-800 py-2 px-4 rounded-md w-full transition duration-300 text-gray-900 border border-green-600"
            type="submit"
            name="action"
            value="spotify"
          >
            <FaSpotify className="mr-2 text-[#1DB954] scale-110" />
            <span className="text-white">Sign In With Spotify</span>
          </Button>
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
