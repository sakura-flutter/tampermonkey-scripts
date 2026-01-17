import { ReadyState } from '@/utils/ready-state'
import createControl from './control'

export interface UseReturn {
  handler: () => void
}

export interface Site {
  name: string
  namespace: string
  test: (string | RegExp) | (string | RegExp)[]
  readyState?: ReadyState
  use: (payload: { store: Record<string, any>; createControl: typeof createControl }) => {
    handler(): void
  }
}
