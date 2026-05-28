import { Aperture, Twitter, Instagram, Camera } from "lucide-react";
import { GradBtn } from "./btn";




export default function Footer() {
  return (
    <footer className="border-t border-white/5 pt-16 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-5 gap-10 mb-14">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, var(--primary), var(--chart-5))" }}>
                <Aperture size={15} className="text-white" />
              </div>
              <span className="font-display font-bold text-white text-lg">UJAS PhotoHub</span>
            </div>
            <p className="text-sm text-white/35 leading-relaxed max-w-xs mb-6">
              The premier destination for photography excellence. Discover, create, and connect with the world's best visual storytellers.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-white/25 outline-none focus:border-primary/50 transition-colors"
              />
              <GradBtn className="px-4 py-2.5 rounded-xl text-sm whitespace-nowrap">
                Subscribe
              </GradBtn>
            </div>
          </div>

          {[
            { title: "Platform", links: ["Explore", "Photographers", "Marketplace", "Pricing"] },
            { title: "Company", links: ["About Us", "Careers", "Press Kit", "Contact"] },
            { title: "Legal", links: ["Privacy Policy", "Terms of Use", "Cookie Policy", "Licenses"] },
          ].map((col) => (
            <div key={col.title}>
              <p className="font-semibold text-white text-sm mb-4">{col.title}</p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <button className="text-sm text-white/35 hover:text-white transition-colors">{link}</button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25">© 2026 UJAS PhotoHub. All rights reserved.</p>
          <div className="flex items-center gap-2">
            {[Instagram, Twitter, Camera].map((Icon, i) => (
              <button key={i} className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all border border-white/5">
                <Icon size={14} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
