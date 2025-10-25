export const PAYMENT_CONFIG = {
    /**
     * 是否启动真实支付
     */
    REAL: true,
    /**
     * 支付宝支付
     */
    ALIPAY: {
        /**
         * 支付宝交易号
         */
        ORDER_INFO: ''
    },
    /**
     * 微信支付
     */
    WXPAY: {
        /**
         * 随机字符串，长度为32个字符以下
         */
        NONCE_STR: '',
        /**
         * 统一下单接口返回的 prepay_id
         */
        PACKAGE: '',
        /**
         * 签名算法
         */
        SIGN_TYPE: '',
        /**
         * 签名
         */
        PAY_SIGN: ''
    },
}