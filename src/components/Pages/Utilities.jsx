import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import electricity from '../../assets/Electry.png';
import gas from '../../assets/gas.png';
import internet from '../../assets/internet.png';
import water from '../../assets/water.png';
import { FaBolt, FaFire, FaWifi, FaTint, FaArrowRight } from 'react-icons/fa';

const Utilities = () => {
  const utilities = [
    { 
      name: 'Electricity', 
      image: electricity,
      icon: <FaBolt className="text-yellow-400 text-2xl" />,
      color: "from-yellow-400 to-yellow-500",
      darkColor: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-50",
      darkBgColor: "dark:bg-yellow-900/20",
      count: "250+ Bills"
    },
    { 
      name: 'Internet', 
      image: internet,
      icon: <FaWifi className="text-blue-400 text-2xl" />,
      color: "from-blue-400 to-blue-500",
      darkColor: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      darkBgColor: "dark:bg-blue-900/20",
      count: "180+ Bills"
    },
    { 
      name: 'Gas', 
      image: gas,
      icon: <FaFire className="text-orange-400 text-2xl" />,
      color: "from-orange-400 to-orange-500",
      darkColor: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      darkBgColor: "dark:bg-orange-900/20",
      count: "120+ Bills"
    },
    { 
      name: 'Water', 
      image: water,
      icon: <FaTint className="text-cyan-400 text-2xl" />,
      color: "from-cyan-400 to-cyan-500",
      darkColor: "from-cyan-500 to-cyan-600",
      bgColor: "bg-cyan-50",
      darkBgColor: "dark:bg-cyan-900/20",
      count: "90+ Bills"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    },
    hover: {
      y: -10,
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 15
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 0.8, rotate: -10 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    },
    hover: {
      scale: 1.15,
      rotate: 5,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  };

  const buttonVariants = {
    initial: { width: "160px" },
    hover: { 
      width: "170px",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 20
      }
    }
  };

  const iconVariants = {
    initial: { x: 0 },
    hover: { 
      x: 5,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 15,
        repeat: Infinity,
        repeatType: "reverse",
        duration: 0.5
      }
    }
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Utility <span className="text-amber-500 dark:text-amber-400">Categories</span>
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Manage all your utility bills from one platform. Fast, secure, and hassle-free payments.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {utilities.map((utility, index) => (
          <motion.div
            key={utility.name}
            variants={itemVariants}
            whileHover="hover"
            className="relative"
          >
            <motion.div
              className={`
                relative w-full h-full rounded-3xl shadow-lg 
                ${utility.bgColor} ${utility.darkBgColor}
                border border-gray-200 dark:border-gray-700
                overflow-hidden group cursor-pointer
                before:absolute before:inset-0 
                before:bg-linear-to-br before:opacity-0 before:group-hover:opacity-100
                before:transition-opacity before:duration-500
                before:${utility.color} dark:before:${utility.darkColor}
                before:-z-10
              `}
            >
              {/* Decorative background element */}
              <div className={`
                absolute -top-20 -right-20 w-40 h-40 
                bg-linear-to-br ${utility.color} dark:${utility.darkColor}
                rounded-full opacity-10 group-hover:opacity-20
                blur-2xl transition-opacity duration-500
              `} />

              <div className="p-6 h-full flex flex-col items-center">
                {/* Icon and Image Container */}
                <div className="relative mb-6">
                  <div className="absolute -top-2 -right-2 z-10">
                    {utility.icon}
                  </div>
                  <motion.div
                    variants={imageVariants}
                    className="relative z-0"
                  >
                    <img
                      src={utility.image}
                      alt={utility.name}
                      className="w-28 h-28 object-contain drop-shadow-lg"
                    />
                  </motion.div>
                  
                  {/* Floating particles */}
                  <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-linear-to-r from-white to-transparent rounded-full opacity-30 group-hover:animate-ping" />
                  <div className="absolute -top-2 -left-2 w-3 h-3 bg-linear-to-r from-white to-transparent rounded-full opacity-20 group-hover:animate-pulse delay-75" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors">
                  {utility.name}
                </h3>

                {/* Bill Count */}
                <div className="mb-6">
                  <span className="text-sm font-semibold px-3 py-1 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300">
                    {utility.count}
                  </span>
                </div>

                {/* Button */}
                <motion.div
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  className="mt-auto"
                >
                  <Link to="/allBills">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`
                        w-full bg-linear-to-r ${utility.color} dark:${utility.darkColor}
                        text-white font-semibold py-3 px-6 rounded-xl
                        shadow-lg hover:shadow-xl
                        transition-all duration-300
                        flex items-center justify-center gap-2
                        group/btn
                      `}
                    >
                      <span>View Bills</span>
                      <motion.span
                        variants={iconVariants}
                        initial="initial"
                        whileHover="hover"
                      >
                        <FaArrowRight className="text-sm group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </motion.span>
                    </motion.button>
                  </Link>
                </motion.div>
              </div>

              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-white/20 transition-all duration-500 pointer-events-none" />
            </motion.div>

            {/* Shadow effect */}
            <div className={`
              absolute inset-0 rounded-3xl bg-linear-to-r ${utility.color} dark:${utility.darkColor}
              -z-10 opacity-0 group-hover:opacity-30 blur-xl
              transition-all duration-500
              translate-y-4
            `} />
          </motion.div>
        ))}
      </motion.div>

      {/* Additional CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="text-center mt-16"
      >
        <Link to="/allBills">
          <button className="
            px-8 py-4 bg-linear-to-r from-amber-500 to-amber-600 
            dark:from-amber-600 dark:to-amber-700
            text-white font-bold rounded-2xl
            hover:from-amber-600 hover:to-amber-700
            dark:hover:from-amber-700 dark:hover:to-amber-800
            transition-all duration-300
            shadow-lg hover:shadow-amber-500/30
            hover:scale-105 active:scale-95
            flex items-center gap-2 mx-auto
          ">
            <span>Browse All Categories</span>
            <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </Link>
        
        <p className="text-gray-500 dark:text-gray-400 mt-4 text-sm">
          Quick access to all utility bills with one click
        </p>
      </motion.div>
    </div>
  );
};

export default Utilities;