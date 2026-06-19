"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";

const faqs = [
  {
    question: "What services does Prokodex provide?",
    answer: "Prokodex specializes in building modern digital products. Our core services include Web Development, Mobile App Development, Custom ERP Systems, and UI/UX Design."
  },
  {
    question: "Do you work with startups or established enterprises?",
    answer: "We work with both! We help early-stage startups build their MVP and scale, while also providing robust, scalable solutions and ERP systems for established enterprises."
  },
  {
    question: "How long does a typical project take?",
    answer: "Project timelines vary significantly based on complexity and scope. A simple landing page might take a few weeks, while a full-scale ERP system could take several months. We provide detailed timelines during our initial consultation."
  },
  {
    question: "What technologies do you use?",
    answer: "We leverage modern, scalable technology stacks. This typically includes Next.js, React, Node.js, and TypeScript for web applications, along with React Native or Flutter for mobile apps. We also use cloud infrastructure like AWS or Vercel."
  },
  {
    question: "Do you offer post-launch support and maintenance?",
    answer: "Yes, we offer comprehensive post-launch support and maintenance packages to ensure your application remains secure, up-to-date, and performs optimally as your user base grows."
  },
  {
    question: "Do you provide internships for students?",
    answer: "Yes! We run comprehensive internship and training programs. You can check out our Careers & Internships page to learn more and apply for open positions."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen pt-16 pb-16 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-secondary/5 blur-[120px] -z-10" />
      <div className="absolute top-[20%] right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary border border-secondary/20 mb-4"
          >
            <MessageCircleQuestion className="h-4 w-4" />
            <span className="text-sm font-medium tracking-wide">Help Center</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
          >
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">Questions</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Find answers to common questions about our services, process, and how we can help your business grow.
          </motion.p>
        </div>

        {/* FAQs List */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-4"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className={`border border-border/50 rounded-2xl overflow-hidden transition-colors duration-300 ${openIndex === index ? 'bg-card border-secondary/30 shadow-lg shadow-secondary/5' : 'bg-card/40 hover:bg-card/60'}`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none"
              >
                <span className="font-semibold text-lg">{faq.question}</span>
                <div className={`p-2 rounded-full transition-transform duration-300 ${openIndex === index ? 'bg-secondary/10 rotate-180' : 'bg-muted/50'}`}>
                  <ChevronDown className={`h-4 w-4 ${openIndex === index ? 'text-secondary' : 'text-muted-foreground'}`} />
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-5 text-muted-foreground">
                      <div className="h-px w-full bg-border/50 mb-4" />
                      <p className="leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Still have questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center p-8 rounded-3xl bg-secondary/5 border border-secondary/10"
        >
          <h3 className="text-xl font-semibold mb-2">Still have questions?</h3>
          <p className="text-muted-foreground mb-6">Can't find the answer you're looking for? Please chat to our friendly team.</p>
          <a href="/contact" className="inline-flex h-11 items-center justify-center rounded-md bg-secondary px-8 text-sm font-medium text-secondary-foreground shadow transition-colors hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
            Contact Us
          </a>
        </motion.div>
      </div>
    </div>
  );
}
