"use client";
import { AlertHero } from "./Alert";
import { HeroCards } from "./HeroCard";
import SearchBar from "./SearchBar";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { TypeAnimation } from "react-type-animation";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { MessageCircle, TrendingUp, Users } from "lucide-react";

export const Hero = () => {
  const router = useRouter();

  return (
    <section className="container flex flex-col items-center justify-center min-h-screen py-8 md:py-18 space-y-12 animate-fadeIn w-full">
      <div className="text-center space-y-8">
        <main className="text-4xl md:text-5xl font-bold">
          <h1 className="flex">
            <div>
              <span className="text-4xl lg:text-6.5xl md:text-5xl sm:text-3xl inline bg-gradient-to-r from-[#e74e4e] to-[#764ede] text-transparent bg-clip-text">
                Accelarate Your
              </span>{" "}
              <span className="text-4xl lg:text-6.5xl md:text-5xl sm:text-3xl inline bg-gradient-to-r from-[#764ede] to-[#eb4fd6] text-transparent bg-clip-text">
                <TypeAnimation
                  sequence={[
                    "Growth",
                    4000,
                    "Coding",
                    4000,
                    "Career",
                    4000,
                    "Skill",
                    4000,
                  ]}
                  wrapper="span"
                  speed={1}
                  repeat={Infinity}
                />
                <span className="text-4xl lg:text-6.5xl md:text-5xl sm:text-3xl">
                  Journey
                </span>
              </span>
            </div>
          </h1>{" "}
          <div>
            <span className="text-4xl lg:text-6.5xl md:text-5xl sm:text-3xl inline bg-gradient-to-r from-[#de4ec8] to-[#6a70ed] text-transparent bg-clip-text">
              Fueled
            </span>{" "}
            <h2 className="inline">
              <span className="text-4xl lg:text-6.5xl md:text-5xl sm:text-3xl inline bg-gradient-to-r from-[#6a70ed] to-[#6cd30b] text-transparent bg-clip-text">
                by Velocity
              </span>{" "}
            </h2>
          </div>
        </main>
        <p className="text-lg text-muted-foreground md:w-10/12 mx-auto">
          Join Velocity today to revolutionize your skill development and growth
          with the resources and community support needed to excel in your
          career.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button
            onClick={() => router.push("contact-us")}
            variant="default"
            className="w-full sm:w-auto transform transition duration-300 hover:scale-110 rounded-full px-6"
            size="lg"
          >
            <span className="font-semibold">Contact us</span>
          </Button>
          <SearchBar className="w-full sm:w-auto transform transition duration-300 hover:scale-110 rounded px-6" />
        </div>
      </div>

      <div className="space-y-8 text-center">
        <h3 className="text-5xl font-bold mt-8">Join Our Vibrant Community</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-card hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageCircle className="w-5 h-5" />
                <span>Discussion Forum</span>
              </CardTitle>
              <CardDescription>
                Engage in meaningful conversations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Connect with peers, share insights, and get your questions
                answered.
              </p>
              <Link href="/discussions" passHref>
                <Button variant="outline" className="w-full">
                  Join Discussions
                </Button>
              </Link>
            </CardContent>
          </Card>
          <Card className="bg-card hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Trending Topics</span>
              </CardTitle>
              <CardDescription>
                Stay updated with hot discussions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center justify-between">
                  <span>Exam Strategies</span>
                  <Badge>New</Badge>
                </li>
                <li className="flex items-center justify-between">
                  <span>Study Techniques</span>
                  <Badge variant="secondary">Popular</Badge>
                </li>
                <li>Course Reviews</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="bg-card hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Community Stats</span>
              </CardTitle>
              <CardDescription>Our growing network</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="flex justify-between">
                  <span>Active Members</span>
                  <span className="font-bold">10,000+</span>
                </p>
                <p className="flex justify-between">
                  <span>Daily Posts</span>
                  <span className="font-bold">500+</span>
                </p>
                <p className="flex justify-between">
                  <span>Resources Shared</span>
                  <span className="font-bold">25,000+</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <AlertHero />
    </section>
  );
};
