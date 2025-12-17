import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: string
  color?: 'blue' | 'yellow' | 'green' | 'red'
}

const colorClasses: Record<'blue' | 'yellow' | 'green' | 'red', string> = {
  blue: 'bg-primary-100 text-primary-600',
  yellow: 'bg-yellow-100 text-yellow-600',
  green: 'bg-secondary-100 text-secondary-600',
  red: 'bg-red-100 text-red-600',
}

export default function StatCard({ title, value, icon: Icon, trend, color = 'blue' }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-charity border border-gray-100 hover-lift transition-smooth group">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">{title}</p>
          <p className="text-4xl font-heading font-bold text-gray-900 mb-1">{value}</p>
          {trend && (
            <p className="text-xs font-semibold text-secondary-600 bg-secondary-50 inline-block px-2 py-1 rounded-full mt-2">
              {trend}
            </p>
          )}
        </div>
        <div className={`p-4 rounded-xl ${colorClasses[color]} group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  )
}