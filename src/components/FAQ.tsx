import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "How long does it take to heal after divorce?",
      answer: "Healing after divorce is a personal journey that varies for everyone. While some people may start feeling better within a few months, complete emotional healing can take 1-2 years or more. Our community provides ongoing support throughout your entire healing process."
    },
    {
      question: "What are the first steps to take after divorce?",
      answer: "Start by taking care of your basic needs: secure housing, financial stability, and legal documentation. Focus on self-care, consider therapy or counseling, and gradually rebuild your social connections. Our resources section provides detailed guides for each step."
    },
    {
      question: "How can I help my children cope with divorce?",
      answer: "Maintain open communication, reassure them that the divorce isn't their fault, keep routines consistent, and consider family therapy. Children need stability and love from both parents during this transition. Our community includes parents sharing their experiences and advice."
    },
    {
      question: "When should I start dating again after divorce?",
      answer: "There's no set timeline for when to start dating. Focus on healing yourself first, understanding what went wrong in your marriage, and feeling emotionally ready for a new relationship. Many experts suggest waiting at least 6 months to a year."
    },
    {
      question: "How do I deal with loneliness after divorce?",
      answer: "Loneliness is normal after divorce. Combat it by joining support groups, reconnecting with old friends, pursuing hobbies, volunteering, or joining our online community. Building new routines and social connections takes time but is essential for healing."
    },
    {
      question: "What if my ex-spouse is making the divorce difficult?",
      answer: "Focus on what you can control: your responses, legal documentation, and emotional well-being. Consider mediation, communicate only when necessary and in writing, and lean on your support system. Professional legal and therapeutic help may be needed."
    }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
      
      <Card className="border-[#6A5ACD]/20 shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl text-[#6A5ACD] text-center">
            Frequently Asked Questions About Divorce Recovery
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left hover:text-[#6A5ACD]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#333333] leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </>
  );
};

export default FAQ;