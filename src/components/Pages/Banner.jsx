import React, { useEffect, useState, useCallback } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight, FaChevronDown, FaBolt, FaShieldAlt, FaClock, FaCheckCircle, FaPlay, FaPause } from "react-icons/fa";

import img1 from '../../assets/gas dhanmondi.jpeg';
import img2 from '../../assets/gas-uttara.jpg';
import img3 from '../../assets/Internet banani.jpg';
import img4 from '../../assets/Power Electricity.webp';
import img5 from '../../assets/water-supply.avif';

const Banner = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  const slides = [
    {
      image: img4,
      title: "Electricity Bills",
      subtitle: "Instant Payment Solutions",
      description: "Seamless payment experience for DESCO, DPDC, and all major electricity providers across Bangladesh",
      color: "from-blue-900/70 via-blue-800/50 to-transparent",
      icon: <FaBolt className="text-yellow-300 text-4xl md:text-5xl" />,
      btnText: "Pay Electricity Bill",
      btnLink: "/allBills?category=electricity"
    },
    {
      image: img5,
      title: "Water Supply",
      subtitle: "Effortless Water Bill Management",
      description: "DWASA and other water board payments simplified with automated reminders and one-click payments",
      color: "from-cyan-900/70 via-blue-700/50 to-transparent",
      icon: <FaCheckCircle className="text-cyan-300 text-4xl md:text-5xl" />,
      btnText: "Pay Water Bill",
      btnLink: "/allBills?category=water"
    },
    {
      image: img2,
      title: "Gas Bills",
      subtitle: "Never Miss a Payment",
      description: "Titas Gas, Jalalabad Gas, and other providers with real-time tracking and instant confirmation",
      color: "from-orange-900/70 via-red-800/50 to-transparent",
      icon: <FaShieldAlt className="text-orange-300 text-4xl md:text-5xl" />,
      btnText: "Pay Gas Bill",
      btnLink: "/allBills?category=gas"
    },
    {
      image: img3,
      title: "Internet Services",
      subtitle: "High-Speed Bill Payments",
      description: "Link3, Banglalink, GP, Airtel, and other ISPs with bundled payment options and discounts",
      color: "from-purple-900/70 via-pink-800/50 to-transparent",
      icon: <FaClock className="text-purple-300 text-4xl md:text-5xl" />,
      btnText: "Pay Internet Bill",
      btnLink: "/allBills?category=internet"
    },
    {
      image: img1,
      title: "Gas Connections",
      subtitle: "Multiple Connection Management",
      description: "Handle all your gas connections in one dashboard with family account sharing features",
      color: "from-emerald-900/70 via-green-800/50 to-transparent",
      icon: <FaCheckCircle className="text-emerald-300 text-4xl md:text-5xl" />,
      btnText: "Manage Connections",
      btnLink: "/myPayBil"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto slide function
  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 1000);
  }, [slides.length, isTransitioning]);

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  // Auto play effect
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoPlaying, nextSlide]);

  const goToSlide = (index) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => {
      setIsTransitioning(false);
      setIsAutoPlaying(true);
    }, 10000);
  };

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <>
      {/* Full Screen Hero Banner */}
      <section className="relative min-h-screen overflow-hidden bg-gray-900">
        
        {/* Main Carousel - Full Screen */}
        <div className="relative h-screen">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              {/* Background Image with Overlay */}
              <div className="absolute inset-0">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-linear-to-b ${slide.color}`}></div>
                <div className="absolute inset-0 bg-black/40"></div>
              </div>

              {/* Slide Content - Centered */}
              <div className="relative h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center text-white" data-aos="fade-up" data-aos-delay="300">
                  <div className="inline-flex items-center gap-3 mb-6">
                    {slide.icon}
                    <span className="text-amber-300 text-sm md:text-base font-semibold bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
                       Featured Service
                    </span>
                  </div>
                  
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
                    {slide.title}
                  </h1>
                  
                  <h2 className="text-2xl md:text-3xl lg:text-4xl text-amber-300 font-semibold mb-6">
                    {slide.subtitle}
                  </h2>
                  
                  <p className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-8 text-gray-200 leading-relaxed">
                    {slide.description}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link
                      to={slide.btnLink}
                      className="px-8 py-4 bg-linear-to-r from-amber-500 to-amber-600 text-white font-bold rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-2xl hover:shadow-amber-500/30 text-lg flex items-center gap-2"
                    >
                      {slide.btnText}
                      <FaChevronRight className="ml-2 animate-pulse" />
                    </Link>
 
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-white/10 backdrop-blur-lg rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 z-20 group"
            aria-label="Previous slide"
          >
            <FaChevronLeft className="text-white text-xl md:text-2xl group-hover:scale-125 transition-transform" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-white/10 backdrop-blur-lg rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 z-20 group"
            aria-label="Next slide"
          >
            <FaChevronRight className="text-white text-xl md:text-2xl group-hover:scale-125 transition-transform" />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-500 ${
                  index === currentIndex 
                    ? 'w-10 h-2 bg-amber-400 rounded-full' 
                    : 'w-2 h-2 bg-white/50 rounded-full hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Auto-play Control */}
          <div className="absolute bottom-8 right-8 z-20">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2 hover:bg-black/50 transition-all duration-300 group"
              aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
            >
              {isAutoPlaying ? (
                <FaPause className="text-amber-300 group-hover:scale-110 transition-transform" />
              ) : (
                <FaPlay className="text-amber-300 group-hover:scale-110 transition-transform" />
              )}
              <span className="text-white text-sm hidden md:inline">
                {isAutoPlaying ? "Pause" : "Play"}
              </span>
            </button>
          </div>

          {/* Current Slide Counter */}
          <div className="absolute top-8 right-8 z-20 hidden md:block">
            <div className="bg-black/30 backdrop-blur-sm rounded-full px-4 py-2">
              <span className="text-amber-300 font-bold text-lg">{currentIndex + 1}</span>
              <span className="text-white/70 mx-2">/</span>
              <span className="text-white">{slides.length}</span>
            </div>
          </div>
        </div>

        {/* Scroll Down Hint */}
        <div 
          className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer z-20"
          data-aos="fade-up"
          data-aos-delay="1000"
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight,
              behavior: 'smooth'
            });
          }}
        >
          <div className="flex flex-col items-center group">
            <span className="text-sm text-amber-100 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-semibold">
              Explore Features
            </span>
            <div className="w-12 h-20 rounded-full border-2 border-amber-300/80 flex items-center justify-center backdrop-blur-sm bg-black/20">
              <FaChevronDown className="text-amber-200 text-2xl animate-pulse" />
            </div>
          </div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/4 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-40 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>
      </section>

      {/* Content Below Banner */}
      <section className="py-16 md:py-24 bg-amber-100 dark:bg-linear-to-b dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Heading */}
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black dark:text-white mb-6">
              Welcome to <span className=" text-amber-500 dark:text-amber-400">Bill Pie</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Your all-in-one solution for managing and paying monthly utility bills with 
              unmatched security, speed, and convenience. Experience the future of bill management today.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { number: "1M+", label: "Bills Processed", desc: "Trusted by thousands" },
              { number: "99.9%", label: "Uptime", desc: "Always available" },
              { number: "24/7", label: "Support", desc: "Round the clock assistance" },
            ].map((stat, index) => (
              <div 
                key={index} 
                className="text-center p-8 bg-linear-to-br from-amber-100 to-amber-300 dark:bg-linear-to-br dark:from-gray-800 dark:to-gray-900 rounded-2xl border border-gray-500 hover:border-amber-600/310 transition-all duration-300 hover:scale-105"
                data-aos="fade-up"
                data-aos-delay={index * 200}
              >
                <div className="text-4xl md:text-5xl font-bold text-amber-800 dark:text-amber-400 mb-2">{stat.number}</div>
                <h3 className="text-xl font-semibold text-black dark:text-white mb-2">{stat.label}</h3>
                <p className="text-gray-600 dark:text-gray-400">{stat.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="bg-linear-to-r from-amber-400 to-amber-400/20 dark:bg-linear-to-r dark:from-amber-900/30 dark:to-amber-800/20 rounded-3xl p-8 md:p-12 border border-amber-700/30" data-aos="fade-up">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Ready to Simplify Your Bill Payments?
                </h3>
                <p className="text-gray-500 dark:text-gray-300">
                  Join thousands of satisfied users who trust Bill Pie for their utility management needs.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
 
                <Link
                  to="/allBills"
                  className="px-8 py-3 bg-linear-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg text-center"
                >
                  Browse Bills
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Features */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-black dark:text-white text-center mb-8" data-aos="fade-up">
              Why Choose Bill Pie?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: "⚡", title: "Lightning Fast", desc: "Pay bills in under 30 seconds" },
                { icon: "🛡️", title: "Military Grade Security", desc: "Bank-level encryption" },
                { icon: "📱", title: "Mobile First", desc: "Optimized for all devices" },
                { icon: "💳", title: "Multiple Payment Options", desc: "Cards, Mobile Banking, e-Wallet" },
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="p-6 bg-amber-200 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-amber-500 dark:border-gray-700 hover:border-amber-500/310 transition-all duration-300"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="text-3xl mb-4">{feature.icon}</div>
                  <h4 className="text-lg font-semibold text-black dark:text-white mb-2">{feature.title}</h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Floating Navigation Dots for Sections */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 hidden lg:block z-10">
        <div className="flex flex-col gap-3">
          {['Banner', 'Features', 'Stats', 'CTA'].map((item, index) => (
            <button
              key={index}
              onClick={() => {
                const sections = document.querySelectorAll('section');
                if (sections[index]) {
                  sections[index].scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="w-3 h-3 rounded-full bg-gray-600 hover:bg-amber-400 transition-colors duration-300 relative group"
              aria-label={`Scroll to ${item}`}
            >
              <span className="absolute right-8 top-1/2 -translate-y-1/2 text-white text-sm bg-gray-800 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {item}
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Banner;