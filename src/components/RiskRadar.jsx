import React, { useEffect, useRef } from 'react';
import { Shield, Radio, Activity, AlertTriangle, Cpu } from 'lucide-react';

export default function RiskRadar({ transactions = [], activeAlerts = 2, isSimulating = true }) {
  const canvasRef = useRef(null);

  const highRiskCount = transactions.filter(t => t.score >= 70).length;
  let threatLevel = 'DEFCON 4 - GUARDED';
  let threatColor = 'text-emerald-400';
  let threatBg = 'bg-emerald-500/10 border-emerald-500/30';

  if (highRiskCount > 5 || activeAlerts > 3) {
    threatLevel = 'DEFCON 2 - ELEVATED RISK';
    threatColor = 'text-rose-400';
    threatBg = 'bg-rose-500/10 border-rose-500/30';
  } else if (highRiskCount > 1 || activeAlerts > 0) {
    threatLevel = 'DEFCON 3 - MODERATE THREAT';
    threatColor = 'text-amber-400';
    threatBg = 'bg-amber-500/10 border-amber-500/30';
  }

  // Draw the animated Radar Scanner on Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let angle = 0;

    // Generate random stable blips on the radar
    const blips = [
      { r: 0.35, theta: 0.8, color: '#10b981', size: 3.5 },
      { r: 0.65, theta: 2.3, color: '#f59e0b', size: 4 },
      { r: 0.85, theta: 4.1, color: '#ef4444', size: 5, pulse: true },
      { r: 0.45, theta: 5.2, color: '#06b6d4', size: 3 },
      { r: 0.72, theta: 3.4, color: '#ef4444', size: 4.5, pulse: true }
    ];

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(centerX, centerY) - 8;

      ctx.clearRect(0, 0, width, height);

      // Radar circles
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.2)';
      ctx.lineWidth = 1;
      for (let i = 1; i <= 3; i++) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, (radius / 3) * i, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Crosshairs
      ctx.beginPath();
      ctx.moveTo(centerX - radius, centerY);
      ctx.lineTo(centerX + radius, centerY);
      ctx.moveTo(centerX, centerY - radius);
      ctx.lineTo(centerX, centerY + radius);
      ctx.stroke();

      // Sweeping radar beam gradient
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, angle, angle + 0.45);
      ctx.closePath();
      const sweepGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
      sweepGradient.addColorStop(0, 'rgba(6, 182, 212, 0)');
      sweepGradient.addColorStop(1, 'rgba(6, 182, 212, 0.35)');
      ctx.fillStyle = sweepGradient;
      ctx.fill();
      ctx.restore();

      // Sweeping leading line
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + Math.cos(angle + 0.45) * radius,
        centerY + Math.sin(angle + 0.45) * radius
      );
      ctx.strokeStyle = '#22d3ee';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Render blips
      blips.forEach(b => {
        const bx = centerX + Math.cos(b.theta) * (radius * b.r);
        const by = centerY + Math.sin(b.theta) * (radius * b.r);

        ctx.beginPath();
        ctx.arc(bx, by, b.size, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.shadowColor = b.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Ping ring for critical blips
        if (b.pulse) {
          ctx.beginPath();
          ctx.arc(bx, by, b.size + 4, 0, Math.PI * 2);
          ctx.strokeStyle = b.color;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      });

      angle += 0.035;
      if (angle >= Math.PI * 2) angle = 0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="glass-panel p-5 rounded-2xl border border-cyan-500/20 shadow-xl relative overflow-hidden">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Radar Graphic */}
        <div className="relative flex-shrink-0 flex items-center justify-center">
          <div className="relative w-44 h-44 rounded-full bg-slate-950/80 p-1 border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.18)]">
            <canvas
              ref={canvasRef}
              width={168}
              height={168}
              className="rounded-full"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></span>
            </div>
          </div>
        </div>

        {/* Pulse Telemetry Content */}
        <div className="flex-1 space-y-3 w-full">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Radio className="w-5 h-5 text-cyan-400 animate-pulse" />
              <h3 className="text-base font-bold text-white tracking-wide">
                Security Pulse & Fraud Radar
              </h3>
            </div>
            <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold border ${threatBg} ${threatColor} flex items-center gap-1.5`}>
              <span className="w-2 h-2 rounded-full bg-current animate-ping"></span>
              {threatLevel}
            </span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Continuous acoustic & vector analysis scanning incoming transactional payload buffers.
            Instant isolation trigger active for anomalous velocity spikes and proxy jumping.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
            <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] text-slate-500 font-mono block uppercase">Active Alerts</span>
              <span className="text-lg font-bold text-rose-400 font-mono">{activeAlerts}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] text-slate-500 font-mono block uppercase">Monitored Inflow</span>
              <span className="text-lg font-bold text-cyan-400 font-mono">{transactions.length} txs</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] text-slate-500 font-mono block uppercase">Inference Engine</span>
              <span className="text-lg font-bold text-emerald-400 font-mono">31.4 ms</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] text-slate-500 font-mono block uppercase">Telemetry Status</span>
              <span className="text-xs font-bold text-slate-200 mt-1 block">
                {isSimulating ? 'Active Online' : 'Standby'}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
