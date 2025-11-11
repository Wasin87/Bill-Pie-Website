import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// Import local images
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
    });
  }, []);

  const images = [img4, img5, img2, img3, img1];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative py-10 flex flex-col items-center">
      <h2 className="text-4xl font-bold text-center mb-8 text-black dark:text-white">
        ⚡Manage your available bills
      </h2>

      <div className="relative w-5/5 overflow-hidden rounded-3xl shadow-lg">
        {/* Images */}
        <div
          className="flex transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((img, index) => (
            <div key={index} className="min-w-full relative" data-aos="fade-right">
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                className="w-full h-[500px] object-cover"
                style={{ filter: "blur(2px)" }} // subtle blur
              />
              {/* Center text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-xl md:text-2xl font-semibold text-center px-6 py-2 rounded  ">
              "💡 Bill Management System makes your payments simple, fast, secure, and completely stress-free! ⚡"
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Arrows */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-6">
          <button
            onClick={prevSlide}
            className="text-white text-4xl bg-black bg-opacity-25 p-3 rounded-full hover:bg-opacity-50 transition"
          >
            &#60;
          </button>

          <button
            onClick={nextSlide}
            className="text-white text-4xl bg-black bg-opacity-25 p-3 rounded-full hover:bg-opacity-50 transition"
          >
            &#62;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
