import '@/styles/globals.css'
import { useEffect } from "react"
import TagManager from "react-gtm-module/dist/TagManager"

export default function App({ Component, pageProps }) {
  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-MS7SCQ6' });
  }, [])

  return <Component {...pageProps} />
}
