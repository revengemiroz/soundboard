"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useState } from "react";

interface FAQProps {
  category: string;
}

function getRandomGradient() {
  const gradients = [
    "from-red-500 to-orange-500",
    "from-blue-500 to-teal-500",
    "from-green-500 to-lime-500",
    "from-purple-500 to-pink-500",
    "from-indigo-500 to-cyan-500",
    "from-yellow-500 to-amber-500",
  ];

  return gradients[Math.floor(Math.random() * gradients.length)];
}

const renderFaq = ({ category }: FAQProps) => {
  const [gradient, setGradient] = useState("");

  useEffect(() => {
    setGradient(getRandomGradient()); // Set gradient only on the client side
  }, []);

  const lowerCategory = category.toLowerCase();

  const faqMap: Record<string, { question: string; answer: string }[]> = {
    nepali: [
      {
        question: "Can I use these Nepali sounds in TikTok or YouTube videos?",
        answer:
          "Yes! All Nepali meme sounds on this page are free to use in TikTok, YouTube, Instagram Reels, or any other content platform.",
      },
      {
        question: "How do I download Nepali meme sounds?",
        answer:
          "Simply click the play button on any sound, then use the download option to save the audio instantly.",
      },
      {
        question: "Are these sounds from real Nepali memes?",
        answer:
          "Yes, we curate viral sounds and memes from Nepali culture, social media trends, and popular local content.",
      },
      {
        question: "How often is the Nepali soundboard updated?",
        answer:
          "We regularly add new trending Nepali sounds based on what's going viral across platforms like TikTok and Facebook.",
      },
    ],
    memes: [
      {
        question: "Are meme sounds free to use?",
        answer:
          "Yes! All meme sounds are free to use in your content and personal projects.",
      },
      {
        question: "Where do the meme sounds come from?",
        answer:
          "We collect meme audio from trending content, viral clips, and internet pop culture.",
      },
    ],
    movies: [
      {
        question: "Are these movie sounds copyright-safe?",
        answer:
          "Use at your own discretion. Most are short clips meant for fun and parody usage.",
      },
      {
        question: "What kind of movie sounds are included?",
        answer:
          "Famous quotes, funny dialogues, and sound effects from popular films.",
      },
    ],
    anime: [
      {
        question: "Can I use anime sounds in edits or AMVs?",
        answer:
          "Yes, for fun or fan edits. Avoid monetizing without proper rights.",
      },
      {
        question: "Do you update anime sounds regularly?",
        answer:
          "We add sounds from trending anime and viral anime scenes frequently.",
      },
    ],
    music: [
      {
        question: "Can I use music clips in reels and shorts?",
        answer:
          "Yes, short clips are ideal for social content, reels, or intros.",
      },
      {
        question: "What genres are included?",
        answer: "From pop, hip-hop, and EDM to traditional sounds and remixes.",
      },
    ],
    "sound effects": [
      {
        question: "What kind of sound effects do you have?",
        answer: "Funny boings, whooshes, notifications, glitches and more.",
      },
      {
        question: "Can I use them in videos or games?",
        answer: "Absolutely. Perfect for YouTube, games, or creative projects.",
      },
    ],
    "discord soundboard": [
      {
        question: "Can I use these in my Discord soundboard?",
        answer:
          "Yes! Download and upload them to your favorite Discord bot or plugin.",
      },
      {
        question: "Are these sounds family-friendly?",
        answer: "We keep it fun, meme-worthy, and mostly safe-for-work.",
      },
    ],
    "viral soundboard": [
      {
        question: "Where are these viral sounds from?",
        answer:
          "From TikTok, YouTube Shorts, Reels, and trending online moments.",
      },
      {
        question: "How often are viral sounds updated?",
        answer: "Weekly updates based on what’s hot on social media.",
      },
    ],
    "tiktok soundboard": [
      {
        question: "Can I reuse these TikTok sounds?",
        answer: "Yes, you can use them in remixes, trends, and reels.",
      },
      {
        question: "What types of sounds are these?",
        answer:
          "Trending audio bites, voiceovers, and viral clips from TikTok.",
      },
    ],
  };

  const faqs = faqMap[lowerCategory];
  if (!faqs) return null;

  return (
    <div className="max-w-3xl mx-auto  px-4 mt-20">
      <h2 className="text-2xl  md:text-3xl mx-auto flex items-center justify-center font-extrabold mb-6 tracking-tight">
        <span className="relative">
          <span
            className={`capitalize bg-gradient-to-r ${gradient} bg-clip-text text-transparent relative z-10`}
          >
            FAQs –{" "}
            <span className="capitalize">{category.replace(/-/g, " ")}</span>
            {"  "}
          </span>
          <span className="absolute -bottom-2 left-0 w-full h-3 bg-red-200 dark:bg-red-900/40 rounded-full -z-0 transform -rotate-1"></span>
        </span>{" "}
        &nbsp;Sounds
      </h2>

      <Accordion
        type="single"
        collapsible
        className="space-y-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-2"
      >
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="rounded-md border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4"
          >
            <AccordionTrigger className="cursor-pointer py-4 text-left font-medium text-slate-700 dark:text-slate-300 hover:underline hover:text-indigo-600">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="pb-4 text-sm text-slate-600 dark:text-slate-400">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default renderFaq;
