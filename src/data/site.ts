export type AppEnvironment = 'development' | 'staging' | 'production'

export const appEnvironment = (import.meta.env.VITE_APP_ENV ??
  'development') as AppEnvironment

export const site = {
  company: 'Supercool Software Pty Ltd',
  shortName: 'Supercool',
  tagline: 'Software with soul. Built for the groove.',
  description:
    'Supercool Software crafts bold, human-centred digital products — from idea to production, with a little funk in every line of code.',
  email: 'hello@supercool.software',
  location: 'Australia',
  gcpProject: 'supercool-software',
} as const

export const services = [
  {
    title: 'Product Engineering',
    description:
      'Full-stack web apps, APIs, and cloud-native platforms — shipped fast, built to last.',
    icon: '⚡',
  },
  {
    title: 'AI-Native Systems',
    description:
      'Intelligent workflows, agents, and data pipelines that actually deliver commercial outcomes.',
    icon: '🎛️',
  },
  {
    title: 'Cloud & DevOps',
    description:
      'GCP infrastructure, CI/CD, and environment strategy across dev, staging, and production.',
    icon: '☁️',
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
