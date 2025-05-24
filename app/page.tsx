"use client"

import { type MouseEvent, useEffect, useState, useRef } from "react"
import { Github, Linkedin, Mail, Download, Moon, Sun, ExternalLink, ChevronRight } from "lucide-react"
import Image from "next/image"

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero")

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section")
      const scrollPosition = window.scrollY + 300

      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.offsetHeight
        const sectionId = section.getAttribute("id") || ""

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-gray-950 dark:to-gray-900 transition-colors duration-300">
      <div className="fixed inset-0 bg-[url('/grid.png')] bg-center opacity-5 pointer-events-none"></div>
      <Header activeSection={activeSection} />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

function Header({ activeSection }: { activeSection: string }) {
  const [darkMode, setDarkMode] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    // Check user preference
    if (typeof window !== "undefined") {
      setDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches)

      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
  }

  const navItems = ["About", "Skills", "Projects", "Contact"]

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "py-3 backdrop-blur-xl bg-white/70 dark:bg-gray-900/80 shadow-sm" : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a
          href="#hero"
          className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400 text-transparent bg-clip-text transition-all"
        >
          Abhinav<span className="font-light">.dev</span>
        </a>

        <nav className="hidden md:block">
          <ul className="flex space-x-10">
            {navItems.map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className={`text-sm font-medium transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300 ${
                    activeSection === item.toLowerCase()
                      ? "text-violet-600 dark:text-violet-400 after:w-full after:bg-violet-600 dark:after:bg-violet-400"
                      : "text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 after:bg-violet-600 dark:after:bg-violet-400"
                  }`}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center space-x-5">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <a
            href="/Abhinav_s_Resume (1).pdf"
            download
            className="hidden md:flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white px-4 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <Download size={16} />
            <span className="font-medium">Resume</span>
          </a>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span
                className={`block h-0.5 bg-gray-700 dark:bg-gray-300 transition-all duration-300 ${
                  mobileMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              ></span>
              <span
                className={`block h-0.5 bg-gray-700 dark:bg-gray-300 transition-all duration-300 ${
                  mobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <span
                className={`block h-0.5 bg-gray-700 dark:bg-gray-300 transition-all duration-300 ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              ></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-lg transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        } overflow-hidden`}
      >
        <nav className="container mx-auto px-4 py-4">
          <ul className="space-y-4">
            {navItems.map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className={`block py-2 text-base font-medium ${
                    activeSection === item.toLowerCase()
                      ? "text-violet-600 dark:text-violet-400"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/Abhinav_s_Resume (1).pdf"
                download
                className="flex items-center gap-2 text-violet-600 dark:text-violet-400 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Download size={16} />
                <span>Download Resume</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: MouseEvent) => {
    if (heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect()
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      })
    }
  }

  return (
    <section
      id="hero"
      ref={heroRef}
      className="min-h-screen flex items-center relative overflow-hidden pt-20"
      onMouseMove={handleMouseMove}
    >
      {/* Animated background gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-violet-50/50 via-indigo-50/50 to-slate-50/50 dark:from-violet-950/30 dark:via-indigo-950/30 dark:to-slate-950/30"
        style={{
          transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
          transition: "transform 0.2s ease-out",
        }}
      />

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-violet-400/10 dark:bg-violet-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-indigo-400/10 dark:bg-indigo-600/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 z-10 py-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-16">
          <div className="md:w-1/2 space-y-8">
            <div className="space-y-3">
              <p className="text-violet-600 dark:text-violet-400 font-medium tracking-wide animate-fadeIn">
                FULL-STACK DEVELOPER
              </p>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                Hi, I'm{" "}
                <span className="bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400 text-transparent bg-clip-text">
                  Abhinav Pareek
                </span>
              </h1>
              <h2 className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed">
                Building innovative software solutions with a focus on performance and scalability.
              </h2>
            </div>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Passionate about full-stack development, machine learning, and blockchain technologies. Currently pursuing
              Computer Science at Central University of Rajasthan.
            </p>

            <div className="flex flex-wrap gap-5">
              <a
                href="#contact"
                className="px-8 py-3 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group"
              >
                Get in Touch
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#projects"
                className="px-8 py-3 rounded-full border border-violet-200 dark:border-violet-800 text-gray-800 dark:text-gray-200 hover:bg-violet-50 dark:hover:bg-violet-900/30 font-medium transition-all duration-300"
              >
                View Projects
              </a>
            </div>

            <div className="flex mt-8 gap-5">
              <a
                href="https://github.com/abhinavpareek655"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                aria-label="GitHub"
              >
                <Github className="text-gray-700 dark:text-gray-300" size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/abhinavpareek1"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="text-gray-700 dark:text-gray-300" size={20} />
              </a>
              <a
                href="mailto:abhinavpareek655@gmail.com"
                className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                aria-label="Email"
              >
                <Mail className="text-gray-700 dark:text-gray-300" size={20} />
              </a>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              {/* Animated glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 opacity-75 blur-2xl animate-pulse"></div>

              {/* Profile image container */}
              <div className="relative w-full h-full rounded-full p-2 bg-gradient-to-r from-violet-500 to-indigo-500 rotate-3 shadow-xl">
                <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 rotate-0">
                  <Image
                    src="/pfp-enhanced.png"
                    alt="Abhinav Pareek"
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex items-center justify-center rotate-6">
                <div className="text-center">
                  <div className="text-violet-600 dark:text-violet-400 font-bold text-xl">2+</div>
                  <div className="text-gray-600 dark:text-gray-400 text-xs">Years Coding</div>
                </div>
              </div>

              <div className="absolute -top-4 -left-4 w-20 h-20 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex items-center justify-center -rotate-6">
                <div className="text-center">
                  <div className="text-indigo-600 dark:text-indigo-400 font-bold text-xl">400+</div>
                  <div className="text-gray-600 dark:text-gray-400 text-xs">Problems</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white to-transparent dark:from-gray-900 dark:to-transparent z-10"></div>

      {/* Decorative elements */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-indigo-100/50 dark:bg-indigo-900/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-violet-100/50 dark:bg-violet-900/20 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="text-center mb-16">
          <p className="text-violet-600 dark:text-violet-400 font-medium tracking-wide mb-3">DISCOVER MY STORY</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            About{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400 text-transparent bg-clip-text">
              Me
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white flex items-center">
              <span className="w-8 h-8 rounded-full bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center mr-3">
                <span className="w-4 h-4 rounded-full bg-violet-500 dark:bg-violet-400"></span>
              </span>
              Education
            </h3>

            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-xl font-medium bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400 text-transparent bg-clip-text">
                    Bachelor's in Technology
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">Computer Science and Engineering</p>
                </div>
                <div className="px-3 py-1 rounded-full bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 text-sm font-medium">
                  2022-2026
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-400 mt-2">Central University of Rajasthan</p>
              <div className="mt-4 flex items-center">
                <div className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-medium">
                  CGPA: 8.85
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                <h5 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Relevant Coursework:</h5>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Operating Systems",
                    "OOP in Java",
                    "Data Structures",
                    "Algorithms",
                    "DBMS",
                    "Computer Networks",
                    "Distributed Systems",
                    "Machine Learning",
                  ].map((course, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white flex items-center">
              <span className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center mr-3">
                <span className="w-4 h-4 rounded-full bg-indigo-500 dark:bg-indigo-400"></span>
              </span>
              Certifications & Achievements
            </h3>

            <div className="space-y-4">
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                <div className="flex justify-between">
                  <h4 className="text-lg font-medium text-gray-800 dark:text-white">
                    Wells Fargo Software Engineering
                  </h4>
                  <span className="text-sm text-gray-500 dark:text-gray-400">July 2024</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                  Implemented financial portfolio management system with ERD design and GitHub integration.
                </p>
              </div>

              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                <div className="flex justify-between">
                  <h4 className="text-lg font-medium text-gray-800 dark:text-white">YBI Foundation Internship</h4>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Aug-Sep 2024</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                  Data Science and AI/ML, Completed a machine learning-based project.
                </p>
              </div>
            </div>

            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Additional Achievements</h4>
              <div className="space-y-3">
                {[
                  { title: "GATE Qualified", subtitle: "Computer Science, 2025" },
                  { title: "2* Coder at Codechef", subtitle: "Current Rating: 1440" },
                  { title: "400+ Problems Solved", subtitle: "LeetCode and CodeChef" },
                  { title: "100 Days of DSA", subtitle: "Daily solutions on Instagram" },
                  { title: "Lead of University Coding Club", subtitle: "CURAJ Coding Club (CCC)" },
                ].map((achievement, i) => (
                  <div key={i} className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-indigo-500 dark:bg-indigo-400 mr-3"></div>
                    <div>
                      <span className="font-medium text-gray-800 dark:text-gray-200">{achievement.title}</span>
                      <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">{achievement.subtitle}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SkillsSection() {
  const skillCategories = [
    {
      title: "Languages",
      icon: "💻",
      skills: ["Java", "Python", "C", "SQL", "JavaScript", "HTML/CSS", "Solidity"],
    },
    {
      title: "Frameworks",
      icon: "🔧",
      skills: ["React", "React Native", "Node.js", "Ethereum"],
    },
    {
      title: "Databases",
      icon: "🗄️",
      skills: ["MongoDB"],
    },
    {
      title: "Developer Tools",
      icon: "🛠️",
      skills: ["Git", "VS Code", "PyCharm", "IntelliJ IDEA"],
    },
    {
      title: "Libraries",
      icon: "📚",
      skills: ["pandas", "NumPy", "Matplotlib", "scikit-learn"],
    },
    {
      title: "Environments",
      icon: "🖥️",
      skills: ["Unix/Linux", "Windows"],
    },
    {
      title: "Project Management",
      icon: "📊",
      skills: ["PERT", "CPM", "Jira"],
    },
  ]

  return (
    <section
      id="skills"
      className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 relative"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[url('/grid.png')] bg-center opacity-5 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <p className="text-violet-600 dark:text-violet-400 font-medium tracking-wide mb-3">EXPERTISE</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            My{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400 text-transparent bg-clip-text">
              Skills
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group hover:-translate-y-1"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-xl bg-violet-50 dark:bg-violet-900/30 flex items-center justify-center mr-4 text-2xl">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{category.title}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-4 py-2 bg-gray-50 dark:bg-gray-700/70 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-violet-50 dark:hover:bg-violet-900/30 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectsSection() {
  const projects = [
    {
      title: "Blip – Decentralized Social Media",
      description:
        "Blockchain-powered social media app with decentralized authentication and content storage using IPFS for censorship-resistant experience.",
      tags: ["React Native", "Ethereum", "Solidity", "IPFS", "Blockchain"],
      links: [
        { label: "Frontend", url: "https://github.com/abhinavpareek655/blip-expo" },
        { label: "Backend", url: "https://github.com/abhinavpareek655/blip-backend" },
      ],
      color: "from-violet-500 to-indigo-500",
    },
    {
      title: "Quit-Tobacco – Support App",
      description:
        "Mobile app to assist users in quitting tobacco with progress tracking, real-time notifications, and location-based preventive alerts.",
      tags: ["React Native", "Node.js", "Express.js", "MongoDB", "Location Services"],
      links: [
        { label: "Frontend", url: "https://github.com/abhinavpareek655/quit-tobacco" },
        { label: "Backend", url: "https://github.com/abhinavpareek655/quit-tobacco-backend" },
      ],
      color: "from-indigo-500 to-blue-500",
    },
    {
      title: "RecycleBuddy – Waste Recycling App",
      description:
        "App providing recycling information by analyzing waste photos using AI (CNN/ResNet) and connecting users with recycling vendors.",
      tags: ["React Native", "Node.js", "Express.js", "MongoDB", "CNN", "ResNet"],
      links: [{ label: "GitHub", url: "https://github.com/abhinavpareek655/ecosort" }],
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "CURAJ EBS – Equipment Booking System",
      description:
        "Website for organizing research equipment booking and assignment schedules for university scholars and faculty.",
      tags: ["React", "Tailwind CSS", "Node.js", "Express.js", "MongoDB"],
      links: [{ label: "Website", url: "https://equipment-booking-nu.vercel.app/" }],
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Delhi Power Demand Prediction",
      description:
        "Deep learning model for accurate power demand prediction using historical data collected through web scraping techniques.",
      tags: ["Python", "Deep Learning", "Web Scraping", "Data Preprocessing"],
      links: [{ label: "GitHub", url: "https://github.com/abhinavpareek655/HousingPricePrediction" }],
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "Convo2025 – QR-Based Entry System",
      description:
        "Mobile app for college convocation entry verification with secure QR code scanning to validate student ID cards.",
      tags: ["React Native", "Node.js", "Express.js", "MongoDB", "AWS", "Jira"],
      links: [{ label: "GitHub", url: "https://github.com/abhinavpareek655/convo2025" }],
      color: "from-purple-500 to-violet-500",
    },
    {
      title: "Internet Relay Chat Service– IRC",
      description:
        "Allows users to chat with each other (both publicly and in private channels) in real-time within a virtual chatroom environment",
      tags: ["C language", "Operating System", "Multi threading", "Core Subject"],
      links: [{ label: "GitHub", url: "https://github.com/abhinavpareek655/IRC" }],
      color: "from-purple-500 to-violet-500",
    },
  ]

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-violet-100/50 dark:bg-violet-900/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-indigo-100/50 dark:bg-indigo-900/20 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <p className="text-violet-600 dark:text-violet-400 font-medium tracking-wide mb-3">PORTFOLIO</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Featured{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400 text-transparent bg-clip-text">
              Projects
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
            >
              {/* Gradient border effect */}
              <div
                className="absolute inset-0 rounded-2xl p-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                style={{
                  background: `linear-gradient(to right, ${project.color.split(" ")[1]}, ${project.color.split(" ")[3]})`,
                }}
              ></div>

              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3
                    className="text-xl font-semibold text-gray-800 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r transition-all duration-300"
                    style={{
                      backgroundImage: `linear-gradient(to right, ${project.color.split(" ")[1]}, ${project.color.split(" ")[3]})`,
                    }}
                  >
                    {project.title}
                  </h3>

                  {/* Project number */}
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-sm font-medium">
                    {index + 1}
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.slice(0, 4).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="px-3 py-1 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-medium">
                      +{project.tags.length - 4} more
                    </span>
                  )}
                </div>

                <div className="flex gap-4">
                  {project.links.map((link, linkIndex) => (
                    <a
                      key={linkIndex}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors text-sm font-medium"
                    >
                      <ExternalLink size={14} />
                      <span>{link.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [sending, setSending] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      })
      if (!res.ok) throw new Error()

      // Show success message
      setShowSuccess(true)
      setName("")
      setEmail("")
      setSubject("")
      setMessage("")

      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000)
    } catch {
      // Show error message
      setShowError(true)
      setTimeout(() => setShowError(false), 5000)
    } finally {
      setSending(false)
    }
  }

  return (
    <section
      id="contact"
      className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 relative"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[url('/grid.png')] bg-center opacity-5 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <p className="text-violet-600 dark:text-violet-400 font-medium tracking-wide mb-3">CONTACT</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Get In{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400 text-transparent bg-clip-text">
              Touch
            </span>
          </h2>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-2 space-y-8">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Contact Information</h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400">
                      <Mail size={20} />
                    </div>
                    <div>
                      <h4 className="text-base font-medium text-gray-800 dark:text-white">Email</h4>
                      <a
                        href="mailto:abhinavpareek655@gmail.com"
                        className="text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors text-sm"
                      >
                        abhinavpareek655@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400">
                      <Linkedin size={20} />
                    </div>
                    <div>
                      <h4 className="text-base font-medium text-gray-800 dark:text-white">LinkedIn</h4>
                      <a
                        href="https://www.linkedin.com/in/abhinavpareek1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors text-sm"
                      >
                        linkedin.com/in/abhinavpareek1
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400">
                      <Github size={20} />
                    </div>
                    <div>
                      <h4 className="text-base font-medium text-gray-800 dark:text-white">GitHub</h4>
                      <a
                        href="https://github.com/abhinavpareek655"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors text-sm"
                      >
                        github.com/abhinavpareek655
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-8 rounded-2xl shadow-lg text-white">
                <h3 className="text-xl font-semibold mb-4">Let's build something amazing together</h3>
                <p className="text-violet-100 mb-6">
                  I'm currently available for freelance work and open to new opportunities.
                </p>
                <a
                  href="/Abhinav_s_Resume (1).pdf"
                  download
                  className="inline-flex items-center gap-2 bg-white text-violet-600 px-5 py-2.5 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  <Download size={16} />
                  <span>Download Resume</span>
                </a>
              </div>
            </div>

            <div className="md:col-span-3">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Send Me a Message</h3>

                  <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Your name"
                        required
                        className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white text-gray-900"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Your email"
                        required
                        className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white text-gray-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      value={subject}
                      onChange={e => setSubject(e.target.value)}
                      placeholder="Subject"
                      required
                      className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white text-gray-900"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder="Your message"
                      required
                      className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white text-gray-900"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className={`w-full py-3 rounded-lg font-medium transition-all duration-300 ${
                      sending
                        ? "bg-gray-400 cursor-not-allowed text-white"
                        : "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl"
                    }`}
                  >
                    {sending ? "Sending…" : "Send Message"}
                  </button>
                </form>

                {/* Success notification */}
                {showSuccess && (
                  <div className="fixed top-4 right-4 z-50 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-fadeIn backdrop-blur-lg">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold">Message sent successfully!</p>
                      <p className="text-sm text-green-100">Thank you for reaching out. I'll get back to you soon.</p>
                    </div>
                    <button
                      onClick={() => setShowSuccess(false)}
                      className="ml-4 text-white/80 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                )}
          
                {/* Error notification */}
                {showError && (
                  <div className="fixed top-4 right-4 z-50 bg-gradient-to-r from-red-500 to-rose-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-fadeIn backdrop-blur-lg">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold">Failed to send message</p>
                      <p className="text-sm text-red-100">Please try again or contact me directly via email.</p>
                    </div>
                    <button
                      onClick={() => setShowError(false)}
                      className="ml-4 text-white/80 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                )}
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-8 border-t border-gray-200 dark:border-gray-800 relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} Abhinav Pareek. All rights reserved.
            </p>
          </div>

          <div className="flex gap-6">
            <a
              href="https://github.com/abhinavpareek655"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/abhinavpareek1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="mailto:abhinavpareek655@gmail.com"
              className="text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
