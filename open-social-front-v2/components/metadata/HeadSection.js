import Head from "next/head"
import Script from "next/script"

const HeadSection = () => {
  return (
    <>
      <Head>
        <title>OpenSocial - Find Social Impact Open Source Projects</title>
        <meta name="description" content="OpenSocial is a social impact open source projects aggregator. Easily find active non profit projects and start coding a better world." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-site-verification" content="cHmuOEOke-_B5U7Ns3rJlBT-pTN4qipfs7W08LtEn2w" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script id="gtag-manager" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-MS7SCQ6');
        `}
      </Script>
    </>
  )
}

export default HeadSection
