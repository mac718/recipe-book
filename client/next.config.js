/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "spoonacular.com",
        port: "",
        pathname: "/recipeImages/**",
      },
    ],
  },
};

module.exports = nextConfig;
