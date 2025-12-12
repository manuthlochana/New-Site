import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Send, ArrowUpRight } from "lucide-react";
import * as Icons from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { ScrollReveal } from "@/hooks/useScrollReveal";

const contactSchema = z.object({
  name: z.string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Name contains invalid characters"),
  email: z.string()
    .trim()
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters"),
  message: z.string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be less than 2000 characters")
});

// Memoized icon renderer to avoid re-creating on each render
const IconRenderer = ({ iconName }: { iconName?: string }) => {
  const IconComponent = useMemo(() => {
    if (!iconName) return Mail;
    return (Icons as any)[iconName] || Mail;
  }, [iconName]);
  
  return <IconComponent className="w-5 h-5" />;
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const { toast } = useToast();
  const [socialLinks, setSocialLinks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "Contact - Manuth Lochana";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Get in touch with Manuth Lochana. Let's discuss your next project or collaboration opportunity.");
    }
    
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: true });

      if (!error && data) {
        const formattedLinks = data.map((contact: any) => {
          const displayText = contact.username || contact.value;
          let fullUrl = contact.value;
          if (contact.platform === 'Email' && !contact.value.startsWith('mailto:')) {
            fullUrl = `mailto:${contact.value}`;
          }

          return {
            name: contact.platform,
            displayText,
            url: fullUrl,
            icon: contact.icon
          };
        });
        setSocialLinks(formattedLinks);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validated = contactSchema.parse(formData);
      
      const { error } = await supabase
        .from('messages')
        .insert([{
          name: validated.name,
          email: validated.email,
          message: validated.message
        }]);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to send message. Please try again.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Message sent!",
          description: "Thank you for reaching out. I'll get back to you soon!",
        });
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: err.errors[0].message,
          variant: "destructive"
        });
      }
    }
  };

  return (
    <main>
      <section className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-6">
          {/* Page Header */}
          <ScrollReveal>
            <header className="max-w-4xl mb-16">
              <span className="font-mono text-sm text-muted-foreground tracking-widest uppercase mb-4 block">
                Contact
              </span>
              <h1 className="font-display text-display-md md:text-display-lg font-bold text-foreground tracking-tight mb-6">
                Let's Work<br />
                <span className="text-muted-foreground">Together</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Have a project in mind? Let's create something extraordinary together.
              </p>
            </header>
          </ScrollReveal>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <ScrollReveal delay={50}>
                <div className="minimal-card p-8">
                  <h2 className="font-display text-xl font-bold text-foreground mb-6">
                    Send a Message
                  </h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-2">
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="bg-background border-border focus:border-foreground"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-background border-border focus:border-foreground"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-2">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="bg-background border-border focus:border-foreground resize-none"
                        placeholder="Tell me about your project..."
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="default"
                      size="lg"
                      className="w-full"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </div>
              </ScrollReveal>

              {/* Contact Info & Social Links */}
              <aside className="space-y-6">
                <ScrollReveal delay={100}>
                  <div className="minimal-card p-8">
                    <h2 className="font-display text-xl font-bold text-foreground mb-4">
                      Get in Touch
                    </h2>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      I'm always interested in discussing new opportunities, creative projects, 
                      or just having a chat about technology and innovation.
                    </p>

                    <address className="space-y-3 not-italic">
                      <div className="flex items-center text-muted-foreground">
                        <Mail className="w-4 h-4 mr-3 text-foreground" />
                        <a href="mailto:manuth.dev@gmail.com" className="text-sm hover:text-foreground transition-colors">
                          manuth.dev@gmail.com
                        </a>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <div className="w-4 h-4 mr-3 flex items-center justify-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        </div>
                        <span className="text-sm">Available for new opportunities</span>
                      </div>
                    </address>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={150}>
                  <nav className="minimal-card p-8" aria-label="Social Links">
                    <h2 className="font-display text-xl font-bold text-foreground mb-6">
                      Connect
                    </h2>
                    <div className="space-y-3">
                      {isLoading ? (
                        // Skeleton loader for instant feedback
                        Array.from({ length: 3 }).map((_, i) => (
                          <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 animate-pulse">
                            <div className="flex items-center gap-3">
                              <div className="w-5 h-5 bg-muted rounded" />
                              <div className="space-y-1">
                                <div className="w-20 h-4 bg-muted rounded" />
                                <div className="w-32 h-3 bg-muted rounded" />
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        socialLinks.map((link) => (
                          <a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors group"
                          >
                            <div className="flex items-center gap-3">
                              <div className="text-muted-foreground group-hover:text-foreground transition-colors">
                                <IconRenderer iconName={link.icon} />
                              </div>
                              <div>
                                <div className="font-medium text-foreground text-sm">
                                  {link.name}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {link.displayText}
                                </div>
                              </div>
                            </div>
                            <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </a>
                        ))
                      )}
                    </div>
                  </nav>
                </ScrollReveal>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
