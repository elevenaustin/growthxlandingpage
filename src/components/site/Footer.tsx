import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export function Footer() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t border-border bg-card/45 pt-16 pb-8">
      <div className="mx-auto max-w-6xl px-5">
        
        {/* Footer Top Grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Col 1: Branding */}
          <div className="flex flex-col gap-4">
            <button
              onClick={() => scrollToSection("home")}
              className="flex items-center gap-2.5 cursor-pointer hover:opacity-90 self-start"
            >
              <img
                src="/logo.jpg"
                alt="GrowthX Studio"
                className="h-9 w-9 rounded-full object-cover border border-primary/20"
              />
              <span className="text-base font-extrabold tracking-tight text-white">
                GrowthX Studio
              </span>
            </button>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
              Scale Smarter. Grow Faster.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Quick Links</h4>
            <div className="mt-4 flex flex-col gap-2.5 text-xs text-muted-foreground">
              {[
                { label: "Home", id: "home" },
                { label: "Why Choose Us", id: "why-choose-us" },
                { label: "Client Results", id: "results" },
                { label: "Contact Info", id: "contact-info" },
                { label: "FAQ", id: "faq" },
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-left transition-colors hover:text-white cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Col 3: Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Contact</h4>
            <div className="mt-4 flex flex-col gap-3 text-xs text-muted-foreground">
              <a
                href="mailto:reply@thegrowthxstudio.com"
                className="flex items-center gap-2 transition-colors hover:text-white"
              >
                <Mail className="h-3.5 w-3.5 text-primary" />
                <span>reply@thegrowthxstudio.com</span>
              </a>
              <a
                href="tel:+918269939518"
                className="flex items-center gap-2 transition-colors hover:text-white"
              >
                <Phone className="h-3.5 w-3.5 text-primary" />
                <span>+91 82699 39518</span>
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="h-3.5 w-3.5 text-primary mt-0.5" />
                <span>Raipur, Chhattisgarh</span>
              </div>
            </div>
          </div>

          {/* Col 4: Newsletter */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Newsletter</h4>
            <p className="text-[11px] leading-relaxed text-muted-foreground">
              Subscribe to get the latest tips & strategies on ads & growth.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-2 flex overflow-hidden rounded-full border border-border bg-background"
            >
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="w-full bg-transparent px-4 py-2 text-xs text-white placeholder-muted-foreground focus:outline-none"
              />
              <button
                type="submit"
                className="bg-primary px-4 text-xs font-bold text-white transition-colors hover:bg-primary-glow flex items-center justify-center cursor-pointer"
              >
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>

        </div>

        {/* Footer Bottom Copyright */}
        <div className="mt-16 border-t border-border/60 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-muted-foreground">
          <div>© {new Date().getFullYear()} GrowthX Studio. All rights reserved.</div>
          <div className="flex items-center gap-4 font-semibold">
            <a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a>
            <span className="text-border/40 font-normal">|</span>
            <a href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}