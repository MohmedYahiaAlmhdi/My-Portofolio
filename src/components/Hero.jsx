import { motion } from "framer-motion";
import { useTypewriter, Cursor } from "react-simple-typewriter";

import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";

const rotatingWords = [
  "Mohmed Yahia Almhdi",
  "Front-End Developer",
  "React Developer",
];

const Hero = () => {
  const [text] = useTypewriter({
    words: rotatingWords,
    loop: 0,
    typeSpeed: 100,
    deleteSpeed: 60,
    delaySpeed: 1500,
  });

  return (
    <section className="relative w-full h-screen mx-auto overflow-hidden">
      {/* النص والديكور */}
      <div
        className={`
          absolute inset-x-2 sm:inset-x-auto sm:left-8 top-[100px] sm:top-[120px] max-w-7xl mx-auto ${styles.paddingX}
          flex flex-col sm:flex-row items-start gap-6 sm:gap-8
          z-10
        `}
      >
        {/* الديكور الجانبي */}
        <div className="flex flex-row sm:flex-col justify-center items-center mt-5 gap-3 sm:gap-5">
          <div className="w-4 h-4 rounded-full bg-[#915EFF]" />
          <div className="w-1 sm:h-64 h-32 violet-gradient" />
        </div>

        {/* النص */}
        <div className="w-full sm:w-auto">
          <h1
            className={`${styles.heroHeadText} text-white select-none whitespace-normal
              text-[20px] sm:text-[40px] md:text-[48px] leading-tight`}
          >
            Hi, I'm{" "}
            <span className="text-[#915EFF]">
              {text}
              <Cursor cursorColor="#915EFF" />
            </span>
          </h1>
          <p className={`${styles.heroSubText} mt-3 text-white-100 text-xs sm:text-base`}>
            I develop 3D visuals, user <br className="sm:block hidden" />
            interfaces and web applications
          </p>
        </div>
      </div>

      {/* 3D Model */}
      <div
        className={`
          absolute inset-0 z-0 flex justify-center items-center pointer-events-none
        `}
      >
        <div className="w-full h-full max-h-[90vh] max-w-[90vw]">
          <ComputersCanvas />
        </div>
      </div>

      {/* السهم المتحرك */}
      <div className="absolute xs:bottom-10 bottom-20 w-full flex justify-center items-center z-20">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
