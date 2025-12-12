import { useState, useEffect } from "react";
import { GraduationCap, BookOpen, Target, Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ScrollReveal } from "@/hooks/useScrollReveal";

const Education = () => {
  const [educationItems, setEducationItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const iconMap: Record<string, any> = {
    "Completed": GraduationCap,
    "In Progress": BookOpen,
    "Ongoing": Target,
    "Planned": Zap
  };

  useEffect(() => {
    document.title = "Education - Manuth Lochana";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Discover Manuth Lochana's educational background and continuous learning journey in software development and technology.");
    }
    
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    const { data, error } = await supabase
      .from('education')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setEducationItems(data);
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
              Background
            </span>
            <h1 className="font-display text-display-md md:text-display-lg font-bold text-foreground tracking-tight mb-6">
              Education &<br />
              <span className="text-muted-foreground">Learning</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              A continuous journey of learning and growth in software development and technology.
            </p>
          </header>
        </ScrollReveal>

        <div className="max-w-3xl mx-auto">
          {/* Education Timeline */}
          <section className="space-y-6 mb-12" aria-label="Education History">
            {educationItems.map((item, index) => {
              const IconComponent = iconMap[item.status] || GraduationCap;
              return (
                <ScrollReveal key={item.id} delay={index * 50}>
                  <article className="minimal-card p-6 md:p-8">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center shrink-0">
                        <IconComponent className="w-5 h-5 text-foreground" aria-hidden="true" />
                      </div>
                      
                      <div className="flex-grow min-w-0">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                          <h2 className="font-display text-xl font-bold text-foreground">
                            {item.course}
                          </h2>
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium w-fit ${
                            item.status === 'Completed' 
                              ? 'bg-foreground text-background' 
                              : 'bg-muted text-muted-foreground'
                          }`}>
                            {item.status}
                          </span>
                        </div>
                        <p className="text-foreground font-medium mb-2">{item.institution}</p>
                        <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </article>
                </ScrollReveal>
              );
            })}
          </section>

          {/* Career Focus */}
          <ScrollReveal delay={100}>
            <article className="minimal-card p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-6 h-6 text-foreground" aria-hidden="true" />
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Career Focus
                </h2>
              </div>
              
              <div className="border-t border-border pt-6">
                <h3 className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-3">
                  Aspiration
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Aspiring software engineer combining technical expertise with creative vision. 
                  My goal is to bridge the gap between cutting-edge technology and innovative design, 
                  creating solutions that are both functionally robust and visually compelling.
                </p>
              </div>
            </article>
          </ScrollReveal>
        </div>
      </div>
    </main>
  );
};

export default Education;