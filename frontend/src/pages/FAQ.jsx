import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import {  AnimatePresence } from "motion/react";

const faqs = [
  {
    question: "What is LeetSheet?",
    answer:
      "LeetSheet is a platform designed to help you practice coding problems, track progress, and prepare for technical interviews with structured problem sheets.",
  },
  {
    question: "How are problems organized?",
    answer:
      "Problems are categorized by company, difficulty, and topic (e.g., arrays, dynamic programming, system design), making it easier to target your preparation.",
  },
  {
    question: "Will more company-specific questions be added?",
    answer:
      "Yes! We are continuously adding new sheets with questions from top companies like Google, Amazon, Microsoft, and more.",
  },
  {
    question: "Are premium questions available?",
    answer:
      "Currently, LeetSheet is starting with free sheets. Premium curated questions for advanced preparation will be added in the future.",
  },
  {
    question: "Can I submit my own problems?",
    answer:
      "Not yet, but this feature is planned. Soon, you'll be able to contribute custom problems to the platform.",
  },
  {
    question: "What if I get stuck on a problem?",
    answer:
      "Hints, explanations, and step-by-step solutions will be provided to guide you through challenges.",
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => setOpenIndex(openIndex === index ? null : index);

  return (
    <section className="w-full max-w-4xl mb-10 mx-auto px-4 py-1 text-center mt-10" style={{ fontFamily: 'var(--font-sans)' }}>
      <h2 className="text-leetsheet-text-primary text-5xl font-bold mb-4">
        Frequently Asked{" "}
        <span style={{color: 'var(--leetsheet-orange)' }}>
          Questions
        </span>
      </h2>
      <p className="text-base  mt-8" style={{color: 'var(--leetsheet-text-secondary)' }}>
        This section answers common questions about coding challenges, helping learners understand and approach them with confidence.
      </p>

      <div className="mt-10 space-y-4 text-left">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="card-leetsheet rounded-xl px-6 py-4 transition-all duration-300"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full flex justify-between items-center text-xl text-left font-semibold text-leetsheet-text-primary"
            >
              <span>{faq.question}</span>
              {openIndex === index ? (
                <Minus size={20} color="var(--leetsheet-orange)" />
              ) : (
                <Plus size={20} color="var(--leetsheet-orange)" />
              )}
            </button>

            <AnimatePresence initial={false}>
              {openIndex === index && (
                <motion.p
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-base overflow-hidden mt-3 text-leetsheet-text-secondary"
                >
                  {faq.answer}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FAQ;