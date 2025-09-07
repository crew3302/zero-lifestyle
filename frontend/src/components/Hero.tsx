// src/components/Hero.tsx
import React, { useState } from 'react'; // Added useState
import Slider from 'react-slick';
import ReactPlayer from 'react-player/lazy'; // Import ReactPlayer
import { ArrowRight, Play, X } from 'lucide-react'; // Added X for close button
import story from "../assests/story.mp4"

interface HeroSlide {
  id: number;
  backgroundImage: string;
  titlePart1: string;
  titlePart2: string;
  subtitle: string;
}

const slides: HeroSlide[] = [
  {
    id: 1,
    backgroundImage: "https://zerolifestyle.co/cdn/shop/files/Desktop-Striker_01.webp?v=1750427418",
    titlePart1: "Live with",
    titlePart2: "Zero Limits",
    subtitle: "Discover the art of minimalist living. Transform your life through intentional choices, mindful practices, and sustainable habits."
  },
  {
    id: 2,
    backgroundImage: "https://zerolifestyle.co/cdn/shop/files/main_kv_2bd8dead-1e20-4267-85c3-39d807b6648c.webp?v=1746792949",
    titlePart1: "Simplify Your",
    titlePart2: "Digital Life",
    subtitle: "Embrace technology that enhances, not distracts. Our products are designed for focus and clarity."
  },
  {
    id: 3,
    backgroundImage: "https://zerolifestyle.co/cdn/shop/files/growing_brand_copy.webp?v=1743680915&width=1400",
    titlePart1: "Connect &",
    titlePart2: "Grow Together",
    subtitle: "Join a community dedicated to mindful living and personal development. Share your journey."
  }
];

const Hero = () => {
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);

  const handleWatchStoryClick = () => {
    setShowVideoPlayer(true);
  };

  const handleClosePlayer = () => {
    setShowVideoPlayer(false);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: !showVideoPlayer, // Pause autoplay when video is shown
    autoplaySpeed: 5000,
    pauseOnHover: true,
    fade: true,
    cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
    customPaging: (i: number) => (
      <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-white/50 transition-all duration-300"></div>
    ),
    appendDots: (dots: React.ReactNode) => (
      <div style={{ position: "absolute", bottom: "40px", width: "100%", zIndex: 10 }}>
        <ul className="m-0 p-0 text-center">{dots}</ul>
      </div>
    ),
  };

  return (
    <section className="relative w-full h-screen overflow-hidden hero-slider-section">
      <Slider {...settings} className="h-full">
        {slides.map((slide) => (
          <div key={slide.id} className="relative w-full h-screen outline-none focus:outline-none">
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.backgroundImage})` }}
            >
              <div className="absolute inset-0 bg-black/60"></div>
            </div>
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-y-12"></div>
            </div>
            <div className="relative w-full h-full flex items-center justify-center z-[5]">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="space-y-8 animate-fade-in">
                  <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                    {slide.titlePart1}
                    <span className="block bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      {slide.titlePart2}
                    </span>
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
                    {slide.subtitle}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
                    <button className="group bg-white text-black px-8 py-4 rounded-full font-semibold flex items-center gap-2 hover:bg-gray-200 transition-all duration-300 transform hover:scale-105">
                      Start Your Journey
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                    {/* Updated Watch Story Button */}
                    <button
                      onClick={handleWatchStoryClick}
                      className="group flex items-center gap-3 text-white hover:text-gray-100 transition-colors duration-300"
                    >
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                        <Play size={18} fill="currentColor" className="ml-0.5" />
                      </div>
                      Watch Story
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 hidden md:block">
        <div className="w-px h-16 bg-gradient-to-b from-white to-transparent"></div>
        <div className="w-2 h-2 bg-white rounded-full mx-auto mt-2 animate-bounce"></div>
      </div>

      {/* Video Player Modal/Overlay */}
      {showVideoPlayer && (
        <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={handleClosePlayer} // Close on clicking overlay
        >
          <div 
            className="relative w-full max-w-3xl aspect-video bg-black rounded-lg shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on player itself
          >
            <button
              onClick={handleClosePlayer}
              className="absolute top-3 right-3 text-white/70 hover:text-white/100 z-50 p-2 bg-black/30 rounded-full transition-colors"
              aria-label="Close video player"
            >
              <X size={24} />
            </button>
            <ReactPlayer
              url={story} // Path to your video in the public folder
              playing={true}
              controls={true}
              width="100%"
              height="100%"
              onEnded={handleClosePlayer} // Optional: close when video ends
              config={{
                file: {
                  attributes: {
                    // You can add attributes like preload, etc.
                    // preload: 'auto', // Example
                  }
                }
              }}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;