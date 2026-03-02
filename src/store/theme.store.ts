import { TTheme } from '@/types/docs.type'
import { atomWithStorage } from 'jotai/utils'

/**
 * Atom of the current application theme.
 *
 * Used in RootLayout to set the <html> class.
 */
export const themeAtom = atomWithStorage<TTheme>('theme', 'light')
// atomWithStorage is saved to localStorage
