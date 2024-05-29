import React from "react";
import { Form, Input, Button, message } from "antd";
import "./index.css";
import { getMenu } from "../../api";
import { useNavigate, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { selectMenuList } from "../../store/reducers/tab";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //在登录状态下 需要跳转到首页
  if (localStorage.getItem("token")) {
    return <Navigate to="/home" />;
  }
  //表单提交
  const handleSubmit = (val) => {
    //判断用户名和密码都输入了 才能调用接口
    if (val.username && val.password) {
      getMenu({
        username: val.username,
        password: val.password,
      }).then((res) => {
        console.log(res);
        //设置 返回的权限菜单
        dispatch(selectMenuList(res.data.menu));
        // 缓存token
        localStorage.setItem("token", res.data.token);
        //登陆成功后跳转首页
        navigate("/home");
      });
    } else {
      return message.open({
        type: "warning",
        content: "请输入账号和密码",
      });
    }
  };

  return (
    <Form className="login-container" onFinish={handleSubmit}>
      <div className="login_title">系统登录</div>
      <Form.Item
        label="账号"
        name="username"
        rules={[{ required: true, message: "请输入账号" }]}
      >
        <Input placeholder="请输入用户名" />
      </Form.Item>
      <Form.Item
        label="密码"
        name="password"
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input.Password placeholder="请输入密码" />
      </Form.Item>
      <Form.Item className="login-button">
        <Button htmlType="submit">登录</Button>
      </Form.Item>
    </Form>
  );
}

export default Login;
