import { DefaultSeoProps } from 'next-seo'

const config: DefaultSeoProps = {
  titleTemplate: '%s | BadmintonLover',
  defaultTitle: 'BadmintonLover - The Authority on Badminton',
  description: 'Expert badminton technique, strategy, drills, and equipment guides. Trusted by players worldwide.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://badmintonlover.com',
    siteName: 'BadmintonLover',
    images: [
      {
        url: 'https://badmintonlover.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'BadmintonLover - The Authority on Badminton',
      },
    ],
  },
  twitter: {
    handle: '@badmintonlover',
    site: '@badmintonlover',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'keywords',
      content: 'badminton, badminton training, badminton technique, badminton strategy, badminton drills, badminton equipment, badminton rackets, badminton tips',
    },
    {
      httpEquiv: 'x-ua-compatible',
      content: 'IE=edge',
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/icon.svg',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-icon.png',
      sizes: '180x180',
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest',
    },
  ],
}

export default config
