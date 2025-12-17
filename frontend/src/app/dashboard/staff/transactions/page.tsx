'use client'

import { DollarSign, Search, Filter, Plus, Calendar, User, CheckCircle, Clock, XCircle } from 'lucide-react'
import { useEffect, useState } from 'react'

interface Transaction {
  id: string
  transactionCode: string
  amount: number
  currency: string
  transactionDate: string
  transactionType: string
  status: string
  paymentMethod?: string
  referenceNumber?: string
  notes?: string
  child: {
    firstName: string
    lastName: string
    childCode: string
  }
  sponsor: {
    firstName: string
    lastName: string
  }
}

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadTransactions()
  }, [])

  const loadTransactions = async () => {
    try {
      setLoading(true)
      // Mock data
      const mockTransactions: Transaction[] = [
        {
          id: '1',
          transactionCode: 'TXN001',
          amount: 50000,
          currency: 'RWF',
          transactionDate: '2025-01-01',
          transactionType: 'SPONSORSHIP',
          status: 'CONFIRMED',
          paymentMethod: 'Bank Transfer',
          referenceNumber: 'REF001',
          notes: 'Monthly sponsorship payment',
          child: { firstName: 'Amani', lastName: 'Uwase', childCode: 'CH001' },
          sponsor: { firstName: 'Michael', lastName: 'Johnson' }
        },
        {
          id: '2',
          transactionCode: 'TXN002',
          amount: 75000,
          currency: 'RWF',
          transactionDate: '2025-01-15',
          transactionType: 'SCHOLARSHIP',
          status: 'PENDING',
          paymentMethod: 'Mobile Money',
          referenceNumber: 'REF002',
          notes: 'School fees for Term 1',
          child: { firstName: 'Jean', lastName: 'Mugabo', childCode: 'CH002' },
          sponsor: { firstName: 'Sarah', lastName: 'Williams' }
        },
        {
          id: '3',
          transactionCode: 'TXN003',
          amount: 25000,
          currency: 'RWF',
          transactionDate: '2025-01-20',
          transactionType: 'EMERGENCY',
          status: 'DISBURSED',
          paymentMethod: 'Cash',
          notes: 'Medical emergency fund',
          child: { firstName: 'Grace', lastName: 'Ishimwe', childCode: 'CH003' },
          sponsor: { firstName: 'David', lastName: 'Brown' }
        }
      ]
      setTransactions(mockTransactions)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'CONFIRMED': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'PENDING': return <Clock className="h-4 w-4 text-yellow-600" />
      case 'DISBURSED': return <CheckCircle className="h-4 w-4 text-blue-600" />
      case 'CANCELLED': return <XCircle className="h-4 w-4 text-red-600" />
      default: return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED': return 'bg-green-100 text-green-700'
      case 'PENDING': return 'bg-yellow-100 text-yellow-700'
      case 'DISBURSED': return 'bg-blue-100 text-blue-700'
      case 'CANCELLED': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'SPONSORSHIP': return 'bg-blue-100 text-blue-700'
      case 'SCHOLARSHIP': return 'bg-green-100 text-green-700'
      case 'EMERGENCY': return 'bg-red-100 text-red-700'
      case 'DONATION': return 'bg-purple-100 text-purple-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1D3557]"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transaction History</h1>
          <p className="text-sm text-gray-600 mt-1">Track financial assistance and sponsorship payments</p>
        </div>
        <button className="bg-[#1D3557] text-white px-4 py-2 rounded-lg hover:bg-[#1D3557]/90 transition flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Record Transaction
        </button>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2">
            <Search className="h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by transaction code, child name, or sponsor..."
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
            <Filter className="h-4 w-4" />
            Filter
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{transaction.transactionCode}</h3>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getTypeColor(transaction.transactionType)}`}>
                      {transaction.transactionType}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-3">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">
                        {transaction.child.firstName} {transaction.child.lastName} ({transaction.child.childCode})
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">{new Date(transaction.transactionDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">Sponsor: {transaction.sponsor.firstName} {transaction.sponsor.lastName}</span>
                    </div>
                  </div>

                  {transaction.notes && (
                    <p className="text-gray-600 text-sm mb-3">{transaction.notes}</p>
                  )}

                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    {transaction.paymentMethod && (
                      <span>Payment: {transaction.paymentMethod}</span>
                    )}
                    {transaction.referenceNumber && (
                      <span>Ref: {transaction.referenceNumber}</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">
                  {transaction.amount.toLocaleString()} {transaction.currency}
                </p>
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full mt-2 ${getStatusColor(transaction.status)}`}>
                  {getStatusIcon(transaction.status)}
                  <span className="text-xs font-medium">{transaction.status}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-gray-100">
              <button className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition text-sm font-medium">
                View Details
              </button>
              {transaction.status === 'PENDING' && (
                <button className="flex-1 bg-[#2A9D8F] text-white px-4 py-2 rounded-lg hover:bg-[#2A9D8F]/90 transition text-sm font-medium">
                  Update Status
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}