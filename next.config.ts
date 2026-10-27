import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  compiler: { styledComponents: true },
  partialPrefetching: true,
};

export default nextConfig;
