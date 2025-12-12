import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/manuth-lochana/" },
    { name: "GitHub", url: "https://github.com/manuthlochana" },
    { name: "X", url: "https://x.com/manuthlochana" },
  ];

  const navLinks = [
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Skills", path: "/skills" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <footer className="border-t border-border">
      <div className="section-container py-16 md:py-20">
        {/* Top Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="font-display text-display-sm mb-4">
              Let's work together
            </h2>
            <p className="text-muted-foreground max-w-md mb-6">
              Have a project in mind? I'd love to hear about it. 
              Let's discuss how we can create something amazing.
            </p>
            <Link 
              to="/contact"
              className="inline-flex items-center gap-2 text-base font-medium bg-foreground text-background px-6 py-3 rounded-full hover:opacity-80 transition-opacity"
            >
              Get in Touch
              <ArrowUpRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-medium mb-4 text-sm uppercase tracking-wider text-muted-foreground">
                Navigation
              </h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.path}
                      className="text-foreground hover:text-muted-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4 text-sm uppercase tracking-wider text-muted-foreground">
                Connect
              </h4>
              <ul className="space-y-3">
                {socialLinks.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-foreground hover:text-muted-foreground transition-colors"
                    >
                      {link.name}
                      <ArrowUpRight size={14} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-lg">Manuth<span className="text-accent">.</span></span>
          </div>
          
          <p className="text-sm text-muted-foreground text-center">
            © {currentYear} Manuth Lochana. All rights reserved.
          </p>
          
          <p className="text-sm text-muted-foreground">
            Built with a lot of coffee cups and sleepless nights.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
