import { useState, useEffect } from "react";
import { Code, Database, Brain, Shield, Palette, Wrench } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ScrollReveal } from "@/hooks/useScrollReveal";

const Skills = () => {
  const [skillCategories, setSkillCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const iconMap: Record<string, any> = {
    "Programming": Code,
    "Frameworks": Wrench,
    "Databases": Database,
    "AI & ML": Brain,
    "Cybersecurity": Shield,
    "Creative Tools": Palette
  };

  useEffect(() => {
    document.title = "Skills - Manuth Lochana";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Explore Manuth Lochana's technical skills including programming languages, frameworks, AI/ML, databases, and creative tools.");
    }
    
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    const { data: skills, error } = await supabase
      .from('skills')
      .select('*')
      .order('category', { ascending: true });

    if (!error && skills) {
      const groupedSkills = skills.reduce((acc: any, skill: any) => {
        if (!acc[skill.category]) {
          acc[skill.category] = [];
        }
        acc[skill.category].push(skill.name);
        return acc;
      }, {});

      const categories = Object.entries(groupedSkills).map(([category, skillsList]) => ({
        title: category,
        Icon: iconMap[category] || Code,
        skills: skillsList as string[],
      }));

      setSkillCategories(categories);
    }
    setIsLoading(false);
  };

  const otherTools = [
    "Git", "GitHub", "Arduino", "IoT", "Docker", "Linux", "Postman"
  ];

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
              Tech Stack
            </span>
            <h1 className="font-display text-display-md md:text-display-lg font-bold text-foreground tracking-tight mb-6">
              Skills &<br />
              <span className="text-muted-foreground">Technologies</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              A toolkit I use to build modern web applications.
            </p>
          </header>
        </ScrollReveal>

        {/* Skills Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16" aria-label="Skill Categories">
          {skillCategories.map((category, index) => {
            const IconComponent = category.Icon;
            return (
              <ScrollReveal key={category.title} delay={index * 50}>
                <article className="minimal-card p-6 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-foreground" aria-hidden="true" />
                    </div>
                    <h2 className="font-display text-lg font-semibold text-foreground">
                      {category.title}
                    </h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill: string) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 bg-muted text-sm text-muted-foreground rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </section>

        {/* AI Focus Section */}
        <ScrollReveal>
          <article className="minimal-card p-8 md:p-12 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Brain className="w-6 h-6 text-foreground" aria-hidden="true" />
              <h2 className="font-display text-2xl font-bold text-foreground">
                AI Experiments
              </h2>
            </div>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Currently exploring AI development using Hugging Face's LLaMA fine-tuning techniques, 
              learning PEFT (Parameter-Efficient Fine-Tuning) methods for creating specialized AI models.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Hugging Face", "LLaMA 4", "PEFT", "Model Training", "AI Systems"].map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-foreground text-background text-sm font-medium rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </article>
        </ScrollReveal>

        {/* Other Tools */}
        <ScrollReveal delay={100}>
          <aside className="minimal-card p-6">
            <h2 className="font-display text-lg font-semibold text-foreground mb-4">
              Other Tools & Technologies
            </h2>
            <div className="flex flex-wrap gap-2">
              {otherTools.map((tool) => (
                <span
                  key={tool}
                  className="px-3 py-1.5 bg-muted text-sm text-muted-foreground rounded-full"
                >
                  {tool}
                </span>
              ))}
            </div>
          </aside>
        </ScrollReveal>
      </div>
    </main>
  );
};

export default Skills;
