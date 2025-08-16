"use client"

export function SharedGradientBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute -top-24 right-[-20%] h-[32rem] w-[32rem] rounded-full bg-gradient-to-br from-red-300/40 via-red-400/30 to-red-500/20 blur-3xl animate-pulse-slow" />
      <div className="absolute -bottom-24 left-[-20%] h-[32rem] w-[32rem] rounded-full bg-gradient-to-tr from-rose-300/40 via-red-400/30 to-red-500/20 blur-3xl animate-pulse-slow" />
    </div>
  )
}

export function SharedGridBackdrop() {
  return (
    <svg
      aria-hidden
      className="absolute inset-0 -z-10 h-full w-full opacity-[0.08]"
    >
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>
        <radialGradient id="fade" cx="50%" cy="0%" r="85%">
          <stop offset="0%" stopColor="white" stopOpacity="0.9" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
      <rect width="100%" height="100%" fill="url(#fade)" />
    </svg>
  )
}
