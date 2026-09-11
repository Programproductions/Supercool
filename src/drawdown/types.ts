export type DrawdownAccount = {
  id: string
  name: string
  totalAdvance: number
  monthlyLimit: number
  currency: string
  createdAt: string
}

export type MonthlyDrawdown = {
  id: string
  accountId: string
  amount: number
  month: string
  note: string
  createdAt: string
}

export type DrawdownStore = {
  accounts: DrawdownAccount[]
  drawdowns: MonthlyDrawdown[]
}

export type AccountSummary = {
  account: DrawdownAccount
  totalDrawn: number
  remainingBalance: number
  monthlyUsed: number
  monthlyAvailable: number
}
