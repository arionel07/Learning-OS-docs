import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	reactCompiler: true,
	experimental: {
		mdxRs: true // A fast MDX parser in Rust
	},
	pageExtensions: ['ts', 'tsx', 'mdx'] // mdx as pages
}

export default nextConfig
