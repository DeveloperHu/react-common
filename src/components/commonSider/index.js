import React, { useState } from "react";
import MenuConfig from "../../config/index";
import * as Icon from "@ant-design/icons";

import { Button, Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";

import { useDispatch } from 'react-redux'
import  {selectMenuList} from '../../store/reducers/tab'

const { Header, Sider, Content } = Layout;

//动态获取icon
const iconToElement = (name) => React.createElement(Icon[name]);

//处理菜单的数据
const items = MenuConfig.map((item) => {
  //没有子菜单
  const child = {
    key: item.path,
    icon: iconToElement(item.icon),
    label: item.label,
  };
  //有子菜单
  if (item.children) {
    child.children = item.children.map((child) => {
      return {
        key: child.path,
        label: child.label,
      };
    });
  }
  return child;
});

const CommonSider = ({ collapsed }) => {
  const [current,setCurrent] = useState(items[0].key)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  //添加数据到store中
  const setTabsList = (val) => {
    dispatch(selectMenuList(val))
  }
  //点击菜单
  const setKey = (e) => {
    console.log('点击菜单',e)
    setCurrent(e.key)
    let data 
    MenuConfig.forEach(item => {
      if(item.path === e.keyPath[e.keyPath.length-1]){
        data = item
        if(e.keyPath.length > 1){
          data = item.children.find(child => {
            return child.path === e.key
          })
        }
      }
    })
    //设置菜单
    setTabsList({
      path:data.path,
      label:data.label,
      name:data.name
    })
    //菜单跳转
    navigate(e.key,{replace:true})
  }
  
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="demo-logo-vertical" />
      <h3 className="app-name"> {collapsed ? '后台':'通用后台管理系统'}</h3>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[current]}
        selectedKeys={[current]}
        items={items}
        onClick={setKey}
        style={{
          height: "100%",
        }}
      />
    </Sider>
  );
}

export default CommonSider;
