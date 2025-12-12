import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2.5 rounded-full bg-secondary hover:bg-muted transition-all duration-300 overflow-hidden group"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {/* Container for icons with smooth transition */}
      <div className="relative w-4 h-4">
        {/* Sun icon - visible in dark mode */}
        <Sun 
          size={16} 
          className={`absolute inset-0 text-foreground transition-all duration-500 ease-out ${
            theme === 'dark' 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 rotate-90 scale-0'
          }`}
        />
        
        {/* Moon icon - visible in light mode */}
        <Moon 
          size={16} 
          className={`absolute inset-0 text-foreground transition-all duration-500 ease-out ${
            theme === 'light' 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 -rotate-90 scale-0'
          }`}
        />
      </div>
      
      {/* Subtle glow effect on hover */}
      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-accent/10 to-transparent" />
    </button>
  );
};

export default ThemeToggle;
