"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "@/components/ModeToggle";
import Logout from "@/components/Logout";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { User, Settings, Menu, User2 } from "lucide-react";
import { Button } from "./ui/button";

const Navbar = () => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <nav className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container mx-auto flex max-w-7xl items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <button
            className="text-2xl font-bold tracking-wide py-2 px-4 rounded-md transition-colors"
            style={{
              background: "linear-gradient(to right, #6a70ed, #de4ec8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            onClick={() => router.push("home")}
          >
            Velocity
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-7">
          <NavigationMenu>
            <NavigationMenuList className="flex space-x-6">
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <span className="font-medium text-foreground transition duration-300 hover:text-gray-300">
                    What is Velocity?
                  </span>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] bg-gray-800 dark:bg-white rounded-lg shadow-lg">
                    <li className="">
                      <NavigationMenuLink asChild>
                        <Link
                          href="/getting-started"
                          className="flex h-full w-full select-none flex-col justify-end rounded-lg bg-gradient-to-b from-gray-800 to-gray-700 dark:from-gray-200 dark:to-gray-300 p-6 no-underline outline-none shadow-lg transition-transform transform hover:scale-105 focus:shadow-xl"
                        >
                          <p className="text-sm leading-relaxed text-gray-300 dark:text-gray-700">
                            Velocity is an innovative platform designed to
                            accelerate the career growth of engineering
                            students. Tailored to the unique needs of aspiring
                            engineers, Velocity offers a comprehensive suite of
                            tools and resources that empower students to build
                            their skills, connect with industry professionals,
                            and navigate their career paths with confidence.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <span className="font-medium text-foreground transition duration-300 hover:text-gray-300">
                    About Me
                  </span>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] bg-gray-800 dark:bg-white rounded-lg shadow-lg">
                    <li className="">
                      <NavigationMenuLink asChild>
                        <Link
                          href="/about-me"
                          className="flex h-full w-full select-none flex-col justify-end rounded-lg bg-gradient-to-b from-gray-800 to-gray-700 dark:from-gray-200 dark:to-gray-300 p-6 no-underline outline-none shadow-lg transition-transform transform hover:scale-105 focus:shadow-xl"
                        >
                          <p>
                            Hello, I am Harsh Thakur. I am a Full Stack
                            Developer currently pursuing my major in Computer
                            Science Engineering. You can find me on GitHub and
                            Twitter/X.
                          </p>
                          <p>I have provided all the links below.</p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/resumebuilder" passHref legacyBehavior>
                  <NavigationMenuLink className="font-medium text-foreground transition duration-300 hover:text-gray-300">
                    Resume Builder
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/notes" passHref legacyBehavior>
                  <NavigationMenuLink className="font-medium text-foreground transition duration-300 hover:text-gray-300">
                    Notes
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/quiz" passHref legacyBehavior>
                  <NavigationMenuLink className="font-medium text-foreground transition duration-300 hover:text-gray-300">
                    Quiz
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/feedback" passHref legacyBehavior>
                  <NavigationMenuLink className="font-medium text-foreground transition duration-300 hover:text-gray-300">
                    Feedback
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden">
          <Button
            variant="ghost"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu size={24} />
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-background p-4 md:hidden z-50">
            <NavigationMenu>
              <NavigationMenuList className="flex flex-col space-y-4">
                <NavigationMenuItem>
                  {/* <Link href="/getting-started" passHref legacyBehavior> */}
                  <NavigationMenuLink className="font-medium text-foreground transition duration-300 hover:text-gray-300">
                    <ModeToggle />
                  </NavigationMenuLink>
                  {/* </Link> */}
                </NavigationMenuItem>
                <NavigationMenuItem>
                  {/* <Link href="/about-me" passHref legacyBehavior> */}
                  <NavigationMenuLink className="font-medium text-foreground transition duration-300 hover:text-gray-300">
                    <Logout />
                  </NavigationMenuLink>
                  {/* </Link> */}
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="resumebuilder" passHref legacyBehavior>
                    <NavigationMenuLink className="font-medium text-foreground transition duration-300 hover:text-gray-300">
                      Resume Builder
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/notes" passHref legacyBehavior>
                    <NavigationMenuLink className="font-medium text-foreground transition duration-300 hover:text-gray-300">
                      Notes
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/" passHref legacyBehavior>
                    <NavigationMenuLink className="font-medium text-foreground transition duration-300 hover:text-gray-300">
                      Syllabus/Lab Files
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/feedback" passHref legacyBehavior>
                    <NavigationMenuLink className="font-medium text-foreground transition duration-300 hover:text-gray-300">
                      Feedback
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <Link
                  href="/profile"
                  passHref
                  legacyBehavior
                  className="flex items-center "
                >
                  <NavigationMenuLink className="font-medium text-foreground transition duration-300 hover:text-gray-300 flex items-center">
                    <User2 className="mr-2" size={16} />
                    UpdateProfile
                  </NavigationMenuLink>
                </Link>
                <NavigationMenuItem></NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        )}

        <div className="hidden md:flex items-center space-x-3">
          <ModeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center">
                <User className="mr-2" size={16} />
                Profile
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <a href="/profile" className="flex items-center">
                  <User className="mr-2" size={16} />
                  Profile
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="/settings" className="flex items-center">
                  <Settings className="mr-2" size={16} />
                  Settings
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Logout />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
