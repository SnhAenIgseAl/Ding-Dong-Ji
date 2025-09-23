/**
 * order-list controller
 */

import { factories } from '@strapi/strapi'
import { isStoreOpening } from '../../../utils/common';
// import { menuModel, storeModel } from '../../../utils/model';

let ORDER_ID: OrderID = {}

export default factories.createCoreController('api::order-list.order-list', ({ strapi }) => ({
    
    async create(ctx) {
        const {
            order_list,
            store,
            discount,
            ...data
        }: {
            order_list: OrderList['order_list'],
            store: OrderList['store'],
            discount: OrderList['discount'],
        } = ctx.request.body.data

        const menuList = await strapi.documents('api::menu.menu').findMany()
        let totalPrice = 0

        // 核对金额
        for (let orderIndex in order_list) {
            const index = menuList.findIndex(menu => menu.documentId === order_list[orderIndex].documentId)
            totalPrice += menuList[index].menu_price * order_list[orderIndex].menu_number
        }

        // 优惠券
        if (discount) {
            const discountInfo = await strapi.documents('api::discount.discount').findOne({
                documentId: discount
            })
            if (totalPrice > discountInfo.reach) {
                totalPrice -= discountInfo.subtract
                await strapi.documents('api::discount.discount').update({
                    documentId: discountInfo.documentId,
                    data: {
                        is_used: true
                    },
                    status: 'published'
                })
            } else {
                return {
                    code: -100,
                    message: '订单金额未达到优惠券使用条件'
                }
            }
        }

        // 每日0时0分0秒重置订单号  
        const now = new Date()  
        if (now.getHours() === 0 && now.getMinutes() === 0 && now.getSeconds() === 0) {
            ORDER_ID = {}
        }
        
        const storeInfo = await strapi.documents('api::store.store').findOne({
            documentId: store
        })

        // 判断该店是否在营业时间
        if (!isStoreOpening(storeInfo)) {
            return {
                code: -100,
                message: '该店不在营业时间，请选择其他分店'
            }
        }

        // 订单编号 = 分店编号 + 当日订单号（三位数，不足补0）
        ORDER_ID[store] = ORDER_ID[store] || 0
        const orderId = storeInfo.store_id + String(++ORDER_ID[store]).padStart(3, '0')

        ctx.request.body.data = {
            ...data,
            order_id: orderId,
            store: store,
            order_list: order_list,
            order_price: parseFloat(totalPrice.toFixed(2)),
            discount: discount || null
        }
        const createData = await super.create(ctx)

        return {
            code: 0,
            message: '订单创建成功',
            data: createData.data
        }
    },

    /**
     * 订单完成时，由分店管理员设置订单状态
     * 可取餐 -> 骑手已取餐（外卖）| 取餐完成（堂食或外带）
     * @param ctx
     */
    async setStatus(ctx) {

        const role = ctx.state.user.role
        if (role.name !== 'StoreAdmin') {
            return {
                code: -1,
                message: '权限不足'
            }
        }

        const { id } = ctx.params
        const { order_mode } = ctx.request.body.data

        const data = await strapi.documents('api::order-list.order-list').findOne({
            documentId: id
        })

        if (data && data.order_status === 'finished') {
            return {
                code: -1,
                message: '订单已完成'
            }
        }

        // 外带或堂食
        if (order_mode === 'takeout' || order_mode === 'dine_in') {
            await strapi.documents('api::order-list.order-list').update({
                documentId: id,
                data: {
                    order_status: 'pick_up'
                },
                status: 'published'
            })
            return {
                code: 0,
                message: '订单现已可取餐'
            }
        }
        
        // 外卖
        if (order_mode === 'outside') {
            await strapi.documents('api::order-list.order-list').update({
                documentId: id,
                data: {
                    order_status: 'delivering'
                },
                status: 'published'
            })
            return {
                code: 0,
                message: '骑手现已取餐'
            }
        }
    },

    /**
     * 用户取餐后完成订单
     * @param ctx 
     */
    async finish(ctx) {
        const { id } = ctx.params

        const data = await strapi.documents('api::order-list.order-list').findOne({
            documentId: id
        })

        if (data && data.order_status === 'finished') {
            return {
                code: -1,
                message: '取餐失败，订单已完成'
            }
        }
        if (data && data.order_status === 'production') {
            return {
                code: -2,
                message: '取餐失败，订单正在制作中'
            }
        }

        if (data && data.order_status === 'pick_up') {
            await strapi.documents('api::order-list.order-list').update({
                documentId: id,
                data: {
                    order_status: 'finished'
                },
                status: 'published'
            })
    
            return {
                code: 0,
                message: '取餐成功'
            }
        }
    }
}));