import { createContext, useContext } from 'react'

type SiteSettingsCtx = {
  lineDrawingEnabled: boolean
}

export const SiteSettingsContext = createContext<SiteSettingsCtx>({ lineDrawingEnabled: true })

export function useSiteSettings() {
  return useContext(SiteSettingsContext)
}
