import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

// Initialize theme immediately to prevent flash
const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';
  const saved = localStorage.getItem('theme') as Theme;
  if (saved) return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Apply theme to document immediately (runs before React hydrates)
const initialTheme = getInitialTheme();
if (typeof document !== 'undefined') {
  document.documentElement.classList.remove('light', 'dark');
  document.documentElement.classList.add(initialTheme);
}

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    const root = document.documentElement;
    
    // Add transitioning class to disable all transitions during theme switch
    root.classList.add('theme-transitioning');
    
    // Remove existing theme classes
    root.classList.remove('light', 'dark');
    
    // Add current theme class
    root.classList.add(theme);
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
    
    // Re-enable transitions after a brief delay
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        root.classList.remove('theme-transitioning');
      });
    });
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return { theme, toggleTheme };
};