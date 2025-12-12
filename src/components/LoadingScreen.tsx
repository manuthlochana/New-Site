import { useEffect, useState } from "react";
import personalLogo from "@/assets/personal-logo.png";

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [isRevealing, setIsRevealing] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsRevealing(true);
          return 100;
        }
        return prev + 2;
      });
    }, 20);

    return () => clearInterval(timer);
  }, []);

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-all duration-700 ease-out ${
        isRevealing ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Personal Logo with Premium Animation */}
      <div className="relative">
        {/* Glow effect behind logo */}
        <div 
          className="absolute inset-0 blur-2xl opacity-20"
          style={{
            background: `radial-gradient(circle, hsl(var(--foreground)) 0%, transparent 70%)`,
            transform: `scale(${0.8 + (progress / 100) * 0.4})`,
            transition: 'transform 0.1s ease-out'
          }}
        />
        
        {/* Logo with reveal animation */}
        <div 
          className="relative w-24 h-24 md:w-32 md:h-32"
          style={{
            opacity: 0.3 + (progress / 100) * 0.7,
            transform: `scale(${0.9 + (progress / 100) * 0.1})`,
            transition: 'all 0.1s ease-out'
          }}
        >
          <img
            src={personalLogo}
            alt="ML"
            className="w-full h-full object-contain dark:invert"
            style={{
              filter: `brightness(${0.5 + (progress / 100) * 0.5})`,
              background: 'transparent'
            }}
          />
        </div>
      </div>
      
      {/* Progress Line */}
      <div className="w-32 h-[2px] bg-border mt-8 overflow-hidden rounded-full">
        <div 
          className="h-full bg-foreground transition-all duration-100 ease-out rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      {/* Subtle Loading Text */}
      <p className="font-mono text-xs text-muted-foreground mt-4 tracking-widest uppercase">
        Loading
      </p>
    </div>
  );
};

export default LoadingScreen;
