import React, { useEffect } from "react";
import { Tag, Space } from "antd";
import "./index.css";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
function CommonTag() {
  const tabList = useSelector((state) => state.tab.tabList);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(location, "location");
    console.log(tabList, "tabList");
  }, [location]);
  const handleClose = (item) => {
    console.log("关闭", item);
    // navigate(tabList[tabList.length - 2].path,{replace:true})
  };
  return (
    <Space size={[0, 8]} wrap className="common-tag">
      {tabList.map((item, index) => {
        return (
          <Tag
            key={index}
            color={location.pathname === item.path ? "#55acee" : ""}
            closeIcon={item.name !== "home"}
            onClose={() => handleClose(item.path)}
          >
            {item.label}
          </Tag>
        );
      })}
      {/* <Tag>首页</Tag>
      <Tag color="#55acee" closeIcon onClose={() => handleClose()}>
        用户列表
      </Tag> */}
    </Space>
  );
}

export default CommonTag;
