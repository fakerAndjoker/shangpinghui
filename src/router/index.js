import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store"



//懒加载
const Home = () => import('@/views/home/Home')
const Login = () => import('@/views/login/Login')
const Search = () => import('@/views/search/Search')
const Detail = () => import("@/views/detail/Detail")
const AddCartSuccess = () => import("@/views/addCartSuccess/AddCartSuccess")
const ShopCart = () => import("@/views/shopCart/ShopCart")
const Register = () => import("@/views/register/Register")
const Trade = () => import("@/views/trade/Trade")
const Pay = () => import("@/views/pay/Pay")
const PaySuccess = () => import("@/views/paySuccess/PaySuccess")
const Center = () => import("@/views/center/Center")
const MyOrder = () => import("@/views/center/childComponent/myOrder/MyOrder")
const GroupOrder = () => import("@/views/center/childComponent/groupOrder/GroupOrder")

Vue.use(VueRouter)

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}


const routes = [
    {
        path: '',
        redirect: '/home',
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
        meta: {
            show: true
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/search/:keyword?',
        name: 'search',
        component: Search,
        meta: {
            show: true
        }
    },
    {
        path: "/detail/:skuId",
        name: 'detail',
        component: Detail,
        meta: {
            show: true
        }
    },
    {
        path: "/addCartSuccess",
        name: "addCartSuccess",
        component: AddCartSuccess,
        meta: {
            show: true
        }
    },
    {
        path: "/shopCart",
        name: "shopCart",
        component: ShopCart
    },
    {
        path: "/register",
        name: "register",
        component: Register,
        meta: {
            show: true
        }
    },
    {
        path: "/trade",
        name: "trade",
        component: Trade,
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            if (from.path == "/shopcart") {
                next()
            } else {
                next(false)
            }
        },
        meta: {
            show: true
        }
    },
    {
        path: "/pay",
        name: "pay",
        component: Pay,
        beforeEnter: (to, from, next) => {
            if (from.path == "/trade") {
                next()
            } else {
                next(false)
            }
        },
        meta: {
            show: true
        }
    }, {
        path: "/paysuccess",
        name: "paysuccess",
        component: PaySuccess,
        beforeEnter: (to, from, next) => {
            if (from.path == "/pay") {
                next()
            } else {
                next(false)
            }
        },
        meta: {
            show: true
        }
    },
    {
        path: "/center",
        name: "center",
        component: Center,
        meta: {
            show: true
        },
        children: [
            {
                path: "",
                redirect: "myOrder"
            },
            {
                path: "myOrder",
                name: "myOrder",
                component: MyOrder,
            }, {
                path: "groupOrder",
                name: "groupOrder",
                component: GroupOrder
            }
        ]
    }

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
    },
})

//添加全局导航守卫，限制路由的跳转
router.beforeEach(async (to, from, next) => {
    let token = store.state.user.token
    let userName = store.state.user.userInfo.name
    //登录状态不可以跳转到登录或注册页面
    if (token) {
        if (to.path == "/login" || to.path == "/register") {
            next("/home")
        } else {
            //页面刷新后token还在，但是用户信息不再了
            if (userName) {
                next()
            } else {
                //重新获取用户信息
                try {
                    await store.dispatch("user/getUserInfo")
                    next()
                } catch (error) {
                    //token失效
                    await store.dispatch("user/loginOut")
                    next("/login")
                }
            }
        }
    } else {
        // next()
        // 未登录时暂时放行所有
        let toPath = to.path
        if (toPath.indexOf("/trade") != -1 || toPath.indexOf("/pay") != -1 || toPath.indexOf("/center") != -1) {
            //将本来要去的路径当做参数，等到登录成功之后直接跳转该页面
            next("/login?redirect=" + toPath)
        } else {
            next()
        }
    }
})
export default router
