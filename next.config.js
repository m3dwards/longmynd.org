const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: {
    unoptimized: true,
  },
  webpack: (cfg) => {
    cfg.module.rules.push({
      test: /\.md$/,
      loader: "frontmatter-markdown-loader",
      options: { mode: ["html"] },
    });
    return cfg;
  },
}

const { withSuperjson } = require('next-superjson')

module.exports = withSuperjson()(nextConfig)
