import { useState, useEffect } from "react";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { ScrollReveal } from "@/hooks/useScrollReveal";

const Projects = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "Projects - Manuth Lochana";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Explore Manuth Lochana's portfolio of web development, AI, and software projects. View featured work and open-source contributions.");
    }
    
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setProjects(data);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <main className="min-h-screen pt-32 pb-20 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-muted border-t-foreground rounded-full animate-spin" />
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6">
        {/* Page Header */}
        <ScrollReveal>
          <header className="max-w-4xl mb-16">
            <span className="font-mono text-sm text-muted-foreground tracking-widest uppercase mb-4 block">
              Portfolio
            </span>
            <h1 className="font-display text-display-md md:text-display-lg font-bold text-foreground tracking-tight mb-6">
              Featured<br />
              <span className="text-muted-foreground">Projects</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              A curated selection of projects showcasing my passion for coding in full-stack development, AI integration, and creative technology solutions.
            </p>
          </header>
        </ScrollReveal>

        {/* Projects Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16" aria-label="Project List">
          {projects.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 50}>
              <article className="group minimal-card p-6 md:p-8 h-full flex flex-col">
                {/* Project Number */}
                <span className="font-mono text-xs text-muted-foreground tracking-widest mb-4">
                  {String(index + 1).padStart(2, '0')}
                </span>
                
                <h2 className="font-display text-2xl font-bold text-foreground mb-3 group-hover:text-muted-foreground transition-colors">
                  {project.title}
                </h2>
                
                <p className="text-muted-foreground mb-6 leading-relaxed flex-grow">
                  {project.description}
                </p>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies?.map((tech: string) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-muted text-xs text-muted-foreground rounded-full font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Project Link */}
                {project.link && (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-foreground font-medium group/link"
                  >
                    View Project
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </a>
                )}
              </article>
            </ScrollReveal>
          ))}
        </section>

        {/* GitHub CTA */}
        <ScrollReveal>
          <aside className="minimal-card p-8 md:p-12 text-center">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              Explore More Projects
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Check out my GitHub for more projects and open-source contributions
            </p>
            <Button
              asChild
              variant="default"
              size="lg"
            >
              <a 
                href="https://github.com/manuthlochana" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Github className="w-5 h-5 mr-2" />
                View GitHub Profile
              </a>
            </Button>
          </aside>
        </ScrollReveal>
      </div>
    </main>
  );
};

export default Projects;