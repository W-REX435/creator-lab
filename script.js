document.addEventListener('DOMContentLoaded', () => {
  
  /* --- STICKY NAVBAR CLASS TOGGLE --- */
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  /* --- MOBILE NAV TOGGLE --- */
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-links a');

  function toggleMenu() {
    mobileMenu.classList.toggle('open');
    const isOpen = mobileMenu.classList.contains('open');
    menuToggle.innerHTML = isOpen 
      ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'
      : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="18" x2="20" y2="18"></line></svg>';
  }

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', toggleMenu);
    
    // Close menu when clicking a link
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (mobileMenu.classList.contains('open')) {
          toggleMenu();
        }
      });
    });
  }

  /* --- HERO MOCKUP WAVEFORM ANIMATION --- */
  const waveBars = document.querySelectorAll('.mockup-bar');
  if (waveBars.length > 0) {
    setInterval(() => {
      waveBars.forEach(bar => {
        // Randomly adjust heights of waveform bars to simulate active editing/playing
        const randomHeight = Math.floor(Math.random() * 85) + 15; // 15% to 100%
        bar.style.height = `${randomHeight}%`;
        
        // Randomly toggle active class for color variation
        if (Math.random() > 0.4) {
          bar.classList.add('active');
        } else {
          bar.classList.remove('active');
        }
      });
    }, 180);
  }

  /* --- REVEAL ON SCROLL ANIMATIONS --- */
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-rotate');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  /* --- INTERACTIVE FAQ ACCORDION --- */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const button = item.querySelector('.faq-question-btn');
    const container = item.querySelector('.faq-answer-container');
    
    button.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other active FAQ items
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-answer-container').style.maxHeight = null;
        }
      });

      // Toggle current item
      if (isActive) {
        item.classList.remove('active');
        container.style.maxHeight = null;
      } else {
        item.classList.add('active');
        // Set max-height to scrollHeight to animate opening
        container.style.maxHeight = container.scrollHeight + "px";
      }
    });
  });

  /* --- INTERACTIVE AFFILIATE COMMISSION CALCULATOR --- */
  const slider = document.getElementById('affiliate-slider');
  const referralsDisplay = document.getElementById('referrals-count');
  const earningsDisplay = document.getElementById('earnings-amount');
  const tierRadios = document.querySelectorAll('input[name="affiliate-tier"]');

  // Pricing constants for calculation
  const clippingMonthly = 9.99;
  const clippingLifetime = 20.99;
  const creatorVault = 10.99;

  function calculateEarnings() {
    if (!slider) return;
    const referrals = parseInt(slider.value);
    referralsDisplay.textContent = referrals;

    // Get selected tier
    let selectedTier = 'standard';
    tierRadios.forEach(radio => {
      if (radio.checked) {
        selectedTier = radio.value;
      }
    });

    let earnings = 0;

    if (selectedTier === 'standard') {
      // Standard members earn 25% commission on every sale
      const avgSaleValue = (clippingMonthly * 0.5) + (clippingLifetime * 0.3) + (creatorVault * 0.2);
      const commissionRate = 0.25;
      earnings = referrals * avgSaleValue * commissionRate;
    } else {
      // Global affiliates earn 50% on Clipping Vault and 30% on Creator Vault
      const clippingVaultSalesCount = referrals * 0.8;
      const creatorVaultSalesCount = referrals * 0.2;

      const avgClippingValue = (clippingMonthly * 0.625) + (clippingLifetime * 0.375);
      
      const clippingEarnings = clippingVaultSalesCount * avgClippingValue * 0.50;
      const creatorEarnings = creatorVaultSalesCount * creatorVault * 0.30;
      
      earnings = clippingEarnings + creatorEarnings;
    }

    // Format earnings nicely as currency
    earningsDisplay.textContent = `$${Math.round(earnings).toLocaleString()}`;

    // Trigger dynamic pop pulse animation
    earningsDisplay.classList.remove('pulse');
    void earningsDisplay.offsetWidth; // Force CSS reflow
    earningsDisplay.classList.add('pulse');
  }

  if (slider) {
    slider.addEventListener('input', calculateEarnings);
    tierRadios.forEach(radio => {
      radio.addEventListener('change', calculateEarnings);
    });
    
    // Initial run
    calculateEarnings();
  }

  /* --- SMOOTH SCROLL ANCHORS --- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70, // offset for navbar height
          behavior: 'smooth'
        });
      }
    });
  });

  /* ==========================================================================
     NEW PREMIUM INTERACTIONS & DYNAMIC LEAD MAGNETS
     ========================================================================== */

  /* 1. FLOATING BACKGROUND PARTICLES */
  const particlesContainer = document.getElementById('particles-container');
  if (particlesContainer) {
    const particleCount = 20;
    const colors = ['#8b5cf6', '#d946ef', '#06b6d4'];
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      // Random coordinates and styles
      const size = Math.random() * 4 + 2; // 2px to 6px
      const xPos = Math.random() * 100; // 0% to 100%
      const duration = Math.random() * 10 + 10; // 10s to 20s
      const delay = Math.random() * -15; // negative delay to start mid-way
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${xPos}%`;
      particle.style.background = color;
      particle.style.boxShadow = `0 0 10px ${color}`;
      particle.style.animationDuration = `${duration}s`;
      particle.style.animationDelay = `${delay}s`;
      
      particlesContainer.appendChild(particle);
    }
  }

  /* 2. REAL-TIME EVERGREEN URGENCY COUNTDOWN TIMER */
  const minDisplay = document.getElementById('timer-min');
  const secDisplay = document.getElementById('timer-sec');
  
  if (minDisplay && secDisplay) {
    let totalSeconds = 14 * 60 + 59; // 14 mins 59 secs
    
    function tickTimer() {
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      
      minDisplay.textContent = minutes < 10 ? '0' + minutes : minutes;
      secDisplay.textContent = seconds < 10 ? '0' + seconds : seconds;
      
      if (totalSeconds <= 0) {
        totalSeconds = 14 * 60 + 59; // Reset to 14m:59s evergreen loop
      } else {
        totalSeconds--;
      }
    }
    
    setInterval(tickTimer, 1000);
    tickTimer(); // Initial call
  }

  /* 3. DYNAMIC ACTIVE CLIPPERS ONLINE COUNT FLUTTER */
  const clippersOnlineLabel = document.querySelector('.live-clippers-bar strong');
  if (clippersOnlineLabel) {
    let currentClippers = 142;
    setInterval(() => {
      // Small random variations (+3 or -3) to simulate active clippers online live
      const variation = Math.floor(Math.random() * 7) - 3;
      currentClippers = Math.max(130, Math.min(160, currentClippers + variation));
      clippersOnlineLabel.textContent = `${currentClippers} clippers`;
    }, 4000);
  }

  /* 4. SOCIAL PROOF CHECKOUT TOAST LOOPS */
  const toast = document.getElementById('checkout-toast');
  const creatorsList = [
    { handle: '@blake_edit', action: 'unlocked the Lifetime Vault', time: '1m ago', icon: '🔐' },
    { handle: '@tok_beast', action: 'joined the Clipping Vault', time: '3m ago', icon: '⚡' },
    { handle: '@editor_cody', action: 'unlocked the Lifetime Vault', time: '2m ago', icon: '🔥' },
    { handle: '@reels_guru', action: 'joined the Creator Vault', time: '5m ago', icon: '✨' },
    { handle: '@shorts_ninja', action: 'joined the Clipping Vault', time: '4m ago', icon: '🚀' },
    { handle: '@sam_cutz', action: 'unlocked the Lifetime Vault', time: '3m ago', icon: '🔐' }
  ];
  
  let currentToastIndex = 0;
  
  function triggerToast() {
    if (!toast) return;
    
    const entry = creatorsList[currentToastIndex];
    toast.innerHTML = `
      <div class="toast-icon">${entry.icon}</div>
      <div class="toast-body">
        <span class="toast-title"><strong>${entry.handle}</strong> ${entry.action}</span>
        <span class="toast-desc">${entry.time} • verified purchase</span>
      </div>
    `;
    
    toast.classList.add('show');
    
    // Hide toast after 4.5 seconds
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
    
    // Move to next entry
    currentToastIndex = (currentToastIndex + 1) % creatorsList.length;
  }
  
  // Trigger toast notification loop every 12 seconds
  if (toast) {
    setTimeout(triggerToast, 3000); // Initial trigger after 3s
    setInterval(triggerToast, 12000);
  }

  /* 5. MOUSE 3D PARALLAX TILT & GLARE INTERACTION FOR CARDS */
  const tiltCards = document.querySelectorAll('.pricing-card, .problem-card');
  
  if (window.innerWidth > 992) { // Only enable on desktop to avoid lag on mobile
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const cardRect = card.getBoundingClientRect();
        
        // Calculate relative mouse coordinates on card
        const cardX = e.clientX - cardRect.left;
        const cardY = e.clientY - cardRect.top;
        
        // Convert to percentage offsets from center (-0.5 to 0.5)
        const xOffset = (cardX / cardRect.width) - 0.5;
        const yOffset = (cardY / cardRect.height) - 0.5;
        
        // Calculate tilt angles (max 8 degrees tilt)
        const tiltX = (yOffset * -8).toFixed(2);
        const tiltY = (xOffset * 8).toFixed(2);
        
        // Apply transform style (scale card slightly larger as well)
        const isPopular = card.classList.contains('popular');
        const scaleVal = isPopular ? 1.05 : 1.03;
        
        card.style.transform = `translateY(-5px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${scaleVal})`;
        
        // Shift metallic glare shine dynamically if card has a card-shine layer
        const shine = card.querySelector('.card-shine');
        if (shine) {
          const shineX = ((cardX / cardRect.width) * 100).toFixed(2);
          const shineY = ((cardY / cardRect.height) * 100).toFixed(2);
          shine.style.background = `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255, 255, 255, 0.08) 0%, transparent 60%)`;
        }
      });
      
      card.addEventListener('mouseleave', () => {
        // Reset styles smoothly on mouse leave
        card.style.transform = '';
        const shine = card.querySelector('.card-shine');
        if (shine) {
          shine.style.background = '';
        }
      });
    });
  }

  /* 6. NATIVE CHECKOUT REDIRECT LOADER ENGINE */
  const checkoutOverlay = document.getElementById('checkout-loader');
  const loaderTitle = document.getElementById('checkout-loader-title');
  const loaderSubtitle = document.getElementById('checkout-loader-subtitle');
  
  // Find all checkout anchor tags pointing to Whop links
  const checkoutButtons = document.querySelectorAll('a[href*="whop.com"]');
  
  checkoutButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetUrl = button.getAttribute('href');
      if (!checkoutOverlay) {
        window.location.href = targetUrl;
        return;
      }
      
      // Select appropriate loader subtitle based on the button clicked
      let tierName = "Clipping Vault";
      if (button.id.includes('creatorvault')) {
        tierName = "Creator Vault";
      } else if (button.id.includes('lifetime') || targetUrl.includes('lifetime') || button.textContent.includes('Lifetime')) {
        tierName = "Lifetime Clipping Vault";
      } else if (button.id.includes('monthly') || button.textContent.includes('Monthly')) {
        tierName = "Monthly Clipping Vault";
      }
      
      // Activate custom loader overlay
      checkoutOverlay.classList.add('active');
      
      // Progressively update loading statuses to feel high-end
      loaderTitle.textContent = "Connecting to Whop...";
      loaderSubtitle.textContent = `Securing your access keys for the ${tierName}...`;
      
      setTimeout(() => {
        loaderTitle.textContent = "Verifying Vault slots...";
        loaderSubtitle.textContent = "Establishing a secure connection to Whop's payment gateway.";
      }, 500);

      setTimeout(() => {
        loaderTitle.textContent = "Opening checkout gateway...";
        loaderSubtitle.textContent = "Redirecting you to complete your secure payment. Prepare your clips!";
      }, 1000);
      
      // Perform redirect
      setTimeout(() => {
        window.location.href = targetUrl;
      }, 1500);
    });
  });

  /* 7. DYNAMIC SCROLL PROGRESS INDICATOR ENGINE */
  const progressBar = document.getElementById('scroll-progress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = scrollHeight > 0 
        ? ((window.scrollY / scrollHeight) * 100).toFixed(2) 
        : 0;
      progressBar.style.width = `${scrollPercentage}%`;
    });
  }

  /* 8. MOCKUP LIVE COMMUNITY CHAT ROLLING LOOP */
  const chatContainer = document.getElementById('mockup-chat-messages');
  const chatMessagesList = [
    { user: '@editor_cody', text: 'This zoom preset is pure gold ✨' },
    { user: '@tok_beast', text: 'Auto-sync syncs perfectly on beat phonk!' },
    { user: '@shorts_ninja', text: 'thumbnails pack CTR is up 12% already' },
    { user: '@vids_by_sam', text: 'weekly audio pull just saved my hook!' },
    { user: '@skate_edits', text: '100% used the SFX packs on my last reel' },
    { user: '@reels_guru', text: 'Community forum alone is worth $100' },
    { user: '@skate_edits', text: 'Already hit 1.2M views on TikTok!' }
  ];

  if (chatContainer) {
    let chatIndex = 0;
    
    // Smooth scrolling message roll
    function rollChatMessage() {
      const entry = chatMessagesList[chatIndex];
      const messageElement = document.createElement('div');
      messageElement.classList.add('chat-msg');
      messageElement.innerHTML = `
        <span class="chat-user">${entry.user}</span>
        <span class="chat-text">${entry.text}</span>
      `;
      
      chatContainer.appendChild(messageElement);
      
      // Auto scroll to bottom
      chatContainer.scrollTop = chatContainer.scrollHeight;
      
      // Prevent DOM overflow by keeping only the last 5 messages
      const currentMessages = chatContainer.querySelectorAll('.chat-msg');
      if (currentMessages.length > 5) {
        currentMessages[0].remove();
      }
      
      chatIndex = (chatIndex + 1) % chatMessagesList.length;
    }
    
    // Roll a new message every 3.5 seconds
    setInterval(rollChatMessage, 3500);
  }

});
