interface WaveDividerProps {
  fill?: string
  flip?: boolean
  className?: string
}

export function WaveDivider({
  fill = 'var(--light)',
  flip = false,
  className = '',
}: WaveDividerProps) {
  return (
    <div
      className={`w-full overflow-hidden leading-none ${flip ? 'rotate-180' : ''} ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="w-full h-8 md:h-12">
        <path
          fill={fill}
          d="M0,32 C360,0 720,64 1080,24 C1260,8 1380,16 1440,24 L1440,48 L0,48 Z"
        />
      </svg>
    </div>
  )
}
