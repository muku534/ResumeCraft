/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['avatars.githubusercontent.com'],
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.(pdf|node)$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        publicPath: '/_next',
                        name: 'static/media/[name].[hash].[ext]',
                    },
                },
            ],
        });

        return config;
    },
};

export default nextConfig;
