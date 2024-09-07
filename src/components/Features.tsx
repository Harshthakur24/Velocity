"use client";

import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface FeatureProps {
  title: string;
  description: string;
  image: string;
}

const image = "community.png";
const image2 = "ui.png";
const image3 = "contact.png";
const features: FeatureProps[] = [
  {
    title: "Community Building",
    description:
      "Empowering connections, fostering growth, and uniting diverse voices through a vibrant community platform.",
    image: image,
  },
  {
    title: "Intuitive user interface",
    description:
      "Our platform is designed to be user-friendly, making it easy for students to navigate and find the resources they need. The clean design and intuitive layout enhance the learning experience.",
    image: image2,
  },
  {
    title: "Contact us and Feedback form",
    description:
      "You can contact us for any query or feedback. We will get back to you as soon as possible and will be happy to help.",
    image: image3,
  },
];

const featureList: string[] = [
  "User-friendly design",
  "Previous Year Papers",
  "Study materials",
  "Career growth tools",
  "Job board and internship portal",
  "Mentorship matching",
  "Resume builder",
  "Interview preparation resources",
  "Community forums",
  "Newsletter subscription",
  "Contact us and Feedback form",
];

export const Features = () => {
  const router = useRouter();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);
  return (
    <section id="features" className="container py-24 sm:py-32 space-y-10">
      <h2 className="text-4xl lg:text-5xl font-bold md:text-center">
        But why would I use{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Velocity{" "}
        </span>
        ?
      </h2>

      {!isMobile ? (
        <div className="flex flex-wrap md:justify-center gap-4">
          {featureList.map((feature: string) => (
            <div key={feature}>
              <Badge variant="secondary" className="text-sm">
                {feature}
              </Badge>
            </div>
          ))}
        </div>
      ) : (
        <div></div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map(({ title, description, image }: FeatureProps) => (
          <Card key={title}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>

            <CardContent>{description}</CardContent>

            <CardFooter>
              <img
                src={image}
                alt="About feature"
                className="w-[200px] lg:w-[300px] mx-auto"
              />
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
