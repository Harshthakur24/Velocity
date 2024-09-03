import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "Is this Website free?",
    answer: "Absolutely. It is completely free to use.",
    value: "item-1",
  },
  {
    question: "What features does i get here?",
    answer:
      "You will get free notes ,Resume Builder and Syllabus depending upon your subjects in your semester",
    value: "item-2",
  },
  {
    question: "Where do you store your data?",
    answer:
      "We store everything in our cloud server. We use AWS S3 and cloudfront as our storage provider.",
    value: "item-3",
  },
  {
    question: "How do I contact you?",
    answer:
      "You can fill the contact us form and we will get back to you and ask me on my social handles.",
    value: "item-4",
  },
  {
    question: "Does the code is open source?",
    answer:
      "Yes it is open source. You can check it out on github and raise issues if you want. Just give me a mail and I'll let you contribute.",
    value: "item-5",
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="container py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">
        <span className=" bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Questions{" "}
        </span>
        you guys might have in mind
      </h2>

      <Accordion type="single" collapsible className="w-full AccordionRoot">
        {FAQList.map(({ question, answer, value }: FAQProps) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>

            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <h3 className="font-medium mt-4">
        Still have questions?{" "}
        <a
          rel="noreferrer noopener"
          href="#"
          className="text-primary transition-all border-primary hover:border-b-2"
        >
          Contact us
        </a>
      </h3>
    </section>
  );
};
