import React from 'react';
import GlobalStyles from './styles/GlobalStyles';
import Header from './components/Header';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import ParticlesBackground from './components/ParticlesBackground';

function App() {
  return (
    <div className="App">
      <GlobalStyles />
      <ParticlesBackground />
      <div className="content">
        <Header />
        <main className="container">
          <About />
          <Projects />
          <Skills />
          <Contact />
        </main>
      </div>
    </div>
  );
}

export default App;
