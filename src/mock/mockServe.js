//模拟假数据
import Mock from 'mockjs'

//json文件自动对外暴露
import banner from './banner.json'
import floor from './floor.json'

//第一个参数是地址，第二个参数是数据
Mock.mock("/mock/banner", { code: 200, data: banner })
Mock.mock("/mock/floor", { code: 200, data: floor })