import type { MetadataRoute } from "next";
import { treatments } from "./_data/treatments";
import { absoluteUrl } from "./_lib/site-config";

const routes = ["","/behandlungen/","/behandlungsfinder/","/behandlungen/gesicht/","/behandlungen/haut-laser/","/behandlungen/prp/",...treatments.map(({href}) => href),"/haare/","/gesundheit/","/kosmetik/","/preise/","/arzt-praxis/","/termin/","/kontakt/"];
export default function sitemap(): MetadataRoute.Sitemap { return routes.map((route) => ({ url: absoluteUrl(route || "/"), changeFrequency: route === "" ? "weekly" : "monthly", priority: route === "" ? 1 : route.includes("behandlungen") || route === "/haare/" ? .8 : .6 })); }
