import { HashRouter } from 'react-router-dom';

import { About, Contact, Experience, Hero, Navbar, StarsCanvas, Tech } from "./components";
import Footer from "./components/Footer";
import TabbedSections from "./components/TabbedSections"; // استيراد مكون التبويبات

const App = () => {
  return (
    <HashRouter>
      <div className='relative z-0 bg-primary'>
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
          <Navbar />
          <Hero />
        </div>

        <About />
        <Experience />
        <Tech />

        {/* ✅ التبويبات بدل الأقسام المفصولة */}
        <TabbedSections />

        <div className='relative z-0'>
          <Contact />
          <StarsCanvas />
        </div>

        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
