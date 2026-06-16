import type { ImageMetadata } from 'astro';
import palimpsestHero from '../assets/Palimpsest Assets/Library Hero.png';

export type Project = {
  slug: string;
  title: string;
  date: string;
  blurb: string;
  // Gradient stops fed to the shader, plus the light text color for type on top.
  palette: { c1: string; c2: string; c3: string; text: string };
  link?: { label: string; href: string };
  image?: ImageMetadata;
};

// Newest first → oldest last. Facts, dates, palettes from projects.md.
export const projects: Project[] = [
  {
    slug: 'increment',
    title: 'Increment',
    date: 'May 2026',
    blurb:
      'A mobile-first PWA workout tracker running as a single Cloudflare Worker on the edge. Google sign in, session logging, analytics, a weekly plan builder, and an exercise library. Built solo across the whole stack with D1 and Chart.js. Active, not deployed publicly yet.',
    palette: { c1: '#1E40AF', c2: '#2563EB', c3: '#22D3EE', text: '#F0F9FF' },
  },
  {
    slug: 'millfield-county',
    title: 'Millfield County',
    date: 'April 2026',
    blurb:
      'A static narrative website pretending to be a calm 2002 county portal. Log into the staff intranet with a clue from a published article, dig through a restricted archive into a cold case, then dial a working touch tone phone that rewrites the homepage. Vanilla HTML, CSS, and JavaScript. A companion to Palimpsest, set in the same town.',
    palette: { c1: '#1E5F8C', c2: '#2E8B7A', c3: '#8A8A3C', text: '#F2EFE0' },
  },
  {
    slug: 'palimpsest',
    title: 'Palimpsest',
    date: 'April 2026 · UT AET Showcase',
    blurb:
      'A point-and-click narrative horror game built in Godot with a three person team. You play Nolan, a worker at a movie theater in the town of Millfield. I led programming: the architecture, a dual mode interactable system, two character dialogue with animated portraits, plus the start menu and showcase art.',
    palette: { c1: '#1B6CFF', c2: '#3A0CA3', c3: '#FF2D55', text: '#FFFFFF' },
    link: {
      label: 'View on Notion',
      href: 'https://app.notion.com/p/haydenporter/Palimpsest-2D-Horror-Game-In-Dev-27a6b625dba38034a5f5e1a8c7f7e5f1',
    },
    image: palimpsestHero,
  },
  {
    slug: 'the-house-always-wins',
    title: 'The House Always Wins',
    date: 'Spring 2026',
    blurb:
      'An interactive data visualization game about online sports wagering. Each in game day maps to a real month of Connecticut betting data, so the house edge plays out in mechanics instead of charts. Vanilla web with Canvas and ES modules. A solo build for Introduction to UI Experience.',
    palette: { c1: '#0E8A43', c2: '#D4AF37', c3: '#D11F2D', text: '#FBF7EC' },
    link: {
      label: 'View on Notion',
      href: 'https://app.notion.com/p/haydenporter/The-House-Always-Wins-3126b625dba3808d9db8fd0cc5417a83',
    },
  },
  {
    slug: 'taco-bell-dashboard',
    title: 'Taco Bell Social Listening Dashboard',
    date: 'April 2025',
    blurb:
      'An interactive Tableau dashboard reading Taco Bell’s social performance across reach, sentiment, and category engagement. A 9 PM engagement peak, 100K posts, and 100.73B cumulative reach. This work earned my Tableau Desktop Analyst certification.',
    palette: { c1: '#5B1FB0', c2: '#A21CAF', c3: '#EC4899', text: '#FFF5FB' },
    link: {
      label: 'View on Notion',
      href: 'https://app.notion.com/p/haydenporter/Taco-Bell-Social-Listening-Dashboard-27c6b625dba3803886b4d69637e6c436',
    },
  },
  {
    slug: 'the-public-ingredient',
    title: 'The Public Ingredient',
    date: 'March 2025',
    blurb:
      'A ten minute app pitch delivered to podcast host Rebecca McInroy. The concept helps people find nearby healthy, affordable food. I designed the Figma wireframes and interactive mockups. My professor still shares it with future classes.',
    palette: { c1: '#2E9E5B', c2: '#84C44A', c3: '#F0902A', text: '#FCFFF7' },
    link: {
      label: 'View on Notion',
      href: 'https://app.notion.com/p/haydenporter/The-Public-Ingredient-Figma-Pitch-27a6b625dba380c3a794e28e98218cfe',
    },
  },
  {
    slug: 'leave-no-trace',
    title: 'Leave No Trace',
    date: 'December 2022',
    blurb:
      'A citizen action short film arguing that local government should take on beach pollution. Seven minutes built around the Coastal Basket Program, a real litter collection initiative. I wrote, shot, and edited it. Still my benchmark for craft.',
    palette: { c1: '#0E7490', c2: '#0EA5A5', c3: '#10B981', text: '#EFFAF7' },
    link: { label: 'Watch on YouTube', href: 'https://www.youtube.com/watch?v=fbTP3Gn3J1I' },
  },
];
