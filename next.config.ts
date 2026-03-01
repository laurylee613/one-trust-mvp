/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        // 拦截所有发往 /api/dify 的本地请求
        source: '/api/dify/:path*',
        // 秘密转发给真正的 Dify 引擎 (如果是私有部署，请替换为私有IP/域名)
        destination: 'https://api.dify.ai/v1/:path*', 
      },
    ]
  },
};

export default nextConfig;