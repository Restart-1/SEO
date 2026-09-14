import type { NextConfig } from 'next';

const githubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig: NextConfig = {
  ...(githubPages ? {
    output: 'export',
    assetPrefix: '/SEO',
  } : {}),
  env: {
    NEXT_PUBLIC_BASE_PATH: githubPages ? '/SEO' : '',
    NEXT_PUBLIC_STATIC_EXPORT: githubPages ? 'true' : 'false',
  },
};

export default nextConfig;
