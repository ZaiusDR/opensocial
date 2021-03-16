import React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

const SEO = () => {
  const { site } = useStaticQuery(query)

  return (
    <Helmet title={site.siteMetadata.title}>
      <meta name="description" content={site.siteMetadata.description} />
      {site.siteMetadata.siteUrl && <meta property="og:url" content={site.siteMetadata.siteUrl} />}
      {site.siteMetadata.title && <meta property="og:title" content={site.siteMetadata.title} />}
      {site.siteMetadata.description && (
        <meta property="og:description" content={site.siteMetadata.description} />
      )}
      {site.siteMetadata.lang && <html lang={site.siteMetadata.lang} />}
      <link rel="canonical" href={site.siteMetadata.siteUrl} />
    </Helmet>
  )
}

export default SEO

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        title
        description
        siteUrl
        lang
      }
    }
  }
`
