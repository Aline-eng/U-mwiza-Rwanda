interface MiniSparklineProps {
  data: number[]
  color?: string
  height?: number
  strokeWidth?: number
}

export default function MiniSparkline({
  data,
  color = '#3B82F6',
  height = 40,
  strokeWidth = 1.5,
}: MiniSparklineProps) {
  if (!data || data.length < 2) return null

  const w = 100
  const h = height
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const pad = 3

  const step = w / (data.length - 1)
  const pts = data.map((v, i) => ({
    x: i * step,
    y: h - pad - ((v - min) / range) * (h - pad * 2),
  }))

  const linePath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(' ')
  const areaPath = `${linePath} L ${w} ${h} L 0 ${h} Z`
  const gradId = `sg-${color.replace('#', '')}`

  return (
    <svg
      width="100%"
      height={height}
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#${gradId})`} />
      <path
        d={linePath}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
