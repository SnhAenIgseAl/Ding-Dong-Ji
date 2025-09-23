export default ({ env }) => ({
    email: {
        config: {
            provider: 'nodemailer',
            providerOptions: {
                host: env('SMTP_HOST', 'smtp.qq.com'),
                port: env('SMTP_PORT', 465),
                auth: {
                    user: env('SMTP_USERNAME', ''),
                    pass: env('SMTP_PASSWORD', ''),
                },
            },
            settings: {
                defaultFrom: '',
                defaultReplyTo: '',
            }
        }
    }
})