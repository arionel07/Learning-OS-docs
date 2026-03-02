import { TLanguage } from '@/types/docs.type'
import { atomWithStorage } from 'jotai/utils'

/**
 * Atom of the current application language.
 *
 * Used in change language.
 * en
 * ru
 */
export const languageAtom = atomWithStorage<TLanguage>('lang', 'en')
// atomWithStorage is saved to localStorage
