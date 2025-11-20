import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { AscendLogo } from "@/branding";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Home = () => {
  const helloWorldApi = async () => {
    try {
      const response = await axios.get(`${API}/`);
      console.log(response.data.message);
    } catch (e) {
      console.error(e, `errored out requesting / api`);
    }
  };

  useEffect(() => {
    helloWorldApi();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-ascend-dark via-ascend-primary to-ascend-deep">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 px-8 py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <AscendLogo width={180} className="drop-shadow-lg" />
          <div className="flex gap-6">
            <button className="text-white/90 hover:text-white transition-colors font-medium">
              Features
            </button>
            <button className="text-white/90 hover:text-white transition-colors font-medium">
              Docs
            </button>
            <button className="px-6 py-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-lg transition-all border border-white/20 font-medium">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center px-8">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Title */}
          <h1 className="text-8xl font-bold text-white mb-6 tracking-tight">
            Ascend
          </h1>
          
          {/* Tagline */}
          <p className="text-3xl text-white/90 mb-8 font-light tracking-wide">
            Build Better Systems with Elegant Clarity
          </p>
          
          {/* Description */}
          <p className="text-xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed">
            Transform complexity into clarity. Ascend empowers teams to create, 
            visualize, and optimize system architectures with intuitive tools 
            designed for modern development.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-ascend-primary hover:bg-white/90 rounded-xl font-semibold text-lg transition-all shadow-xl hover:shadow-2xl hover:scale-105">
              Start Building
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-xl font-semibold text-lg transition-all border border-white/20">
              View Demo
            </button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-ascend-accent/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-ascend-primary/20 rounded-full blur-3xl"></div>
      </div>

      {/* Features Preview Section */}
      <div className="relative py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            Why Choose Ascend?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all">
              <div className="w-12 h-12 bg-ascend-accent/20 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-ascend-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Lightning Fast</h3>
              <p className="text-white/70 leading-relaxed">
                Build and deploy systems in minutes, not hours. Our optimized workflows 
                accelerate your development process.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all">
              <div className="w-12 h-12 bg-ascend-accent/20 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-ascend-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Enterprise Ready</h3>
              <p className="text-white/70 leading-relaxed">
                Built with security and scalability in mind. Trust Ascend for 
                mission-critical applications.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all">
              <div className="w-12 h-12 bg-ascend-accent/20 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-ascend-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Intuitive Design</h3>
              <p className="text-white/70 leading-relaxed">
                Clean, modern interface that makes complex systems simple to understand 
                and manage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
