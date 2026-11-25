import React, { useEffect, useState } from 'react';
import { SceneId } from '../types/game';

interface SceneIllustrationProps {
  sceneId: SceneId;
  showHint?: boolean;
  isSolved?: boolean;
}

/* ---------- Reusable Storybook Characters ---------- */

const BearChar: React.FC<{
  x: number;
  y: number;
  scale?: number;
  expression?: 'happy' | 'surprised' | 'sleepy' | 'curious';
  pajamas?: boolean;
}> = ({ x, y, scale = 1, expression = 'happy', pajamas = false }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale})`}>
    {/* Legs */}
    <ellipse cx="-26" cy="96" rx="16" ry="12" fill="#92400E" stroke="#5C2806" strokeWidth="3" />
    <ellipse cx="26" cy="96" rx="16" ry="12" fill="#92400E" stroke="#5C2806" strokeWidth="3" />
    {/* Body */}
    <ellipse
      cx="0"
      cy="54"
      rx="46"
      ry="48"
      fill={pajamas ? '#93C5FD' : '#B45309'}
      stroke={pajamas ? '#2563EB' : '#5C2806'}
      strokeWidth="3.5"
    />
    {pajamas ? (
      <>
        <path d="M-40 42 L40 42 M-44 60 L44 60 M-38 78 L38 78" stroke="#60A5FA" strokeWidth="5" />
        <circle cx="0" cy="36" r="4" fill="#FFFFFF" />
        <circle cx="0" cy="54" r="4" fill="#FFFFFF" />
      </>
    ) : (
      <ellipse cx="0" cy="58" rx="28" ry="30" fill="#FDE68A" />
    )}
    {/* Ears */}
    <circle cx="-36" cy="-34" r="16" fill="#B45309" stroke="#5C2806" strokeWidth="3.5" />
    <circle cx="-36" cy="-34" r="8" fill="#FDBA74" />
    <circle cx="36" cy="-34" r="16" fill="#B45309" stroke="#5C2806" strokeWidth="3.5" />
    <circle cx="36" cy="-34" r="8" fill="#FDBA74" />
    {/* Head */}
    <circle cx="0" cy="-12" r="42" fill="#B45309" stroke="#5C2806" strokeWidth="3.5" />
    {/* Snout */}
    <ellipse cx="0" cy="-2" rx="18" ry="14" fill="#FDE68A" />
    <ellipse cx="0" cy="-7" rx="7" ry="5" fill="#451A03" />
    {/* Cheeks */}
    <circle cx="-24" cy="-2" r="6" fill="#FCA5A5" opacity="0.65" />
    <circle cx="24" cy="-2" r="6" fill="#FCA5A5" opacity="0.65" />
    {/* Eyes */}
    {expression === 'sleepy' ? (
      <>
        <path d="M-20 -18 Q-14 -13 -8 -18" stroke="#1F2937" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d="M8 -18 Q14 -13 20 -18" stroke="#1F2937" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      </>
    ) : (
      <>
        <circle cx="-15" cy="-18" r="5" fill="#1F2937" />
        <circle cx="-13.5" cy="-19.5" r="1.8" fill="#FFFFFF" />
        <circle cx="15" cy="-18" r="5" fill="#1F2937" />
        <circle cx="16.5" cy="-19.5" r="1.8" fill="#FFFFFF" />
      </>
    )}
    {/* Mouth */}
    {expression === 'surprised' ? (
      <circle cx="0" cy="6" r="5" fill="#7C2D12" />
    ) : expression === 'curious' ? (
      <path d="M-6 5 Q0 2 6 6" stroke="#451A03" strokeWidth="3" fill="none" strokeLinecap="round" />
    ) : (
      <path d="M-8 2 Q0 10 8 2" stroke="#451A03" strokeWidth="3" fill="none" strokeLinecap="round" />
    )}
  </g>
);

const BunnyChar: React.FC<{
  x: number;
  y: number;
  scale?: number;
  expression?: 'happy' | 'curious' | 'proud';
  backpack?: boolean;
}> = ({ x, y, scale = 1, expression = 'happy', backpack = false }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale})`}>
    {backpack && (
      <rect x="-38" y="18" width="26" height="44" rx="10" fill="#FACC15" stroke="#B45309" strokeWidth="3" />
    )}
    {/* Ears */}
    <ellipse cx="-16" cy="-58" rx="11" ry="30" transform="rotate(-10 -16 -58)" fill="#FFFFFF" stroke="#64748B" strokeWidth="3.5" />
    <ellipse cx="-16" cy="-58" rx="5" ry="20" transform="rotate(-10 -16 -58)" fill="#FBCFE8" />
    <ellipse cx="16" cy="-58" rx="11" ry="30" transform="rotate(10 16 -58)" fill="#FFFFFF" stroke="#64748B" strokeWidth="3.5" />
    <ellipse cx="16" cy="-58" rx="5" ry="20" transform="rotate(10 16 -58)" fill="#FBCFE8" />
    {/* Feet */}
    <ellipse cx="-18" cy="82" rx="15" ry="9" fill="#FFFFFF" stroke="#64748B" strokeWidth="3" />
    <ellipse cx="18" cy="82" rx="15" ry="9" fill="#FFFFFF" stroke="#64748B" strokeWidth="3" />
    {/* Body */}
    <ellipse cx="0" cy="46" rx="30" ry="36" fill="#FFFFFF" stroke="#64748B" strokeWidth="3.5" />
    <ellipse cx="0" cy="48" rx="18" ry="24" fill="#FCE7F3" />
    {/* Head */}
    <circle cx="0" cy="-6" r="34" fill="#FFFFFF" stroke="#64748B" strokeWidth="3.5" />
    {/* Cheeks */}
    <circle cx="-20" cy="4" r="5.5" fill="#FBCFE8" />
    <circle cx="20" cy="4" r="5.5" fill="#FBCFE8" />
    {/* Eyes */}
    <circle cx="-12" cy="-10" r="4.5" fill="#1E293B" />
    <circle cx="-10.5" cy="-11.5" r="1.6" fill="#FFFFFF" />
    <circle cx="12" cy="-10" r="4.5" fill="#1E293B" />
    <circle cx="13.5" cy="-11.5" r="1.6" fill="#FFFFFF" />
    {expression === 'curious' && (
      <path d="M-18 -20 L-6 -18 M8 -22 L20 -20" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
    )}
    {/* Nose & Mouth */}
    <ellipse cx="0" cy="-1" rx="4.5" ry="3" fill="#FB7185" />
    {expression === 'curious' ? (
      <circle cx="0" cy="9" r="3.5" fill="#475569" />
    ) : (
      <path d="M-7 6 Q0 13 7 6" stroke="#475569" strokeWidth="2.8" fill="none" strokeLinecap="round" />
    )}
  </g>
);

const HedgehogChar: React.FC<{
  x: number;
  y: number;
  scale?: number;
  glasses?: boolean;
  scarf?: boolean;
  muddy?: boolean;
}> = ({ x, y, scale = 1, glasses = false, scarf = false, muddy = false }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale})`}>
    {/* Spikes back */}
    <path
      d="M-54 34 L-62 12 L-48 0 L-50 -24 L-30 -28 L-22 -48 L0 -40 L20 -52 L32 -32 L52 -36 L52 -14 L64 2 L50 22 L54 40 Z"
      fill="#78350F"
      stroke="#451A03"
      strokeWidth="3"
      strokeLinejoin="round"
    />
    {/* Body */}
    <ellipse cx="4" cy="24" rx="42" ry="34" fill="#FDE68A" stroke="#92400E" strokeWidth="3" />
    {/* Feet */}
    <ellipse cx="-16" cy="56" rx="12" ry="7" fill="#D97706" stroke="#78350F" strokeWidth="2.5" />
    <ellipse cx="22" cy="56" rx="12" ry="7" fill="#D97706" stroke="#78350F" strokeWidth="2.5" />
    {/* Mud spots if muddy */}
    {muddy && (
      <>
        <circle cx="-18" cy="24" r="8" fill="#78350F" opacity="0.75" />
        <circle cx="14" cy="34" r="6" fill="#78350F" opacity="0.75" />
      </>
    )}
    {/* Face */}
    <circle cx="-12" cy="6" r="4.5" fill="#1F2937" />
    <circle cx="14" cy="6" r="4.5" fill="#1F2937" />
    {glasses && (
      <g stroke="#1E293B" strokeWidth="3" fill="rgba(224,242,254,0.45)">
        <circle cx="-12" cy="6" r="11" />
        <circle cx="14" cy="6" r="11" />
        <line x1="-1" y1="6" x2="3" y2="6" />
      </g>
    )}
    <ellipse cx="2" cy="18" rx="5.5" ry="4" fill="#1F2937" />
    <path d="M-6 26 Q2 32 10 26" stroke="#78350F" strokeWidth="2.8" fill="none" strokeLinecap="round" />
    {/* Scarf */}
    {scarf && (
      <g>
        <path d="M-32 34 Q4 44 38 34 L34 46 Q4 54 -28 46 Z" fill="#EF4444" stroke="#991B1B" strokeWidth="2.5" />
        <path d="M16 42 L26 66 L12 68 L6 46 Z" fill="#EF4444" stroke="#991B1B" strokeWidth="2.5" />
      </g>
    )}
  </g>
);

const CatChar: React.FC<{
  x: number;
  y: number;
  scale?: number;
  surprised?: boolean;
}> = ({ x, y, scale = 1, surprised = false }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale})`}>
    {/* Tail */}
    <path d="M-32 54 C-66 46, -68 12, -48 6" stroke="#F97316" strokeWidth="14" strokeLinecap="round" fill="none" />
    <path d="M-32 54 C-66 46, -68 12, -48 6" stroke="#C2410C" strokeWidth="3" strokeLinecap="round" fill="none" />
    {/* Body */}
    <ellipse cx="0" cy="44" rx="34" ry="38" fill="#FB923C" stroke="#C2410C" strokeWidth="3.5" />
    <ellipse cx="0" cy="48" rx="20" ry="24" fill="#FFEDD5" />
    {/* Ears */}
    <polygon points="-32,-18 -26,-52 -6,-30" fill="#FB923C" stroke="#C2410C" strokeWidth="3.5" strokeLinejoin="round" />
    <polygon points="32,-18 26,-52 6,-30" fill="#FB923C" stroke="#C2410C" strokeWidth="3.5" strokeLinejoin="round" />
    <polygon points="-26,-22 -23,-42 -11,-28" fill="#FBCFE8" />
    <polygon points="26,-22 23,-42 11,-28" fill="#FBCFE8" />
    {/* Head */}
    <circle cx="0" cy="-6" r="36" fill="#FB923C" stroke="#C2410C" strokeWidth="3.5" />
    {/* Stripes */}
    <path d="M-8 -38 L-4 -28 M0 -40 L0 -26 M8 -38 L4 -28" stroke="#C2410C" strokeWidth="3.5" strokeLinecap="round" />
    {/* Eyes */}
    <circle cx="-13" cy="-10" r={surprised ? 6.5 : 5} fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" />
    <circle cx="-13" cy="-10" r="3" fill="#1E293B" />
    <circle cx="13" cy="-10" r={surprised ? 6.5 : 5} fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" />
    <circle cx="13" cy="-10" r="3" fill="#1E293B" />
    {/* Whiskers */}
    <path d="M-22 0 L-40 -4 M-22 6 L-40 8 M22 0 L40 -4 M22 6 L40 8" stroke="#7C2D12" strokeWidth="2.2" strokeLinecap="round" />
    {/* Nose & Mouth */}
    <polygon points="-4,-1 4,-1 0,4" fill="#FB7185" />
    {surprised ? (
      <circle cx="0" cy="12" r="5" fill="#7C2D12" />
    ) : (
      <path d="M-8 8 Q0 14 8 8" stroke="#7C2D12" strokeWidth="2.8" fill="none" strokeLinecap="round" />
    )}
  </g>
);

const ChickChar: React.FC<{
  x: number;
  y: number;
  scale?: number;
  sunglasses?: boolean;
  partyHat?: boolean;
}> = ({ x, y, scale = 1, sunglasses = false, partyHat = false }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale})`}>
    {/* Feet */}
    <path d="M-12 42 L-12 56 M-12 56 L-20 60 M-12 56 L-4 60" stroke="#EA580C" strokeWidth="4" strokeLinecap="round" />
    <path d="M12 42 L12 56 M12 56 L4 60 M12 56 L20 60" stroke="#EA580C" strokeWidth="4" strokeLinecap="round" />
    {/* Body */}
    <circle cx="0" cy="14" r="34" fill="#FDE047" stroke="#CA8A04" strokeWidth="3.5" />
    {/* Wings */}
    <ellipse cx="-32" cy="14" rx="10" ry="18" transform="rotate(20 -32 14)" fill="#FACC15" stroke="#CA8A04" strokeWidth="3" />
    <ellipse cx="32" cy="14" rx="10" ry="18" transform="rotate(-20 32 14)" fill="#FACC15" stroke="#CA8A04" strokeWidth="3" />
    {/* Head */}
    <circle cx="0" cy="-18" r="28" fill="#FDE047" stroke="#CA8A04" strokeWidth="3.5" />
    {partyHat && (
      <g>
        <polygon points="-14,-42 14,-42 0,-74" fill="#EC4899" stroke="#9D174D" strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="0" cy="-76" r="6" fill="#38BDF8" />
      </g>
    )}
    {/* Eyes */}
    {sunglasses ? (
      <g>
        <rect x="-24" y="-28" width="20" height="14" rx="5" fill="#0F172A" stroke="#38BDF8" strokeWidth="2.5" />
        <rect x="4" y="-28" width="20" height="14" rx="5" fill="#0F172A" stroke="#38BDF8" strokeWidth="2.5" />
        <line x1="-4" y1="-22" x2="4" y2="-22" stroke="#38BDF8" strokeWidth="3" />
      </g>
    ) : (
      <>
        <circle cx="-10" cy="-22" r="4" fill="#1E293B" />
        <circle cx="10" cy="-22" r="4" fill="#1E293B" />
      </>
    )}
    {/* Beak */}
    <polygon points="-6,-12 6,-12 0,-2" fill="#F97316" stroke="#C2410C" strokeWidth="2" strokeLinejoin="round" />
  </g>
);

const CalfChar: React.FC<{ x: number; y: number; scale?: number }> = ({
  x,
  y,
  scale = 1,
}) => (
  <g transform={`translate(${x}, ${y}) scale(${scale})`}>
    {/* Legs */}
    <rect x="-42" y="42" width="12" height="44" rx="5" fill="#FFFFFF" stroke="#334155" strokeWidth="3" />
    <rect x="-18" y="44" width="12" height="42" rx="5" fill="#FFFFFF" stroke="#334155" strokeWidth="3" />
    <rect x="14" y="44" width="12" height="42" rx="5" fill="#FFFFFF" stroke="#334155" strokeWidth="3" />
    <rect x="34" y="42" width="12" height="44" rx="5" fill="#FFFFFF" stroke="#334155" strokeWidth="3" />
    {/* Body */}
    <ellipse cx="0" cy="22" rx="54" ry="34" fill="#FFFFFF" stroke="#334155" strokeWidth="3.5" />
    <circle cx="-18" cy="18" r="14" fill="#1E293B" />
    <circle cx="16" cy="28" r="10" fill="#1E293B" />
    {/* Head */}
    <circle cx="48" cy="-10" r="28" fill="#FFFFFF" stroke="#334155" strokeWidth="3.5" />
    <ellipse cx="22" cy="-20" rx="12" ry="7" transform="rotate(-25 22 -20)" fill="#FFFFFF" stroke="#334155" strokeWidth="3" />
    <ellipse cx="74" cy="-20" rx="12" ry="7" transform="rotate(25 74 -20)" fill="#FFFFFF" stroke="#334155" strokeWidth="3" />
    <path d="M32 -34 Q28 -44 36 -40 M64 -34 Q68 -44 60 -40" stroke="#FDE68A" strokeWidth="5" strokeLinecap="round" />
    <circle cx="38" cy="-16" r="4" fill="#1E293B" />
    <circle cx="58" cy="-16" r="4" fill="#1E293B" />
    <ellipse cx="48" cy="4" rx="18" ry="12" fill="#FBCFE8" stroke="#DB2777" strokeWidth="2.5" />
    <circle cx="42" cy="2" r="2.5" fill="#9D174D" />
    <circle cx="54" cy="2" r="2.5" fill="#9D174D" />
  </g>
);

const AppleObj: React.FC<{
  x: number;
  y: number;
  scale?: number;
  highlighted?: boolean;
  countLabel?: number;
}> = ({ x, y, scale = 1, highlighted = false, countLabel }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale})`}>
    {highlighted && (
      <circle cx="0" cy="0" r="42" fill="#FDE047" opacity="0.45" stroke="#F59E0B" strokeWidth="4" />
    )}
    <path d="M0 -24 L4 -34" stroke="#78350F" strokeWidth="4.5" strokeLinecap="round" />
    <path d="M2 -28 C16 -36, 26 -28, 16 -18 C10 -16, 4 -22, 2 -28 Z" fill="#22C55E" stroke="#15803D" strokeWidth="2.5" />
    <path
      d="M0 -20 C-18 -24, -30 -8, -28 10 C-26 26, -12 34, 0 30 C12 34, 26 26, 28 10 C30 -8, 18 -24, 0 -20 Z"
      fill="#EF4444"
      stroke="#B91C1C"
      strokeWidth="3"
    />
    <ellipse cx="-12" cy="-4" rx="4" ry="8" transform="rotate(-18 -12 -4)" fill="#FCA5A5" opacity="0.7" />
    {countLabel !== undefined && (
      <g transform="translate(0, -48)">
        <circle cx="0" cy="0" r="15" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="2.5" />
        <text x="0" y="5.5" textAnchor="middle" fontSize="17" fontWeight="800" fill="#FFFFFF" fontFamily="Rubik, sans-serif">
          {countLabel}
        </text>
      </g>
    )}
  </g>
);

const CarrotObj: React.FC<{
  x: number;
  y: number;
  scale?: number;
  highlighted?: boolean;
  countLabel?: number;
}> = ({ x, y, scale = 1, highlighted = false, countLabel }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale})`}>
    {highlighted && (
      <circle cx="0" cy="0" r="36" fill="#FDE047" opacity="0.5" stroke="#F59E0B" strokeWidth="3.5" />
    )}
    <path d="M-8 -28 L0 -18 L8 -28 M0 -32 L0 -18" stroke="#16A34A" strokeWidth="4.5" strokeLinecap="round" />
    <path d="M-12 -18 L12 -18 L3 28 C1 32, -1 32, -3 28 Z" fill="#F97316" stroke="#C2410C" strokeWidth="3" strokeLinejoin="round" />
    <line x1="-6" y1="-6" x2="2" y2="-6" stroke="#FFEDD5" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="-2" y1="6" x2="5" y2="6" stroke="#FFEDD5" strokeWidth="2.5" strokeLinecap="round" />
    {countLabel !== undefined && (
      <g transform="translate(0, -44)">
        <circle cx="0" cy="0" r="13" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="2.5" />
        <text x="0" y="5" textAnchor="middle" fontSize="15" fontWeight="800" fill="#FFFFFF" fontFamily="Rubik, sans-serif">
          {countLabel}
        </text>
      </g>
    )}
  </g>
);

export const SceneIllustration: React.FC<SceneIllustrationProps> = ({
  sceneId,
  showHint = false,
  isSolved = false,
}) => {
  const [activeCountStep, setActiveCountStep] = useState(0);

  useEffect(() => {
    if (!showHint) {
      setActiveCountStep(0);
      return;
    }
    const maxStep = sceneId === 'cat-5-balloons' ? 5 : sceneId === 'compare-carrots' ? 4 : 3;
    let step = 1;
    setActiveCountStep(1);
    const id = window.setInterval(() => {
      step = step >= maxStep ? 1 : step + 1;
      setActiveCountStep(step);
    }, 850);
    return () => window.clearInterval(id);
  }, [showHint, sceneId]);

  const BackdropMeadow = () => (
    <>
      <rect width="640" height="420" fill="#E0F2FE" />
      <circle cx="550" cy="70" r="38" fill="#FDE047" />
      <ellipse cx="140" cy="76" rx="54" ry="24" fill="#FFFFFF" opacity="0.9" />
      <ellipse cx="176" cy="72" rx="34" ry="20" fill="#FFFFFF" opacity="0.9" />
      <ellipse cx="400" cy="60" rx="46" ry="20" fill="#FFFFFF" opacity="0.85" />
      <path d="M0 290 Q180 255 360 285 T640 275 L640 420 L0 420 Z" fill="#86EFAC" />
      <path d="M0 320 Q320 295 640 325 L640 420 L0 420 Z" fill="#4ADE80" />
    </>
  );

  return (
    <svg
      viewBox="0 0 640 420"
      className="w-full h-full object-contain select-none"
      role="img"
      aria-label="Тапсырманың күлкілі суреті"
    >
      {sceneId === 'bear-bag' && (
        <g>
          <BackdropMeadow />
          {/* Open Backpack */}
          <rect x="115" y="210" width="130" height="125" rx="28" fill="#EF4444" stroke="#991B1B" strokeWidth="4" />
          <rect x="132" y="268" width="96" height="50" rx="14" fill="#FCA5A5" stroke="#991B1B" strokeWidth="3" />
          <path d="M130 212 Q180 175 230 212" fill="#B91C1C" stroke="#7F1D1D" strokeWidth="4" />
          {/* Bear */}
          <BearChar x={390} y={220} scale={1.08} expression="surprised" />
          {/* Funny spoon resting on bear's nose */}
          <g transform="translate(360, 178) rotate(-18)">
            <ellipse cx="0" cy="0" rx="12" ry="16" fill="#E2E8F0" stroke="#475569" strokeWidth="3" />
            <rect x="-4" y="16" width="8" height="44" rx="4" fill="#CBD5E1" stroke="#475569" strokeWidth="3" />
          </g>
          {/* Apple */}
          <AppleObj x={210} y={175} scale={1.05} highlighted={showHint} />
          {/* Ball */}
          <g transform="translate(110, 325)">
            <circle cx="0" cy="0" r="32" fill="#FEF08A" stroke="#CA8A04" strokeWidth="3.5" />
            <path d="M-24 -14 Q0 0 24 -14" stroke="#3B82F6" strokeWidth="7" fill="none" />
            <path d="M-26 12 Q0 0 26 12" stroke="#EF4444" strokeWidth="7" fill="none" />
          </g>
        </g>
      )}

      {sceneId === 'bunny-spoon' && (
        <g>
          <BackdropMeadow />
          <BunnyChar x={280} y={240} scale={1.2} expression="curious" />
          {/* Giant wooden spoon held by bunny like a carrot */}
          <g transform="translate(390, 210) rotate(22)">
            <ellipse cx="0" cy="-35" rx="22" ry="30" fill="#FDE68A" stroke="#92400E" strokeWidth="4" />
            <rect x="-7" y="-6" width="14" height="90" rx="7" fill="#D97706" stroke="#92400E" strokeWidth="4" />
          </g>
          {/* Thought cloud showing tiny carrot */}
          <g transform="translate(480, 105)">
            <circle cx="0" cy="0" r="46" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="3" />
            <circle cx="-46" cy="40" r="10" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="2.5" />
            <circle cx="-64" cy="56" r="6" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="2.5" />
            <CarrotObj x={0} y={4} scale={0.95} highlighted={showHint} />
          </g>
        </g>
      )}

      {sceneId === 'hedgehog-apples-clap' && (
        <g>
          <BackdropMeadow />
          {/* Wooden log */}
          <rect x="80" y="295" width="480" height="58" rx="26" fill="#92400E" stroke="#451A03" strokeWidth="4" />
          <HedgehogChar x={290} y={235} scale={1.25} />
          {/* Wobbling apple on hedgehog's head */}
          <AppleObj x={295} y={120} scale={0.9} highlighted={showHint} />
          {/* Second apple next to him */}
          <AppleObj x={470} y={272} scale={1.1} highlighted={showHint} />
          {/* Clapping motion lines */}
          <path d="M210 210 L185 190 M205 235 L180 235 M375 210 L400 190 M380 235 L405 235" stroke="#F59E0B" strokeWidth="5" strokeLinecap="round" />
        </g>
      )}

      {sceneId === 'chick-headphones' && (
        <g>
          <BackdropMeadow />
          <ChickChar x={250} y={248} scale={1.35} />
          {/* Giant turquoise headphones on chick */}
          <path d="M196 204 C196 142, 304 142, 304 204" stroke="#0284C7" strokeWidth="10" fill="none" strokeLinecap="round" />
          <rect x="180" y="196" width="22" height="36" rx="10" fill="#38BDF8" stroke="#0369A1" strokeWidth="3.5" />
          <rect x="298" y="196" width="22" height="36" rx="10" fill="#38BDF8" stroke="#0369A1" strokeWidth="3.5" />
          {/* Singing bird on branch */}
          <path d="M400 185 L590 155" stroke="#78350F" strokeWidth="12" strokeLinecap="round" />
          <circle cx="480" cy="142" r="24" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="3" />
          <polygon points="456,140 442,146 456,152" fill="#F97316" />
          <circle cx="472" cy="136" r="3.5" fill="#FFFFFF" />
          {/* Musical notes */}
          <circle cx="410" cy="105" r="7" fill="#EC4899" />
          <path d="M417 105 L417 75 L435 80" stroke="#EC4899" strokeWidth="4" fill="none" strokeLinecap="round" />
          <circle cx="365" cy="122" r="6" fill="#8B5CF6" />
          <path d="M371 122 L371 95 L386 98" stroke="#8B5CF6" strokeWidth="4" fill="none" strokeLinecap="round" />
        </g>
      )}

      {sceneId === 'chick-dance' && (
        <g>
          <BackdropMeadow />
          {/* Chick dancing in middle */}
          <g transform="rotate(-8 260 260)">
            <ChickChar x={250} y={255} scale={1.35} partyHat />
          </g>
          {/* Surprised Cat watching */}
          <CatChar x={470} y={255} scale={1.1} surprised />
          {/* Musical sparkles */}
          <circle cx="150" cy="150" r="8" fill="#F59E0B" />
          <circle cx="340" cy="130" r="6" fill="#EC4899" />
          <path d="M180 315 Q250 330 320 315" stroke="#16A34A" strokeWidth="4" strokeDasharray="8 6" fill="none" />
        </g>
      )}

      {sceneId === 'cat-roll-ball' && (
        <g>
          <BackdropMeadow />
          <CatChar x={215} y={248} scale={1.15} />
          {/* Giant polka-dot ball */}
          <g transform="translate(410, 232)">
            <circle cx="0" cy="0" r="95" fill="#FEF9C3" stroke="#CA8A04" strokeWidth="4.5" />
            <circle cx="-35" cy="-35" r="18" fill="#EF4444" />
            <circle cx="38" cy="-28" r="22" fill="#3B82F6" />
            <circle cx="-20" cy="36" r="20" fill="#22C55E" />
            <circle cx="42" cy="38" r="16" fill="#EC4899" />
            <circle cx="5" cy="-4" r="14" fill="#F97316" />
          </g>
          {/* Motion lines */}
          <path d="M525 180 Q545 220 525 260" stroke="#0284C7" strokeWidth="4" strokeDasharray="8 6" fill="none" />
        </g>
      )}

      {sceneId === 'bunny-apple-story' && (
        <g>
          <BackdropMeadow />
          {/* Picnic table */}
          <rect x="280" y="255" width="240" height="22" rx="8" fill="#D97706" stroke="#78350F" strokeWidth="3.5" />
          <rect x="315" y="277" width="18" height="75" fill="#92400E" stroke="#78350F" strokeWidth="3" />
          <rect x="465" y="277" width="18" height="75" fill="#92400E" stroke="#78350F" strokeWidth="3" />
          <BunnyChar x={195} y={240} scale={1.15} expression="happy" />
          <AppleObj x={400} y={222} scale={1.35} highlighted={showHint} />
        </g>
      )}

      {sceneId === 'duck-puddle' && (
        <g>
          <BackdropMeadow />
          {/* Big blue puddle */}
          <ellipse cx="320" cy="332" rx="185" ry="48" fill="#38BDF8" stroke="#0284C7" strokeWidth="4" />
          {/* Splashing droplets */}
          <circle cx="195" cy="240" r="10" fill="#7DD3FC" />
          <circle cx="235" cy="200" r="8" fill="#38BDF8" />
          <circle cx="410" cy="215" r="11" fill="#7DD3FC" />
          <circle cx="450" cy="250" r="9" fill="#38BDF8" />
          <path d="M220 290 L185 255 M420 290 L455 255" stroke="#0284C7" strokeWidth="5" strokeLinecap="round" />
          {/* Duck */}
          <g transform="translate(315, 250)">
            <ellipse cx="0" cy="24" rx="44" ry="30" fill="#FACC15" stroke="#CA8A04" strokeWidth="3.5" />
            <circle cx="24" cy="-14" r="24" fill="#FACC15" stroke="#CA8A04" strokeWidth="3.5" />
            <circle cx="32" cy="-20" r="4" fill="#1E293B" />
            <polygon points="44,-14 66,-8 44,-2" fill="#F97316" stroke="#C2410C" strokeWidth="2.5" />
            <path d="M-24 12 L-54 -14" stroke="#CA8A04" strokeWidth="8" strokeLinecap="round" />
          </g>
          {/* Wide-eyed green frog watching */}
          <g transform="translate(530, 315)">
            <ellipse cx="0" cy="14" rx="28" ry="20" fill="#22C55E" stroke="#15803D" strokeWidth="3" />
            <circle cx="-12" cy="-6" r="10" fill="#FFFFFF" stroke="#15803D" strokeWidth="2.5" />
            <circle cx="12" cy="-6" r="10" fill="#FFFFFF" stroke="#15803D" strokeWidth="2.5" />
            <circle cx="-12" cy="-6" r="4.5" fill="#1E293B" />
            <circle cx="12" cy="-6" r="4.5" fill="#1E293B" />
            <circle cx="0" cy="16" r="4" fill="#15803D" />
          </g>
        </g>
      )}

      {sceneId === 'hedgehog-umbrella' && (
        <g>
          <BackdropMeadow />
          {/* Huge upside-down colorful umbrella like a boat */}
          <g transform="translate(375, 225)">
            <path d="M-150 0 C-150 90, 150 90, 150 0 Z" fill="#EC4899" stroke="#9D174D" strokeWidth="4" />
            <path d="M-75 0 C-75 84, 75 84, 75 0 Z" fill="#FACC15" stroke="#9D174D" strokeWidth="3" />
            <rect x="-6" y="-85" width="12" height="85" rx="6" fill="#78350F" />
            <path d="M0 -85 C0 -108, 30 -108, 30 -88" stroke="#78350F" strokeWidth="10" fill="none" strokeLinecap="round" />
          </g>
          <HedgehogChar x={150} y={272} scale={1.05} glasses />
        </g>
      )}

      {sceneId === 'calf-reflection' && (
        <g>
          <BackdropMeadow />
          {/* Reflection puddle */}
          <ellipse cx="385" cy="340" rx="155" ry="44" fill="#38BDF8" stroke="#0284C7" strokeWidth="4" />
          {/* Faint reflection inside puddle */}
          <g transform="translate(390, 345) scale(0.5, -0.32)" opacity="0.45">
            <circle cx="0" cy="0" r="42" fill="#FFFFFF" />
            <circle cx="-16" cy="-10" r="12" fill="#1E293B" />
            <ellipse cx="0" cy="20" rx="20" ry="12" fill="#F472B6" />
          </g>
          <CalfChar x={230} y={225} scale={1.15} />
        </g>
      )}

      {sceneId === 'bunny-crosswalk' && (
        <g>
          <rect width="640" height="420" fill="#DBEAFE" />
          <path d="M0 250 L640 250 L640 420 L0 420 Z" fill="#4ADE80" />
          {/* Road & Zebra Crosswalk */}
          <polygon points="210,250 560,250 640,420 120,420" fill="#475569" />
          {[0, 1, 2, 3, 4].map((i) => (
            <rect
              key={i}
              x={210 + i * 74}
              y={305}
              width="44"
              height="95"
              rx="4"
              transform={`skewX(${-12 + i * 4})`}
              fill="#FFFFFF"
            />
          ))}
          {/* Traffic Light */}
          <rect x="475" y="135" width="14" height="190" fill="#334155" />
          <rect x="444" y="65" width="76" height="145" rx="18" fill="#1E293B" stroke="#0F172A" strokeWidth="4" />
          <circle cx="482" cy="100" r="21" fill="#991B1B" opacity="0.5" />
          <circle cx="482" cy="140" r="14" fill="#854D0E" opacity="0.5" />
          <circle
            cx="482"
            cy="178"
            r="22"
            fill={showHint || isSolved ? '#22C55E' : '#166534'}
            stroke={showHint || isSolved ? '#BBF7D0' : 'none'}
            strokeWidth="4"
          />
          {/* Walking person glyph in green light */}
          <g fill="#FFFFFF" opacity={showHint || isSolved ? 1 : 0.6}>
            <circle cx="482" cy="169" r="3.5" />
            <path d="M480 174 L484 174 L487 186 L484 187 L481 180 L477 188 L474 186 Z" />
          </g>
          <BunnyChar x={145} y={248} scale={1.1} backpack />
        </g>
      )}

      {sceneId === 'doll-snow' && (
        <g>
          <rect width="640" height="420" fill="#E0F2FE" />
          {/* Snowy ground */}
          <path d="M0 300 Q200 280 420 305 T640 290 L640 420 L0 420 Z" fill="#FFFFFF" stroke="#BAE6FD" strokeWidth="3" />
          {/* Snowflakes */}
          {[
            [90, 75],
            [180, 125],
            [270, 60],
            [450, 90],
            [540, 145],
            [130, 210],
            [510, 225],
          ].map(([cx, cy], idx) => (
            <g key={idx} transform={`translate(${cx}, ${cy})`}>
              <line x1="-10" y1="0" x2="10" y2="0" stroke="#7DD3FC" strokeWidth="3" strokeLinecap="round" />
              <line x1="0" y1="-10" x2="0" y2="10" stroke="#7DD3FC" strokeWidth="3" strokeLinecap="round" />
            </g>
          ))}
          {/* Doll character */}
          <g transform="translate(320, 210)">
            {/* Dress */}
            <polygon points="-38,85 38,85 18,10 -18,10" fill="#F472B6" stroke="#BE185D" strokeWidth="3.5" strokeLinejoin="round" />
            {/* Legs */}
            <rect x="-18" y="85" width="10" height="32" fill="#FDE68A" />
            <rect x="8" y="85" width="10" height="32" fill="#FDE68A" />
            {/* Tiny summer flip-flops on snow! */}
            <ellipse cx="-14" cy="120" rx="14" ry="6" fill="#38BDF8" stroke="#0284C7" strokeWidth="2.5" />
            <ellipse cx="14" cy="120" rx="14" ry="6" fill="#38BDF8" stroke="#0284C7" strokeWidth="2.5" />
            {/* Head & Hair */}
            <circle cx="-32" cy="-26" r="16" fill="#92400E" />
            <circle cx="32" cy="-26" r="16" fill="#92400E" />
            <circle cx="0" cy="-24" r="32" fill="#FDE68A" stroke="#D97706" strokeWidth="3" />
            <path d="M-32 -28 C-24 -60, 24 -60, 32 -28 Q0 -40 -32 -28 Z" fill="#92400E" />
            <circle cx="-11" cy="-22" r="4" fill="#1E293B" />
            <circle cx="11" cy="-22" r="4" fill="#1E293B" />
            {/* Shivering mouth */}
            <path d="M-10 -6 L-4 -10 L2 -6 L8 -10" stroke="#BE185D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </g>
        </g>
      )}

      {sceneId === 'chick-toys' && (
        <g>
          {/* Cozy room */}
          <rect width="640" height="420" fill="#FEF3C7" />
          <rect x="0" y="275" width="640" height="145" fill="#FDE68A" />
          {/* Empty toy basket waiting */}
          <g transform="translate(495, 285)">
            <path d="M-55 -20 L55 -20 L45 45 L-45 45 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="4" />
            <rect x="-60" y="-30" width="120" height="14" rx="7" fill="#FBBF24" stroke="#B45309" strokeWidth="3" />
          </g>
          {/* Scattered toys */}
          <rect x="95" y="315" width="38" height="38" rx="6" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="3" />
          <rect x="145" y="330" width="34" height="34" rx="6" fill="#EF4444" stroke="#B91C1C" strokeWidth="3" />
          <circle cx="240" cy="340" r="24" fill="#22C55E" stroke="#15803D" strokeWidth="3" />
          {/* Toy car */}
          <g transform="translate(360, 330)">
            <rect x="-32" y="-12" width="64" height="24" rx="8" fill="#EC4899" stroke="#9D174D" strokeWidth="3" />
            <circle cx="-18" cy="14" r="9" fill="#1E293B" />
            <circle cx="18" cy="14" r="9" fill="#1E293B" />
          </g>
          <ChickChar x={285} y={225} scale={1.2} />
        </g>
      )}

      {sceneId === 'hedgehog-mud' && (
        <g>
          <BackdropMeadow />
          <ellipse cx="180" cy="345" rx="115" ry="28" fill="#78350F" stroke="#451A03" strokeWidth="3" />
          <HedgehogChar x={225} y={248} scale={1.25} muddy />
          <AppleObj x={470} y={268} scale={1.25} />
          {/* Funny mud drops */}
          <circle cx="310" cy="270" r="6" fill="#78350F" />
          <circle cx="330" cy="295" r="5" fill="#78350F" />
        </g>
      )}

      {sceneId === 'bear-toothbrush' && (
        <g>
          {/* Bathroom tile wall */}
          <rect width="640" height="420" fill="#E0F2FE" />
          <rect x="0" y="305" width="640" height="115" fill="#BAE6FD" />
          <BearChar x={320} y={230} scale={1.2} expression="sleepy" pajamas />
          {/* Frying pan in left hand! */}
          <g transform="translate(185, 245) rotate(-25)">
            <circle cx="0" cy="-22" r="34" fill="#334155" stroke="#0F172A" strokeWidth="4" />
            <rect x="-6" y="10" width="12" height="42" rx="6" fill="#1E293B" />
          </g>
          {/* Green toothbrush in right hand! */}
          <g transform="translate(450, 235) rotate(22)">
            <rect x="-7" y="-20" width="14" height="82" rx="7" fill="#22C55E" stroke="#15803D" strokeWidth="3" />
            <rect x="-18" y="-22" width="22" height="16" rx="4" fill="#FFFFFF" stroke="#64748B" strokeWidth="2.5" />
          </g>
        </g>
      )}

      {sceneId === 'count-3-apples' && (
        <g>
          <BackdropMeadow />
          {/* Sunny log */}
          <rect x="190" y="285" width="380" height="58" rx="24" fill="#92400E" stroke="#451A03" strokeWidth="4" />
          <HedgehogChar x={135} y={260} scale={1.08} />
          {/* 3 clearly separated, non-overlapping apples */}
          <AppleObj
            x={280}
            y={248}
            scale={1.15}
            highlighted={showHint && activeCountStep >= 1}
            countLabel={showHint && activeCountStep >= 1 ? 1 : undefined}
          />
          <AppleObj
            x={395}
            y={248}
            scale={1.15}
            highlighted={showHint && activeCountStep >= 2}
            countLabel={showHint && activeCountStep >= 2 ? 2 : undefined}
          />
          <AppleObj
            x={510}
            y={248}
            scale={1.15}
            highlighted={showHint && activeCountStep >= 3}
            countLabel={showHint && activeCountStep >= 3 ? 3 : undefined}
          />
        </g>
      )}

      {sceneId === 'bear-square-wheel' && (
        <g>
          <BackdropMeadow />
          {/* Wooden toy cart missing front wheel */}
          <g transform="translate(385, 265)">
            <rect x="-95" y="-42" width="190" height="62" rx="12" fill="#F59E0B" stroke="#92400E" strokeWidth="4" />
            {/* Good round back wheel */}
            <circle cx="58" cy="36" r="32" fill="#78350F" stroke="#451A03" strokeWidth="4" />
            <circle cx="58" cy="36" r="12" fill="#FDE68A" />
            {/* Square block on front axle! */}
            <rect x="-86" y="4" width="58" height="58" rx="6" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="4" />
          </g>
          <BearChar x={165} y={230} scale={1.1} expression="curious" />
        </g>
      )}

      {sceneId === 'compare-carrots' && (
        <g>
          <BackdropMeadow />
          {/* Divider grass tuft */}
          <line x1="320" y1="95" x2="320" y2="385" stroke="#16A34A" strokeWidth="3" strokeDasharray="8 8" opacity="0.5" />
          {/* Left: Bunny with 2 carrots */}
          <BunnyChar x={135} y={248} scale={1.0} expression="proud" />
          <CarrotObj
            x={215}
            y={252}
            scale={1.0}
            highlighted={showHint && activeCountStep >= 1}
            countLabel={showHint && activeCountStep >= 1 ? 1 : undefined}
          />
          <CarrotObj
            x={265}
            y={252}
            scale={1.0}
            highlighted={showHint && activeCountStep >= 2}
            countLabel={showHint && activeCountStep >= 2 ? 2 : undefined}
          />

          {/* Right: Hedgehog with 4 clearly separated carrots */}
          <HedgehogChar x={410} y={268} scale={0.95} />
          <CarrotObj
            x={475}
            y={180}
            scale={0.92}
            highlighted={showHint && activeCountStep >= 1}
            countLabel={showHint && activeCountStep >= 1 ? 1 : undefined}
          />
          <CarrotObj
            x={525}
            y={180}
            scale={0.92}
            highlighted={showHint && activeCountStep >= 2}
            countLabel={showHint && activeCountStep >= 2 ? 2 : undefined}
          />
          <CarrotObj
            x={475}
            y={275}
            scale={0.92}
            highlighted={showHint && activeCountStep >= 3}
            countLabel={showHint && activeCountStep >= 3 ? 3 : undefined}
          />
          <CarrotObj
            x={525}
            y={275}
            scale={0.92}
            highlighted={showHint && activeCountStep >= 4}
            countLabel={showHint && activeCountStep >= 4 ? 4 : undefined}
          />
        </g>
      )}

      {sceneId === 'big-vs-small' && (
        <g>
          <BackdropMeadow />
          <BearChar x={215} y={195} scale={1.45} expression="happy" />
          <ChickChar x={465} y={290} scale={0.95} sunglasses />
        </g>
      )}

      {sceneId === 'cat-5-balloons' && (
        <g>
          <BackdropMeadow />
          <CatChar x={235} y={258} scale={1.1} surprised />
          {/* 5 clearly spaced colorful balloons */}
          {[
            { cx: 145, cy: 105, color: '#EF4444', num: 1 },
            { cx: 235, cy: 78, color: '#3B82F6', num: 2 },
            { cx: 330, cy: 96, color: '#22C55E', num: 3 },
            { cx: 425, cy: 78, color: '#F59E0B', num: 4 },
            { cx: 515, cy: 108, color: '#EC4899', num: 5 },
          ].map((b) => (
            <g key={b.num}>
              <path
                d={`M${b.cx} ${b.cy + 34} Q265 200 265 255`}
                stroke="#64748B"
                strokeWidth="2.5"
                fill="none"
              />
              {showHint && activeCountStep >= b.num && (
                <circle cx={b.cx} cy={b.cy} r="44" fill="#FDE047" opacity="0.55" stroke="#F59E0B" strokeWidth="4" />
              )}
              <ellipse cx={b.cx} cy={b.cy} rx="28" ry="34" fill={b.color} stroke="#1E293B" strokeWidth="3" />
              <ellipse cx={b.cx - 9} cy={b.cy - 12} rx="5" ry="9" fill="#FFFFFF" opacity="0.55" />
              {showHint && activeCountStep >= b.num && (
                <g transform={`translate(${b.cx}, ${b.cy})`}>
                  <circle cx="0" cy="0" r="14" fill="#FFFFFF" />
                  <text x="0" y="5" textAnchor="middle" fontSize="17" fontWeight="800" fill="#1E293B" fontFamily="Rubik, sans-serif">
                    {b.num}
                  </text>
                </g>
              )}
            </g>
          ))}
        </g>
      )}

      {sceneId === 'thirsty-flower' && (
        <g>
          <BackdropMeadow />
          {/* Terracotta pot with dry soil and droopy flower */}
          <g transform="translate(425, 250)">
            <polygon points="-45,20 45,20 32,85 -32,85" fill="#EA580C" stroke="#9A3412" strokeWidth="3.5" />
            <rect x="-52" y="8" width="104" height="18" rx="6" fill="#F97316" stroke="#9A3412" strokeWidth="3.5" />
            {/* Drooping stem */}
            <path d="M0 8 C-5 -35, 20 -65, 42 -42" stroke="#65A30D" strokeWidth="7" fill="none" strokeLinecap="round" />
            <circle cx="46" cy="-35" r="14" fill="#F472B6" stroke="#BE185D" strokeWidth="2.5" />
            <circle cx="46" cy="-35" r="6" fill="#FDE047" />
          </g>
          {/* Bunny holding out a toy car to the thirsty flower! */}
          <BunnyChar x={190} y={240} scale={1.12} expression="curious" />
          <g transform="translate(295, 245)">
            <path d="M-28 8 L-20 -10 L16 -10 L26 6 L34 8 L34 22 L-34 22 L-34 8 Z" fill="#EF4444" stroke="#991B1B" strokeWidth="3" />
            <circle cx="-18" cy="22" r="8" fill="#1E293B" />
            <circle cx="18" cy="22" r="8" fill="#1E293B" />
          </g>
        </g>
      )}

      {sceneId === 'fish-ladder' && (
        <g>
          <BackdropMeadow />
          {/* Tree on right */}
          <rect x="465" y="135" width="42" height="190" fill="#92400E" stroke="#451A03" strokeWidth="3.5" />
          <circle cx="486" cy="115" r="76" fill="#22C55E" stroke="#15803D" strokeWidth="3.5" />
          {/* Wooden ladder leaning against tree */}
          <g transform="translate(390, 170) rotate(16)">
            <line x1="0" y1="0" x2="0" y2="155" stroke="#B45309" strokeWidth="8" strokeLinecap="round" />
            <line x1="36" y1="0" x2="36" y2="155" stroke="#B45309" strokeWidth="8" strokeLinecap="round" />
            {[24, 54, 84, 114, 140].map((y) => (
              <line key={y} x1="0" y1={y} x2="36" y2={y} stroke="#D97706" strokeWidth="6" />
            ))}
          </g>
          {/* Cute Squirrel offering the ladder */}
          <g transform="translate(335, 278)">
            <path d="M22 20 C60 12, 65 -35, 38 -42" stroke="#EA580C" strokeWidth="22" strokeLinecap="round" fill="none" />
            <ellipse cx="0" cy="15" rx="22" ry="28" fill="#EA580C" stroke="#9A3412" strokeWidth="3" />
            <circle cx="-4" cy="-20" r="20" fill="#EA580C" stroke="#9A3412" strokeWidth="3" />
            <circle cx="-12" cy="-24" r="3.5" fill="#1E293B" />
          </g>
          {/* Fish in round glass bowl */}
          <g transform="translate(170, 265)">
            <circle cx="0" cy="0" r="64" fill="#E0F2FE" stroke="#0284C7" strokeWidth="4" />
            <path d="M-58 8 Q0 -6 58 8 A62 62 0 0 1 -58 8 Z" fill="#38BDF8" opacity="0.65" />
            {/* Orange fish */}
            <ellipse cx="-4" cy="18" rx="24" ry="14" fill="#F97316" stroke="#C2410C" strokeWidth="2.5" />
            <polygon points="-28,18 -44,6 -44,30" fill="#FB923C" stroke="#C2410C" strokeWidth="2.5" />
            <circle cx="10" cy="14" r="3" fill="#1E293B" />
          </g>
        </g>
      )}

      {sceneId === 'lost-calf' && (
        <g>
          <BackdropMeadow />
          {/* Sunny farm fence */}
          <rect x="65" y="235" width="510" height="12" rx="4" fill="#D97706" stroke="#78350F" strokeWidth="2.5" />
          <rect x="65" y="275" width="510" height="12" rx="4" fill="#D97706" stroke="#78350F" strokeWidth="2.5" />
          {[95, 225, 395, 525].map((x) => (
            <rect key={x} x={x} y="215" width="18" height="105" rx="4" fill="#B45309" stroke="#78350F" strokeWidth="2.5" />
          ))}
          <CalfChar x={305} y={248} scale={1.35} />
        </g>
      )}

      {sceneId === 'night-moon-net' && (
        <g>
          {/* Night sky */}
          <rect width="640" height="420" fill="#1E1B4B" />
          <path d="M0 300 Q200 275 420 305 T640 285 L640 420 L0 420 Z" fill="#14532D" />
          {/* Crescent moon */}
          <path d="M475 55 C440 60, 422 92, 434 122 C446 150, 480 156, 502 140 C470 142, 456 114, 464 88 C468 72, 475 60, 475 55 Z" fill="#FDE047" />
          {/* Stars */}
          {[
            [115, 75],
            [215, 115],
            [315, 65],
            [555, 155],
            [165, 165],
          ].map(([cx, cy], idx) => (
            <circle key={idx} cx={cx} cy={cy} r="5.5" fill="#FACC15" />
          ))}
          <BearChar x={235} y={245} scale={1.15} expression="curious" />
          {/* Butterfly net reaching toward the moon! */}
          <g transform="translate(335, 175) rotate(28)">
            <line x1="0" y1="0" x2="0" y2="115" stroke="#D97706" strokeWidth="7" strokeLinecap="round" />
            <ellipse cx="0" cy="-22" rx="34" ry="22" fill="rgba(186,230,253,0.35)" stroke="#E2E8F0" strokeWidth="4" />
          </g>
        </g>
      )}

      {sceneId === 'autumn-hedgehog' && (
        <g>
          <rect width="640" height="420" fill="#FEF3C7" />
          <path d="M0 290 Q240 265 440 295 T640 275 L640 420 L0 420 Z" fill="#F59E0B" opacity="0.55" />
          {/* Autumn tree trunk & orange canopy */}
          <rect x="465" y="125" width="44" height="190" fill="#78350F" />
          <circle cx="485" cy="110" r="84" fill="#F97316" stroke="#C2410C" strokeWidth="3.5" />
          <circle cx="425" cy="130" r="52" fill="#FACC15" stroke="#CA8A04" strokeWidth="3" />
          {/* Falling leaves */}
          {[
            [125, 115],
            [215, 85],
            [305, 145],
            [175, 200],
            [385, 185],
          ].map(([cx, cy], idx) => (
            <ellipse
              key={idx}
              cx={cx}
              cy={cy}
              rx="14"
              ry="8"
              transform={`rotate(${idx * 35} ${cx} ${cy})`}
              fill={idx % 2 === 0 ? '#EA580C' : '#F59E0B'}
              stroke="#9A3412"
              strokeWidth="2"
            />
          ))}
          <HedgehogChar x={255} y={265} scale={1.2} scarf />
        </g>
      )}
    </svg>
  );
};
