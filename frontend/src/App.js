import React, { Component } from "react";
import "./App.css";
import { HashRouter, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import WritingPortfolio from "./components/WritingPortfolio";
import Blog from "./components/Blog";
import Skills from "./components/Skills";
import Newsletter from "./components/Newsletter";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { Toaster } from "./components/ui/toaster";
import Chatbot from "./components/Chatbot";
import { useEffect } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }
    return this.props.children;
  }
}

// Automatically handles deep linking to sections on initial page load and hash change
function HashScrollHandler() {
  const location = useLocation();

  useEffect(() => {
    const scrollToSection = () => {
      let hash = window.location.hash;
      let path = location.pathname.replace(/^\//, '');

      let targetId = hash.replace(/^#\/?/, '').replace(/^#/, '') || path;
      if (!targetId) return;

      let element = document.getElementById(targetId);
      if (!element && (targetId === 'work' || targetId === 'writing')) {
        element = document.getElementById('work') || document.getElementById('writing');
      }

      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    };

    scrollToSection();
    const timeout = setTimeout(scrollToSection, 300);
    return () => clearTimeout(timeout);
  }, [location]);

  return null;
}

function App() {
  return (
    <HashRouter>
      <HashScrollHandler />
      <div className="App bg-black text-white min-h-screen">
        <Header />
        <main>
          <Hero />
          <About />
          <Experience />
          <Skills />
          <WritingPortfolio />
          <Projects />
          <Blog />
          <Newsletter />
          <Contact />
        </main>
        <Footer />
        <Toaster />
        <ErrorBoundary fallback={null}>
          <Chatbot />
        </ErrorBoundary>
      </div>
    </HashRouter>
  );
}

export default App;
