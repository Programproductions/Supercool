import type { DrawdownAccount, DrawdownStore, MonthlyDrawdown } from './types'

export function formatCurrency(amount: number, currency = 'AUD'): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount)
}

export function currentMonth(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  return `${year}-${month}`
}

export function formatMonth(month: string): string {
  const [year, monthNum] = month.split('-')
  const date = new Date(Number(year), Number(monthNum) - 1, 1)
  return date.toLocaleDateString('en-AU', { month: 'long', year: 'numeric' })
}

export function getAccountDrawdowns(
  store: DrawdownStore,
  accountId: string,
): MonthlyDrawdown[] {
  return store.drawdowns
    .filter((drawdown) => drawdown.accountId === accountId)
    .sort((a, b) => b.month.localeCompare(a.month) || b.createdAt.localeCompare(a.createdAt))
}

export function getTotalDrawn(store: DrawdownStore, accountId: string): number {
  return getAccountDrawdowns(store, accountId).reduce((sum, drawdown) => sum + drawdown.amount, 0)
}

export function getMonthlyUsed(
  store: DrawdownStore,
  accountId: string,
  month: string,
): number {
  return store.drawdowns
    .filter((drawdown) => drawdown.accountId === accountId && drawdown.month === month)
    .reduce((sum, drawdown) => sum + drawdown.amount, 0)
}

export function getRemainingBalance(store: DrawdownStore, account: DrawdownAccount): number {
  return Math.max(0, account.totalAdvance - getTotalDrawn(store, account.id))
}

export function getMonthlyAvailable(
  store: DrawdownStore,
  account: DrawdownAccount,
  month: string,
): number {
  const monthlyUsed = getMonthlyUsed(store, account.id, month)
  const remainingBalance = getRemainingBalance(store, account)
  return Math.max(0, Math.min(account.monthlyLimit - monthlyUsed, remainingBalance))
}

export type DrawdownValidation = {
  valid: boolean
  error?: string
}

export function validateDrawdown(
  store: DrawdownStore,
  account: DrawdownAccount,
  amount: number,
  month: string,
): DrawdownValidation {
  if (!Number.isFinite(amount) || amount <= 0) {
    return { valid: false, error: 'Drawdown amount must be greater than zero.' }
  }

  const remainingBalance = getRemainingBalance(store, account)
  if (amount > remainingBalance) {
    return {
      valid: false,
      error: `Amount exceeds remaining balance of ${formatCurrency(remainingBalance, account.currency)}.`,
    }
  }

  const monthlyUsed = getMonthlyUsed(store, account.id, month)
  const monthlyRemaining = account.monthlyLimit - monthlyUsed
  if (amount > monthlyRemaining) {
    return {
      valid: false,
      error: `Amount exceeds monthly limit. ${formatCurrency(monthlyRemaining, account.currency)} available for ${formatMonth(month)}.`,
    }
  }

  return { valid: true }
}

export function createId(): string {
  return crypto.randomUUID()
}
