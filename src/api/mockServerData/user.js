import Mock from "mockjs";
import config from "../../config";

//get请求从config.url获取参数，post从config.body中获取参数
function param2Obj(url){
    const search = url.split("?")[1];
    if(!search){
        return {};
    }
    return JSON.parse(
        '{"' +
        decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
        '"}'
    );
}

let List = []
const count = 200
for(let i=0;i<count; i++){
    List.push(
        Mock.mock({
            id: Mock.Random.guid(),
            name: Mock.Random.name(),
            addr: Mock.mock('@county(true)'),
            'age|18-60': 1,
            birth: Mock.Random.date(),
            sex: Mock.Random.integer(0,1)
        })
    )
}

export default {
    //获取列表
    getUserList: config => {
        const {name,page = 1,limit = 20} = param2Obj(config.url)
        const mockList = List.filter(item => {
            if(name && item.name.indexOf(name) == -1 && item.addr.indexOf(name) == -1){
                return false;
            }
            return true;
        })
        const pageList = mockList.filter((item,index) => index < limit * page && index >= limit * (page - 1))
        return {
            code: 20000,
            count: mockList.length,
            list: pageList
        }
    },
    //增加用户
    addUser: config => {
        const {name,addr,age,birth,sex} = JSON.parse(config.body)
        List.unshift({
            name: name,
            addr: addr,
            age: age,
            birth: birth,
            sex: sex
        })
        return {
            code: 20000,
            data: {
                message: '添加成功'
            }
        }
    },
    //编辑用户
    editUser: config => {
        const {id,name,addr,age,birth,sex} = JSON.parse(config.body)
        List.some(item => {
            if(item.id === id){
                item.name = name
                item.addr = addr
                item.age = age
                item.birth = birth
                item.sex = sex
            }
        })
        return {
            code: 20000,
            data: {
                message: '编辑成功'
            }
        }
    },
    //删除用户
    delUser:config => {
        const {id} = param2Obj(config.url)
        List.map((item,index) => {
            if(item.id === id){
                List.splice(index,1)
            }
        })
        return {
            code: 20000,
            data: {
                message: '删除成功',
                list:List
            }
        }
    }
}