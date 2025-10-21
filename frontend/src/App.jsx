import { useState, useRef, useEffect } from 'react'
import SparkleButton from './components/SparkleButton';
import DownloadDropdownButton from './components/DownloadDropdownButton';

import lightBackground from './assets/OnePieceMap.png'
// import documentation1 from './assets/documentation1.pdf'
// import documentation2 from './assets/documentation2.pdf'
import './App.css'
import RVCELogo from './assets/RVCE_Logo.png';
import CCLogo from './assets/CClogo.png';
import thwsLogo from './assets/thws_logo.png';
import luffy from './assets/luffy.png';


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
              ctx.lineWidth = 0.9;
              ctx.beginPath();
              ctx.moveTo(particles[a].x, particles[a].y);
              ctx.lineTo(particles[b].x, particles[b].y);
              ctx.stroke();
            }
          }
        }
      }
    }

    <img src="/images/luffy.png" alt="Luffy" className="luffy-corner" />


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
    ctx.lineWidth = 1.;
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
  connectToMouse();  // ADD THIS LINE
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
        canvas.removeEventListener('mousemove', handleMouseMove);  // ADD THIS
  canvas.removeEventListener('mouseout', handleMouseOut);    // ADD THIS

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

// Landing Page Component
const LandingPage = () => {
   const downloadPDF = (pdfUrl, filename) => {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
   };

   const openRegistrationForm = () => {
      const googleFormUrl = "https://forms.gle/qSmHvwfipLBPnJtf8"; // Placeholder URL
      window.open(googleFormUrl, '_blank');
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

         {/* Overlay for better text readability */}
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
                     Road to Poneglyph 
                  </h1>
                  <p className="mt-2 sm:mt-4 text-lg xs:text-xl sm:text-2xl md:text-3xl text-white font-semibold drop-shadow-lg hero-subtitle" style={{ fontFamily: 'Nunito, Arial, Helvetica, sans-serif' }}>
                     Hack your way to Laugh Tale!
                  </p>
                  <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                     <SparkleButton
                        className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold text-lg sm:text-xl rounded-full shadow-2xl transition duration-300 transform hover:scale-105"
                        onClick={openRegistrationForm}
                     >
                        Register Now 
                     </SparkleButton>
                  </div>
               </div>
            </section>
         </FadeInSection>

         <FadeInSection>
            {/* Why Participate Section */}
            <section className="mx-auto px-2 sm:px-6 py-10 sm:py-16 max-w-7xl why-participate-section">
               <h2 className="text-4xl sm:text-5xl font-bold mb-10 text-center text-yellow-300 tracking-tight" style={{ fontFamily: 'Special Gothic Expanded One, Nunito, Arial, Helvetica, sans-serif', fontWeight: 800, display: 'block', margin: '0 auto' }}>
                  Why Join the Voyage?
               </h2>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 border-dashed flex flex-col transition duration-300 hover:scale-105" style={{ fontFamily: 'Nunito, Arial, Helvetica, sans-serif' }}>
                     <h3 className="text-2xl font-bold mb-3 text-yellow-300" style={{ fontFamily: 'Special Gothic Expanded One, Nunito, Arial, Helvetica, sans-serif' }}>Event Overview</h3>
                     <p className="text-white text-lg">Road to Poneglyph is a gamified CTF and problem-solving event with a One Piece theme. Solve challenges, decipher Poneglyphs, and unlock clues to the final text!</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 border-dashed flex flex-col transition duration-300 hover:scale-105" style={{ fontFamily: 'Nunito, Arial, Helvetica, sans-serif' }}>
                     <h3 className="text-2xl font-bold mb-3 text-yellow-300" style={{ fontFamily: 'Special Gothic Expanded One, Nunito, Arial, Helvetica, sans-serif' }}>What You Can Expect</h3>
                     <p className="text-white text-lg">You will face technical challenges in web security, AI/ML, blockchain, data science, and more. Earn bounties for each problem solved, discover One Piece-themed clues to the final Poneglyph, receive custom participation certificates, and enjoy recognition, learning, and networking opportunities.</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 border-dashed flex flex-col transition duration-300 hover:scale-105" style={{ fontFamily: 'Nunito, Arial, Helvetica, sans-serif' }}>
                     <h3 className="text-2xl font-bold mb-3 text-yellow-300" style={{ fontFamily: 'Special Gothic Expanded One, Nunito, Arial, Helvetica, sans-serif' }}>Perks for Participants</h3>
                     <p className="text-white text-lg">All participants will receive a One Piece-themed certificate, have a chance to be shortlisted for finals based on performance, gain peer engagement and recognition, and experience a blend of fun and technical learning.</p>
A               </div>
               </div>
            </section>
         </FadeInSection>

         
         <FadeInSection>
            {/* Event Details Section */}
            <section className="mx-auto px-6 py-16 max-w-6xl event-details-section">
               <div className="bg-gradient-to-br from-white/5 via-white/10 to-white/0 rounded-3xl shadow-2xl p-8 border border-white/10 backdrop-blur">
                  <h2 className="card-title text-5xl font-bold mb-12 text-yellow-300 drop-shadow-lg text-center" style={{ fontFamily: 'Special Gothic Expanded One, Nunito, Arial, Helvetica, sans-serif', fontWeight: 800 }}>
                     Crew Info
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     <div className="bg-white/5 rounded-2xl shadow-xl p-8 text-center transform hover:scale-105 transition duration-300 border border-white/10 card-body" style={{ fontFamily: 'Nunito, Arial, Helvetica, sans-serif', backdropFilter: 'blur(3px)' }}>
                        <div className="text-6xl mb-4">👥</div>
                        <h3 className="card-title text-2xl font-bold mb-3 text-white" style={{ fontFamily: 'Nunito, Arial, Helvetica, sans-serif', fontWeight: 700 }}>Crew Structure</h3>
                        <p className="card-body text-lg text-gray-50" style={{ fontFamily: 'Nunito, Arial, Helvetica, sans-serif' }}>
                           3 to 4 members per crew<br/>
                           Solo pirates not allowed
                        </p>
                     </div>
                     <div className="bg-white/5 rounded-2xl shadow-xl p-8 text-center transform hover:scale-105 transition duration-300 border border-white/10 card-body" style={{ fontFamily: 'Nunito, Arial, Helvetica, sans-serif', backdropFilter: 'blur(3px)' }}>
                        <div className="text-6xl mb-4">🎓</div>
                        <h3 className="card-title text-2xl font-bold mb-3 text-white" style={{ fontFamily: 'Nunito, Arial, Helvetica, sans-serif', fontWeight: 700 }}>Open To</h3>
                        <p className="card-body text-lg text-gray-50" style={{ fontFamily: 'Nunito, Arial, Helvetica, sans-serif' }}>
                           All first and second-year students of RVCE & THWS
                        </p>
                     </div>
                     <div className="bg-white/5 rounded-2xl shadow-xl p-8 text-center transform hover:scale-105 transition duration-300 border border-white/10 card-body" style={{ fontFamily: 'Nunito, Arial, Helvetica, sans-serif', backdropFilter: 'blur(3px)' }}>
                        <div className="text-6xl mb-4">🗓️</div>
                        <h3 className="card-title text-2xl font-bold mb-3 text-white" style={{ fontFamily: 'Nunito, Arial, Helvetica, sans-serif', fontWeight: 700 }}>Deadline to Register</h3>
                        <p className="card-body text-lg text-gray-50" style={{ fontFamily: 'Nunito, Arial, Helvetica, sans-serif' }}>
                           24th Oct 2025<br/>
                           <span className="text-base text-gray-300">Free of cost</span>
                        </p>
                     </div>
                  </div>
               </div>
            </section>
         </FadeInSection>

         <FadeInSection>
            {/* Modern Schedule Card Section - Remade */}
            <section className="mx-auto px-2 sm:px-6 py-10 sm:py-16 max-w-2xl schedule-section">
               <div className="bg-gradient-to-br from-white/5 via-white/10 to-white/0 rounded-3xl shadow-2xl p-4 sm:p-8 border border-white/10 backdrop-blur">
                  <h2 className="card-title text-4xl sm:text-5xl font-bold mb-10 text-yellow-300 drop-shadow-lg tracking-tight text-center" style={{ fontFamily: 'Special Gothic Expanded One, Nunito, Arial, Helvetica, sans-serif', fontWeight: 800 }}>
                     Voyage Schedule
                  </h2>
                  <div className="flex flex-col gap-6">
                     {/* Schedule Item 1 */}
                     <div className="flex items-center gap-4 bg-white/5 rounded-2xl shadow-xl p-6 border border-white/10 backdrop-blur transition hover:scale-[1.03]" style={{ fontFamily: 'Nunito, Arial, Helvetica, sans-serif', backdropFilter: 'blur(2px)' }}>
                        <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-full bg-yellow-400 text-gray-900 text-4xl shadow-lg">
                           📅
                        </div>
                        <div className="flex-1">
                           <h3 className="card-title text-xl sm:text-2xl font-bold text-white leading-tight mb-1" style={{ fontFamily: 'Nunito, Arial, Helvetica, sans-serif', fontWeight: 700 }}>Trial Voyage (Online)</h3>
                           <p className="card-body text-base sm:text-lg text-gray-50" style={{ fontFamily: 'Nunito, Arial, Helvetica, sans-serif' }}> Oct 25th, 8:00 PM IST / 4:30 PM CEST</p>
                        </div>
                     </div>
                     {/* Schedule Item 2 */}
                     <div className="flex items-center gap-4 bg-white/5 rounded-2xl shadow-xl p-6 border border-white/10 backdrop-blur transition hover:scale-[1.03]" style={{ fontFamily: 'Nunito, Arial, Helvetica, sans-serif', backdropFilter: 'blur(2px)' }}>
                        <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-full bg-blue-500 text-white text-4xl shadow-lg">
                           📍
                        </div>
                        <div className="flex-1">
                           <h3 className="card-title text-xl sm:text-2xl font-bold text-white leading-tight mb-1" style={{ fontFamily: 'Nunito, Arial, Helvetica, sans-serif', fontWeight: 700 }}>Final Voyage (Online)</h3>
                           <p className="card-body text-base sm:text-lg text-gray-50" style={{ fontFamily: 'Nunito, Arial, Helvetica, sans-serif' }}>Last Week of November</p>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
         </FadeInSection>

         {/* <FadeInSection> */}
            {/* Download Section */}
            {/* <section className='flex flex-row items-center justify-center p-4 sm:p-8 mb-16 relative'> */}
               {/* <div className="text-center w-full max-w-4xl"> */}
                  {/* <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full"> */}
                     {/* <DownloadDropdownButton */}
                        {/* onDownload1={() => downloadPDF(documentation1, 'documentation1.pdf')} */}
                        {/* onDownload2={() => downloadPDF(documentation2, 'documentation2.pdf')} */}
                     {/* /> */}
                  {/* </div> */}
               {/* </div> */}
            {/* </section> */}
          {/* </FadeInSection> */}
_
         <FadeInSection>
            {/* Faculty Advisory Section */}
            <section className='flex flex-col items-center justify-center min-h-[40vh] p-4 sm:p-8'>
               <h2 className="text-4xl md:text-5xl font-bold mb-12 text-yellow-300 drop-shadow-lg text-center" style={{ fontFamily: 'Special Gothic Expanded One, Nunito, Arial, Helvetica, sans-serif' }}>
                  Faculty Advisors
               </h2>
               <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl px-4'>
                  {/* Faculty Advisor 1 */}
                  <div className="team-card bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-dashed hover:scale-105 transition duration-300" style={{ fontFamily: 'Nunito, Arial, Helvetica, sans-serif' }}>
                     <h3 className='team-card-title text-yellow-300 text-center mb-1.5' style={{ fontFamily: 'Special Gothic Expanded One, Nunito, Arial, Helvetica, sans-serif', fontWeight: 800, fontSize: '1.5rem' }}>
                        Dr. Padmashree T
                     </h3>
                     <p className='team-card-role text-white text-center text-sm mb-2' style={{ fontFamily: 'Nunito, Arial, Helvetica, sans-serif', fontWeight: 600 }}>
                        Associate Professor & Associate Dean-PG Studies, ISE<br/>Faculty Advisor for the Coding Club
                     </p>
                  </div>
                  {/* Faculty Advisor 2 */}
                  <div className="team-card bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-dashed hover:scale-105 transition duration-300" style={{ fontFamily: 'Nunito, Arial, Helvetica, sans-serif' }}>
                     <h3 className='team-card-title text-yellow-300 text-center mb-1.5' style={{ fontFamily: 'Special Gothic Expanded One, Nunito, Arial, Helvetica, sans-serif', fontWeight: 800, fontSize: '1.5rem' }}>
                        Dr. Sagar BM
                     </h3>
                     <p className='team-card-role text-white text-center text-sm mb-2' style={{ fontFamily: 'Nunito, Arial, Helvetica, sans-serif', fontWeight: 600 }}>
                        Dean Student Affairs<br/>Faculty Advisor for the Coding Club
                     </p>
                  </div>
                  {/* Faculty Advisor 3 */}
                  <div className="team-card bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-dashed hover:scale-105 transition duration-300" style={{ fontFamily: 'Nunito, Arial, Helvetica, sans-serif' }}>
                     <h3 className='team-card-title text-yellow-300 text-center mb-1.5' style={{ fontFamily: 'Special Gothic Expanded One, Nunito, Arial, Helvetica, sans-serif', fontWeight: 800, fontSize: '1.5rem' }}>
                        Prof. Sebastian Biedermann
                     </h3>
                     <p className='team-card-role text-white text-center text-sm mb-2' style={{ fontFamily: 'Nunito, Arial, Helvetica, sans-serif', fontWeight: 600 }}>
                        Professor bei Hochschule für angewandte Wissenschaften Würzburg-Schweinfurt
                     </p>
                  </div>{/* Faculty Advisor 4 */}
                  <div className="team-card bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-dashed hover:scale-105 transition duration-300" style={{ fontFamily: 'Nunito, Arial, Helvetica, sans-serif' }}>
                     <h3 className='team-card-title text-yellow-300 text-center mb-1.5' style={{ fontFamily: 'Special Gothic Expanded One, Nunito, Arial, Helvetica, sans-serif', fontWeight: 800, fontSize: '1.5rem' }}>
                        Dr. Minal Moharir
                     </h3>
                     <p className='team-card-role text-white text-center text-sm mb-2' style={{ fontFamily: 'Nunito, Arial, Helvetica, sans-serif', fontWeight: 600 }}>
                        Associate Professor & CSE<br/>Faculty Advisor for the Accelerate Club
                     </p>
                  </div>
               </div>
            </section>
         </FadeInSection>



   	<FadeInSection>
   		{/* Footer */}
      	<footer className=" backdrop-blur-sm text-white py-12 mt-16 relative z-10">
      		<div className="mx-auto px-6 text-center">
      			<h3 className="text-3xl font-bold mb-4">Ready to find the One Piece?</h3>
      			<p className="text-xl mb-8">Join Road to Poneglyph and code your way to victory!</p>
      			<div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            		<SparkleButton
               			className="px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold text-xl rounded-full shadow-lg transition duration-300 transform hover:scale-105"
               			onClick={openRegistrationForm}
               		>
   	            		Register Now
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