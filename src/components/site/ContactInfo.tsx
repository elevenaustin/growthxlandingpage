import { Phone, Mail, Clock, MapPin } from "lucide-react";
import { Reveal } from "../motion/Reveal";

const contactDetails = [
  {
    icon: Phone,
    label: "PHONE",
    value: "+91 82699 39518",
    href: "https://wa.me/918269939518",
    isExternal: true,
  },
  {
    icon: Mail,
    label: "EMAIL",
    value: "reply@thegrowthxstudio.com",
    href: "mailto:reply@thegrowthxstudio.com",
    isExternal: false,
  },
  {
    icon: Clock,
    label: "HOURS",
    value: "Mon–Sat · 10:00 – 19:00 IST",
    href: "#start",
    isExternal: false,
  },
  {
    icon: MapPin,
    label: "LOCATION",
    value: "Raipur, Chhattisgarh",
    href: "https://maps.google.com/?q=Raipur,+Chhattisgarh",
    isExternal: true,
  },
];

export function ContactInfo() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const el = document.getElementById(href.substring(1));
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="contact-info" className="mx-auto max-w-6xl px-5 py-20 scroll-mt-20">
      <Reveal>
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-[#120F1D] px-4 py-1.5 text-xs font-semibold text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Contact Info
          </div>
          
          {/* Heading */}
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Agency Details
          </h2>
        </div>
      </Reveal>

      {/* Cards Grid */}
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
        {contactDetails.map((item, i) => (
          <Reveal key={item.label} delay={i * 0.08}>
            <a
              href={item.href}
              target={item.isExternal ? "_blank" : undefined}
              rel={item.isExternal ? "noopener noreferrer" : undefined}
              onClick={(e) => handleClick(e, item.href)}
              className="group flex flex-col h-full justify-start rounded-3xl border border-border bg-card p-6 text-left shadow-lg transition-all duration-300 hover:border-primary/45 hover:shadow-[0_0_30px_-5px_rgba(139,92,246,0.15)] hover:-translate-y-1 cursor-pointer"
            >
              {/* Icon Container */}
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                <item.icon className="h-5 w-5" />
              </div>
              
              {/* Label */}
              <div className="mt-6 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                {item.label}
              </div>
              
              {/* Value */}
              <div className="mt-2.5 text-sm font-bold text-white break-words sm:text-base leading-tight">
                {item.value}
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
