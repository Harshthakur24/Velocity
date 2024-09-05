"use client";

import { Button } from "./ui/button";
import { FaDiscord } from "react-icons/fa";

export const DiscordCommunity = () => {
  const handleJoinClick = () => {
    window.open("https://discord.gg/b7BcbXzy", "_blank", "noopener,noreferrer");
  };

  return (
    <section id="newsletter" className="container w-full h-full">
      <hr className="w-11/12 mx-auto" />

      <div className="container py-24 sm:py-32">
        <h3 className="text-center text-4xl md:text-5xl font-bold">
          Join Our{" "}
          <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
            Discord{" "}
          </span>
          Community
        </h3>
        <p className="text-xl text-muted-foreground text-center mt-4 mb-5">
          Come here and join our community and meet amazing people like you.
        </p>

        <div className="flex items-center justify-center">
          <Button
            className="mt-4 flex gap-1 text-white"
            onClick={handleJoinClick}
          >
            <span className="font-semibold">Join Discord</span>
            <FaDiscord size={20} color="white" />
          </Button>
        </div>
      </div>

      <hr className="w-11/12 mx-auto" />
    </section>
  );
};
