/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    i18n: {
        defaultLocale: 'en',
        locales: ['en', 'cy', 'br'],
        localePath: './locales',
    },
    trailingSlash: true
}

module.exports = nextConfig
