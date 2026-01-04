import React from 'react';
import { FaReact, FaNodeJs, FaDatabase, FaShieldAlt, FaMobileAlt, FaBolt, FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiMongodb, SiExpress, SiTailwindcss } from 'react-icons/si';
import dev from '../../assets/Wasin.jpeg'
import { Link } from 'react-router';

const About = () => {
  const features = [
    {
      icon: <FaShieldAlt className="text-3xl" />,
      title: "Secure Payments",
      description: "End-to-end encrypted transactions ensuring your financial data remains protected."
    },
    {
      icon: <FaMobileAlt className="text-3xl" />,
      title: "Responsive Design",
      description: "Access your bills from any device - desktop, tablet, or mobile."
    },
    {
      icon: <FaBolt className="text-3xl" />,
      title: "Instant Updates",
      description: "Real-time bill tracking and instant payment confirmations."
    },
    {
      icon: <FaDatabase className="text-3xl" />,
      title: "Centralized Management",
      description: "All your utility bills in one place with organized history."
    }
  ];

  const techStack = [
    { icon: <FaReact className="text-3xl text-blue-500" />, name: "React.js" },
    { icon: <FaNodeJs className="text-3xl text-green-600" />, name: "Node.js" },
    { icon: <SiExpress className="text-3xl text-gray-800 dark:text-gray-300" />, name: "Express.js" },
    { icon: <SiMongodb className="text-3xl text-green-500" />, name: "MongoDB" },
    { icon: <SiTailwindcss className="text-3xl text-teal-500" />, name: "Tailwind CSS" }
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            About <span className="text-amber-600 dark:text-amber-400">Bill Pie</span>
          </h1>
          <p className=" text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Your all-in-one solution for managing and paying monthly utility bills with ease, security, and efficiency.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left: Description */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
                <div className="w-3 h-10 bg-amber-500 rounded-full"></div>
                What is Bill Pie?
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-4">
                Bill Pie is a <span className="font-semibold text-amber-600 dark:text-amber-400">MERN Stack-based web application</span> designed to revolutionize how you handle monthly utility bills.
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                From Electricity and Gas to Water and Internet bills, we provide a secure, responsive, and user-friendly platform where all your bill-related tasks can be managed efficiently in one centralized location.
              </p>
            </div>

            {/* Tech Stack */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-all duration-300">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Built With Modern Technology</h3>
              <div className="flex flex-wrap gap-6">
                {techStack.map((tech, index) => (
                  <div key={index} className="flex flex-col items-center group">
                    <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      {tech.icon}
                    </div>
                    <span className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Features */}
          <div>
            <div className="bg-linear-to-br from-amber-400/20 to-amber-200/20 dark:from-amber-900/30 dark:to-amber-800/30 rounded-2xl shadow-xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Why Choose Bill Pie?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    <div className="text-amber-600 dark:text-amber-400 mb-4">
                      {feature.icon}
                    </div>
                    <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mission Statement */}
            <div className="bg-linear-to-r from-amber-500 to-amber-600 dark:from-amber-700 dark:to-amber-800 rounded-2xl shadow-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-lg">
                To simplify bill management through innovative technology, making utility payments 
                as easy as pie while ensuring maximum security and user satisfaction.
              </p>
            </div>
          </div>
        </div>

        {/* Developer Section */}
        <div className="bg-amber-50 dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-16 border border-amber-300 dark:border-gray-700">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Meet the Developer</h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto"></div>
          </div>
          
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
<div className="lg:w-1/3 text-center">
  <div className="relative inline-block">
    <div className="w-48 h-48 rounded-full bg-linear-to-r from-amber-400 to-amber-600 dark:from-amber-600 dark:to-amber-800 p-1">
      <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center overflow-hidden">
        <img 
          src={dev} 
          alt="Md Wasin Ahmed - Developer"
          className="w-full h-full object-cover rounded-full border-4 border-white dark:border-gray-800 transition-transform duration-300 hover:scale-105"
        />
      </div>
    </div>
    <div className="absolute -bottom-2 -right-2 bg-amber-500 dark:bg-amber-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
      MERN Stack
    </div>
  </div>
</div>
            
            <div className="lg:w-2/3">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Md Wasin Ahmed</h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Full Stack Web Developer specializing in MERN stack applications. Passionate about 
                creating user-friendly, efficient, and scalable web solutions that solve real-world problems.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-center gap-3 p-4 bg-amber-100 dark:bg-gray-700 rounded-lg">
                  <FaEnvelope className="text-amber-600 dark:text-amber-400 text-xl" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                    <a href="mailto:wasinahmed87@gmail.com" className="text-gray-800 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                      wasinahmed87@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-amber-100 dark:bg-gray-700 rounded-lg">
                  <FaGithub className="text-amber-600 dark:text-amber-400 text-xl" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">GitHub</p>
                    <a href="https://github.com/Wasin87" target="_blank" rel="noopener noreferrer" 
                       className="text-gray-800 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                       Md Wasin Ahmed
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-amber-100 dark:bg-gray-700 rounded-lg">
                  <FaLinkedin className="text-amber-600 dark:text-amber-400 text-xl" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">LinkedIn</p>
                    <a href="https://linkedin.com/in/md-wasin-ahmed" target="_blank" rel="noopener noreferrer"
                       className="text-gray-800 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                       Md Wasin Ahmed
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-amber-100 dark:bg-gray-700 rounded-lg">
                  <div className="text-xl font-bold text-amber-600 dark:text-amber-400">MERN</div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Specialization</p>
                    <p className="text-gray-800 dark:text-white">Web Developer</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <a href="https://github.com/Wasin87" target="_blank" rel="noopener noreferrer"
                   className="px-6 py-3 bg-gray-800 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-900 dark:hover:bg-gray-600 transition-colors flex items-center gap-2">
                  <FaGithub /> View GitHub
                </a>
                <a href="https://linkedin.com/in/md-wasin-ahmed" target="_blank" rel="noopener noreferrer"
                   className="px-6 py-3 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors flex items-center gap-2">
                  <FaLinkedin /> Connect on LinkedIn
                </a>
                <a href="mailto:wasinahmed87@gmail.com" 
                   className="px-6 py-3 bg-amber-600 dark:bg-amber-700 text-white rounded-lg hover:bg-amber-700 dark:hover:bg-amber-800 transition-colors flex items-center gap-2">
                  <FaEnvelope /> Contact Me
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-linear-to-r from-amber-400 to-amber-500 dark:from-amber-600 dark:to-amber-700 rounded-2xl shadow-xl p-12">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Simplify Your Bill Payments?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust Bill Pie for their utility management needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
 
              <Link to="/allBills" className="px-8 py-3 bg-white text-amber-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg">
                View Demo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;