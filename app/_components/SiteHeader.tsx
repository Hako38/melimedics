"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { visibleContact } from "../_data/practice";
import { mediaSlots } from "../_data/media";

const navigation = [
  ["Behandlungen", "/behandlungen/"],
  ["Haare", "/haare/"],
  ["Preise", "/preise/"],
  ["Arzt & Praxis", "/arzt-praxis/"],
  ["Ratgeber", "/ratgeber/"],
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""} ${open ? "menu-open" : ""}`}>
      <div className="header-inner">
        <Link className="brand" href="/" aria-label="Melimedics Startseite">
          <span className="brand-logo"><Image src={mediaSlots.brandLogo.src} alt="" fill priority sizes="(max-width: 768px) 9rem, 11rem"/></span>
        </Link>
        <nav className="desktop-nav" aria-label="Hauptnavigation">
          {navigation.map(([label, href]) => <Link key={href} href={href} aria-current={pathname.startsWith(href) ? "page" : undefined}>{label}</Link>)}
        </nav>
        <Link className="button button-primary header-cta" href="/termin/">Termin buchen <span aria-hidden="true">↗</span></Link>
        <Link className="mobile-booking" href="/termin/">Termin</Link>
        <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Menü schließen" : "Menü öffnen"} onClick={() => setOpen((value) => !value)}><span/><span/></button>
      </div>
      <div className="mobile-panel" id="mobile-navigation" aria-hidden={!open}>
        <nav aria-label="Mobile Navigation">
          {navigation.map(([label, href], index) => <Link key={href} href={href} onClick={() => setOpen(false)}><span>0{index + 1}</span>{label}</Link>)}
          <Link href="/termin/" onClick={() => setOpen(false)}><span>06</span>Termin buchen</Link>
        </nav>
        <div><a href={visibleContact.phoneHref}>{visibleContact.phone}</a><a href={visibleContact.emailHref}>{visibleContact.email}</a></div>
      </div>
    </header>
  );
}
