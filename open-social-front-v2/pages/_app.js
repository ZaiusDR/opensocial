import '@/styles/globals.css'
import { useEffect } from "react"
import TagManager from "react-gtm-module/dist/TagManager"
import CookieBanner, { getCookieConsent, GTM_ID } from "@/components/UI/CookieBanner"

export default function App({ Component, pageProps }) {
  useEffect(() => {
    if (getCookieConsent() === "accepted") {
      TagManager.initialize({ gtmId: GTM_ID })
    }
  }, [])

  return (
    <>
      <Component {...pageProps} />
      <CookieBanner />
    </>
  )
}
