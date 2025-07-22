/**
 * Daily Affirmation Dashboard - Main JavaScript File
 * 
 * This file contains all the interactive functionality for the daily affirmation app.
 * Features include: time-based greetings, random affirmations, theme switching, and animations.
 * 
 * Author: Senior Frontend Developer
 * Version: 1.0
 */

// ===================================
// CONFIGURATION AND DATA
// ===================================

/**
 * Array of positive affirmations and motivational quotes
 * Each affirmation is designed to inspire and motivate users
 */
const AFFIRMATIONS = [
  "I am capable of achieving amazing things today.",
  "My potential is limitless, and I choose to embrace it.",
  "I attract positive energy and opportunities into my life.",
  "Every challenge I face makes me stronger and wiser.",
  "I am worthy of love, success, and happiness.",
  "My thoughts create my reality, and I choose positive thoughts.",
  "I trust in my ability to navigate through any situation.",
  "I am grateful for this moment and the possibilities it holds.",
  "My confidence grows stronger with each step I take.",
  "I choose to see opportunities where others see obstacles.",
  "I am the author of my own success story.",
  "My inner strength is greater than any external challenge.",
  "I radiate positivity and inspire others around me.",
  "I am committed to my growth and personal development.",
  "Today I choose courage over comfort.",
  "I believe in myself and my unique abilities.",
  "I am deserving of all the good things coming my way.",
  "My mindset determines my success, and I choose positivity.",
  "I embrace change as an opportunity for growth.",
  "I am resilient, capable, and ready for whatever comes next.",
  "My dreams are valid, and I am taking steps to achieve them.",
  "I choose to focus on progress, not perfection.",
  "I am exactly where I need to be in my journey.",
  "My energy is contagious, and I spread joy wherever I go.",
  "I trust the process and believe in divine timing.",
  "I am a magnet for success, love, and abundance.",
  "Every day I am becoming a better version of myself.",
  "I have the power to create positive change in my life."
];

/**
 * Theme configuration
 * Defines the available themes and their corresponding icons
 */
const THEMES = {
  light: {
    name: 'light',
    icon: '🌙'
  },
  dark: {
    name: 'dark',
    icon: '☀️'
  }
};

/**
 * Time-based greetings configuration
 * Maps time ranges to appropriate greetings
 */
const GREETINGS = {
  morning: { text: "Good Morning", hours: [5, 11] },
  afternoon: { text: "Good Afternoon", hours: [12, 16] },
  evening: { text: "Good Evening", hours: [17, 21] },
  night: { text: "Good Evening", hours: [22, 4] }
};

// ===================================
// DOM ELEMENTS
// ===================================

/**
 * Cache DOM elements for better performance
 * These elements are used throughout the application
 */
let domElements = {};

/**
 * Initialize DOM element references
 * This function caches commonly used DOM elements
 */
function initializeDOMElements() {
  domElements = {
    greeting: document.getElementById('greeting'),
    affirmationText: document.getElementById('affirmation-text'),
    themeToggle: document.getElementById('theme-toggle'),
    themeIcon: document.querySelector('.theme-icon'),
    newAffirmationBtn: document.getElementById('new-affirmation'),
    body: document.body
  };
}

// ===================================
// UTILITY FUNCTIONS
// ===================================

/**
 * Get a random item from an array
 * @param {Array} array - The array to select from
 * @returns {*} A random item from the array
 */
function getRandomItem(array) {
  if (!Array.isArray(array) || array.length === 0) {
    console.warn('getRandomItem: Invalid array provided');
    return null;
  }
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

/**
 * Add a CSS class with animation support
 * @param {HTMLElement} element - The element to animate
 * @param {string} className - The CSS class to add
 */
function addAnimationClass(element, className) {
  if (!element) return;
  
  element.classList.add(className);
  
  // Remove the class after animation completes to allow re-triggering
  element.addEventListener('animationend', () => {
    element.classList.remove(className);
  }, { once: true });
}

/**
 * Debounce function to limit function execution frequency
 * @param {Function} func - The function to debounce
 * @param {number} wait - The delay in milliseconds
 * @returns {Function} The debounced function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ===================================
// GREETING FUNCTIONALITY
// ===================================

/**
 * Get the current time-based greeting
 * Determines the appropriate greeting based on the current hour
 * @returns {string} The appropriate greeting text
 */
function getCurrentGreeting() {
  const currentHour = new Date().getHours();
  
  // Check each greeting time range
  for (const [key, greeting] of Object.entries(GREETINGS)) {
    const [startHour, endHour] = greeting.hours;
    
    // Handle night time that spans midnight
    if (key === 'night') {
      if (currentHour >= startHour || currentHour <= endHour) {
        return greeting.text;
      }
    } else {
      // Handle normal time ranges
      if (currentHour >= startHour && currentHour <= endHour) {
        return greeting.text;
      }
    }
  }
  
  // Fallback greeting
  return "Hello";
}

/**
 * Update the greeting display
 * Sets the greeting text based on current time and adds animation
 */
function updateGreeting() {
  if (!domElements.greeting) return;
  
  const greeting = getCurrentGreeting();
  domElements.greeting.textContent = greeting;
  addAnimationClass(domElements.greeting, 'text-transition');
}

// ===================================
// AFFIRMATION FUNCTIONALITY
// ===================================

/**
 * Display a random affirmation
 * Selects and displays a random affirmation with animation
 */
function displayRandomAffirmation() {
  if (!domElements.affirmationText) return;
  
  const affirmation = getRandomItem(AFFIRMATIONS);
  
  if (!affirmation) {
    domElements.affirmationText.textContent = "Stay positive and keep growing!";
    return;
  }
  
  // Add fade out effect
  domElements.affirmationText.style.opacity = '0';
  
  // Update text after fade out
  setTimeout(() => {
    domElements.affirmationText.textContent = affirmation;
    domElements.affirmationText.style.opacity = '1';
    addAnimationClass(domElements.affirmationText, 'text-transition');
  }, 200);
}

/**
 * Handle new affirmation button click
 * Displays a new random affirmation with button animation
 */
function handleNewAffirmation() {
  // Add button animation
  addAnimationClass(domElements.newAffirmationBtn, 'bounce');
  
  // Display new affirmation
  displayRandomAffirmation();
  
  // Log action for analytics (in a real app)
  console.log('New affirmation requested at:', new Date().toLocaleTimeString());
}

// ===================================
// THEME FUNCTIONALITY
// ===================================

/**
 * Get the saved theme from localStorage
 * @returns {string} The saved theme name or 'light' as default
 */
function getSavedTheme() {
  try {
    return localStorage.getItem('affirmation-app-theme') || 'light';
  } catch (error) {
    console.warn('Unable to access localStorage for theme:', error);
    return 'light';
  }
}

/**
 * Save the current theme to localStorage
 * @param {string} themeName - The theme name to save
 */
function saveTheme(themeName) {
  try {
    localStorage.setItem('affirmation-app-theme', themeName);
  } catch (error) {
    console.warn('Unable to save theme to localStorage:', error);
  }
}

/**
 * Apply a theme to the application
 * @param {string} themeName - The name of the theme to apply
 */
function applyTheme(themeName) {
  if (!THEMES[themeName]) {
    console.warn(`Theme "${themeName}" not found. Using light theme.`);
    themeName = 'light';
  }
  
  const theme = THEMES[themeName];
  
  // Update the document attribute for CSS
  document.documentElement.setAttribute('data-theme', theme.name);
  
  // Update the theme toggle icon
  if (domElements.themeIcon) {
    domElements.themeIcon.textContent = theme.icon;
  }
  
  // Update button aria-label for accessibility
  if (domElements.themeToggle) {
    const oppositeTheme = themeName === 'light' ? 'dark' : 'light';
    domElements.themeToggle.setAttribute('aria-label', 
      `Switch to ${oppositeTheme} theme. Currently using ${themeName} theme.`
    );
  }
  
  // Save the theme preference
  saveTheme(themeName);
  
  console.log(`Theme switched to: ${themeName}`);
}

/**
 * Toggle between light and dark themes
 * Switches the current theme and applies the change
 */
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  // Add button animation
  addAnimationClass(domElements.themeToggle, 'bounce');
  
  // Apply the new theme
  applyTheme(newTheme);
}

// ===================================
// EVENT LISTENERS
// ===================================

/**
 * Set up all event listeners for the application
 * This function attaches event handlers to interactive elements
 */
function setupEventListeners() {
  // Theme toggle button
  if (domElements.themeToggle) {
    domElements.themeToggle.addEventListener('click', toggleTheme);
    
    // Keyboard support for theme toggle
    domElements.themeToggle.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleTheme();
      }
    });
  }
  
  // New affirmation button
  if (domElements.newAffirmationBtn) {
    domElements.newAffirmationBtn.addEventListener('click', handleNewAffirmation);
    
    // Keyboard support for new affirmation
    domElements.newAffirmationBtn.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleNewAffirmation();
      }
    });
  }
  
  // Update greeting when the page becomes visible (tab switching)
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      updateGreeting();
    }
  });
  
  // Update greeting on window focus (window switching)
  window.addEventListener('focus', updateGreeting);
  
  // Handle keyboard shortcuts
  document.addEventListener('keydown', (event) => {
    // Alt + T for theme toggle
    if (event.altKey && event.key.toLowerCase() === 't') {
      event.preventDefault();
      toggleTheme();
    }
    
    // Alt + N for new affirmation
    if (event.altKey && event.key.toLowerCase() === 'n') {
      event.preventDefault();
      handleNewAffirmation();
    }
  });
  
  // Handle responsive design changes
  const debouncedResize = debounce(() => {
    // Re-calculate any layout-dependent features
    console.log('Window resized, layout updated');
  }, 250);
  
  window.addEventListener('resize', debouncedResize);
}

// ===================================
// INITIALIZATION
// ===================================

/**
 * Initialize the application
 * This is the main initialization function that sets up the entire app
 */
function initializeApp() {
  console.log('🌟 Daily Affirmation Dashboard starting...');
  
  try {
    // Initialize DOM element references
    initializeDOMElements();
    
    // Check if critical elements exist
    if (!domElements.greeting || !domElements.affirmationText) {
      throw new Error('Critical DOM elements not found');
    }
    
    // Set up the initial theme
    const savedTheme = getSavedTheme();
    applyTheme(savedTheme);
    
    // Display initial content
    updateGreeting();
    displayRandomAffirmation();
    
    // Set up event listeners
    setupEventListeners();
    
    console.log('✅ Daily Affirmation Dashboard initialized successfully');
    
    // Accessibility announcement
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = 'Daily Affirmation Dashboard loaded successfully. Use Alt+T to toggle theme, Alt+N for new affirmation.';
    document.body.appendChild(announcement);
    
    // Remove announcement after a delay
    setTimeout(() => {
      announcement.remove();
    }, 3000);
    
  } catch (error) {
    console.error('❌ Failed to initialize app:', error);
    
    // Show fallback content
    if (domElements.affirmationText) {
      domElements.affirmationText.textContent = 
        "Stay positive! The app encountered an issue, but your day is still amazing!";
    }
  }
}

/**
 * Handle page load
 * Ensures the app initializes when the DOM is ready
 */
function handlePageLoad() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
  } else {
    // DOM is already loaded
    initializeApp();
  }
}

// ===================================
// ERROR HANDLING
// ===================================

/**
 * Global error handler
 * Catches and logs any unhandled errors
 */
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
  
  // Show user-friendly message
  const affirmationElement = document.getElementById('affirmation-text');
  if (affirmationElement) {
    affirmationElement.textContent = 
      "Keep going! Every moment is a fresh start.";
  }
});

/**
 * Handle unhandled promise rejections
 */
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  event.preventDefault(); // Prevent the default browser behavior
});

// ===================================
// START THE APPLICATION
// ===================================

// Initialize the app when the script loads
handlePageLoad();

// Add some helpful console logs for developers
console.log('💡 Keyboard shortcuts:');
console.log('   Alt + T: Toggle theme');
console.log('   Alt + N: New affirmation');
console.log('🎨 Available themes:', Object.keys(THEMES));
console.log('📱 Responsive breakpoints: 768px (tablet), 1024px (desktop)');