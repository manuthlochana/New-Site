import { useEffect } from "react";
import { ScrollReveal } from "@/hooks/useScrollReveal";
import companyLogo from "@/assets/company-logo.png";

const About = () => {
  useEffect(() => {
    document.title = "About - Manuth Lochana";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Learn about Manuth Lochana, a software developer from Sri Lanka and founder of Thunder Storm Studio. Discover my story, values, and approach to technology.");
    }
  }, []);

  return (
    <main>
      <section className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Page Header */}
            <ScrollReveal>
              <span className="font-mono text-sm text-muted-foreground tracking-widest uppercase mb-4 block">
                About
              </span>
              <h1 className="font-display text-display-md md:text-display-lg font-bold text-foreground tracking-tight mb-8">
                The Story Behind<br />
                <span className="text-muted-foreground">the Code</span>
              </h1>
            </ScrollReveal>
            
            {/* Main Content */}
            <ScrollReveal delay={100}>
              <article className="minimal-card p-8 md:p-12 mb-8">
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
                  I'm <span className="text-foreground font-semibold">Manuth Lochana</span>, passionate about technology, coding, and creative innovation. I work on projects that combine software development, AI, and design.
                </p>
                
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                  Additionally, I explore advanced technologies including AI fine-tuning, system optimization, and creative problem-solving. My journey combines technical expertise with creative vision, allowing me to build innovative solutions that bridge the gap between functionality and aesthetics.
                </p>

                <div className="flex flex-wrap gap-3">
                  {["AI Enthusiast", "Creative Developer", "Tech Innovator"].map((tag) => (
                    <span 
                      key={tag}
                      className="px-4 py-2 bg-muted text-foreground text-sm font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </ScrollReveal>

            {/* Thunder Storm Studio Section */}
            <ScrollReveal delay={200}>
              <article className="minimal-card p-8 md:p-12">
                <div className="flex items-center gap-4 mb-6">
                  <div 
                    className="logo-masked w-10 h-10 text-foreground"
                    style={{ 
                      maskImage: `url(${companyLogo})`,
                      WebkitMaskImage: `url(${companyLogo})`
                    }}
                    role="img"
                    aria-label="Thunder Storm Studio Logo"
                  />
                  <h2 className="font-display text-2xl font-bold text-foreground">
                    Thunder Storm Studio
                  </h2>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Through Thunder Storm Studio, I create personal projects that blend my technical skills with creative design.
                </p>
              </article>
            </ScrollReveal>

            {/* Values Grid */}
            <ScrollReveal delay={300}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                {[
                  { title: "Innovation", desc: "Pushing boundaries with cutting-edge solutions" },
                  { title: "Quality", desc: "Meticulous attention to every detail" },
                  { title: "Impact", desc: "Creating meaningful digital experiences" }
                ].map((value, index) => (
                  <div 
                    key={value.title}
                    className="minimal-card p-6 text-center"
                  >
                    <span className="font-mono text-xs text-muted-foreground tracking-widest">
                      0{index + 1}
                    </span>
                    <h3 className="font-display text-xl font-bold text-foreground mt-2 mb-2">
                      {value.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {value.desc}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
