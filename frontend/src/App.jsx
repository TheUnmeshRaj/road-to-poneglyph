import { useState, useRef, useEffect } from 'react'
import SparkleButton from './components/SparkleButton';

import lightBackground from './assets/OnePieceMap.png'
import './App.css'
import RVCELogo from './assets/RVCE_Logo.png';
import CCLogo from './assets/CClogo.png';
import thwsLogo from './assets/thws_logo.png';
import luffy from './assets/luffy.png';

const translations = {
  en: {
    title: "Road to Poneglyph",
    subtitle: "Hack your way to Laugh Tale!",
    sailButton: "Sail to the Voyage!",
    whyJoin: "Why Join the Voyage?",
    eventOverview: "Event Overview",
    eventOverviewText: "Road to Poneglyph is a gamified CTF and problem-solving event with a One Piece theme. Solve challenges, decipher Poneglyphs, and unlock clues to the final text!",
    whatExpect: "What You Can Expect",
    whatExpectText: "You will face technical challenges in web security, AI/ML, data science, and more. Earn bounties for each problem solved, discover One Piece-themed clues to the final Poneglyph, receive custom participation certificates, and enjoy recognition, learning, and networking opportunities.",
    perks: "Perks for Participants",
    perksText: "All participants will receive a One Piece-themed certificate, have a chance to be shortlisted for finals based on performance, gain peer engagement and recognition, and experience a blend of fun and technical learning.",
    crewInfo: "Crew Info",
    crewStructure: "Crew Structure",
    crewStructureText: "per crew",
    soloNotAllowed: "Solo pirates not allowed",
    openTo: "Open To",
    openToText: "students",
    deadline: "Deadline to Register",
    deadlineText: "Not Required for Demo Event",
    enjoy: "Enjoy!",
    schedule: "Voyage Schedule",
    trialVoyage: "Trial Voyage (Online)",
    trialDate: "Oct 28th, 6:45 PM IST / 3:15 PM CEST",
    finalVoyage: "Final Voyage (Online)",
    finalDate: "Last Week of November",
    facultyAdvisors: "Faculty Advisors",
    advisor1Role: "Associate Professor & Associate Dean-PG Studies, ISE\nFaculty Advisor for the Coding Club",
    advisor2Role: "Dean Student Affairs\nFaculty Advisor for the Coding Club",
    advisor3Role: "Professor at the University of Applied Sciences Würzburg-Schweinfurt",
    advisor4Role: "Professor, \nDepartment of Computer Sciecne and Engineering",
    ctfRules: "CTF Rules & Guide",
    howToPlay: "🧭 How to Play",
    rule1: "Form your crew (max 3 members).",
    rule2: "Register not required for",
    rule2b: "demo event",
    rule3: "Challenges test your logic, speed, and teamwork.",
    rule4: "Each solved challenge reveals the next island (stage).",
    rule5: "Hints cost bounty points — use wisely.",
    rule6: "Top crews unlock the",
    rule6b: "final treasure challenge",
    tagline: "Follow the map, find the flag, claim the treasure.",
    footerTitle: "Ready to find the One Piece?",
    footerText: "Join Road to Poneglyph and code your way to victory!",
    upTo: "Up to",
    members: "members",
    all: "All",
    and: "&"
  },
  de: {
    title: "Straße nach Poneglyph",
    subtitle: "Hacke deinen Weg nach Laugh Tale!",
    sailButton: "Zur Reise aufbrechen!",
    whyJoin: "Warum mitmachen?",
    eventOverview: "Veranstaltungsübersicht",
    eventOverviewText: "Road to Poneglyph ist ein gamifiziertes CTF- und Problemlösungs-Event mit einem One Piece-Thema. Löse Herausforderungen, entziffere Poneglyphen und entdecke Hinweise auf den finalen Text!",
    whatExpect: "Was Sie erwartet",
    whatExpectText: "Sie werden sich technischen Herausforderungen in den Bereichen Websicherheit, KI/ML, Data Science und mehr stellen. Verdienen Sie Belohnungen für jedes gelöste Problem, entdecken Sie One Piece-thematische Hinweise auf das finale Poneglyph, erhalten Sie individuelle Teilnahmezertifikate und genießen Sie Anerkennung, Lernen und Networking-Möglichkeiten.",
    perks: "Vorteile für Teilnehmer",
    perksText: "Alle Teilnehmer erhalten ein One Piece-Zertifikat, haben die Chance, basierend auf ihrer Leistung für das Finale ausgewählt zu werden, erhalten Peer-Engagement und Anerkennung und erleben eine Mischung aus Spaß und technischem Lernen.",
    crewInfo: "Crew-Info",
    crewStructure: "Crew-Struktur",
    crewStructureText: "pro Crew",
    soloNotAllowed: "Einzelpiraten nicht erlaubt",
    openTo: "Offen für",
    openToText: "Studenten",
    deadline: "Anmeldefrist",
    deadlineText: "Nicht erforderlich für Demo-Event",
    enjoy: "Viel Spaß!",
    schedule: "Reiseplan",
    trialVoyage: "Probefahrt (Online)",
    trialDate: "28. Okt, 18:45 Uhr IST / 15:15 Uhr MESZ",
    finalVoyage: "Finale Reise (Online)",
    finalDate: "Letzte Novemberwoche",
    facultyAdvisors: "Fakultätsberater",
    advisor1Role: "Außerordentlicher Professor & Associate Dean-PG Studies, ISE\nFakultätsberater für den Coding Club",
    advisor2Role: "Dekan Studentenangelegenheiten\nFakultätsberater für den Coding Club",
    advisor3Role: "Professor bei Hochschule für angewandte Wissenschaften Würzburg-Schweinfurt",
    advisor4Role: "Professor, \nFakultät für Informatik und Ingenieurwesen",
    ctfRules: "CTF-Regeln & Leitfaden",
    howToPlay: "🧭 Wie man spielt",
    rule1: "Bilden Sie Ihre Crew (max. 3 Mitglieder).",
    rule2: "Registrierung nicht erforderlich für",
    rule2b: "Demo-Event",
    rule3: "Herausforderungen testen Ihre Logik, Geschwindigkeit und Teamarbeit.",
    rule4: "Jede gelöste Herausforderung enthüllt die nächste Insel (Stufe).",
    rule5: "Hinweise kosten Kopfgeldpunkte — weise verwenden.",
    rule6: "Top-Crews schalten die",
    rule6b: "finale Schatzherausforderung",
    tagline: "Folge der Karte, finde die Flagge, beanspruche den Schatz.",
    footerTitle: "Bereit, das One Piece zu finden?",
    footerText: "Mach mit bei Road to Poneglyph und code deinen Weg zum Sieg!",
    upTo: "Bis zu",
    members: "Mitglieder",
    all: "Alle",
    and: "und"
  }
};

function ParticleBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: null, y: null, active: false });
  const particlesRef = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    const isMobile = window.innerWidth < 768;

    const config = {
      particleCount: isMobile ? 35 : 90,          
      maxSize: isMobile ? 2.2 : 2.6,
      minSize: 0.6,
      maxSpeed: isMobile ? 0.8 : 1.1,
      connectionDistance: isMobile ? 90 : 140,    
      mouseRadius: isMobile ? 120 : 200,
      particleColor: "#F8B301",
      lineColor: 'rgba(248, 179, 1, 0.17)',
      dotColor: 'rgba(248, 179, 1, 0.33)',
      maxCursorConnections: isMobile ? 3 : 5,
      connectStyle: "lines"   
    };

    class Particle {
      constructor(x, y, specialColor = '') {
        this.x = x ?? Math.random() * width;
        this.y = y ?? Math.random() * height;
        this.size = Math.random() * (config.maxSize - config.minSize) + config.minSize;
        this.speedX = (Math.random() - 0.5) * config.maxSpeed * 2;
        this.speedY = (Math.random() - 0.5) * config.maxSpeed * 2;
        this.specialColor = specialColor;
        this.opacity = specialColor ? 1 : undefined;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.specialColor) {
          this.opacity *= 0.9923;
          if (this.opacity < 0.001) this.opacity = 0;
        }
        if (!this.specialColor) {
          if (this.x > width) this.x = 0;
          if (this.x < 0) this.x = width;
          if (this.y > height) this.y = 0;
          if (this.y < 0) this.y = height;
        }
      }
      draw() {
        ctx.save();
        if (this.specialColor) ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.specialColor || config.particleColor;
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    function addBurst(x, y) {
      for (let i = 0; i < 16; i++) {
        let ang = (Math.PI * 2) / 16 * i;
        let spd = 5 + Math.random() * 3;
        let hue = (i * 22) % 360;
        let p = new Particle(x, y, `hsl(${hue}, 78%, 65%)`);
        p.speedX = Math.cos(ang) * spd;
        p.speedY = Math.sin(ang) * spd;
        p.size = 3.2;
        p.opacity = 1;
        particlesRef.current.push(p);
      }
    }

    function initParticles() {
      particlesRef.current = [];
      for (let i = 0; i < config.particleCount; i++) {
        particlesRef.current.push(new Particle());
      }
    }

    function connectParticles() {
      const particles = particlesRef.current;
      const distLimitSq = config.connectionDistance * config.connectionDistance;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const d2 = dx * dx + dy * dy;
          if (d2 < distLimitSq) {
            if (config.connectStyle === "lines") {
              ctx.strokeStyle = config.lineColor;
              ctx.lineWidth = 1.6 - d2 / distLimitSq;
              ctx.beginPath();
              ctx.moveTo(particles[a].x, particles[a].y);
              ctx.lineTo(particles[b].x, particles[b].y);
              ctx.stroke();
            }
          }
        }
      }
    }

    function connectToMouse() {
      const mouse = mouseRef.current;
      if (!mouse.active || mouse.x === null || mouse.y === null) return;

      const particles = particlesRef.current;
      const distances = particles.map((p, i) => {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        return { particle: p, idx: i, distSq: dx * dx + dy * dy };
      });
      distances.sort((a, b) => a.distSq - b.distSq);
      const legs = Math.min(config.maxCursorConnections, 8);
      const closest = distances.slice(0, legs);

      closest.forEach((item) => {
        const p = item.particle;
        ctx.save();
        ctx.strokeStyle = "#F8B301";
        ctx.lineWidth = 0.3;
        ctx.shadowColor = "#000";
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.moveTo(mouse.x, mouse.y);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
        ctx.restore();

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        p.x += dx * 0.01;
        p.y += dy * 0.01;
      });
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].specialColor && particles[i].opacity <= 0.03) {
          particles.splice(i, 1);
        }
      }
      connectParticles();
      connectToMouse();
      animationRef.current = requestAnimationFrame(animate);
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;

      const mobileNow = window.innerWidth < 768;
      config.particleCount = mobileNow ? 35 : 90;
      config.connectionDistance = mobileNow ? 90 : 140;
      config.mouseRadius = mobileNow ? 120 : 200;

      initParticles(); 
    };

    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      addBurst(e.clientX - rect.left, e.clientY - rect.top);
    };

    const handleTouchStart = (e) => {
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      addBurst(touch.clientX - rect.left, touch.clientY - rect.top);
    };
    
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseOut = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('click', handleClick);
    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseout', handleMouseOut);

    initParticles();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('click', handleClick);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseout', handleMouseOut);

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[5]"
      style={{ mixBlendMode: 'screen', pointerEvents: 'auto' }}
    />
  );
}

function FadeInSection({ children }) {
  const domRef = useRef();
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver((entries) => {
      entries.forEach(entry => setVisible(entry.isIntersecting));
    });
    if (domRef.current) {
      observer.observe(domRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={domRef} className={`fade-in-section${isVisible ? ' is-visible' : ''}`}>
      {children}
    </div>
  );
}

function LanguageToggle({ language, setLanguage }) {
  return (
    <div className="fixed top-6 right-6 z-50">
      <button
        onClick={() => setLanguage(language === 'en' ? 'de' : 'en')}
        className="flex items-center gap-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-full shadow-lg transition duration-300 transform hover:scale-105"
      >
        <span>{language === 'en' ? 'DE' : 'EN'}</span>
      </button>
    </div>
  );
}

// Landing Page Component
const LandingPage = () => {
  const [language, setLanguage] = useState('en');
  const t = translations[language];

  const openRegistrationForm = () => {
    window.location.href ="https://rvctf.codingclubrvce.com/";
  };

  return (
    <div 
      className="min-h-screen w-full relative"
      style={{
        backgroundImage: `url(${lightBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center bottom',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <ParticleBackground />
      <LanguageToggle language={language} setLanguage={setLanguage} />

      <div className="absolute inset-0 bg-black bg-opacity-20 pointer-events-none z-[1]"></div>

      <FadeInSection>
        <section className="relative flex flex-col items-center justify-center h-[60vh] sm:h-screen">
          <div className="flex flex-row items-center justify-center gap-6 mb-6">
            <img src={RVCELogo} alt="RVCE Logo" className="logo-img" />
            <img src={CCLogo} alt="CC Logo" className="logo-img" />
            <img src={thwsLogo} alt="THWS Logo" className="logo-img" />
          </div>
          <div className="absolute inset-0 "></div>
          <div className="text-center z-10 px-2 sm:px-4">
            <h1 className="onepiece-title shine text-4xl xs:text-5xl sm:text-6xl md:text-9xl font-extrabold">
              {t.title}
            </h1>
            <p className="mt-2 sm:mt-4 text-lg xs:text-xl sm:text-2xl md:text-3xl text-white font-semibold drop-shadow-lg hero-subtitle" style={{ fontFamily: 'Nunito, Arial, Helvetica, sans-serif' }}>
              {t.subtitle}
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <SparkleButton
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold text-lg sm:text-xl rounded-full shadow-2xl transition duration-300 transform hover:scale-105"
                onClick={openRegistrationForm}
              >
                {t.sailButton}
              </SparkleButton>
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection>
        <section className="mx-auto px-2 sm:px-6 py-10 sm:py-16 max-w-7xl why-participate-section">
          <h2 className="text-4xl sm:text-5xl font-bold mb-10 text-center text-yellow-300 tracking-tight" style={{ fontFamily: 'Special Gothic Expanded One, Nunito, Arial, Helvetica, sans-serif', fontWeight: 800, display: 'block', margin: '0 auto' }}>
            {t.whyJoin}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 border-dashed flex flex-col transition duration-300 hover:scale-105" style={{ fontFamily: 'Nunito, Arial, Helvetica, sans-serif' }}>
              <h3 className="text-2xl font-bold mb-3 text-yellow-300" style={{ fontFamily: 'Special Gothic Expanded One, Nunito, Arial, Helvetica, sans-serif' }}>{t.eventOverview}</h3>
              <p className="text-white text-lg">{t.eventOverviewText}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 border-dashed flex flex-col transition duration-300 hover:scale-105" style={{ fontFamily: 'Nunito, Arial, Helvetica, sans-serif' }}>
              <h3 className="text-2xl font-bold mb-3 text-yellow-300" style={{ fontFamily: 'Special Gothic Expanded One, Nunito, Arial, Helvetica, sans-serif' }}>{t.whatExpect}</h3>
              <p className="text-white text-lg">{t.whatExpectText}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 border-dashed flex flex-col transition duration-300 hover:scale-105" style={{ fontFamily: 'Nunito, Arial, Helvetica, sans-serif' }}>
              <h3 className="text-2xl font-bold mb-3 text-yellow-300" style={{ fontFamily: 'Special Gothic Expanded One, Nunito, Arial, Helvetica, sans-serif' }}>{t.perks}</h3>
              <p className="text-white text-lg">{t.perksText}</p>
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection>
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#1a1a1a]/70 via-[#2a2a2a]/60 to-transparent p-10 shadow-[0_0_40px_rgba(255,215,0,0.15)] backdrop-blur-md">
            <h2
              className="mb-14 text-center text-5xl font-extrabold tracking-wide text-yellow-300"
              style={{ fontFamily: 'Special Gothic Expanded One, Nunito, sans-serif' }}
            >
              {t.crewInfo}
            </h2>

            <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
              <div className="group rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-8 text-center shadow-xl transition duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(255,215,0,0.2)]">
                <div className="mb-5 text-6xl group-hover:animate-pulse">👥</div>
                <h3 className="mb-4 text-2xl font-bold text-white">{t.crewStructure}</h3>
                <p className="text-lg text-gray-200">
                  {t.upTo} <span className="text-yellow-300 font-semibold">3 {t.members}</span> {t.crewStructureText}
                  <br />
                  <span className="text-red-300/80 italic">{t.soloNotAllowed}</span>
                </p>
              </div>

              <div className="group rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-8 text-center shadow-xl transition duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(255,215,0,0.2)]">
                <div className="mb-5 text-6xl group-hover:animate-bounce">🎓</div>
                <h3 className="mb-4 text-2xl font-bold text-white">{t.openTo}</h3>
                <p className="text-lg text-gray-200">
                  {t.all} <span className="text-yellow-300 font-semibold">1st {t.and} 2nd-year</span> {t.openToText}
                  <br />
                  <span className="px-3 py-1 mt-2 inline-block rounded-full bg-yellow-300/20 text-yellow-200 text-sm font-semibold border border-yellow-300/40">
                    RVCE & THWS
                  </span>
                </p>
              </div>

              <div className="group rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-8 text-center shadow-xl transition duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(255,215,0,0.2)]">
                <div className="mb-5 text-6xl group-hover:rotate-6 transition-transform duration-300">🗓️</div>
                <h3 className="mb-4 text-2xl font-bold text-white">{t.deadline}</h3>
                <p className="text-lg text-gray-200">
                  <span className="block text-yellow-300 font-semibold text-xl">{t.deadlineText}</span>
                  <span className="mt-2 inline-block rounded-full bg-green-500/20 px-3 py-1 text-sm text-green-300 border border-green-400/30">
                    {t.enjoy}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection>
        <section className="mx-auto px-2 sm:px-6 py-10 sm:py-16 max-w-2xl schedule-section">
          <div className="bg-gradient-to-br from-white/5 via-white/10 to-white/0 rounded-3xl shadow-2xl p-4 sm:p-8 border border-white/10 backdrop-blur">
            <h2 className="card-title text-4xl sm:text-5xl font-bold mb-10 text-yellow-300 drop-shadow-lg tracking-tight text-center" style={{ fontFamily: 'Special Gothic Expanded One, Nunito, Arial, Helvetica, sans-serif', fontWeight: 800 }}>
              {t.schedule}
            </h2>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4 bg-white/5 rounded-2xl shadow-xl p-6 border border-white/10 backdrop-blur transition hover:scale-[1.03]" style={{ fontFamily: 'Nunito, Arial, Helvetica, sans-serif', backdropFilter: 'blur(2px)' }}>
                <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-full bg-yellow-400 text-gray-900 text-4xl shadow-lg">
                  📅
                </div>
                <div className="flex-1">
                  <h3 className="card-title text-xl sm:text-2xl font-bold text-white leading-tight mb-1" style={{ fontFamily: 'Nunito, Arial, Helvetica, sans-serif', fontWeight: 700 }}>{t.trialVoyage}</h3>
                  <p className="card-body text-base sm:text-lg text-gray-50" style={{ fontFamily: 'Nunito, Arial, Helvetica, sans-serif' }}>{t.trialDate}</p>
                </div>
              </div>
                                   <div className="flex items-center gap-4 bg-white/5 rounded-2xl shadow-xl p-6 border border-white/10 backdrop-blur transition hover:scale-[1.03]" style={{ fontFamily: 'Nunito, Arial, Helvetica, sans-serif', backdropFilter: 'blur(2px)' }}>
                        <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-full bg-blue-500 text-white text-4xl shadow-lg">
                           📍
                        </div>
                        <div className="flex-1">
                           <h3 className="card-title text-xl sm:text-2xl font-bold text-white leading-tight mb-1" style={{ fontFamily: 'Nunito, Arial, Helvetica, sans-serif', fontWeight: 700 }}>{t.finalVoyage}</h3>
                           <p className="card-body text-base sm:text-lg text-gray-50" style={{ fontFamily: 'Nunito, Arial, Helvetica, sans-serif' }}>{t.finalDate}</p>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
         </FadeInSection>
         _
         <FadeInSection>
            {/* Faculty Advisory Section */}
            <section className='flex flex-col items-center justify-center min-h-[40vh] p-4 sm:p-8'>
               <h2 className="text-4xl md:text-5xl font-bold mb-12 text-yellow-300 drop-shadow-lg text-center" style={{ fontFamily: 'Special Gothic Expanded One, Nunito, Arial, Helvetica, sans-serif' }}>
                  {t.facultyAdvisors}
               </h2>
               <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl px-4'>
                  {/* Faculty Advisor 1 */}
                  <div className="team-card bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-dashed hover:scale-105 transition duration-300" style={{ fontFamily: 'Nunito, Arial, Helvetica, sans-serif' }}>
                     <h3 className='team-card-title text-yellow-300 text-center mb-1.5' style={{ fontFamily: 'Special Gothic Expanded One, Nunito, Arial, Helvetica, sans-serif', fontWeight: 800, fontSize: '1.5rem' }}>
                        Dr. Padmashree T
                     </h3>
                     <p className='team-card-role text-white text-center text-sm mb-2' style={{ fontFamily: 'Nunito, Arial, Helvetica, sans-serif', fontWeight: 600 }}>
                        {t.advisor1Role}
                     </p>
                  </div>
                  {/* Faculty Advisor 2 */}
                  <div className="team-card bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-dashed hover:scale-105 transition duration-300" style={{ fontFamily: 'Nunito, Arial, Helvetica, sans-serif' }}>
                     <h3 className='team-card-title text-yellow-300 text-center mb-1.5' style={{ fontFamily: 'Special Gothic Expanded One, Nunito, Arial, Helvetica, sans-serif', fontWeight: 800, fontSize: '1.5rem' }}>
                        Dr. Sagar BM
                     </h3>
                     <p className='team-card-role text-white text-center text-sm mb-2' style={{ fontFamily: 'Nunito, Arial, Helvetica, sans-serif', fontWeight: 600 }}>
                        {t.advisor2Role}
                     </p>
                  </div>
                  {/* Faculty Advisor 3 */}
                  <div className="team-card bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-dashed hover:scale-105 transition duration-300" style={{ fontFamily: 'Nunito, Arial, Helvetica, sans-serif' }}>
                     <h3 className='team-card-title text-yellow-300 text-center mb-1.5' style={{ fontFamily: 'Special Gothic Expanded One, Nunito, Arial, Helvetica, sans-serif', fontWeight: 800, fontSize: '1.5rem' }}>
                        Prof. Sebastian Biedermann
                     </h3>
                     <p className='team-card-role text-white text-center text-sm mb-2' style={{ fontFamily: 'Nunito, Arial, Helvetica, sans-serif', fontWeight: 600 }}>
                        {t.advisor3Role}
                     </p>
                  </div>{/* Faculty Advisor 4 */}
                  <div className="team-card bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-dashed hover:scale-105 transition duration-300" style={{ fontFamily: 'Nunito, Arial, Helvetica, sans-serif' }}>
                     <h3 className='team-card-title text-yellow-300 text-center mb-1.5' style={{ fontFamily: 'Special Gothic Expanded One, Nunito, Arial, Helvetica, sans-serif', fontWeight: 800, fontSize: '1.5rem' }}>
                        Dr. Minal Moharir
                     </h3>
                     <p className='team-card-role text-white text-center text-sm mb-2' style={{ fontFamily: 'Nunito, Arial, Helvetica, sans-serif', fontWeight: 600 }}>
                        {t.advisor4Role}
                     </p>
                  </div>
               </div>
            </section>
         </FadeInSection>
         <FadeInSection>
  <section className="mx-auto max-w-6xl px-6 py-20 relative z-10">
    <div className="relative rounded-[2rem] border-4 border-yellow-400/40 bg-gradient-to-br from-[#2a1b00]/90 via-[#1b1200]/80 to-[#000000]/90 p-10 shadow-[0_0_50px_rgba(255,215,0,0.25)] backdrop-blur-md overflow-hidden">
      
      {/* 🔥 Decorative border & texture — now click-safe */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        <div className="absolute inset-0 border-[6px] border-[rgba(255,215,0,0.25)] rounded-[2rem] [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[url('/images/old-map-texture.png')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
      </div>

      <h2
        className="relative z-[2] mb-14 text-center text-5xl font-extrabold text-yellow-300 tracking-wide"
        style={{ fontFamily: 'Special Gothic Expanded One, Nunito, sans-serif' }}
      >
        {t.ctfRules}
      </h2>

      <div className="relative z-[2] grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="relative aspect-video overflow-hidden rounded-2xl border border-yellow-300/30 shadow-lg hover:shadow-[0_0_30px_rgba(255,215,0,0.25)] transition duration-300">
          <iframe
            className="absolute inset-0 w-full h-full rounded-2xl"
            src="https://www.youtube.com/embed/{}"
            title="CTF Event Guide"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ pointerEvents: 'auto', zIndex: 5 }}
          ></iframe>
        </div>

        {/* 📜 Rules */}
        <div className="bg-white/5 rounded-2xl border border-white/10 p-8 text-gray-100 shadow-xl">
          <h3 className="mb-5 text-3xl font-bold text-yellow-300 drop-shadow-md">
            🧭 How to Play
          </h3>
          <ul className="list-disc pl-6 space-y-3 text-lg text-gray-200">
            <li>{t.rule1}</li>
            <li>{t.rule2} <span className="text-yellow-300 font-semibold">{t.rule2b}</span>.</li>
            <li>{t.rule3}</li>
            <li>{t.rule4}</li>
            <li>{t.rule5}</li>
            <li>{t.rule6}<span className="italic">{t.rule6b}</span>.</li>
          </ul>

          <div className="mt-8">
            <span className="inline-block rounded-full bg-yellow-300/20 px-4 py-2 text-yellow-200 font-semibold text-sm border border-yellow-300/40">
              {t.tagline}
            </span>
          </div>
        </div>
      </div>
  </div>
  </section>

</FadeInSection>



   	<FadeInSection>
   		{/* Footer */}
      	<footer className=" backdrop-blur-sm text-white py-12 mt-16 relative z-10">
      		<div className="mx-auto px-6 text-center">
      			<h3 className="text-3xl font-bold mb-4">{t.footerTitle}</h3>
      			<p className="text-xl mb-8">{t.footerText}</p>
      			<div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            		<SparkleButton
               			className="px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold text-xl rounded-full shadow-lg transition duration-300 transform hover:scale-105"
               			onClick={openRegistrationForm}
               		>
   	            		{t.sailButton}
            		</SparkleButton>
            	</div>
      		</div>
      	</footer>
   	</FadeInSection>
      <img src={luffy} alt="Luffy" className="luffy-corner" />
   </div>
   );
};

function App() {
   return <LandingPage />;
}

export default App;