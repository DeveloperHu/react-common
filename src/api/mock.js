import Mock from 'mockjs'
import homeAPI from './mockServerData/home'
import userAPI from './mockServerData/user'
//拦截接口
Mock.mock(/home\/getData/, homeAPI.getStatisticalData)
Mock.mock(/user\/getUser/, userAPI.getUserList)
Mock.mock(/user\/delUser/, userAPI.delUser)
Mock.mock(/user\/addUser/, userAPI.addUser)
Mock.mock(/user\/editUser/, userAPI.editUser)