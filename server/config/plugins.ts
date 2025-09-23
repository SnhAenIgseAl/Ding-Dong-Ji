export default ({ env }) => ({
    email: {
        config: {
            provider: 'nodemailer',
            providerOptions: {
                host: env('SMTP_HOST', 'smtp.qq.com'),
                port: env('SMTP_PORT', 465),
                auth: {
                    user: env('SMTP_USERNAME', '1789561096@qq.com'),
                    pass: env('SMTP_PASSWORD', 'hsatqvoogtyvbdbj'),
                },
            },
            settings: {
                defaultFrom: '1789561096@qq.com',
                defaultReplyTo: '1789561096@qq.com',
            }
        }
    }
})