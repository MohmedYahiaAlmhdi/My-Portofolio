import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedinIn,
  faFacebookF,
  faInstagram,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="w-full py-6 bg-black text-white text-center mt-auto">
      <div className="flex justify-center gap-4 mb-3">
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white border border-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-white hover:text-black transition"
        >
          <FontAwesomeIcon icon={faLinkedinIn} />
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white border border-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-white hover:text-black transition"
        >
          <FontAwesomeIcon icon={faFacebookF} />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white border border-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-white hover:text-black transition"
        >
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white border border-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-white hover:text-black transition"
        >
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </div>
      <p className="text-sm">
        © {new Date().getFullYear()} Mohmed Yhaia Almhdi | JavaScript Mastery
      </p>
    </footer>
  );
};

export default Footer;
