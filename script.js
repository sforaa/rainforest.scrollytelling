// =====================
// VIDEO INTRO FUNCTIONALITY
// =====================
if (document.getElementById('introVideo')) {
  const video = document.getElementById('introVideo');
  const muteBtn = document.getElementById('muteBtn');
  const continueBtn = document.getElementById('continueBtn');

  // Set initial state
  video.muted = true;
  muteBtn.textContent = "🔇";

  muteBtn.addEventListener('click', () => {
    video.muted = !video.muted;
    muteBtn.textContent = video.muted ? '🔇' : '🔊';
    video.play(); // in case it was paused
  });

  video.addEventListener('ended', () => {
    continueBtn.classList.remove('hidden');
  });

  continueBtn.addEventListener('click', () => {
    // Go to the main storytelling globe page
    window.location.href = 'scrolly.html';
  });
}


// =====================
// ANIMATED SUBTITLE FUNCTION (on main page)
// =====================
if (document.getElementById('subtitle') && document.getElementById('scrollDown')) {
  const subtitle = document.getElementById('subtitle');
  const scrollDown = document.getElementById('scrollDown');

  // Show, hide, and change the animated subtitle
  setTimeout(() => {
    subtitle.textContent = "the african rainforest is dissapearing...";
    subtitle.classList.add("visible");
  }, 1200);

  setTimeout(() => {
    subtitle.classList.remove("visible");
  }, 2900);

  setTimeout(() => {
    subtitle.textContent = "but why is the rainforest so important";
    subtitle.classList.add("visible");
  }, 3600);

  setTimeout(() => {
    scrollDown.style.opacity = "1";
  }, 4400);
}


// =====================
// GLOBE FUNCTIONALITY (for the main storytelling page)
// =====================
if (document.getElementById('rainforest-globe')) {
  // Example: African and other world rainforests (edit this for your data)
  const rainforests = [
    { name: "Amazoneregenwoud", lat: -3.4653, lng: -62.2159, desc: "Het grootste regenwoud op aarde." },
    { name: "Congo Basin", lat: -1.4419, lng: 15.5560, desc: "Het grootste regenwoud van Afrika." },
    { name: "Southeast Asian Rainforest", lat: 1.3521, lng: 103.8198, desc: "Verspreid over Indonesië, Maleisië, Thailand..." },
    { name: "Australisch Regenwoud", lat: -15.7751, lng: 145.6848, desc: "Het Daintree-regenwoud van Australië." }
    // Voeg meer locaties toe als gewenst!
  ];

  // Initialize the globe
  const globe = Globe()
    (document.getElementById('rainforest-globe'))
    .backgroundColor("#111")
    .globeImageUrl('Mapping-our-Worlds-Forests-How-Green-is-our-Globe-Main.webp') // of earth-dark.jpg voor andere look
    .pointsData(rainforests)
    .pointLat(d => d.lat)
    .pointLng(d => d.lng)
    .pointAltitude(0.04)
    .pointColor(() => '#E51901')
    .pointRadius(0.7)
    .onPointClick(d => alert(`${d.name}\n${d.desc}`))
    .pointOfView({lat:0, lng:20, altitude:2.2});

  // Disable zooming for easy scroll
  setTimeout(() => {
    globe.controls().enableZoom = false;
  }, 200);
}


// =====================
// SCROLL REVEAL ANIMATION for .scrolly-text blocks
// =====================
document.addEventListener("DOMContentLoaded", function() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Animate only once
      }
    });
  }, { threshold: 0.28 });

  document.querySelectorAll('.scrolly-text').forEach(el => {
    observer.observe(el);
  });
});


document.addEventListener("DOMContentLoaded", function() {
  const audios = document.querySelectorAll('.section-audio');
  const sections = document.querySelectorAll('.audio-section');
  const muteBtn = document.getElementById('muteBtn');
  let muted = true;
  let currentAudio = null;

  function setAllMuted(muteState) {
    audios.forEach(a => {
      a.muted = muteState;
      a.volume = 0.08; // Heel zacht!
    });
    muteBtn.textContent = muteState ? '🔇' : '🔊';
  }

  setAllMuted(muted);

  muteBtn.addEventListener('click', function() {
    muted = !muted;
    setAllMuted(muted);
    // Speel de huidige audio opnieuw af bij unmuten
    if (!muted && currentAudio) {
      if (currentAudio.paused) try { currentAudio.play(); } catch(e){}
    }
  });

  // Intersection Observer voor audio-secties
  const observer = new window.IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const audio = entry.target.querySelector('.section-audio');
      if (entry.isIntersecting) {
        // Stop alle andere
        audios.forEach(a => { a.pause(); a.currentTime = 0; });
        // Speel huidige af als niet muted
        if (!muted) {
          audio.currentTime = 0;
          audio.play();
        }
        currentAudio = audio;
      } else {
        // Stop deze audio als uit beeld
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
        }
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(section => observer.observe(section));
});
