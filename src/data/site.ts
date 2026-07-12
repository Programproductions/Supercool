export type AppEnvironment = 'development' | 'staging' | 'production'

export const appEnvironment = (import.meta.env.VITE_APP_ENV ??
  'development') as AppEnvironment

export const site = {
  company: 'Supercool Music',
  shortName: 'Supercool',
  tagline: 'Music with soul. Built for the groove.',
  description:
    'Supercool Music is an Australian music company — a label, studio, and artist services crew turning bold ideas into records people can’t stop playing.',
  email: 'hello@supercool.music',
  location: 'Australia',
} as const

export const services = [
  {
    title: 'Music Production',
    description:
      'Studio recording, mixing, and mastering that makes your sound hit different — from first take to final master.',
    icon: '🎛️',
  },
  {
    title: 'Artist Development',
    description:
      'A&R, artist management, and career coaching to take you from bedroom demos to the main stage.',
    icon: '🎤',
  },
  {
    title: 'Distribution & Licensing',
    description:
      'Get your tracks on every platform, plus sync licensing for film, TV, games, and brands.',
    icon: '📀',
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
