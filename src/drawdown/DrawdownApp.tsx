import { useCallback, useMemo, useState } from 'react'
import type { DrawdownAccount, DrawdownStore } from './types'
import {
  addAccount,
  addDrawdown,
  loadDrawdownStore,
  resetDrawdownStore,
} from './store'
import {
  currentMonth,
  formatCurrency,
  formatMonth,
  getAccountDrawdowns,
  getMonthlyAvailable,
  getMonthlyUsed,
  getRemainingBalance,
  getTotalDrawn,
  validateDrawdown,
} from './utils'

function StatCard({
  label,
  value,
  detail,
}: {
  label: string
  value: string
  detail?: string
}) {
  return (
    <div className="funk-card p-4">
      <p className="text-xs font-bold uppercase tracking-wider text-funk-rust">{label}</p>
      <p className="mt-1 font-display text-2xl text-funk-brown">{value}</p>
      {detail ? <p className="mt-1 text-sm text-funk-brown/70">{detail}</p> : null}
    </div>
  )
}

function AccountCard({
  account,
  store,
  selected,
  onSelect,
}: {
  account: DrawdownAccount
  store: DrawdownStore
  selected: boolean
  onSelect: () => void
}) {
  const remaining = getRemainingBalance(store, account)
  const monthlyAvailable = getMonthlyAvailable(store, account, currentMonth())

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full text-left funk-card p-4 transition hover:-translate-y-0.5 ${
        selected ? 'ring-4 ring-funk-magenta' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-xl text-funk-brown">{account.name}</h3>
          <p className="mt-1 text-sm text-funk-brown/70">
            {formatCurrency(account.monthlyLimit, account.currency)} / month cap
          </p>
        </div>
        <span className="rounded-full bg-funk-teal/15 px-2 py-1 text-xs font-bold text-funk-teal">
          {account.currency}
        </span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-funk-rust">Remaining</p>
          <p className="font-bold">{formatCurrency(remaining, account.currency)}</p>
        </div>
        <div>
          <p className="text-funk-rust">Available this month</p>
          <p className="font-bold">{formatCurrency(monthlyAvailable, account.currency)}</p>
        </div>
      </div>
    </button>
  )
}

export function DrawdownApp() {
  const [store, setStore] = useState<DrawdownStore>(() => loadDrawdownStore())
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(
    () => store.accounts[0]?.id ?? null,
  )
  const [accountForm, setAccountForm] = useState({
    name: '',
    totalAdvance: '',
    monthlyLimit: '',
  })
  const [drawdownForm, setDrawdownForm] = useState({
    amount: '',
    month: currentMonth(),
    note: '',
  })
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const selectedAccount = useMemo(
    () => store.accounts.find((account) => account.id === selectedAccountId) ?? null,
    [store.accounts, selectedAccountId],
  )

  const accountHistory = useMemo(() => {
    if (!selectedAccount) return []
    return getAccountDrawdowns(store, selectedAccount.id)
  }, [store, selectedAccount])

  const clearMessages = useCallback(() => {
    setError(null)
    setSuccess(null)
  }, [])

  const handleCreateAccount = (event: React.FormEvent) => {
    event.preventDefault()
    clearMessages()

    const totalAdvance = Number(accountForm.totalAdvance)
    const monthlyLimit = Number(accountForm.monthlyLimit)

    if (!accountForm.name.trim()) {
      setError('Account name is required.')
      return
    }
    if (!Number.isFinite(totalAdvance) || totalAdvance <= 0) {
      setError('Total advance must be greater than zero.')
      return
    }
    if (!Number.isFinite(monthlyLimit) || monthlyLimit <= 0) {
      setError('Monthly limit must be greater than zero.')
      return
    }
    if (monthlyLimit > totalAdvance) {
      setError('Monthly limit cannot exceed total advance.')
      return
    }

    const next = addAccount(store, {
      name: accountForm.name.trim(),
      totalAdvance,
      monthlyLimit,
      currency: 'AUD',
    })
    setStore(next)
    setSelectedAccountId(next.accounts[next.accounts.length - 1].id)
    setAccountForm({ name: '', totalAdvance: '', monthlyLimit: '' })
    setSuccess('Account created.')
  }

  const handleRecordDrawdown = (event: React.FormEvent) => {
    event.preventDefault()
    clearMessages()

    if (!selectedAccount) {
      setError('Select an account first.')
      return
    }

    const amount = Number(drawdownForm.amount)
    const validation = validateDrawdown(store, selectedAccount, amount, drawdownForm.month)
    if (!validation.valid) {
      setError(validation.error ?? 'Invalid drawdown.')
      return
    }

    const next = addDrawdown(store, {
      accountId: selectedAccount.id,
      amount,
      month: drawdownForm.month,
      note: drawdownForm.note.trim(),
    })
    setStore(next)
    setDrawdownForm({ amount: '', month: currentMonth(), note: '' })
    setSuccess(`Recorded ${formatCurrency(amount, selectedAccount.currency)} drawdown for ${formatMonth(drawdownForm.month)}.`)
  }

  const handleReset = () => {
    const next = resetDrawdownStore()
    setStore(next)
    setSelectedAccountId(next.accounts[0]?.id ?? null)
    clearMessages()
    setSuccess('Demo data restored.')
  }

  const month = drawdownForm.month
  const monthlyUsed = selectedAccount ? getMonthlyUsed(store, selectedAccount.id, month) : 0
  const monthlyAvailable = selectedAccount
    ? getMonthlyAvailable(store, selectedAccount, month)
    : 0
  const remaining = selectedAccount ? getRemainingBalance(store, selectedAccount) : 0
  const totalDrawn = selectedAccount ? getTotalDrawn(store, selectedAccount.id) : 0

  return (
    <div className="min-h-screen">
      <header className="border-b-4 border-funk-brown bg-funk-cream/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div>
            <a href="/" className="text-sm font-semibold text-funk-teal hover:text-funk-magenta">
              ← Back to site
            </a>
            <h1 className="font-display text-3xl text-funk-brown sm:text-4xl">Monthly Drawdown</h1>
            <p className="mt-1 text-sm text-funk-rust">
              Track advances, monthly caps, and drawdown history for artists and partners.
            </p>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="rounded-full border-2 border-funk-brown bg-funk-mustard px-4 py-2 text-sm font-bold transition hover:bg-funk-orange hover:text-funk-cream"
          >
            Reset demo data
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {error ? (
          <div className="mb-6 rounded-xl border-2 border-funk-magenta bg-funk-magenta/10 px-4 py-3 text-funk-brown">
            {error}
          </div>
        ) : null}
        {success ? (
          <div className="mb-6 rounded-xl border-2 border-funk-avocado bg-funk-avocado/15 px-4 py-3 text-funk-brown">
            {success}
          </div>
        ) : null}

        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <section className="space-y-6">
            <div>
              <h2 className="font-display text-2xl text-funk-brown">Accounts</h2>
              <p className="mt-1 text-sm text-funk-rust">
                Each account has a total advance and a monthly drawdown cap.
              </p>
              <div className="mt-4 space-y-3">
                {store.accounts.map((account) => (
                  <AccountCard
                    key={account.id}
                    account={account}
                    store={store}
                    selected={account.id === selectedAccountId}
                    onSelect={() => {
                      clearMessages()
                      setSelectedAccountId(account.id)
                    }}
                  />
                ))}
              </div>
            </div>

            <form onSubmit={handleCreateAccount} className="funk-card space-y-4 p-5">
              <h3 className="font-display text-xl text-funk-brown">New account</h3>
              <label className="block text-sm font-semibold">
                Name
                <input
                  type="text"
                  value={accountForm.name}
                  onChange={(event) =>
                    setAccountForm((prev) => ({ ...prev, name: event.target.value }))
                  }
                  className="mt-1 w-full rounded-lg border-2 border-funk-brown bg-white px-3 py-2"
                  placeholder="Artist or partner name"
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-semibold">
                  Total advance (AUD)
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={accountForm.totalAdvance}
                    onChange={(event) =>
                      setAccountForm((prev) => ({ ...prev, totalAdvance: event.target.value }))
                    }
                    className="mt-1 w-full rounded-lg border-2 border-funk-brown bg-white px-3 py-2"
                    placeholder="50000"
                  />
                </label>
                <label className="block text-sm font-semibold">
                  Monthly limit (AUD)
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={accountForm.monthlyLimit}
                    onChange={(event) =>
                      setAccountForm((prev) => ({ ...prev, monthlyLimit: event.target.value }))
                    }
                    className="mt-1 w-full rounded-lg border-2 border-funk-brown bg-white px-3 py-2"
                    placeholder="5000"
                  />
                </label>
              </div>
              <button
                type="submit"
                className="groovy-border rounded-full bg-funk-orange px-5 py-2 font-bold text-funk-cream transition hover:-translate-y-0.5 hover:bg-funk-magenta"
              >
                Create account
              </button>
            </form>
          </section>

          <section className="space-y-6">
            {selectedAccount ? (
              <>
                <div>
                  <h2 className="font-display text-2xl text-funk-brown">{selectedAccount.name}</h2>
                  <p className="mt-1 text-sm text-funk-rust">Account overview and monthly drawdown</p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <StatCard
                      label="Total advance"
                      value={formatCurrency(selectedAccount.totalAdvance, selectedAccount.currency)}
                    />
                    <StatCard
                      label="Total drawn"
                      value={formatCurrency(totalDrawn, selectedAccount.currency)}
                    />
                    <StatCard
                      label="Remaining balance"
                      value={formatCurrency(remaining, selectedAccount.currency)}
                    />
                    <StatCard
                      label={`Available in ${formatMonth(month)}`}
                      value={formatCurrency(monthlyAvailable, selectedAccount.currency)}
                      detail={`${formatCurrency(monthlyUsed, selectedAccount.currency)} used of ${formatCurrency(selectedAccount.monthlyLimit, selectedAccount.currency)} cap`}
                    />
                  </div>
                </div>

                <form onSubmit={handleRecordDrawdown} className="funk-card space-y-4 p-5">
                  <h3 className="font-display text-xl text-funk-brown">Record monthly drawdown</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block text-sm font-semibold">
                      Month
                      <input
                        type="month"
                        value={drawdownForm.month}
                        onChange={(event) =>
                          setDrawdownForm((prev) => ({ ...prev, month: event.target.value }))
                        }
                        className="mt-1 w-full rounded-lg border-2 border-funk-brown bg-white px-3 py-2"
                      />
                    </label>
                    <label className="block text-sm font-semibold">
                      Amount (AUD)
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        max={monthlyAvailable}
                        value={drawdownForm.amount}
                        onChange={(event) =>
                          setDrawdownForm((prev) => ({ ...prev, amount: event.target.value }))
                        }
                        className="mt-1 w-full rounded-lg border-2 border-funk-brown bg-white px-3 py-2"
                        placeholder="0.00"
                      />
                    </label>
                  </div>
                  <label className="block text-sm font-semibold">
                    Note
                    <input
                      type="text"
                      value={drawdownForm.note}
                      onChange={(event) =>
                        setDrawdownForm((prev) => ({ ...prev, note: event.target.value }))
                      }
                      className="mt-1 w-full rounded-lg border-2 border-funk-brown bg-white px-3 py-2"
                      placeholder="e.g. Tour support, studio, marketing"
                    />
                  </label>
                  <button
                    type="submit"
                    disabled={monthlyAvailable <= 0}
                    className="groovy-border rounded-full bg-funk-teal px-5 py-2 font-bold text-funk-cream transition hover:-translate-y-0.5 hover:bg-funk-magenta disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Record drawdown
                  </button>
                </form>

                <div className="funk-card p-5">
                  <h3 className="font-display text-xl text-funk-brown">Drawdown history</h3>
                  {accountHistory.length === 0 ? (
                    <p className="mt-4 text-sm text-funk-brown/70">No drawdowns recorded yet.</p>
                  ) : (
                    <ul className="mt-4 divide-y-2 divide-funk-brown/10">
                      {accountHistory.map((drawdown) => (
                        <li key={drawdown.id} className="flex flex-wrap items-start justify-between gap-3 py-3">
                          <div>
                            <p className="font-bold text-funk-brown">{formatMonth(drawdown.month)}</p>
                            <p className="text-sm text-funk-brown/70">
                              {drawdown.note || 'No note'}
                            </p>
                          </div>
                          <p className="font-display text-lg text-funk-orange">
                            {formatCurrency(drawdown.amount, selectedAccount.currency)}
                          </p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </>
            ) : (
              <div className="funk-card p-8 text-center">
                <p className="text-funk-rust">Create or select an account to manage drawdowns.</p>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  )
}
