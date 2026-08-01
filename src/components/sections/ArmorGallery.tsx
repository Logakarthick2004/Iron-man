"use client";

import { useState } from "react";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { AnimatedItem, AnimatedSection } from "@/components/ui/AnimatedSection";
import { HudFrame } from "@/components/ui/HudFrame";
import { Sparkle } from "@phosphor-icons/react";

type Suit = {
  id: string;
  name: string;
  codename: string;
  year: string;
  film: string;
  category: "Classic" | "Heavy" | "Nanotech";
  description: string;
  image: string;
  stats: {
    durability: number;
    power: number;
    speed: number;
    versatility: number;
  };
  features: string[];
};

const SUITS: Suit[] = [
  {
    id: "mk1",
    name: "Mark I",
    codename: "The Prototype",
    year: "2008",
    film: "Iron Man",
    category: "Classic",
    description: "Forged in a cave from crude missile parts and scrap metal. Powered by the first miniaturized Arc Reactor.",
    image: "/frames/frame_0015.jpg",
    stats: { durability: 65, power: 40, speed: 25, versatility: 30 },
    features: ["Dual Flamethrowers", "Crude Rocket Launcher", "Manually Welded Iron-Copper Plate"],
  },
  {
    id: "mk3",
    name: "Mark III",
    codename: "Gold-Titanium Alloy",
    year: "2008",
    film: "Iron Man",
    category: "Classic",
    description: "The iconic red and gold suit. Solved the high-altitude icing problem using gold-titanium alloy.",
    image: "/frames2/frame_0045.jpg",
    stats: { durability: 80, power: 75, speed: 82, versatility: 78 },
    features: ["Repulsor Transmitters", "Chest Unibeam", "Shoulder Micro-Munitions Pod"],
  },
  {
    id: "mk7",
    name: "Mark VII",
    codename: "Rapid Deployment",
    year: "2012",
    film: "The Avengers",
    category: "Classic",
    description: "Deployed via pod targeting armbands. Built for heavy combat during the Battle of New York.",
    image: "/frames/frame_0075.jpg",
    stats: { durability: 88, power: 85, speed: 86, versatility: 84 },
    features: ["Laser Array Wrist Cartridges", "Tri-Barreled Arm Rockets", "Backpack Thruster Pods"],
  },
  {
    id: "mk44",
    name: "Mark XLIV",
    codename: "Hulkbuster",
    year: "2015",
    film: "Avengers: Age of Ultron",
    category: "Heavy",
    description: "Modular heavy-duty orbital drop armor designed co-jointly with Bruce Banner to neutralize out-of-control threats.",
    image: "/frames/frame_0105.jpg",
    stats: { durability: 99, power: 98, speed: 50, versatility: 70 },
    features: ["Pneumatic Jackhammer Arms", "Independent Veronica Drop System", "Multi-Arc Reactor Relay"],
  },
  {
    id: "mk50",
    name: "Mark L",
    codename: "Nanotech Vanguard",
    year: "2018",
    film: "Avengers: Infinity War",
    category: "Nanotech",
    description: "Stored inside a detachable chest housing. Millions of nanoparticles form instant weapons, shields, and wings.",
    image: "/frames/frame_0135.jpg",
    stats: { durability: 95, power: 94, speed: 96, versatility: 99 },
    features: ["Instant Morphing Cannons", "Zero-Point Energy Shield", "Space-Capable Flight Wings"],
  },
  {
    id: "mk85",
    name: "Mark LXXXV",
    codename: "Ultimate Pinnacle",
    year: "2019",
    film: "Avengers: Endgame",
    category: "Nanotech",
    description: "The peak of Stark engineering combining nanotech fluid mechanics with raw Vibranium-infused structural strength.",
    image: "/frames2/frame_0165.jpg",
    stats: { durability: 100, power: 100, speed: 98, versatility: 100 },
    features: ["Infinity Gauntlet Harness", "Lightning Refocusing Energy Shield", "Sub-Atomic Nanotech Matrix"],
  },
];

export function ArmorGallery() {
  const [selectedCategory, setSelectedCategory] = useState<"All" | "Classic" | "Heavy" | "Nanotech">("All");
  const [activeSuitId, setActiveSuitId] = useState<string>("mk85");

  const filteredSuits = selectedCategory === "All"
    ? SUITS
    : SUITS.filter((s) => s.category === selectedCategory);

  const activeSuit = SUITS.find((s) => s.id === activeSuitId) || SUITS[5];

  return (
    <section id="armor-hall" className="relative border-t border-white/5 bg-background px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-14">
        <AnimatedSection className="flex flex-col gap-6">
          <AnimatedItem>
            <EyebrowBadge>STARK VAULT // HALL OF ARMOR</EyebrowBadge>
          </AnimatedItem>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <AnimatedItem>
              <h2 className="font-sans text-3xl font-semibold tracking-tighter text-foreground md:text-5xl lg:text-6xl">
                The Armor <span className="text-accent">Evolution</span>
              </h2>
            </AnimatedItem>
            <AnimatedItem>
              <div className="flex flex-wrap items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] p-1.5 backdrop-blur-md">
                {(["All", "Classic", "Heavy", "Nanotech"] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] transition-all duration-200 ${
                      selectedCategory === cat
                        ? "bg-accent text-background font-semibold shadow-[0_0_15px_rgba(212,162,47,0.4)]"
                        : "text-zinc-400 hover:text-foreground"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </AnimatedItem>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_440px]">
          {/* Suit selection cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredSuits.map((suit) => {
              const isActive = suit.id === activeSuit.id;
              return (
                <button
                  key={suit.id}
                  onClick={() => setActiveSuitId(suit.id)}
                  className={`card-surface group relative flex flex-col justify-between overflow-hidden rounded-2xl p-5 text-left transition-all duration-300 ${
                    isActive
                      ? "border-accent/70 bg-white/[0.09] shadow-[0_0_35px_-5px_rgba(212,162,47,0.3)]"
                      : "hover:border-white/20 hover:bg-white/[0.05]"
                  }`}
                >
                  <div className="flex flex-col gap-3">
                    <div className="relative h-44 w-full overflow-hidden rounded-xl border border-white/10 bg-black/50">
                      <img
                        src={suit.image}
                        alt={suit.name}
                        className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                      <div className="absolute left-2.5 top-2.5">
                        <HudFrame corner="tl" size={16} className="text-accent/80" />
                      </div>
                      <div className="absolute right-2.5 top-2.5">
                        <HudFrame corner="tr" size={16} className="text-accent/80" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
                        {suit.year} &middot; {suit.film}
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-zinc-400">
                        {suit.category}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-sans text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-accent">
                        {suit.name}
                      </h3>
                      <p className="font-mono text-[11px] text-zinc-400">{suit.codename}</p>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-white/8 pt-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                      Combat Readiness
                    </span>
                    <span className="font-mono text-sm font-semibold text-accent">
                      {suit.stats.power}%
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Suit Detail HUD Panel */}
          <div className="card-surface flex flex-col justify-between rounded-2xl border border-white/12 p-7 backdrop-blur-xl">
            <div className="flex flex-col gap-6">
              {/* Featured Suit Banner Image */}
              <div className="relative h-56 w-full overflow-hidden rounded-xl border border-white/15 bg-black/60 shadow-xl">
                <img
                  src={activeSuit.image}
                  alt={activeSuit.name}
                  className="h-full w-full object-cover object-center"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent" />
                <div className="absolute left-3 top-3 text-accent">
                  <HudFrame corner="tl" size={20} />
                </div>
                <div className="absolute right-3 top-3 text-accent">
                  <HudFrame corner="tr" size={20} />
                </div>
                <div className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-[0.28em] text-accent">
                  {activeSuit.name} // VISUAL FEED
                </div>
              </div>

              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-accent">
                    SELECTED MODEL
                  </span>
                  <h3 className="font-sans text-3xl font-bold tracking-tight text-foreground">
                    {activeSuit.name}
                  </h3>
                  <p className="font-mono text-xs text-zinc-400">{activeSuit.codename}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent shadow-[0_0_15px_rgba(212,162,47,0.3)]">
                  <Sparkle size={24} weight="bold" />
                </div>
              </div>

              <p className="font-sans text-sm leading-relaxed text-zinc-300">
                {activeSuit.description}
              </p>

              <div className="flex flex-col gap-3 font-mono">
                <span className="text-[10px] uppercase tracking-[0.28em] text-zinc-400">
                  Performance Metrics
                </span>
                {Object.entries(activeSuit.stats).map(([stat, val]) => (
                  <div key={stat} className="flex flex-col gap-1">
                    <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-zinc-400">
                      <span>{stat}</span>
                      <span className="text-foreground">{val}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-accent transition-all duration-500"
                        style={{ width: `${val}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2 font-mono">
                <span className="text-[10px] uppercase tracking-[0.28em] text-zinc-400">
                  Key Armaments &amp; Tech
                </span>
                <ul className="flex flex-col gap-1.5">
                  {activeSuit.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-xs text-zinc-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-4 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">
              <span>STATUS: ONLINE</span>
              <span>DEPLOYED: {activeSuit.year}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
