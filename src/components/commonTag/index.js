import React from "react";
import { Tag, Space } from "antd";
import "./index.css";
function CommonTag() {
  const handleClose = () => {
    console.log("close");
  };
  return (
    <Space size={[0, 8]} wrap className="common-tag">
      <Tag>首页</Tag>
      <Tag color="#55acee" closeIcon onClose={() => handleClose()}>
        用户列表
      </Tag>
    </Space>
  );
}

export default CommonTag;
