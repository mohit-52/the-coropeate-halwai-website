import React from "react";

interface TCHLogoProps {
  className?: string;
  id?: string;
}

export default function TCHLogo({ className = "w-10 h-10", id = "tch-brand-logo-svg" }: TCHLogoProps) {
  return (
    <svg
      viewBox="0 0 400 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      id={id}
    >
      <defs>
        {/* Rich golden-yellow card face gradient */}
        <linearGradient id="goldFaceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2C3" />
          <stop offset="35%" stopColor="#F8D45A" />
          <stop offset="75%" stopColor="#E2AC26" />
          <stop offset="100%" stopColor="#C48D15" />
        </linearGradient>

        {/* Polished metallic border gradient for middle card & elements */}
        <linearGradient id="goldBorderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFEAA7" />
          <stop offset="25%" stopColor="#D4A131" />
          <stop offset="75%" stopColor="#B38018" />
          <stop offset="100%" stopColor="#875B09" />
        </linearGradient>

        {/* Shimmer text gradient for middle C letter */}
        <linearGradient id="goldTextGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="30%" stopColor="#FFE082" />
          <stop offset="70%" stopColor="#E5A922" />
          <stop offset="100%" stopColor="#AD7B0B" />
        </linearGradient>

        {/* Emerald green card face gradient for the middle card */}
        <linearGradient id="greenFaceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#083721" />
          <stop offset="45%" stopColor="#052516" />
          <stop offset="100%" stopColor="#02140B" />
        </linearGradient>

        {/* Horizontal gradient for the swooshes */}
        <linearGradient id="swooshGoldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#A87E25" />
          <stop offset="50%" stopColor="#F9D25B" />
          <stop offset="100%" stopColor="#966C1D" />
        </linearGradient>
      </defs>

      {/* Layer 1: Left Card (T) - rendered behind middle card */}
      <g transform="translate(125, 145) rotate(-13)" id="tch-logo-card-t">
        {/* Soft back shadow */}
        <rect
          x="-43"
          y="-61"
          width="86"
          height="122"
          rx="8"
          fill="#000000"
          fillOpacity="0.08"
        />
        {/* Gold card body */}
        <rect
          x="-42"
          y="-60"
          width="84"
          height="120"
          rx="7"
          fill="url(#goldFaceGradient)"
          stroke="#052516"
          strokeWidth="4.5"
          strokeLinejoin="round"
        />
        {/* Inner border line */}
        <rect
          x="-37"
          y="-55"
          width="74"
          height="110"
          rx="5"
          fill="none"
          stroke="#052516"
          strokeWidth="1"
          strokeOpacity="0.3"
        />
        {/* Serif Letter T */}
        <text
          x="0"
          y="21"
          fontFamily="Cinzel, Playfair Display, Georgia, serif"
          fontWeight="900"
          fontSize="54"
          fill="#052516"
          textAnchor="middle"
          letterSpacing="-0.02em"
        >
          T
        </text>
      </g>

      {/* Layer 2: Right Card (H) - rendered behind middle card */}
      <g transform="translate(275, 145) rotate(13)" id="tch-logo-card-h">
        {/* Soft back shadow */}
        <rect
          x="-43"
          y="-61"
          width="86"
          height="122"
          rx="8"
          fill="#000000"
          fillOpacity="0.08"
        />
        {/* Gold card body */}
        <rect
          x="-42"
          y="-60"
          width="84"
          height="120"
          rx="7"
          fill="url(#goldFaceGradient)"
          stroke="#052516"
          strokeWidth="4.5"
          strokeLinejoin="round"
        />
        {/* Inner border line */}
        <rect
          x="-37"
          y="-55"
          width="74"
          height="110"
          rx="5"
          fill="none"
          stroke="#052516"
          strokeWidth="1"
          strokeOpacity="0.3"
        />
        {/* Serif Letter H */}
        <text
          x="0"
          y="20"
          fontFamily="Cinzel, Playfair Display, Georgia, serif"
          fontWeight="900"
          fontSize="52"
          fill="#052516"
          textAnchor="middle"
        >
          H
        </text>
      </g>

      {/* Layer 3: Middle Elevated Overlapping Card (C) */}
      <g transform="translate(200, 130)" id="tch-logo-card-c">
        {/* Depth shadow for overlap effect */}
        <rect
          x="-52"
          y="-72"
          width="104"
          height="144"
          rx="10"
          fill="#000000"
          fillOpacity="0.2"
          filter="blur(3px)"
        />
        {/* Green card body with gold border */}
        <rect
          x="-50"
          y="-70"
          width="100"
          height="140"
          rx="9"
          fill="url(#greenFaceGradient)"
          stroke="url(#goldBorderGradient)"
          strokeWidth="5"
          strokeLinejoin="round"
        />
        {/* Gold inner hairline border */}
        <rect
          x="-44"
          y="-64"
          width="88"
          height="128"
          rx="7"
          fill="none"
          stroke="url(#goldBorderGradient)"
          strokeWidth="1"
          strokeOpacity="0.5"
        />
        {/* Serif Letter C */}
        <text
          x="0"
          y="26"
          fontFamily="Cinzel, Playfair Display, Georgia, serif"
          fontWeight="900"
          fontSize="64"
          fill="url(#goldTextGradient)"
          textAnchor="middle"
          letterSpacing="-0.02em"
        >
          C
        </text>
      </g>

      {/* Layer 4: Elegant supporting swooshes arching upwards at the bottom */}
      <g id="tch-logo-swooshes">
        {/* Curved upper green anchor arch (thick) */}
        <path
          d="M 60,230 Q 200,192 340,230 Q 200,202 60,230 Z"
          fill="#052516"
          id="tch-swoosh-green"
        />
        {/* Curved lower gold accent arch (thin, concentric) */}
        <path
          d="M 68,243 Q 200,206 332,243 Q 200,212 68,243 Z"
          fill="url(#swooshGoldGradient)"
          id="tch-swoosh-gold"
        />
      </g>
    </svg>
  );
}
