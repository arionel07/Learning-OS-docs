import { atomWithStorage } from 'jotai/utils'

/**
 * Controls the state of the sidebar.
 *
 * true → sidebar open
 * false → sidebar hidden
 */
export const sidebarOpenAtom = atomWithStorage<boolean>('sidebar', true)
// atomWithStorage is saved to localStorage
