"use client";
import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react"; // Change the arrow here

export const ScrollToTop = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {showTopBtn && (
        <button
          onClick={goToTop}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 ease-in-out shadow-lg opacity-90"
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-6 w-6" />
        </button>
      )}
    </>
  );
};
