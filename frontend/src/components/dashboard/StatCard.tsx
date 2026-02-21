import { LucideIcon } from 'lucide-react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import MiniSparkline from './MiniSparkline'

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: string
  trendUp?: boolean
  color?: 'blue' | 'yellow' | 'green' | 'red' | 'purple'
  sparkData?: number[]
}

const colorMap: Record<string, { bg: string; border: string; icon: string; spark: string }> = {
  blue:   { bg: 'bg-blue-500/10',   border: 'border-blue-500/20',   icon: 'text-blue-400',   spark: '#3B82F6' },
  green:  { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', icon: 'text-emerald-400', spark: '#10B981' },
  yellow: { bg: 'bg-amber-500/10',  border: 'border-amber-500/20',  icon: 'text-amber-400',  spark: '#F59E0B' },
  red:    { bg: 'bg-red-500/10',    border: 'border-red-500/20',    icon: 'text-red-400',    spark: '#EF4444' },
  purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/20', icon: 'text-purple-400', spark: '#A78BFA' },
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  trendUp = true,
  color = 'blue',
  sparkData,
}: StatCardProps) {
  const c = colorMap[color]

  return (
    <div className="glass-card-hover rounded-2xl p-6 flex flex-col gap-4" role="article" aria-label={`${title}: ${value}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{title}</p>
          <p className="text-3xl font-bold text-white tracking-tight">{value}</p>
          {trend && (
            <div className={`inline-flex items-center gap-1 mt-2 text-xs font-semibold ${trendUp ? 'text-emerald-400' : 'text-red-400'}`}>
              {trendUp ? (
                <TrendingUp className="h-3 w-3" strokeWidth={2} />
              ) : (
                <TrendingDown className="h-3 w-3" strokeWidth={2} />
              )}
              {trend}
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl ${c.bg} border ${c.border} flex-shrink-0`}>
          <Icon className={`h-5 w-5 ${c.icon}`} strokeWidth={2} />
        </div>
      </div>

      {sparkData && sparkData.length > 1 && (
        <div className="h-10 -mx-1">
          <MiniSparkline data={sparkData} color={c.spark} height={40} />
        </div>
      )}
    </div>
  )
}
