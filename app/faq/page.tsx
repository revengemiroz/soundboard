"use client";
import Link from "next/link";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

export default function FAQPage() {
  const faqs = [
    {
      question: "How do I upload a sound?",
      answer:
        "Click the 'Upload' button in the navigation bar. You can upload MP3, WAV, or OGG files up to 10MB in size. Add a title, category, and tags to help others find your sound.",
    },
    {
      question: "What sound formats are supported?",
      answer:
        "We support MP3, WAV, and OGG audio formats. Files must be under 10MB in size for optimal performance.",
    },
    {
      question: "Can I download sounds?",
      answer:
        "Yes! Each sound has a download button. Click it to save the sound to your device.",
    },
    {
      question: "How do I create a soundboard?",
      answer:
        "Add sounds to your favorites by clicking the heart icon. Your favorites automatically become your personal soundboard.",
    },
    {
      question: "Are there keyboard shortcuts?",
      answer:
        "Yes! You can assign keyboard shortcuts to your favorite sounds for quick access.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <Card className="border-0 shadow-md overflow-hidden ">
          <CardHeader className="text-center border-b border-gray-100  pb-6">
            <div className="mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-50 mb-4">
                <HelpCircle className="w-8 h-8 text-indigo-600" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold tracking-tight text-gray-900">
              Frequently Asked Questions
            </CardTitle>
            <CardDescription className="text-gray-500 max-w-md mx-auto">
              Find answers to common questions about InstantSoundboard
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 md:p-8">
            <Card className="border border-gray-100 shadow-sm">
              <CardContent className="p-0">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className={`border-b border-gray-100 ${index === faqs.length - 1 ? "border-b-0" : ""}`}
                    >
                      <AccordionTrigger className="px-6 py-4 text-left font-medium text-gray-800 hover:text-indigo-600 hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4 text-gray-600">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </CardContent>

          <CardFooter className="flex flex-col items-center py-6">
            <p className="text-gray-700 mb-4">Still have questions?</p>
            <Button
              asChild
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-6 py-2 h-auto font-medium"
            >
              <Link href="/contact">Contact Support</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
