import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowDown, Code, Palette, Layers, Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ScrollReveal } from "@/hooks/useScrollReveal";
import { Parallax } from "@/hooks/useParallax";

const Home = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Manuth Lochana - Developer & Tech Innovator";
    loadProfileImage();
  }, []);

  const loadProfileImage = async () => {
    try {
      const { data: files, error } = await supabase.storage
        .from('profile-pictures')
        .list('', { limit: 1 });

      if (!error && files && files.length > 0) {
        const { data } = supabase.storage
          .from('profile-pictures')
          .getPublicUrl(files[0].name);
        
        setProfileImage(data.publicUrl);
      }
    } catch (error) {
      console.error('Error loading profile image:', error);
    }
  };

  const services = [
    {
      icon: Code,
      title: "Development",
      description: "Building robust web applications with modern technologies and best practices."
    },
    {
      icon: Palette,
      title: "Design & Creative",
      description: "Crafting visually stunning designs that connect with your audience."
    },
    {
      icon: Layers,
      title: "Web & Mobile App",
      description: "Transforming ideas into exceptional web and mobile app experiences."
    },
    {
      icon: Zap,
      title: "AI Integrations",
      description: "I build applications using modern technologies."
    }
  ];

  const stats = [
    { value: "3+", label: "Years Coding" },
    { value: "20+", label: "Projects Built" },
    { value: "100%", label: "Dedication" },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center relative pt-20 pb-16">
        {/* Parallax Background Elements */}
        <Parallax speed={0.15} className="absolute top-1/4 right-10 pointer-events-none">
          <div className="w-64 h-64 rounded-full bg-accent/5 blur-3xl" />
        </Parallax>
        <Parallax speed={0.1} direction="down" className="absolute bottom-1/4 left-10 pointer-events-none">
          <div className="w-48 h-48 rounded-full bg-secondary blur-2xl" />
        </Parallax>
        
        <div className="section-container w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text Content */}
            <ScrollReveal className="order-2 lg:order-1">
              <div className="space-y-6">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-full text-sm font-medium">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Available for work
                </div>

                {/* Main Heading */}
                <h1 className="font-display text-display-xl tracking-tight">
                  Hello<span className="text-accent">.</span>
                  <br />
                  <span className="text-muted-foreground">I'm Manuth</span>
                </h1>

                {/* Description */}
                <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed">
                  A <span className="text-foreground font-medium">Software Developer</span> from Sri Lanka 
                  and the founder of Thunder Storm Studio. Building innovative 
                  digital products and experiences.
                </p>

                {/* CTA Buttons */}
                <nav className="flex flex-wrap gap-4 pt-4" aria-label="Primary Actions">
                  <Link 
                    to="/projects"
                    className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-full font-medium hover:opacity-80 transition-opacity"
                  >
                    View Projects
                    <ArrowUpRight size={18} />
                  </Link>
                  <Link 
                    to="/contact"
                    className="inline-flex items-center gap-2 border border-foreground px-6 py-3 rounded-full font-medium hover:bg-foreground hover:text-background transition-colors"
                  >
                    Get in Touch
                  </Link>
                </nav>

                {/* Quick Info */}
                <div className="flex flex-wrap gap-6 pt-8 text-sm text-muted-foreground">
                  <div>
                    <span className="block text-foreground font-semibold">Based in</span>
                    Sri Lanka
                  </div>
                  <div>
                    <span className="block text-foreground font-semibold">Focus</span>
                    Web Development
                  </div>
                  <div>
                    <span className="block text-foreground font-semibold">Experience</span>
                    3+ Years
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Profile Image with Parallax */}
            <ScrollReveal className="order-1 lg:order-2 flex justify-center lg:justify-end" delay={100}>
              <Parallax speed={0.08}>
                <div className="relative">
                  {/* Decorative elements with subtle parallax */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 border border-accent/30 rounded-full"></div>
                  <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/5 rounded-full"></div>
                  
                  {/* Main Image */}
                  <figure className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                    <img
                      src={profileImage || "/src/assets/profile-photo.jpg"}
                      alt="Manuth Lochana - Software Developer"
                      className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-500"
                      fetchPriority="high"
                      loading="eager"
                    />
                    {/* Circle accent */}
                    <div className="absolute inset-0 rounded-full border-2 border-foreground/10"></div>
                  </figure>
                </div>
              </Parallax>
            </ScrollReveal>
          </div>

          {/* Scroll Indicator */}
          <div className="hidden lg:flex justify-center mt-16">
            <a href="#services" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors animate-bounce">
              <span className="text-sm font-mono">Scroll</span>
              <ArrowDown size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* Skills Marquee */}
      <section className="py-12 border-y border-border overflow-hidden bg-secondary/50" aria-label="Skills">
        <div className="marquee">
          <div className="marquee-content">
            {["DESIGN", "★", "DEVELOPMENT", "★", "BRANDING", "★", "STRATEGY", "★", "REACT", "★", "AI", "★", "PYTHON", "★"].map((item, i) => (
              <span key={i} className="text-lg md:text-xl font-display font-medium text-muted-foreground whitespace-nowrap">
                {item}
              </span>
            ))}
          </div>
          <div className="marquee-content" aria-hidden="true">
            {["DESIGN", "★", "DEVELOPMENT", "★", "BRANDING", "★", "STRATEGY", "★", "REACT", "★", "AI", "★", "PYTHON", "★"].map((item, i) => (
              <span key={i} className="text-lg md:text-xl font-display font-medium text-muted-foreground whitespace-nowrap">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 md:py-32 relative">
        <Parallax speed={0.05} className="absolute top-0 left-1/4 pointer-events-none">
          <div className="w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
        </Parallax>
        
        <div className="section-container relative z-10">
          {/* Section Header */}
          <ScrollReveal>
            <header className="max-w-2xl mb-16">
              <span className="font-mono text-sm text-muted-foreground tracking-widest uppercase mb-4 block">
                What I Do
              </span>
              <h2 className="font-display text-display-md tracking-tight mb-6">
                I build applications using modern technologies.
              </h2>
              <p className="text-muted-foreground text-lg">
                I bring ideas to life through thoughtful design and clean code.
              </p>
            </header>
          </ScrollReveal>

          {/* Services Grid */}
          <ScrollReveal delay={100}>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 border border-border rounded-lg overflow-hidden">
              {services.map((service) => (
                <article 
                  key={service.title}
                  className="service-card group cursor-pointer hover:bg-secondary transition-colors"
                >
                  <service.icon className="w-8 h-8 mb-6 text-muted-foreground group-hover:text-foreground transition-colors" aria-hidden="true" />
                  <h3 className="font-display font-semibold text-lg mb-3">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                </article>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats Section */}
      <ScrollReveal>
        <section className="py-16 bg-secondary" aria-label="Statistics">
          <div className="section-container">
            <div className="grid md:grid-cols-3">
              {stats.map((stat, index) => (
                <div 
                  key={stat.label}
                  className={`stat-card ${index === 1 ? 'bg-foreground text-background' : ''}`}
                >
                  <div className={`font-display text-5xl md:text-6xl font-bold mb-2 ${index === 1 ? '' : 'text-foreground'}`}>
                    {stat.value}
                  </div>
                  <div className={`text-sm font-mono uppercase tracking-wider ${index === 1 ? 'text-background/70' : 'text-muted-foreground'}`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* CTA Section */}
      <section className="py-20 md:py-32 relative">
        <Parallax speed={0.1} direction="down" className="absolute bottom-0 right-1/4 pointer-events-none">
          <div className="w-72 h-72 rounded-full bg-secondary blur-3xl" />
        </Parallax>
        
        <div className="section-container text-center relative z-10">
          <ScrollReveal>
            <div className="max-w-2xl mx-auto">
              <div className="w-16 h-16 mx-auto mb-8 flex items-center justify-center bg-secondary rounded-full">
                <span className="text-3xl" role="img" aria-label="Handshake">🤝</span>
              </div>
              <h2 className="font-display text-display-md tracking-tight mb-6">
                Tell me about your next project
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Ready to start your project? Let's discuss how we can work together.
              </p>
              <nav className="flex flex-wrap justify-center gap-4" aria-label="Call to Action">
                <Link 
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-foreground text-background px-8 py-4 rounded-full font-medium hover:opacity-80 transition-opacity"
                >
                  Get in Touch
                  <ArrowUpRight size={18} />
                </Link>
                <Link 
                  to="/projects"
                  className="inline-flex items-center gap-2 border border-foreground px-8 py-4 rounded-full font-medium hover:bg-foreground hover:text-background transition-colors"
                >
                  View Work
                </Link>
              </nav>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
};

export default Home;
