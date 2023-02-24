import Head from 'next/head'
import Hero from "@/components/home/Hero"


export default function Home() {
  return (
    <>
      <Head>
        <title>OpenSocial - Find Social Impact Open Source Projects</title>
        <meta name="description" content="OpenSocial is a social impact open source projects aggregator. Easily find active non profit projects and start coding a better world." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
    </>
  )
}
