export type AppEnvironment = 'development' | 'staging' | 'production'

export const appEnvironment = (import.meta.env.VITE_APP_ENV ??
  'development') as AppEnvironment

export const site = {
  company: 'Supercool Software Pty Ltd',
  shortName: 'Supercool',
  tagline: 'Music business software with soul.',
  description:
    'We build rights, royalties, catalog, and operations platforms for labels, publishers, distributors, and artist teams — from first release to global payout.',
  email: 'hello@supercool.software',
  location: 'Australia',
  gcpProject: 'supercool-software',
} as const

export const services = [
  {
    title: 'Rights & Royalties',
    description:
      'Royalty engines, split sheets, recoupment logic, monthly drawdown caps, and statement workflows that keep artists, writers, and partners paid accurately.',
    icon: '💿',
  },
  {
    title: 'Catalog & Metadata',
    description:
      'ISRC/ISWC management, release pipelines, and DSP-ready metadata — so every track lands clean across streaming and download partners.',
    icon: '🎛️',
  },
  {
    title: 'Label & Artist Ops',
    description:
      'Dashboards, approvals, and integrations for A&R, marketing, finance, and distribution — one source of truth for the whole roster.',
    icon: '🎤',
  },
] as const

export const envLabels: Record<
  AppEnvironment,
  { label: string; className: string }
> = {
  development: {
    label: 'DEV',
    className: 'bg-funk-avocado text-funk-cream',
  },
  staging: {
    label: 'STAGING',
    className: 'bg-funk-mustard text-funk-brown',
  },
  production: {
    label: '',
    className: '',
  },
}
