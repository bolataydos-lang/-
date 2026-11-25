import React from 'react';
import { VisualIconId } from '../types/game';

interface OptionVisualProps {
  visual: VisualIconId;
  className?: string;
}

export const OptionVisual: React.FC<OptionVisualProps> = ({
  visual,
  className = 'w-16 h-16 sm:w-20 sm:h-20',
}) => {
  switch (visual) {
    case 'apple':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <path d="M48 22 C48 12, 54 10, 56 10" stroke="#78350F" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M51 18 C64 10, 74 18, 66 28 C59 30, 52 24, 51 18 Z" fill="#22C55E" stroke="#15803D" strokeWidth="2.5" />
          <path d="M48 26 C30 22, 16 36, 18 56 C20 74, 34 84, 48 80 C62 84, 76 74, 78 56 C80 36, 66 22, 48 26 Z" fill="#EF4444" stroke="#B91C1C" strokeWidth="3" />
          <ellipse cx="34" cy="44" rx="5" ry="10" transform="rotate(-18 34 44)" fill="#FCA5A5" opacity="0.65" />
        </svg>
      );

    case 'ball':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <circle cx="48" cy="48" r="34" fill="#FEF08A" stroke="#CA8A04" strokeWidth="3.5" />
          <path d="M22 26 C40 36, 56 36, 74 26" stroke="#EF4444" strokeWidth="8" fill="none" strokeLinecap="round" />
          <path d="M18 56 C38 46, 58 46, 78 56" stroke="#3B82F6" strokeWidth="8" fill="none" strokeLinecap="round" />
          <circle cx="48" cy="48" r="34" fill="none" stroke="#CA8A04" strokeWidth="3.5" />
          <circle cx="36" cy="36" r="5" fill="#FFFFFF" opacity="0.7" />
        </svg>
      );

    case 'spoon':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <g transform="rotate(35 48 48)">
            <ellipse cx="48" cy="24" rx="14" ry="18" fill="#E2E8F0" stroke="#64748B" strokeWidth="3" />
            <ellipse cx="45" cy="21" rx="6" ry="9" fill="#F8FAFC" />
            <rect x="44" y="42" width="8" height="42" rx="4" fill="#CBD5E1" stroke="#64748B" strokeWidth="3" />
          </g>
        </svg>
      );

    case 'sound-s':
    case 'sound-m':
    case 'sound-a': {
      const letter = visual === 'sound-s' ? 'С' : visual === 'sound-m' ? 'М' : 'А';
      const bg = visual === 'sound-s' ? '#DBEAFE' : visual === 'sound-m' ? '#FEF3C7' : '#DCFCE7';
      const stroke = visual === 'sound-s' ? '#2563EB' : visual === 'sound-m' ? '#D97706' : '#16A34A';
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <rect x="10" y="10" width="76" height="76" rx="22" fill={bg} stroke={stroke} strokeWidth="4" />
          <text
            x="48"
            y="64"
            textAnchor="middle"
            fontSize="48"
            fontWeight="800"
            fill={stroke}
            fontFamily="Rubik, Nunito, sans-serif"
          >
            {letter}
          </text>
        </svg>
      );
    }

    case 'clap-1':
    case 'clap-2':
    case 'clap-3': {
      const count = visual === 'clap-1' ? 1 : visual === 'clap-2' ? 2 : 3;
      const positions =
        count === 1 ? [48] : count === 2 ? [31, 65] : [20, 48, 76];
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          {positions.map((cx, i) => (
            <g key={i} transform={`translate(${cx - 14}, 26) scale(0.95)`}>
              <path
                d="M14 40 C6 40, 2 32, 4 22 L8 10 C9 7, 13 7, 13 11 L13 20 L16 6 C17 3, 21 3, 21 7 L20 20 L24 8 C25 5, 29 6, 28 10 L24 23 L28 15 C30 12, 33 14, 31 18 L25 34 C23 38, 19 40, 14 40 Z"
                fill="#FBBF24"
                stroke="#B45309"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              <path d="M6 6 L2 2 M16 2 L16 -2 M26 6 L30 2" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          ))}
        </svg>
      );
    }

    case 'action-roll':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <circle cx="56" cy="54" r="24" fill="#38BDF8" stroke="#0284C7" strokeWidth="3.5" />
          <circle cx="50" cy="48" r="6" fill="#BAE6FD" />
          <circle cx="64" cy="60" r="5" fill="#FDE047" />
          <path d="M12 52 C20 44, 28 44, 34 50" stroke="#F97316" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M14 66 L30 66" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />
          <path d="M22 24 C36 18, 52 18, 66 26" stroke="#0284C7" strokeWidth="3.5" strokeLinecap="round" fill="none" strokeDasharray="5 5" />
          <polygon points="68,28 60,29 65,21" fill="#0284C7" />
        </svg>
      );

    case 'action-sleep':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <rect x="14" y="54" width="68" height="20" rx="8" fill="#93C5FD" stroke="#2563EB" strokeWidth="3" />
          <ellipse cx="28" cy="50" rx="12" ry="7" fill="#FFFFFF" stroke="#64748B" strokeWidth="2.5" />
          <circle cx="48" cy="48" r="14" fill="#FDBA74" stroke="#C2410C" strokeWidth="3" />
          <path d="M41 48 Q45 52 48 48 M51 48 Q55 52 58 48" stroke="#7C2D12" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M62 24 L74 24 L62 34 L74 34" stroke="#4F46E5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      );

    case 'action-drink':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <path d="M28 28 L68 28 L62 78 L34 78 Z" fill="#E0F2FE" stroke="#0284C7" strokeWidth="3.5" strokeLinejoin="round" />
          <path d="M32 46 L64 46 L61 75 L35 75 Z" fill="#38BDF8" />
          <path d="M54 44 L66 14 L76 16" stroke="#EF4444" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      );

    case 'seq-pick':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <circle cx="48" cy="54" r="22" fill="#EF4444" stroke="#B91C1C" strokeWidth="3" />
          <path d="M48 32 L50 24" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
          <path d="M26 76 C24 62, 34 58, 42 64 C50 70, 62 66, 68 56" stroke="#FDE68A" strokeWidth="8" strokeLinecap="round" fill="none" />
          <circle cx="38" cy="48" r="4" fill="#FCA5A5" />
          <circle cx="66" cy="30" r="5" fill="#94A3B8" opacity="0.6" />
        </svg>
      );

    case 'seq-wash':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <path d="M20 22 L46 22 L46 32" stroke="#64748B" strokeWidth="7" strokeLinecap="round" fill="none" />
          <path d="M46 36 C42 46, 50 46, 46 54" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M38 38 C34 48, 40 50, 38 56" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M54 38 C58 48, 52 50, 54 56" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" fill="none" />
          <circle cx="48" cy="66" r="18" fill="#EF4444" stroke="#B91C1C" strokeWidth="3" />
          <circle cx="38" cy="54" r="5" fill="#BAE6FD" />
          <circle cx="58" cy="56" r="4" fill="#BAE6FD" />
        </svg>
      );

    case 'seq-eat':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <path d="M48 22 C30 22, 20 38, 22 56 C24 72, 36 80, 48 78 C54 78, 58 76, 62 72 C52 66, 52 46, 66 40 C62 28, 56 22, 48 22 Z" fill="#EF4444" stroke="#B91C1C" strokeWidth="3" />
          <path d="M66 40 C56 46, 56 64, 62 72 C68 64, 72 52, 66 40 Z" fill="#FEF3C7" stroke="#D97706" strokeWidth="2.5" />
          <circle cx="58" cy="52" r="2" fill="#78350F" />
          <circle cx="60" cy="60" r="2" fill="#78350F" />
          <path d="M48 22 L50 14" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );

    case 'action-jump':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <ellipse cx="48" cy="74" rx="34" ry="10" fill="#38BDF8" stroke="#0284C7" strokeWidth="2.5" />
          <circle cx="48" cy="36" r="16" fill="#FDE047" stroke="#CA8A04" strokeWidth="3" />
          <circle cx="54" cy="32" r="3" fill="#1F2937" />
          <polygon points="62,34 72,38 62,42" fill="#F97316" />
          <path d="M22 64 L14 54 M74 64 L82 54 M34 56 L28 46" stroke="#0EA5E9" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M48 56 L48 68" stroke="#0284C7" strokeWidth="3" strokeDasharray="3 4" />
        </svg>
      );

    case 'action-fly':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <path d="M18 46 Q36 22 48 44 Q60 22 78 46" stroke="#2563EB" strokeWidth="5" fill="none" strokeLinecap="round" />
          <circle cx="48" cy="48" r="12" fill="#FDE047" stroke="#CA8A04" strokeWidth="3" />
          <path d="M16 68 Q48 60 80 68" stroke="#CBD5E1" strokeWidth="4" strokeLinecap="round" fill="none" />
        </svg>
      );

    case 'action-sit':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <rect x="20" y="64" width="56" height="12" rx="6" fill="#D97706" stroke="#92400E" strokeWidth="3" />
          <circle cx="48" cy="42" r="16" fill="#FDE047" stroke="#CA8A04" strokeWidth="3" />
          <circle cx="53" cy="39" r="3" fill="#1F2937" />
          <polygon points="62,40 70,43 62,46" fill="#F97316" />
        </svg>
      );

    case 'size-big':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <circle cx="48" cy="48" r="34" fill="#F97316" stroke="#C2410C" strokeWidth="4" />
          <path d="M22 48 L74 48 M48 22 L48 74" stroke="#FFF7ED" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );

    case 'size-small':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <circle cx="48" cy="48" r="14" fill="#38BDF8" stroke="#0284C7" strokeWidth="3.5" />
        </svg>
      );

    case 'item-rock':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <path d="M18 66 L26 38 L50 26 L74 40 L80 68 Z" fill="#94A3B8" stroke="#475569" strokeWidth="3.5" strokeLinejoin="round" />
          <path d="M34 44 L48 38" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'puddle':
    case 'water-pond':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <path d="M14 54 C14 38, 36 34, 52 38 C70 32, 84 44, 82 58 C80 72, 58 76, 42 74 C24 76, 14 66, 14 54 Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="3.5" />
          <path d="M28 52 Q38 46 48 52 M54 60 Q64 56 70 60" stroke="#E0F2FE" strokeWidth="3" strokeLinecap="round" fill="none" />
        </svg>
      );

    case 'sky':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <rect x="10" y="14" width="76" height="68" rx="16" fill="#BAE6FD" stroke="#0284C7" strokeWidth="3" />
          <path d="M24 58 C24 48, 34 44, 42 46 C46 38, 60 38, 64 48 C72 48, 76 58, 70 64 L28 64 C24 64, 24 60, 24 58 Z" fill="#FFFFFF" stroke="#7DD3FC" strokeWidth="2.5" />
        </svg>
      );

    case 'tree':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <rect x="42" y="54" width="12" height="28" rx="3" fill="#92400E" stroke="#78350F" strokeWidth="2.5" />
          <circle cx="48" cy="36" r="24" fill="#22C55E" stroke="#15803D" strokeWidth="3" />
          <circle cx="34" cy="44" r="14" fill="#4ADE80" stroke="#15803D" strokeWidth="2.5" />
          <circle cx="62" cy="44" r="14" fill="#4ADE80" stroke="#15803D" strokeWidth="2.5" />
        </svg>
      );

    case 'light-red':
    case 'light-yellow':
    case 'light-green': {
      const fill =
        visual === 'light-red'
          ? '#EF4444'
          : visual === 'light-yellow'
            ? '#FACC15'
            : '#22C55E';
      const border =
        visual === 'light-red'
          ? '#991B1B'
          : visual === 'light-yellow'
            ? '#A16207'
            : '#166534';
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <rect x="18" y="14" width="60" height="68" rx="16" fill="#1E293B" stroke="#0F172A" strokeWidth="3" />
          <circle cx="48" cy="48" r="22" fill={fill} stroke={border} strokeWidth="3" />
          {visual === 'light-red' && (
            <rect x="34" y="44" width="28" height="8" rx="4" fill="#FFFFFF" />
          )}
          {visual === 'light-yellow' && (
            <circle cx="48" cy="48" r="7" fill="#78350F" />
          )}
          {visual === 'light-green' && (
            <g fill="#FFFFFF">
              <circle cx="48" cy="37" r="4.5" />
              <path d="M46 43 L50 43 L54 55 L50 56 L47 49 L43 58 L39 56 Z" />
            </g>
          )}
        </svg>
      );
    }

    case 'boots':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <path d="M30 20 L56 20 L56 56 L74 62 C78 64, 78 76, 70 76 L30 76 Z" fill="#0284C7" stroke="#075985" strokeWidth="3.5" strokeLinejoin="round" />
          <rect x="28" y="18" width="30" height="10" rx="4" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="2.5" />
          <rect x="28" y="72" width="48" height="6" rx="3" fill="#1E293B" />
        </svg>
      );

    case 'slippers':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <ellipse cx="48" cy="64" rx="32" ry="14" fill="#FDA4AF" stroke="#BE123C" strokeWidth="3" />
          <path d="M24 62 C26 42, 46 42, 54 56 L24 62 Z" fill="#FB7185" stroke="#BE123C" strokeWidth="3" />
          <circle cx="38" cy="52" r="5" fill="#FFFFFF" />
        </svg>
      );

    case 'sandals':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <rect x="18" y="58" width="60" height="12" rx="6" fill="#D97706" stroke="#92400E" strokeWidth="3" />
          <path d="M26 58 C26 44, 40 44, 42 58 M48 58 C48 42, 66 42, 68 58" stroke="#FBBF24" strokeWidth="5" fill="none" strokeLinecap="round" />
        </svg>
      );

    case 'basket':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <path d="M18 40 L78 40 L70 78 L26 78 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="3.5" strokeLinejoin="round" />
          <rect x="14" y="34" width="68" height="10" rx="5" fill="#FBBF24" stroke="#B45309" strokeWidth="3" />
          <path d="M32 44 L36 74 M48 44 L48 74 M64 44 L60 74" stroke="#B45309" strokeWidth="2.5" />
          <circle cx="36" cy="28" r="8" fill="#EF4444" stroke="#B91C1C" strokeWidth="2.5" />
          <rect x="50" y="20" width="16" height="14" rx="3" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2.5" />
        </svg>
      );

    case 'fridge':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <rect x="24" y="14" width="48" height="68" rx="8" fill="#E0F2FE" stroke="#0284C7" strokeWidth="3.5" />
          <line x1="24" y1="38" x2="72" y2="38" stroke="#0284C7" strokeWidth="3" />
          <line x1="62" y1="22" x2="62" y2="32" stroke="#0369A1" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="62" y1="46" x2="62" y2="62" stroke="#0369A1" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );

    case 'underbed':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <rect x="14" y="34" width="68" height="22" rx="6" fill="#A78BFA" stroke="#5B21B6" strokeWidth="3" />
          <rect x="18" y="56" width="8" height="20" rx="2" fill="#78350F" />
          <rect x="70" y="56" width="8" height="20" rx="2" fill="#78350F" />
          <path d="M36 72 L60 72" stroke="#94A3B8" strokeWidth="4" strokeDasharray="4 4" strokeLinecap="round" />
        </svg>
      );

    case 'wash-hands':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <circle cx="38" cy="40" r="14" fill="#BAE6FD" stroke="#0284C7" strokeWidth="2.5" />
          <circle cx="58" cy="36" r="10" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2.5" />
          <rect x="26" y="52" width="44" height="22" rx="11" fill="#F472B6" stroke="#BE185D" strokeWidth="3" />
          <circle cx="24" cy="30" r="5" fill="#FFFFFF" stroke="#38BDF8" strokeWidth="2" />
          <circle cx="68" cy="24" r="6" fill="#FFFFFF" stroke="#38BDF8" strokeWidth="2" />
        </svg>
      );

    case 'jump-mud':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <ellipse cx="48" cy="64" rx="32" ry="14" fill="#78350F" stroke="#451A03" strokeWidth="3" />
          <circle cx="26" cy="44" r="5" fill="#78350F" />
          <circle cx="70" cy="42" r="6" fill="#78350F" />
          <circle cx="48" cy="34" r="5" fill="#92400E" />
        </svg>
      );

    case 'sleep-bed':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <rect x="14" y="46" width="68" height="26" rx="8" fill="#60A5FA" stroke="#1D4ED8" strokeWidth="3" />
          <rect x="18" y="34" width="22" height="14" rx="6" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="2.5" />
          <path d="M56 20 L68 20 L56 30 L68 30" stroke="#4F46E5" strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
      );

    case 'pan':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <circle cx="40" cy="48" r="24" fill="#334155" stroke="#0F172A" strokeWidth="3.5" />
          <circle cx="40" cy="48" r="16" fill="#475569" />
          <rect x="62" y="44" width="24" height="8" rx="4" fill="#1E293B" />
        </svg>
      );

    case 'toothbrush':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <g transform="rotate(-30 48 48)">
            <rect x="12" y="46" width="70" height="10" rx="5" fill="#22C55E" stroke="#15803D" strokeWidth="3" />
            <rect x="58" y="30" width="22" height="16" rx="3" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="2.5" />
            <path d="M62 32 C66 24, 74 24, 76 32" fill="#38BDF8" />
          </g>
        </svg>
      );

    case 'comb':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <rect x="14" y="34" width="68" height="12" rx="6" fill="#F43F5E" stroke="#BE123C" strokeWidth="3" />
          {[22, 30, 38, 46, 54, 62, 70].map((x) => (
            <line key={x} x1={x} y1="46" x2={x} y2="68" stroke="#BE123C" strokeWidth="4" strokeLinecap="round" />
          ))}
        </svg>
      );

    case 'num-2':
    case 'num-3':
    case 'num-4':
    case 'num-5': {
      const n =
        visual === 'num-2' ? 2 : visual === 'num-3' ? 3 : visual === 'num-4' ? 4 : 5;
      const dotPositions: Record<number, Array<[number, number]>> = {
        2: [
          [32, 74],
          [64, 74],
        ],
        3: [
          [26, 74],
          [48, 74],
          [70, 74],
        ],
        4: [
          [21, 74],
          [39, 74],
          [57, 74],
          [75, 74],
        ],
        5: [
          [16, 74],
          [32, 74],
          [48, 74],
          [64, 74],
          [80, 74],
        ],
      };
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <text
            x="48"
            y="56"
            textAnchor="middle"
            fontSize="52"
            fontWeight="800"
            fill="#4338CA"
            fontFamily="Rubik, Nunito, sans-serif"
          >
            {n}
          </text>
          {dotPositions[n].map(([cx, cy], idx) => (
            <circle key={idx} cx={cx} cy={cy} r="5.5" fill="#F59E0B" />
          ))}
        </svg>
      );
    }

    case 'shape-circle':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <circle cx="48" cy="48" r="32" fill="#F59E0B" stroke="#B45309" strokeWidth="4" />
        </svg>
      );

    case 'shape-square':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <rect x="18" y="18" width="60" height="60" rx="6" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="4" />
        </svg>
      );

    case 'shape-triangle':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <polygon points="48,14 82,78 14,78" fill="#10B981" stroke="#047857" strokeWidth="4" strokeLinejoin="round" />
        </svg>
      );

    case 'bunny-2':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <ellipse cx="38" cy="24" rx="7" ry="18" fill="#F8FAFC" stroke="#64748B" strokeWidth="3" />
          <ellipse cx="58" cy="24" rx="7" ry="18" fill="#F8FAFC" stroke="#64748B" strokeWidth="3" />
          <circle cx="48" cy="54" r="22" fill="#FFFFFF" stroke="#64748B" strokeWidth="3" />
          <circle cx="41" cy="51" r="3" fill="#1E293B" />
          <circle cx="55" cy="51" r="3" fill="#1E293B" />
          <ellipse cx="48" cy="57" rx="3.5" ry="2.5" fill="#FB7185" />
        </svg>
      );

    case 'hedgehog-4':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <path d="M16 58 C16 32, 34 20, 54 24 C74 28, 82 44, 78 62 Z" fill="#78350F" />
          <ellipse cx="54" cy="60" rx="22" ry="16" fill="#FDE68A" stroke="#92400E" strokeWidth="3" />
          <circle cx="66" cy="56" r="3" fill="#1F2937" />
          <circle cx="76" cy="60" r="3.5" fill="#1F2937" />
        </svg>
      );

    case 'bear-big':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <circle cx="24" cy="28" r="10" fill="#B45309" stroke="#78350F" strokeWidth="3" />
          <circle cx="72" cy="28" r="10" fill="#B45309" stroke="#78350F" strokeWidth="3" />
          <circle cx="48" cy="50" r="30" fill="#D97706" stroke="#78350F" strokeWidth="3.5" />
          <ellipse cx="48" cy="58" rx="13" ry="10" fill="#FDE68A" />
          <circle cx="48" cy="54" r="4" fill="#451A03" />
          <circle cx="36" cy="44" r="3.5" fill="#1F2937" />
          <circle cx="60" cy="44" r="3.5" fill="#1F2937" />
        </svg>
      );

    case 'chick-small':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <circle cx="48" cy="54" r="20" fill="#FACC15" stroke="#CA8A04" strokeWidth="3" />
          <circle cx="42" cy="50" r="3" fill="#1F2937" />
          <circle cx="54" cy="50" r="3" fill="#1F2937" />
          <polygon points="44,56 52,56 48,62" fill="#F97316" />
        </svg>
      );

    case 'toy-car':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <path d="M18 54 L26 36 L62 36 L74 52 L82 54 L82 68 L14 68 L14 54 Z" fill="#EF4444" stroke="#991B1B" strokeWidth="3" strokeLinejoin="round" />
          <rect x="30" y="40" width="26" height="12" rx="3" fill="#BAE6FD" />
          <circle cx="30" cy="68" r="9" fill="#1E293B" />
          <circle cx="66" cy="68" r="9" fill="#1E293B" />
        </svg>
      );

    case 'watering-can':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <rect x="34" y="40" width="38" height="34" rx="6" fill="#0EA5E9" stroke="#0369A1" strokeWidth="3" />
          <path d="M72 46 C84 46, 84 66, 72 66" stroke="#0369A1" strokeWidth="5" fill="none" />
          <path d="M34 58 L14 38" stroke="#0EA5E9" strokeWidth="7" strokeLinecap="round" />
          <circle cx="13" cy="36" r="5" fill="#38BDF8" stroke="#0369A1" strokeWidth="2.5" />
          <path d="M40 40 C40 24, 66 24, 66 40" stroke="#0369A1" strokeWidth="4.5" fill="none" />
        </svg>
      );

    case 'meadow':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <path d="M10 64 Q48 44 86 64 L86 80 L10 80 Z" fill="#4ADE80" stroke="#16A34A" strokeWidth="3" />
          <circle cx="32" cy="54" r="5" fill="#FACC15" />
          <circle cx="62" cy="52" r="5" fill="#FB7185" />
          <circle cx="48" cy="48" r="4" fill="#FFFFFF" />
        </svg>
      );

    case 'sheep':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <circle cx="34" cy="44" r="16" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="2.5" />
          <circle cx="58" cy="44" r="16" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="2.5" />
          <circle cx="46" cy="36" r="16" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="2.5" />
          <circle cx="62" cy="50" r="13" fill="#334155" />
          <circle cx="66" cy="48" r="2.5" fill="#FFFFFF" />
        </svg>
      );

    case 'horse':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <path d="M26 76 L34 38 L52 24 L68 38 L62 54 L46 54 L46 76 Z" fill="#B45309" stroke="#78350F" strokeWidth="3" strokeLinejoin="round" />
          <path d="M32 36 L26 52" stroke="#451A03" strokeWidth="6" strokeLinecap="round" />
          <circle cx="56" cy="36" r="3" fill="#1F2937" />
        </svg>
      );

    case 'cow':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <path d="M26 28 Q20 18 28 22 M70 28 Q76 18 68 22" stroke="#FDE68A" strokeWidth="5" strokeLinecap="round" />
          <circle cx="48" cy="48" r="26" fill="#FFFFFF" stroke="#334155" strokeWidth="3" />
          <circle cx="36" cy="38" r="8" fill="#1E293B" />
          <ellipse cx="48" cy="60" rx="16" ry="11" fill="#FBCFE8" stroke="#DB2777" strokeWidth="2.5" />
          <circle cx="38" cy="44" r="3" fill="#1E293B" />
          <circle cx="58" cy="44" r="3" fill="#1E293B" />
        </svg>
      );

    case 'moon-stars':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <rect x="12" y="14" width="72" height="68" rx="18" fill="#1E1B4B" />
          <path d="M52 26 C38 28, 30 42, 34 56 C38 68, 52 72, 62 66 C48 66, 44 54, 46 42 C48 34, 52 28, 52 26 Z" fill="#FDE047" />
          <polygon points="66,30 68,36 74,36 69,40 71,46 66,42 61,46 63,40 58,36 64,36" fill="#FACC15" />
        </svg>
      );

    case 'sun':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <circle cx="48" cy="48" r="20" fill="#FACC15" stroke="#D97706" strokeWidth="3" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line
              key={deg}
              x1="48"
              y1="14"
              x2="48"
              y2="22"
              stroke="#F59E0B"
              strokeWidth="4.5"
              strokeLinecap="round"
              transform={`rotate(${deg} 48 48)`}
            />
          ))}
        </svg>
      );

    case 'rainbow':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <path d="M16 68 A32 32 0 0 1 80 68" stroke="#EF4444" strokeWidth="7" fill="none" strokeLinecap="round" />
          <path d="M23 68 A25 25 0 0 1 73 68" stroke="#FACC15" strokeWidth="7" fill="none" strokeLinecap="round" />
          <path d="M30 68 A18 18 0 0 1 66 68" stroke="#3B82F6" strokeWidth="7" fill="none" strokeLinecap="round" />
        </svg>
      );

    case 'autumn':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <path d="M48 16 L58 34 L76 30 L64 48 L74 64 L52 60 L48 78 L44 60 L22 64 L32 48 L20 30 L38 34 Z" fill="#F97316" stroke="#C2410C" strokeWidth="3" strokeLinejoin="round" />
          <line x1="48" y1="36" x2="48" y2="82" stroke="#78350F" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );

    case 'winter':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <rect x="12" y="14" width="72" height="68" rx="18" fill="#E0F2FE" />
          {[0, 60, 120].map((deg) => (
            <line
              key={deg}
              x1="48"
              y1="22"
              x2="48"
              y2="74"
              stroke="#0284C7"
              strokeWidth="4.5"
              strokeLinecap="round"
              transform={`rotate(${deg} 48 48)`}
            />
          ))}
        </svg>
      );

    case 'summer':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <circle cx="48" cy="48" r="24" fill="#FDE047" stroke="#EA580C" strokeWidth="3.5" />
          <circle cx="48" cy="48" r="14" fill="#FB923C" />
        </svg>
      );
  }
};
