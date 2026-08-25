import type { MetadataRoute } from "next";

const routes = ["","/behandlungen/","/behandlungen/gesicht/","/behandlungen/haut-laser/","/behandlungen/prp/","/haare/","/gesundheit/","/kosmetik/","/preise/","/arzt-praxis/","/ratgeber/","/termin/","/kontakt/","/impressum/","/datenschutz/"];
export default function sitemap(): MetadataRoute.Sitemap { return routes.map((route) => ({ url: `https://melimedics.de${route}`, lastModified: new Date(), changeFrequency: route === "" ? "weekly" : "monthly", priority: route === "" ? 1 : route.includes("behandlungen") || route === "/haare/" ? .8 : .6 })); }
