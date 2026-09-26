import portfolioData from "../content/portfolio.json";

export type PortfolioContent = {
  site: { name: string; portfolioLabel: string; eyebrow: string; role: string; intro: string; email: string; location: string; heroImage: string };
  theme: { background: string; surface: string; accent: string; text: string };
  navItems: { label: string; href: string }[];
  tags: string[];
  stats: { value: string; label: string }[];
  about: string;
  expertise: { number: string; title: string; text: string }[];
  projects: { number: string; category: string; title: string; summary: string; role: string; result: string; logo?: string; className?: string }[];
  trainings: { eyebrow: string; title: string; image: string; text: string; meta: string[]; href: string }[];
  designWorks: { src: string; title: string; type: string; className: string }[];
  directCollaborations: { organization: string; scope: string }[];
  relations: { name: string; src: string }[];
  credentialGroups: { title: string; items: string[] }[];
  experiences: { period: string; role: string; company: string; summary: string }[];
  recommendation: { quote: string; author: string; authorRole: string; href: string };
  downloads: { type: string; title: string; details: string; href: string; featured?: boolean }[];
};

export const defaultPortfolioContent = portfolioData as PortfolioContent;

