import React, { useState, useEffect, useRef } from "react";
import Works from "./Works";
import Feedbacks from "./Feedbacks";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";

const TABS = [
  { id: "projects", label: "Projects" },
  { id: "testimonials", label: "Testimonials" },
  { id: "about", label: "About Me" },
];

const AnimatedText = ({ textList, highlightWords }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [animationTriggered, setAnimationTriggered] = useState(false);
  const sectionRef = useRef(null);

  const fullText = textList[currentTextIndex];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animationTriggered) {
          setAnimationTriggered(true);
        }
      },
      { threshold: 0.4 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, [animationTriggered]);

  useEffect(() => {
    if (!animationTriggered || charIndex >= fullText.length) return;
    const timeout = setTimeout(() => {
      setDisplayedText((prev) => prev + fullText[charIndex]);
      setCharIndex((prev) => prev + 1);
    }, 50);
    return () => clearTimeout(timeout);
  }, [charIndex, animationTriggered, fullText]);

  const colorizeWords = (text) => {
    const regex = new RegExp(`(${highlightWords.join("|")})`, "gi");
    return text.split(regex).map((part, idx) =>
      highlightWords.includes(part) ? (
        <span
          key={idx}
          className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text font-bold animate-pulse"
        >
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div
      ref={sectionRef}
      className="text-[18px] sm:text-[20px] text-secondary leading-8 max-w-3xl mx-auto mt-6 text-center min-h-[150px]"
    >
      {colorizeWords(displayedText)}
    </div>
  );
};

const TabbedSections = () => {
  const [activeTab, setActiveTab] = useState("projects");

  const renderContent = () => {
    switch (activeTab) {
      case "projects":
        return <Works />;
      case "testimonials":
        return <Feedbacks />;
      case "about":
        return (
          <motion.div
            variants={fadeIn("up", "spring", 0.2, 0.75)}
            initial="hidden"
            whileInView="show"
            className="mt-10"
          >
            <AnimatedText
              textList={[
                "My name is Mohmed Yahia Almhdi, I live in Syria, I am 20 years old. I am passionate about building modern websites, solving real-world problems, and learning new technologies every day. I am a Front-End Developer and React Developer with a passion for stunning UI and smooth UX."
              ]}
              highlightWords={[
                "Mohmed Yahia Almhdi",
                "Front-End Developer",
                "React Developer",
              ]}
            />
          </motion.div>
        );
      default:
        return null;
    }
  };

  const activeLabel = TABS.find((t) => t.id === activeTab)?.label;

  return (
    <section className="py-16 px-4 sm:px-10">
      <motion.div variants={textVariant()} initial="hidden" whileInView="show">
        <h2 className="text-white text-[36px] sm:text-[42px] font-bold text-center mb-4">
          {activeLabel}
        </h2>
        <p className="text-secondary text-center text-[18px] mb-8">
          {activeLabel === "Projects"
            ? "Explore some of the apps and tools I've built."
            : activeLabel === "Testimonials"
            ? "What others say about working with me."
            : "A glimpse into who I am."}
        </p>
      </motion.div>

      <div className="flex justify-center gap-4 flex-wrap mb-10">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-full font-semibold text-[16px] transition-all duration-300 shadow-md
              ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-purple-700 to-purple-400 text-white scale-105"
                  : "bg-[#1a1a1a] text-white hover:scale-105 hover:bg-[#2a2a2a]"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div>{renderContent()}</div>
    </section>
  );
};

export default TabbedSections;
