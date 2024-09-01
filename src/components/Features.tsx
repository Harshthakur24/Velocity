import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface FeatureProps {
  title: string;
  description: string;
  image: string;
}

const image =
  "https://images.unsplash.com/photo-1616400619175-5beda3a17896?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHN0dWR5fGVufDB8fDB8fHww";
const image2 =
  "https://t2informatik.de/en/wp-content/uploads/sites/2/2022/01/user-interface-smartpedia-t2informatik.png";
const image3 =
  "data:image/jpeg;base64,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";
const features: FeatureProps[] = [
  {
    title: "Study materials",
    description:
      "we provide study materials for the students of our college with notes, pyqs and Syllabus..anybody can learn from here and use it for free",
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
  "Syllabus and notes",
  "Study materials",
  "Ai Powered",
  "Easy to use",
  "Saves time",
  "Newsletter",
  "Minimalist",
  "Contact us and Feedback form",
];

export const Features = () => {
  return (
    <section id="features" className="container py-24 sm:py-32 space-y-8">
      <h2 className="text-3xl lg:text-4xl font-bold md:text-center">
        Many{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Great Features
        </span>
      </h2>

      <div className="flex flex-wrap md:justify-center gap-4">
        {featureList.map((feature: string) => (
          <div key={feature}>
            <Badge variant="secondary" className="text-sm">
              {feature}
            </Badge>
          </div>
        ))}
      </div>

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
