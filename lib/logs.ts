import { cl } from '@ivnatsr/color-logs'

export function log(type: 'info' | 'error' | 'log' | 'warn', msg: string) {
  const COLORS = {
    info: 'cyan',
    error: 'red',
    log: 'gray',
    warn: 'yellow'
  } as const

  console[type](cl[COLORS[type]](msg))
}
