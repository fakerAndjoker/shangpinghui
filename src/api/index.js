//Api进行统一管理

import axios from './ajax.js'
import mockAxios from './mockAjax.js'

//三级商品列表
export const reqCategoryList = () => axios({ url: '/product/getBaseCategoryList', method: 'get' })

//轮播图
export const reqBannerList = () => mockAxios({ url: '/banner', method: 'get' })


//floor
export const reqFloorList = () => mockAxios({ url: '/floor', method: 'get' })

//搜索
export const reqGetSearchInfo = (params) => axios({ url: '/list', method: "post", data: params })

//商品详情
export const reqGetDetailInfo = (skuId) => axios({ url: `/item/${skuId}`, method: "get" })

//添加商品进购物车或者更新购物车数量
export const reqUpdateShopCart = (skuId, skuNum) => axios({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: "post" })

//获取购物车数据
export const reqShopCartList = () => axios({ url: "/cart/cartList", method: "get" })

//删除购物车中的商品
export const reqDeleteById = (skuId) => axios({ url: `/cart/deleteCart/${skuId}`, method: "delete" })

//修改商品的选中状态
export const reqUpdateCheckedById = (skuId, isChecked) => axios({ url: `cart/checkCart/${skuId}/${isChecked}` })

//获取验证码
export const reqCode = (phone) => axios({ url: `/user/passport/sendCode/${phone}`, method: "get" })

//用户注册
export const reqUserRegister = (data) => axios({ url: `/user/passport/register`, data, method: "post" })

//用户登录
export const reqUserLogin = (data) => axios({ url: `/user/passport/login`, data, method: "post" })

//获取用户信息
export const reqUserInfo = () => axios({ url: `/user/passport/auth/getUserInfo`, method: "get" })

//退出登录
export const reqUserLoginOut = () => axios({ url: `/user/passport/logout`, method: 'get' })

//获取用户地址
export const reqUserAddress = () => axios({ url: `/user/userAddress/auth/findUserAddressList`, method: "get" })

//获取商品清单
export const reqOrderInfo = () => axios({ url: `/order/auth/trade`, method: "get" })

//提交订单
export const reqSubmitOrder = (tradeNo, data) => axios({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: "post" })

//支付订单
export const reqPayInfo = (orderId) => axios({ url: `/payment/weixin/createNative/${orderId}`, method: "get" })

//订单的支付状态
export const reqOrderStatu = (orderId) => axios({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: "get" })

//我的订单列表
export const reqMyOrder = (page, limit) => axios({ url: `/order/auth/${page}/${limit}`, method: "get" })