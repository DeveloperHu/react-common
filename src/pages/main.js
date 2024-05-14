import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import CommonSider from "../components/commonSider";
import CommonHeader from '../components/commonHeader'
import { Button, Layout, Menu, theme } from "antd";
import { useSelector } from "react-redux";

const { Header, Sider, Content } = Layout;
const Main = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  //获取展开收起的状态
  const isCollapsed = useSelector((state) => state.tab.isCollspased);
  return (
    <Layout className="main-container">
      <CommonSider collapsed={isCollapsed} />
      <Layout>
        <CommonHeader collapsed={isCollapsed}/>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Main;
