import type { DrawdownAccount, DrawdownStore, MonthlyDrawdown } from './types'
import { createId, currentMonth } from './utils'

const STORAGE_KEY = 'supercool-drawdown-store'

const demoStore: DrawdownStore = {
  accounts: [
    {
      id: 'demo-artist-1',
      name: 'Nova Rivers',
      totalAdvance: 50000,
      monthlyLimit: 5000,
      currency: 'AUD',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'demo-label-1',
      name: 'Sunset Vinyl Co.',
      totalAdvance: 120000,
      monthlyLimit: 10000,
      currency: 'AUD',
      createdAt: new Date().toISOString(),
    },
  ],
  drawdowns: [
    {
      id: 'demo-draw-1',
      accountId: 'demo-artist-1',
      amount: 3500,
      month: currentMonth(),
      note: 'Studio time and mixing',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'demo-draw-2',
      accountId: 'demo-label-1',
      amount: 8000,
      month: currentMonth(),
      note: 'Marketing campaign',
      createdAt: new Date().toISOString(),
    },
  ],
}

function readStore(): DrawdownStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(demoStore))
      return demoStore
    }
    return JSON.parse(raw) as DrawdownStore
  } catch {
    return demoStore
  }
}

function writeStore(store: DrawdownStore): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
}

export function loadDrawdownStore(): DrawdownStore {
  return readStore()
}

export function saveDrawdownStore(store: DrawdownStore): void {
  writeStore(store)
}

export function addAccount(
  store: DrawdownStore,
  input: Omit<DrawdownAccount, 'id' | 'createdAt'>,
): DrawdownStore {
  const account: DrawdownAccount = {
    ...input,
    id: createId(),
    createdAt: new Date().toISOString(),
  }
  const next = { ...store, accounts: [...store.accounts, account] }
  writeStore(next)
  return next
}

export function addDrawdown(
  store: DrawdownStore,
  input: Omit<MonthlyDrawdown, 'id' | 'createdAt'>,
): DrawdownStore {
  const drawdown: MonthlyDrawdown = {
    ...input,
    id: createId(),
    createdAt: new Date().toISOString(),
  }
  const next = { ...store, drawdowns: [...store.drawdowns, drawdown] }
  writeStore(next)
  return next
}

export function resetDrawdownStore(): DrawdownStore {
  writeStore(demoStore)
  return demoStore
}
