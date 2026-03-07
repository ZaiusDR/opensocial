import { useState, useEffect } from "react"
import TagManager from "react-gtm-module/dist/TagManager"

const COOKIE_NAME = "cookie_consent"
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60 // 1 year in seconds
export const GTM_ID = "GTM-WZ4M46Z"

export const getCookieConsent = () => {
  if (typeof document === "undefined") return null
  const match = document.cookie.match(/(^| )cookie_consent=([^;]+)/)
  return match ? match[2] : null
}

const setCookieConsent = (value) => {
  document.cookie = `${COOKIE_NAME}=${value}; max-age=${COOKIE_MAX_AGE}; path=/; SameSite=Lax`
}

const CookieBanner = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!getCookieConsent()) setVisible(true)
  }, [])

  const handleAccept = () => {
    setCookieConsent("accepted")
    TagManager.initialize({ gtmId: GTM_ID })
    setVisible(false)
  }

  const handleDecline = () => {
    setCookieConsent("declined")
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div role="dialog" aria-label="Cookie consent" className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3 animate-fade">
      <div className="max-w-5xl mx-auto bg-base-100 border border-base-300 rounded-xl shadow-xl px-5 py-3 flex items-center gap-4">
        <span className="text-xl shrink-0">🍪</span>
        <p className="text-sm text-base-content/70 flex-1">
          We use cookies to count page visits and understand how people discover social-impact projects. No advertising or profiling involved.
        </p>
        <div className="flex gap-2 shrink-0">
          <button onClick={handleDecline} className="btn btn-ghost btn-xs">
            Decline
          </button>
          <button onClick={handleAccept} className="btn btn-xs gradient-btn">
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}

export default CookieBanner
