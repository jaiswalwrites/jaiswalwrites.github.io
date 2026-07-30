import React, { Component } from "react";
import "./App.css";
import { HashRouter } from "react-router-dom";
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

function App() {
  return (
    <HashRouter>
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
