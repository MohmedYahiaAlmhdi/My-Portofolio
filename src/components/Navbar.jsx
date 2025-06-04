import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { close, logo, menu } from "../assets";
import { navLinks } from "../constants";
import { styles } from "../styles";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-4 fixed top-0 z-30 transition-colors ${
        scrolled ? "bg-primary shadow-md" : "bg-transparent"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto flex justify-between items-center">
        {/* الشعار */}
        <Link
          to="/"
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
            setToggle(false);
          }}
        >
          <img
            src={logo}
            alt="logo"
            className="w-12 h-12 rounded-full object-cover sm:w-16 sm:h-16"
          />
          <p className="text-white font-bold whitespace-nowrap text-base sm:text-lg">
            Mohmed Yhaia Almhdi
          </p>
        </Link>

        {/* زر الهامبرغر - يظهر من xs إلى أقل من xl */}
        <div className="xl:hidden">
          <button
            onClick={() => setToggle(true)}
            aria-label="Open menu"
            className="focus:outline-none"
          >
            <img src={menu} alt="menu" className="w-8 h-8 object-contain" />
          </button>
        </div>

        {/* القائمة المنسدلة للجوال (السايدبار) */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-primary bg-opacity-95 backdrop-blur-md shadow-lg p-6 transform transition-transform duration-300 ease-in-out ${
            toggle ? "translate-x-0" : "translate-x-full"
          } xl:hidden z-50 rounded-l-xl`}
        >
          {/* زر الإغلاق داخل القائمة */}
          <div className="flex justify-end">
            <button
              onClick={() => setToggle(false)}
              aria-label="Close menu"
              className="text-white text-2xl font-bold"
            >
              &times;
            </button>
          </div>

          <ul className="flex flex-col gap-6 mt-6">
            {navLinks.map((nav) => (
              <li
                key={nav.id}
                className={`font-semibold text-lg cursor-pointer ${
                  active === nav.title ? "text-white" : "text-secondary"
                } hover:text-white`}
                onClick={() => {
                  setActive(nav.title);
                  setToggle(false);
                }}
              >
                <a href={`#${nav.id}`}>{nav.title}</a>
              </li>
            ))}
          </ul>

          {/* روابط تواصل اجتماعي داخل القائمة */}
          <div className="flex justify-between mt-10">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white border border-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-white hover:text-black transition"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white border border-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-white hover:text-black transition"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white border border-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-white hover:text-black transition"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white border border-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-white hover:text-black transition"
            >
              <i className="fab fa-github"></i>
            </a>
          </div>

          <a
            href="#contact"
            onClick={() => setToggle(false)}
            className="block mt-8 text-center text-white border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition"
          >
            Let's Connect
          </a>
        </div>

        {/* قائمة التنقل الأفقية من xl فما فوق */}
        <ul className="list-none hidden xl:flex flex-row gap-10">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title ? "text-white" : "text-secondary"
              } hover:text-white text-lg font-medium cursor-pointer`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
        </ul>

        {/* أيقونات التواصل وزر Connect - من xl فما فوق */}
        <div className="hidden xl:flex items-center gap-4">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white border border-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-white hover:text-black transition"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white border border-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-white hover:text-black transition"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white border border-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-white hover:text-black transition"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white border border-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-white hover:text-black transition"
          >
            <i className="fab fa-github"></i>
          </a>

          <a
            href="#contact"
            className="text-white border border-white px-4 py-2 rounded hover:bg-white hover:text-black transition font-medium"
          >
            Let's Connect
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
