// src/components/Layout.tsx
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Handles scrolling to hash elements on navigation
const ScrollToHashElement = () => {
  const location = useLocation();

  React.useEffect(() => {
    const hash = location.hash;
    const removeHashCharacter = (str: string) => str.slice(1);

    if (hash) {
      const element = document.getElementById(removeHashCharacter(hash));
      if (element) {
        // Timeout to ensure element is rendered, especially after page load
        setTimeout(() => {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest',
          });
        }, 100);
      }
    }
  }, [location]);

  return null;
};


const Layout = () => {
  return (
    <>
      <ScrollToTop />
      <ScrollToHashElement />
      <Header />
      <main>
        <Outlet /> {/* Page content will be rendered here */}
      </main>
      <Footer />
    </>
  );
};

export default Layout;