"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "@/components/ui/use-toast";

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (email.trim() === "") {
      toast({
        title: "Please enter a valid email address",
        description: "You need to provide an email to join the community.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Thank you for joining our community",
    });

    window.open("https://discord.gg/b7BcbXzy", "_blank");
  };

  return (
    <section id="newsletter" className="container w-full h-full">
      <hr className="w-11/12 mx-auto" />

      <div className="container py-24 sm:py-32">
        <h3 className="text-center text-4xl md:text-5xl font-bold">
          Join Our thriving{" "}
          <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
            Community
          </span>
        </h3>
        <p className="text-xl text-muted-foreground text-center mt-4 mb-8">
          Subscribe here to join our community and meet amazing people like you.
        </p>

        <form
          className="flex flex-col w-full md:flex-row md:w-6/12 lg:w-4/12 mx-auto gap-4 md:gap-2"
          onSubmit={handleSubmit}
        >
          <Input
            type="email"
            placeholder="thakur2004harsh@gmail.com"
            className="bg-muted/50 dark:bg-muted/80"
            aria-label="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit">Join</Button>
        </form>
      </div>

      <hr className="w-11/12 mx-auto" />
    </section>
  );
};
