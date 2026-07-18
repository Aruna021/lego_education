import React from "react";
import legoSpikePrime from "../assets/images/lego_spike_prime_1784239701314.jpg";
import legoSpikeEssential from "../assets/images/lego_spike_essential_1784239720850.jpg";
import legoBricqMotion from "../assets/images/lego_bricq_motion_1784239735269.jpg";
import legoSteamPark from "../assets/images/lego_steam_park_1784239750721.jpg";
import legoDuploWorld from "../assets/images/lego_duplo_world_1784239803290.jpg";
import creationWindGrid from "../assets/images/creation_wind_grid_1784239787721.jpg";
import creationMarsRover from "../assets/images/creation_mars_rover_1784239766130.jpg";

interface LegoArtworkProps {
  type: string;
  className?: string;
}

export function LegoArtwork({ type, className = "w-full h-full" }: LegoArtworkProps) {
  // Return tailored beautiful SVG designs representing LEGO Education sets
  switch (type) {
    case "spike-prime":
      return (
        <img
          src={legoSpikePrime}
          alt="LEGO Education SPIKE Prime"
          className={`${className} object-cover`}
          referrerPolicy="no-referrer"
        />
      );

    case "spike-essential":
      return (
        <img
          src={legoSpikeEssential}
          alt="LEGO Education SPIKE Essential"
          className={`${className} object-cover`}
          referrerPolicy="no-referrer"
        />
      );

    case "bricq-motion-prime":
    case "bricq-motion-essential":
      return (
        <img
          src={legoBricqMotion}
          alt="LEGO Education BricQ Motion"
          className={`${className} object-cover`}
          referrerPolicy="no-referrer"
        />
      );

    case "coding-express":
      return (
        <svg className={`${className} bg-purple-50`} viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0H400V300H0V0Z" fill="#F3E5F5" />
          <circle cx="200" cy="150" r="110" fill="#BA68C8" opacity="0.2" />
          {/* Tracks */}
          <path d="M40 220 L 360 220" stroke="#4B5563" strokeWidth="8" strokeLinecap="round" />
          <line x1="80" y1="210" x2="80" y2="230" stroke="#9CA3AF" strokeWidth="5" />
          <line x1="140" y1="210" x2="140" y2="230" stroke="#9CA3AF" strokeWidth="5" />
          <line x1="200" y1="210" x2="200" y2="230" stroke="#9CA3AF" strokeWidth="5" />
          <line x1="260" y1="210" x2="260" y2="230" stroke="#9CA3AF" strokeWidth="5" />
          <line x1="320" y1="210" x2="320" y2="230" stroke="#9CA3AF" strokeWidth="5" />
          {/* Red Action Brick on track */}
          <rect x="170" y="214" width="60" height="8" rx="2" fill="#D01012" />
          <circle cx="180" cy="218" r="2" fill="#FFF" />
          <circle cx="200" cy="218" r="2" fill="#FFF" />
          <circle cx="220" cy="218" r="2" fill="#FFF" />
          {/* Cute DUPLO Train */}
          <rect x="110" y="130" width="130" height="70" rx="12" fill="#006DB7" />
          <rect x="110" y="110" width="60" height="40" rx="8" fill="#FFD500" />
          <rect x="200" y="145" width="50" height="40" rx="8" fill="#D01012" />
          {/* Cabin window */}
          <rect x="125" y="120" width="30" height="25" rx="4" fill="#FFF" opacity="0.8" />
          {/* Train Wheels */}
          <circle cx="145" cy="200" r="18" fill="#111827" stroke="#9CA3AF" strokeWidth="3" />
          <circle cx="145" cy="200" r="6" fill="#FFF" />
          <circle cx="215" cy="200" r="18" fill="#111827" stroke="#9CA3AF" strokeWidth="3" />
          <circle cx="215" cy="200" r="6" fill="#FFF" />
          {/* Smokestack */}
          <rect x="215" y="115" width="20" height="30" rx="4" fill="#FF9800" />
          <path d="M210 115 L 240 115" stroke="#FF9800" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );

    case "steam-park":
      return (
        <img
          src={legoSteamPark}
          alt="LEGO Education STEAM Park"
          className={`${className} object-cover`}
          referrerPolicy="no-referrer"
        />
      );

    case "my-xl-world":
      return (
        <img
          src={legoDuploWorld}
          alt="LEGO Education My XL World"
          className={`${className} object-cover`}
          referrerPolicy="no-referrer"
        />
      );

    case "renewable-energy":
      return (
        <svg className={`${className} bg-cyan-50`} viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0H400V300H0V0Z" fill="#E0F7FA" />
          <circle cx="200" cy="150" r="110" fill="#26C6DA" opacity="0.25" />
          {/* Solar Panel plate */}
          <rect x="80" y="160" width="90" height="60" rx="6" fill="#1E3A8A" stroke="#006DB7" strokeWidth="4" transform="rotate(-15 80 160)" />
          {/* Grid lines */}
          <line x1="90" y1="180" x2="165" y2="160" stroke="#FFF" strokeWidth="1.5" />
          <line x1="95" y1="200" x2="170" y2="180" stroke="#FFF" strokeWidth="1.5" />
          <line x1="120" y1="160" x2="135" y2="215" stroke="#FFF" strokeWidth="1.5" />
          <line x1="140" y1="155" x2="155" y2="210" stroke="#FFF" strokeWidth="1.5" />
          {/* Wind Turbine structure */}
          <rect x="270" y="110" width="10" height="130" fill="#ECEFF1" stroke="#B0BEC5" strokeWidth="2" />
          <circle cx="275" cy="110" r="12" fill="#90A4AE" />
          {/* Rotating Blades representation */}
          <path d="M275 110 L 275 40" stroke="#ECEFF1" strokeWidth="8" strokeLinecap="round" />
          <path d="M275 110 L 215 145" stroke="#ECEFF1" strokeWidth="8" strokeLinecap="round" />
          <path d="M275 110 L 335 145" stroke="#ECEFF1" strokeWidth="8" strokeLinecap="round" />
          <circle cx="275" cy="110" r="4" fill="#FFD500" />
          {/* Energy Meter Box */}
          <rect x="180" y="210" width="50" height="35" rx="6" fill="#ECEFF1" stroke="#78909C" strokeWidth="2" />
          <rect x="190" y="218" width="30" height="12" rx="2" fill="#111827" />
          {/* Green active bar */}
          <rect x="193" y="221" width="18" height="6" fill="#10B981" />
        </svg>
      );

    case "classroom-brick-pack":
      return (
        <svg className={`${className} bg-stone-100`} viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0H400V300H0V0Z" fill="#F5F5F5" />
          {/* Floating Pile of primary bricks */}
          {/* Red 2x4 */}
          <g transform="translate(140, 160) rotate(-15)">
            <rect x="0" y="0" width="100" height="40" rx="4" fill="#D01012" />
            <circle cx="15" cy="-5" r="8" fill="#D01012" />
            <circle cx="40" cy="-5" r="8" fill="#D01012" />
            <circle cx="65" cy="-5" r="8" fill="#D01012" />
            <circle cx="90" cy="-5" r="8" fill="#D01012" />
            <rect x="2" y="2" width="96" height="36" rx="3" stroke="#FFF" strokeWidth="2" opacity="0.15" fill="none" />
          </g>
          {/* Yellow 2x2 */}
          <g transform="translate(230, 120) rotate(20)">
            <rect x="0" y="0" width="60" height="40" rx="4" fill="#FFD500" />
            <circle cx="15" cy="-5" r="8" fill="#FFD500" />
            <circle cx="45" cy="-5" r="8" fill="#FFD500" />
            <rect x="2" y="2" width="56" height="36" rx="3" stroke="#FFF" strokeWidth="2" opacity="0.2" fill="none" />
          </g>
          {/* Blue 2x4 */}
          <g transform="translate(80, 100) rotate(10)">
            <rect x="0" y="0" width="100" height="40" rx="4" fill="#006DB7" />
            <circle cx="15" cy="-5" r="8" fill="#006DB7" />
            <circle cx="40" cy="-5" r="8" fill="#006DB7" />
            <circle cx="65" cy="-5" r="8" fill="#006DB7" />
            <circle cx="90" cy="-5" r="8" fill="#006DB7" />
            <rect x="2" y="2" width="96" height="36" rx="3" stroke="#FFF" strokeWidth="2" opacity="0.2" fill="none" />
          </g>
          {/* Green brick on edge */}
          <g transform="translate(180, 80) rotate(-35)">
            <rect x="0" y="0" width="80" height="40" rx="4" fill="#4CAF50" />
            <circle cx="15" cy="-5" r="8" fill="#4CAF50" />
            <circle cx="40" cy="-5" r="8" fill="#4CAF50" />
            <circle cx="65" cy="-5" r="8" fill="#4CAF50" />
          </g>
        </svg>
      );

    case "spike-expansion":
      return (
        <svg className={`${className} bg-yellow-50`} viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0H400V300H0V0Z" fill="#FFFDF0" />
          <circle cx="200" cy="150" r="110" fill="#FFD500" opacity="0.2" />
          {/* Expansion tracks/wheels */}
          <circle cx="200" cy="150" r="75" stroke="#374151" strokeWidth="12" fill="none" />
          {/* Technic beam with holes representation */}
          <rect x="60" y="142" width="280" height="16" rx="8" fill="#9CA3AF" stroke="#4B5563" strokeWidth="2" />
          <circle cx="80" cy="150" r="5" fill="#FFF" />
          <circle cx="110" cy="150" r="5" fill="#FFF" />
          <circle cx="140" cy="150" r="5" fill="#FFF" />
          <circle cx="170" cy="150" r="5" fill="#FFF" />
          <circle cx="200" cy="150" r="5" fill="#FFF" />
          <circle cx="230" cy="150" r="5" fill="#FFF" />
          <circle cx="260" cy="150" r="5" fill="#FFF" />
          <circle cx="290" cy="150" r="5" fill="#FFF" />
          <circle cx="320" cy="150" r="5" fill="#FFF" />
          {/* Blue connector pins */}
          <circle cx="110" cy="150" r="4" fill="#006DB7" />
          <circle cx="290" cy="150" r="4" fill="#006DB7" />
          {/* Large Yellow gear interlocked */}
          <circle cx="200" cy="150" r="40" fill="#FFD500" stroke="#FF9800" strokeWidth="3" />
          <circle cx="200" cy="150" r="15" fill="#FFFFFF" />
          <circle cx="200" cy="150" r="5" fill="#9CA3AF" />
        </svg>
      );

    case "wedo-2":
      return (
        <svg className={`${className} bg-emerald-50`} viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0H400V300H0V0Z" fill="#EEF9EE" />
          <circle cx="200" cy="150" r="110" fill="#4CAF50" opacity="0.2" />
          {/* Classic green WeDo robotics project (frog or rover) */}
          <rect x="110" y="160" width="180" height="60" rx="8" fill="#4CAF50" />
          {/* Hub */}
          <rect x="130" y="120" width="80" height="40" rx="6" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="3" />
          <rect x="130" y="120" width="80" height="10" rx="2" fill="#4CAF50" />
          {/* Eyes of frog decoration */}
          <circle cx="170" cy="100" r="14" fill="#FFD500" />
          <circle cx="170" cy="100" r="6" fill="#000" />
          <circle cx="170" cy="100" r="2" fill="#FFF" />
          <circle cx="205" cy="100" r="14" fill="#FFD500" />
          <circle cx="205" cy="100" r="6" fill="#000" />
          <circle cx="205" cy="100" r="2" fill="#FFF" />
          {/* Small rubber wheel gear */}
          <circle cx="250" cy="180" r="24" fill="#1F2937" stroke="#9CA3AF" strokeWidth="3" />
          <circle cx="250" cy="180" r="8" fill="#9CA3AF" />
          {/* Wire */}
          <path d="M210 140 C 240 140, 230 170, 245 170" stroke="#374151" strokeWidth="3" fill="none" />
        </svg>
      );

    case "storytales":
      return (
        <svg className={`${className} bg-rose-50`} viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0H400V300H0V0Z" fill="#FFF0F2" />
          <circle cx="200" cy="150" r="110" fill="#F48FB1" opacity="0.3" />
          {/* Castle gateway story scenario */}
          <rect x="80" y="220" width="240" height="15" rx="3" fill="#8D6E63" />
          {/* Left Turret pink */}
          <rect x="110" y="120" width="40" height="100" rx="4" fill="#E91E63" />
          <path d="M100 120 L 130 70 L 160 120 Z" fill="#9C27B0" />
          {/* Right Turret pink */}
          <rect x="250" y="120" width="40" height="100" rx="4" fill="#E91E63" />
          <path d="M240 120 L 270 70 L 300 120 Z" fill="#9C27B0" />
          {/* Arch Gate blue */}
          <path d="M150 220 L 150 160 C 150 130, 250 130, 250 160 L 250 220" stroke="#006DB7" strokeWidth="12" fill="none" />
          {/* Cute green dragon block */}
          <rect x="180" y="150" width="40" height="30" rx="6" fill="#4CAF50" />
          <circle cx="190" cy="160" r="4" fill="#FFD500" />
          <path d="M215 155 L 225 150 L 220 165 Z" fill="#FF9800" /> {/* fire breath! */}
        </svg>
      );

    case "gears-tech":
      return (
        <svg className={`${className} bg-blue-50`} viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0H400V300H0V0Z" fill="#ECEFF1" />
          <circle cx="200" cy="150" r="110" fill="#90A4AE" opacity="0.2" />
          {/* Interlocking Gears Composition */}
          {/* Blue Gear Left */}
          <g transform="translate(145, 150)">
            <circle cx="0" cy="0" r="50" fill="#006DB7" stroke="#00548C" strokeWidth="4" />
            {/* Teeth */}
            <rect x="-8" y="-60" width="16" height="120" rx="4" fill="#006DB7" />
            <rect x="-8" y="-60" width="16" height="120" rx="4" fill="#006DB7" transform="rotate(30)" />
            <rect x="-8" y="-60" width="16" height="120" rx="4" fill="#006DB7" transform="rotate(60)" />
            <rect x="-8" y="-60" width="16" height="120" rx="4" fill="#006DB7" transform="rotate(90)" />
            <rect x="-8" y="-60" width="16" height="120" rx="4" fill="#006DB7" transform="rotate(120)" />
            <rect x="-8" y="-60" width="16" height="120" rx="4" fill="#006DB7" transform="rotate(150)" />
            <circle cx="0" cy="0" r="18" fill="#FFF" />
            <circle cx="0" cy="0" r="6" fill="#90A4AE" />
          </g>
          {/* Yellow Gear Right */}
          <g transform="translate(235, 120)">
            <circle cx="0" cy="0" r="35" fill="#FFD500" stroke="#FF9800" strokeWidth="3" />
            <rect x="-6" y="-45" width="12" height="90" rx="3" fill="#FFD500" />
            <rect x="-6" y="-45" width="12" height="90" rx="3" fill="#FFD500" transform="rotate(45)" />
            <rect x="-6" y="-45" width="12" height="90" rx="3" fill="#FFD500" transform="rotate(90)" />
            <rect x="-6" y="-45" width="12" height="90" rx="3" fill="#FFD500" transform="rotate(135)" />
            <circle cx="0" cy="0" r="12" fill="#FFF" />
            <circle cx="0" cy="0" r="4" fill="#90A4AE" />
          </g>
          {/* Connecting lever arm */}
          <line x1="145" y1="150" x2="235" y2="120" stroke="#D01012" strokeWidth="8" strokeLinecap="round" />
          <circle cx="145" cy="150" r="10" fill="#FFD500" />
          <circle cx="235" cy="120" r="10" fill="#006DB7" />
        </svg>
      );

    case "duplo-letters":
      return (
        <svg className={`${className} bg-amber-50`} viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0H400V300H0V0Z" fill="#FFF9E6" />
          <circle cx="200" cy="150" r="110" fill="#FFE082" opacity="0.3" />
          {/* Big alphabet Duplo blocks */}
          {/* Block 'A' Red */}
          <g transform="translate(100, 110)">
            <rect x="0" y="0" width="80" height="80" rx="8" fill="#D01012" />
            <circle cx="25" cy="-8" r="12" fill="#D01012" />
            <circle cx="55" cy="-8" r="12" fill="#D01012" />
            {/* Stud text 'DUPLO' style shadow */}
            <circle cx="25" cy="-8" r="6" fill="#FFF" opacity="0.1" />
            <circle cx="55" cy="-8" r="6" fill="#FFF" opacity="0.1" />
            {/* Letter A */}
            <text x="40" y="58" fill="#FFFFFF" fontFamily="'Nunito', sans-serif" fontWeight="900" fontSize="52" textAnchor="middle">A</text>
          </g>
          {/* Block 'B' Yellow */}
          <g transform="translate(195, 130) rotate(10)">
            <rect x="0" y="0" width="80" height="80" rx="8" fill="#FFD500" />
            <circle cx="25" cy="-8" r="12" fill="#FFD500" />
            <circle cx="55" cy="-8" r="12" fill="#FFD500" />
            {/* Letter B */}
            <text x="40" y="58" fill="#101820" fontFamily="'Nunito', sans-serif" fontWeight="900" fontSize="52" textAnchor="middle">B</text>
          </g>
          {/* Block 'C' Blue */}
          <g transform="translate(150, 70) rotate(-15)">
            <rect x="0" y="0" width="80" height="80" rx="8" fill="#006DB7" />
            <circle cx="25" cy="-8" r="12" fill="#006DB7" />
            <circle cx="55" cy="-8" r="12" fill="#006DB7" />
            {/* Letter C */}
            <text x="40" y="58" fill="#FFFFFF" fontFamily="'Nunito', sans-serif" fontWeight="900" fontSize="52" textAnchor="middle">C</text>
          </g>
        </svg>
      );

    case "spike-class-pack":
      return (
        <svg className={`${className} bg-yellow-50`} viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0H400V300H0V0Z" fill="#FFFDEB" />
          <circle cx="200" cy="150" r="110" fill="#FFE082" opacity="0.4" />
          {/* Smart Hub Rack & Stack */}
          {/* Background boxes */}
          <rect x="90" y="140" width="100" height="70" rx="8" fill="#006DB7" stroke="#00548C" strokeWidth="3" />
          <rect x="210" y="140" width="100" height="70" rx="8" fill="#FFD500" stroke="#FF9800" strokeWidth="3" />
          {/* Foreground central stack box */}
          <rect x="130" y="160" width="140" height="90" rx="12" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="4" />
          <rect x="130" y="160" width="140" height="15" rx="3" fill="#D01012" />
          {/* LEGO details sticking out */}
          <rect x="160" y="185" width="80" height="15" rx="3" fill="#006DB7" />
          <rect x="180" y="210" width="60" height="15" rx="3" fill="#4CAF50" />
          {/* Gold Badge */}
          <circle cx="270" cy="110" r="28" fill="#FF9800" />
          <circle cx="270" cy="110" r="24" fill="#FFD500" stroke="#FF9800" strokeWidth="2" />
          <text x="270" y="115" fill="#5D4037" fontFamily="'Nunito', sans-serif" fontWeight="900" fontSize="16" textAnchor="middle">x6</text>
        </svg>
      );

    case "creation-wind-grid":
      return (
        <img
          src={creationWindGrid}
          alt="STEM Project: Wind Turbine"
          className={`${className} object-cover`}
          referrerPolicy="no-referrer"
        />
      );

    case "creation-mars-rover":
      return (
        <img
          src={creationMarsRover}
          alt="STEM Project: Mars Rover"
          className={`${className} object-cover`}
          referrerPolicy="no-referrer"
        />
      );

    case "creation-rollercoaster":
      return (
        <svg className={`${className} bg-violet-50`} viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0H400V300H0V0Z" fill="#F5F3FF" />
          <circle cx="200" cy="150" r="110" fill="#DDD6FE" opacity="0.4" />
          {/* Coaster Rails (Swooping red curve) */}
          <path d="M50 80 Q 150 250, 250 140 T 370 200" stroke="#D01012" strokeWidth="12" strokeLinecap="round" fill="none" />
          <path d="M50 80 Q 150 250, 250 140 T 370 200" stroke="#FF8A8C" strokeWidth="2" strokeDasharray="4 6" fill="none" />
          {/* Support scaffolding beams */}
          <line x1="120" y1="180" x2="120" y2="260" stroke="#4B5563" strokeWidth="4" />
          <line x1="200" y1="170" x2="200" y2="260" stroke="#4B5563" strokeWidth="4" />
          <line x1="300" y1="170" x2="300" y2="260" stroke="#4B5563" strokeWidth="4" />
          <line x1="120" y1="210" x2="200" y2="210" stroke="#4B5563" strokeWidth="3" />
          <line x1="200" y1="210" x2="300" y2="210" stroke="#4B5563" strokeWidth="3" />
          {/* Rollercoaster cart flying down */}
          <g transform="translate(130, 160) rotate(15)">
            <rect x="0" y="0" width="55" height="28" rx="6" fill="#FFD500" stroke="#000" strokeWidth="2" />
            <circle cx="15" cy="28" r="8" fill="#111827" />
            <circle cx="40" cy="28" r="8" fill="#111827" />
            {/* Passengers (two yellow heads) */}
            <circle cx="18" cy="-8" r="7" fill="#FFD500" />
            <circle cx="38" cy="-8" r="7" fill="#FFD500" />
            <path d="M18 -4 Q 18 0, 22 -4" stroke="#000" strokeWidth="1.5" />
            <path d="M38 -4 Q 38 0, 42 -4" stroke="#000" strokeWidth="1.5" />
          </g>
          {/* Bell at the bottom */}
          <circle cx="340" cy="205" r="14" fill="#FFC107" stroke="#FF8F00" strokeWidth="2" />
          <path d="M340 191 L 340 180" stroke="#374151" strokeWidth="3" />
        </svg>
      );

    case "creation-basketball-machine":
      return (
        <svg className={`${className} bg-amber-50`} viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0H400V300H0V0Z" fill="#FFFBEB" />
          <circle cx="200" cy="150" r="110" fill="#FDE68A" opacity="0.3" />
          {/* Catapult frame (Yellow and grey mechanical structures) */}
          <rect x="80" y="230" width="180" height="15" rx="3" fill="#D1D5DB" stroke="#9CA3AF" strokeWidth="2" />
          {/* Vertical pillar */}
          <rect x="180" y="110" width="16" height="125" fill="#374151" />
          {/* Pivot bolt */}
          <circle cx="188" cy="140" r="10" fill="#FFD500" stroke="#D97706" strokeWidth="2" />
          {/* Catapult catapult arm */}
          <g transform="translate(188, 140) rotate(-25)">
            <rect x="-90" y="-8" width="110" height="16" rx="8" fill="#006DB7" />
            {/* Scoop at the end */}
            <path d="M-105 -15 C -105 -15, -105 15, -85 15" stroke="#006DB7" strokeWidth="6" strokeLinecap="round" fill="none" />
            <circle cx="-90" cy="-5" r="8" fill="#F97316" /> {/* Basketball */}
          </g>
          {/* Elastic rubber band red */}
          <path d="M120 170 L 188 140" stroke="#EF4444" strokeWidth="4" />
          {/* Basketball Hoop Net */}
          <rect x="290" y="70" width="45" height="6" fill="#D01012" />
          <path d="M293 76 L 303 120 L 322 120 L 332 76 Z" stroke="#E5E7EB" strokeWidth="2" fill="none" />
          {/* Net grid representation */}
          <line x1="293" y1="76" x2="322" y2="120" stroke="#E5E7EB" strokeWidth="1.5" opacity="0.6" />
          <line x1="332" y1="76" x2="303" y2="120" stroke="#E5E7EB" strokeWidth="1.5" opacity="0.6" />
          <rect x="330" y="40" width="8" height="180" fill="#9CA3AF" />
          {/* Backboard */}
          <rect x="315" y="25" width="38" height="50" fill="#FFF" stroke="#D1D5DB" strokeWidth="3" rx="4" />
          <rect x="323" y="40" width="22" height="22" fill="none" stroke="#D01012" strokeWidth="2" />
        </svg>
      );

    default:
      return (
        <svg className={className} viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0H400V300H0V0Z" fill="#F3F4F6" />
          <rect x="150" y="100" width="100" height="80" rx="8" fill="#D1D5DB" stroke="#9CA3AF" strokeWidth="4" />
          <circle cx="175" cy="92" r="12" fill="#9CA3AF" />
          <circle cx="225" cy="92" r="12" fill="#9CA3AF" />
          <rect x="175" y="125" width="50" height="30" rx="4" fill="#FFF" />
          <path d="M190 140 H 210" stroke="#9CA3AF" strokeWidth="4" />
        </svg>
      );
  }
}
