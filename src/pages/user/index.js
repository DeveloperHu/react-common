import React, { useEffect, useState } from "react";
import { Button, Form, Input, Table, Popconfirm,Modal, InputNumber, Select ,DatePicker } from "antd";
import "./index.css";
import { getUser, delUser,addUser,editUser } from "../../api";
import dayjs from "dayjs";
function User() {
  //定义初始搜索数据
  const [listData, setListData] = useState({
    name: "",
  });
  //定义表格数据
  const [tableData, setTableData] = useState([]);
  //定义表格columns
  const columns = [
    {
      title: "姓名",
      dataIndex: "name",
    },
    {
      title: "年龄",
      dataIndex: "age",
    },
    {
      title: "性别",
      dataIndex: "sex",
      render(h) {
        return h === 1 ? "男" : "女";
      },
    },
    {
      title: "出生日期",
      dataIndex: "birth",
    },
    {
      title: "地址",
      dataIndex: "addr",
    },
    {
      title: "操作",
      render(rowData) {
        return (
          <div>
            <Button
              onClick={() => handleClick("edit", rowData)}
              style={{ marginRight: 5 }}
            >
              编辑
            </Button>
            <Popconfirm
              title="提示"
              description="确定删除该用户吗？"
              okText="确定"
              cancelText="取消"
              onConfirm={() => handleDelete(rowData)}
            >
              <Button type="primary" danger>
                删除
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  // 0代表新增，1代表编辑
  const [modalType, setModalType] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  //新增
  const handleClick = (type, rowData) => {
    if(type == 'add'){
      setModalType(0);
    }else {
      setModalType(1);
      //编辑时对数据进行深拷贝
      const cloneObj = JSON.parse(JSON.stringify(rowData));
      cloneObj.birth = dayjs(cloneObj.birth);
      form.setFieldsValue(cloneObj);
    }
    setIsModalVisible(!isModalVisible);
  };

  //删除
  const handleDelete = async (rowData) => {
    const {data} = await delUser({id:rowData.id});
    console.log('返回',data.list)
    setTableData(data.list.slice(0, 20));
  };
  //搜索时传入名称进行搜索
  const handleSubmit = (values) => {
    setListData({ name: values.keyword });
  };
  useEffect(()=>{
    //搜索变化时请求
    getTableData();
  },[listData])

  const getTableData = async () => {
    const { list } = await getUser(listData);
    console.log("用户数据", list);
    setTableData(list);
  };

  //弹窗确定
  const handleOk = () => {
    //表单校验
    form.validateFields().then(async (values) => {
      //日期参数
      var birth = dayjs(values.birth).format("YYYY-MM-DD");
      if(modalType){ //编辑
        editUser(values).then(()=>{
          handleCancel()
          getTableData()
        })

      }else{
        //新增
        addUser(values).then(()=>{
          handleCancel()
          getTableData()
        })
      }
    });
  };
  //弹窗取消
  const handleCancel = () => {
    setIsModalVisible(false);
    //清空表单数据
    form.resetFields();
  };
  //首次加载
  useEffect(() => {
    //调用后端接口获取用户列表数据
    getTableData();
  }, []);
  return (
    <div className="user">
      <div className="flex-box">
        <Button type="primary" onClick={() => handleClick("add")}>
          +新增
        </Button>
        <Form layout="inline" onFinish={handleSubmit}>
          <Form.Item name="keyword">
            <Input placeholder="请输入用户名"></Input>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Table style={{marginTop:10}} columns={columns} dataSource={tableData} rowKey={"id"}></Table>
      <Modal title={!modalType?'新增用户':'编辑用户'} open={isModalVisible} onOk={handleOk} onCancel={handleCancel}
      okText="确定" cancelText="取消">
        <Form form={form} labelCol={{span:6}} wrapperCol={{span:18}} labelAlign="left" >
          {modalType &&<Form.Item label="ID" name="id" rules={[{required:true,message:'ID是必填'}]} hidden>
            <Input placeholder="请输入ID"/>
          </Form.Item>}
          <Form.Item label="姓名" name="name" rules={[{required:true,message:'请输入姓名'}]}>
            <Input placeholder="请输入姓名"/>
          </Form.Item>
          <Form.Item label="年龄" name="age" rules={[{required:true,message:'请输入年龄',type:'number'}]}>
            <InputNumber placeholder="请输入年龄"/>
          </Form.Item>
          <Form.Item label="性别" name="sex" rules={[{required:true,message:'性别是必填'}]}>
            <Select options={[{value:0,label:'女'},{value:1,label:'男'}]} placeholder="请选择性别"></Select>
          </Form.Item>
          <Form.Item label="出生日期" name="birth" rules={[{required:true,message:'请输入出生日期'}]}>
            <DatePicker placeholder="请选择出生日期" format={'YYYY-MM-DD'}></DatePicker>
          </Form.Item>
          <Form.Item label="地址" name="addr" rules={[{required:true,message:'请输入地址'}]}>
            <Input placeholder="请输入地址"/>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default User;
