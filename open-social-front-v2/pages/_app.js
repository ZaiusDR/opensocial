import '@/styles/globals.css'
import { useEffect } from "react"
import TagManager from "react-gtm-module/dist/TagManager"

export default function App({ Component, pageProps }) {
  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-WZ4M46Z' });
  }, [])

  return <Component {...pageProps} />
}
