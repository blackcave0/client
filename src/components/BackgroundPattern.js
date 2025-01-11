import { Box } from '@chakra-ui/react';

export const BackgroundPattern = () => (
  <Box
    position="fixed"
    top={0}
    left={0}
    right={0}
    bottom={0}
    zIndex={-1}
    opacity={0.08}
    pointerEvents="none"
    color="brand.primary"
  >
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="fruit-pattern" x="0" y="0" width="400" height="400" patternUnits="userSpaceOnUse">
          {/* Large Apple */}
          <g transform="translate(50, 50)">
            <path
              d="M40,30 C40,15 30,10 20,10 C10,10 0,20 0,30 C0,50 20,70 40,60 C60,70 80,50 80,30 C80,20 70,10 60,10 C50,10 40,15 40,30"
              fill="currentColor"
              opacity="0.5"
            />
            <path
              d="M38,10 C38,0 48,-10 58,-10 C58,0 48,10 38,10"
              fill="currentColor"
              opacity="0.5"
            />
          </g>

          {/* Large Orange */}
          <g transform="translate(250, 100)">
            <circle
              cx="0"
              cy="0"
              r="40"
              fill="currentColor"
              opacity="0.5"
            />
            <path
              d="M0,-40 C-10,-45 -15,-35 -5,-30"
              fill="currentColor"
              opacity="0.5"
            />
            <path
              d="M-20,-35 C-25,-40 -30,-30 -20,-25"
              fill="currentColor"
              opacity="0.5"
            />
          </g>

          {/* Large Pineapple */}
          <g transform="translate(100, 250)">
            <path
              d="M0,0 L30,60 L-30,60 Z"
              fill="currentColor"
              opacity="0.5"
            />
            <path
              d="M0,-20 C20,-20 30,-10 30,0 C30,20 20,30 0,30 C-20,30 -30,20 -30,0 C-30,-10 -20,-20 0,-20"
              fill="currentColor"
              opacity="0.5"
            />
          </g>

          {/* Large Watermelon Slice */}
          <g transform="translate(280, 280)">
            <path
              d="M0,0 A80,80 0 0,1 80,80 L0,80 Z"
              fill="currentColor"
              opacity="0.5"
            />
            <circle cx="20" cy="40" r="3" fill="currentColor" opacity="0.5" />
            <circle cx="40" cy="30" r="3" fill="currentColor" opacity="0.5" />
            <circle cx="50" cy="50" r="3" fill="currentColor" opacity="0.5" />
            <circle cx="30" cy="60" r="3" fill="currentColor" opacity="0.5" />
          </g>
        </pattern>
      </defs>
      <rect x="0" y="0" width="100%" height="100%" fill="url(#fruit-pattern)" />
    </svg>
  </Box>
); 