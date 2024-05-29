import React, { useEffect } from "react";
import { Tag, Space } from "antd";
import "./index.css";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
function CommonTag() {
  const tabList = useSelector((state) => state.tab.tabList);
  //当前选中菜单
  const currentMenu = useSelector((state) => state.tab.currentMenu);
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
  //点击tag
  const handleChange = (tag) => {
  };
  //tag的显示 flag代表当前是否选中
  const setTag = (flag, item, index) => {
    return flag ? (
      <Tag color="#55acee" closeIcon onClose={() => handleClose(item,index)}>
        {item.label}
      </Tag>
    ) : (
      <Tag key={item.name} onClick={()=> handleChange(item)}>
        {item.label}
      </Tag>
    );
  };
  return (
    <Space size={[0, 8]} wrap className="common-tag">
      {currentMenu.name &&
        tabList.map((item, index) =>
          setTag(item.path === currentMenu.path, item, index)
        )}
      {/* <Tag>首页</Tag>
      <Tag color="#55acee" closeIcon onClose={() => handleClose()}>
        用户列表
      </Tag> */}
    </Space>
  );
}

export default CommonTag;
