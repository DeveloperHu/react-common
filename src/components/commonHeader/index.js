import { UserOutlined, MenuFoldOutlined } from "@ant-design/icons";
import React from "react";
import { Button, Layout, Avatar, Dropdown } from "antd";
import "./index.css";

import { useDispatch } from "react-redux";
import {setCollspased} from '../../store/reducers/tab'
const { Header } = Layout;


export default function CommonHeader({collapsed}) {
  const logout = () => {
    // localStorage.removeItem('token')
    // window.location.href = '/login'
  };
  const items = [
    {
      key: "1",
      label: (
        <a target="_blank" rel="noopener noreferrer">
          个人中心
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a target="_blank" rel="noopener noreferrer" onClick={() => logout}>
          退出
        </a>
      ),
    },
  ];

  //点击展开/收起菜单
  const tabDispatch = useDispatch();
  const setCollapsed = () => {
    tabDispatch(setCollspased())
  };
  return (
    <Header className="header-container">
      <Button
        type="text"
        icon={<MenuFoldOutlined />}
        onClick={()=>setCollapsed()}
        style={{
          fontSize: "16px",
          width: 64,
          height: 32,
          backgroundColor: "#fff",
        }}
      />
      <Dropdown menu={{ items }}>
        <Avatar size={36} icon={<UserOutlined />} />
      </Dropdown>
    </Header>
  );
}
