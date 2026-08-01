"use client";

import { useState } from "react";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { AnimatedItem, AnimatedSection } from "@/components/ui/AnimatedSection";
import { TerminalWindow, Play, Trash, Cpu, ShieldCheck } from "@phosphor-icons/react";

type LogEntry = {
  timestamp: string;
  type: "INFO" | "SUCCESS" | "WARN" | "CRITICAL";
  message: string;
};

const INITIAL_LOGS: LogEntry[] = [
  { timestamp: "10:04:12", type: "INFO", message: "J.A.R.V.I.S. v8.54 system initialization complete." },
  { timestamp: "10:04:14", type: "SUCCESS", message: "Arc Reactor Cold-Fusion Core linked @ 3.4 GJ/s output." },
  { timestamp: "10:04:18", type: "INFO", message: "Vibranium nanoparticle lattice synced across Mark LXXXV chassis." },
  { timestamp: "10:04:22", type: "SUCCESS", message: "All Repulsor nodes recalibrated. Target lock readiness 100%." },
];

export function JarvisTerminal() {
  const [logs, setLogs] = useState<LogEntry[]>(INITIAL_LOGS);
  const [arcPower, setArcPower] = useState<number>(99.4);
  const [nanotechState, setNanotechState] = useState<string>("DEPLOYED");
  const [defenseMode, setDefenseMode] = useState<string>("AUTOMATIC");

  const addLog = (type: LogEntry["type"], message: string) => {
    const time = new Date().toLocaleTimeString("en-US", { hour12: false });
    setLogs((prev) => [...prev, { timestamp: time, type, message }]);
  };

  const handleRunDiagnostic = () => {
    addLog("INFO", "Executing full suit diagnostic sequence...");
    setTimeout(() => addLog("SUCCESS", "Suit integrity: 100%. Thruster alignment nominal."), 400);
    setTimeout(() => addLog("SUCCESS", "Neural interface latency: 0.012ms."), 800);
  };

  const handleDeployNanotech = () => {
    const nextState = nanotechState === "DEPLOYED" ? "RETRICATED" : "DEPLOYED";
    setNanotechState(nextState);
    addLog("INFO", `Nanotech Matrix command issued: ${nextState}.`);
    setTimeout(() => addLog("SUCCESS", `Nanoparticles ${nextState.toLowerCase()} successfully.`), 500);
  };

  const handleOverloadArc = () => {
    const newPower = Number((arcPower + 5.5).toFixed(1));
    setArcPower(newPower);
    addLog("WARN", `Arc Reactor output surge detected! Power output @ ${newPower}%.`);
    setTimeout(() => addLog("CRITICAL", "Thermal dissipation alert: Core cooling active."), 600);
  };

  const handleToggleDefense = () => {
    const mode = defenseMode === "AUTOMATIC" ? "FULL OVERRIDE" : "AUTOMATIC";
    setDefenseMode(mode);
    addLog("INFO", `Defense protocol updated to: ${mode}.`);
  };

  const handleClearLogs = () => {
    setLogs([]);
  };

  return (
    <section id="terminal" className="relative border-t border-white/5 bg-background px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-14">
        <AnimatedSection className="flex flex-col gap-6">
          <AnimatedItem>
            <EyebrowBadge>NEURAL LINK // J.A.R.V.I.S. CONSOLE</EyebrowBadge>
          </AnimatedItem>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <AnimatedItem>
              <h2 className="font-sans text-3xl font-semibold tracking-tighter text-foreground md:text-5xl lg:text-6xl">
                Suit <span className="text-accent">Console</span> &amp; Control
              </h2>
            </AnimatedItem>
            <AnimatedItem>
              <p className="max-w-[40ch] font-sans text-sm text-zinc-400">
                Direct neural interface command simulator. Execute suit protocols and inspect J.A.R.V.I.S. real-time logs.
              </p>
            </AnimatedItem>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[360px_1fr]">
          {/* Controls Panel */}
          <div className="card-surface flex flex-col gap-6 rounded-2xl border border-white/12 p-6 backdrop-blur-xl">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <Cpu size={22} className="text-accent" />
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-foreground">
                Command Protocols
              </span>
            </div>

            <div className="flex flex-col gap-3 font-mono">
              <button
                onClick={handleRunDiagnostic}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-xs uppercase tracking-[0.2em] text-foreground transition-all duration-200 hover:border-accent/50 hover:bg-white/[0.08]"
              >
                <span>Run Diagnostic</span>
                <Play size={14} className="text-accent" />
              </button>

              <button
                onClick={handleDeployNanotech}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-xs uppercase tracking-[0.2em] text-foreground transition-all duration-200 hover:border-accent/50 hover:bg-white/[0.08]"
              >
                <span>Nanotech: {nanotechState}</span>
                <ShieldCheck size={14} className="text-accent" />
              </button>

              <button
                onClick={handleOverloadArc}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-xs uppercase tracking-[0.2em] text-foreground transition-all duration-200 hover:border-accent/50 hover:bg-white/[0.08]"
              >
                <span>Surge Arc Core</span>
                <span className="font-bold text-accent">{arcPower}%</span>
              </button>

              <button
                onClick={handleToggleDefense}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-xs uppercase tracking-[0.2em] text-foreground transition-all duration-200 hover:border-accent/50 hover:bg-white/[0.08]"
              >
                <span>Defense: {defenseMode}</span>
                <span className="text-[10px] text-zinc-400">TOGGLE</span>
              </button>
            </div>

            <div className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-4 font-mono text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>Arc Power:</span>
                <span className="font-semibold text-accent">{arcPower}%</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Nanotech Array:</span>
                <span className="font-semibold text-foreground">{nanotechState}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Defense Protocol:</span>
                <span className="font-semibold text-foreground">{defenseMode}</span>
              </div>
            </div>
          </div>

          {/* Terminal Console View */}
          <div className="card-surface flex flex-col rounded-2xl border border-white/12 backdrop-blur-xl overflow-hidden min-h-[380px]">
            <div className="flex items-center justify-between bg-white/[0.04] px-6 py-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <TerminalWindow size={20} className="text-accent" />
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.26em] text-foreground">
                  J.A.R.V.I.S. Real-Time HUD Output
                </span>
              </div>
              <button
                onClick={handleClearLogs}
                className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-zinc-400 transition-colors hover:text-foreground hover:bg-white/10"
              >
                <Trash size={12} />
                Clear
              </button>
            </div>

            <div className="flex-1 p-6 font-mono text-xs leading-relaxed overflow-y-auto flex flex-col gap-2 max-h-[400px]">
              {logs.length === 0 ? (
                <div className="flex h-full items-center justify-center text-zinc-600 uppercase tracking-widest">
                  Console log buffer empty. Run a command above.
                </div>
              ) : (
                logs.map((log, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="text-zinc-600 select-none">[{log.timestamp}]</span>
                    <span
                      className={`font-semibold text-[10px] px-1.5 py-0.5 rounded uppercase tracking-wider select-none ${
                        log.type === "SUCCESS"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : log.type === "WARN"
                          ? "bg-amber-500/20 text-amber-400"
                          : log.type === "CRITICAL"
                          ? "bg-rose-500/20 text-rose-400"
                          : "bg-accent/20 text-accent"
                      }`}
                    >
                      {log.type}
                    </span>
                    <span className="text-zinc-300">{log.message}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
