import React, { useEffect } from "react";
import { Tag, Space } from "antd";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { closeTab, setCurrentMenu } from "../../store/reducers/tab";
function CommonTag() {
  const tabList = useSelector((state) => state.tab.tabList);
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const action = useLocation();

  useEffect(() => {
    console.log(location, "location");
    console.log(tabList, "tabList");
  }, [location]);

  //标签关闭
  const handleClose = (item, index) => {
    console.log("关闭", item);
    dispatch(closeTab(item));
    //如果关闭的不是当前tag
    if (item.path !== action.pathname) {
      return;
    }
    if (index === tabList.length - 1) {
      //如果是点击最后一位
      dispatch(setCurrentMenu(tabList[index - 1]));
      navigate(tabList[index - 1].path, { replace: true });
    } else {
      //如果tag存在至少存在一个数据 ， 则选中后一个tag
      if (tabList.length > 1) {
        //下一个tag
        const nextData = tabList[index + 1];
        dispatch(setCurrentMenu(nextData));
        navigate(nextData.path, { replace: true });
      }
    }
  };

  //点击tag
  const handleChange = (tag) => {
    dispatch(setCurrentMenu(tag));
    navigate(tag.path, { replace: true });
  };

  return (
    <Space size={[0, 8]} wrap className="common-tag">
      {tabList.map((item, index) => {
        return (
          <Tag
            key={index.name}
            color={location.pathname === item.path ? "#55acee" : ""}
            closeIcon={item.name !== "home"}
            onClose={() => handleClose(item, index)}
            onClick={() => handleChange(item)}
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
