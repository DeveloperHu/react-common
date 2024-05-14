import React, { useEffect, useState } from "react";
import { Row, Col, Card, Table } from "antd";
import "./home.css";
import * as Icon from "@ant-design/icons";
import { getData } from "../../api";
import Echarts from "../../components/Echarts";

function Home() {
  const userImg = require("../../assets/user.png");

  //创建echart响应数据
  const [echartData, setEchartData] = useState({});
  //页面加载后加载接口
  useEffect(() => {
    getData().then(({ data }) => {
      console.log('data',data)
      const { tableData, orderData,userData,videoData } = data;
      setTableData(tableData);

      //对于echarts数据的组装
      const order = orderData;
      const xData = orderData.date;
      const keyArray = Object.keys(order.data[0]);
      const series = [];
      keyArray.forEach((key) => {
        series.push({
          name: key,
          data: order.data.map((item) => item[key]),
          type: "line",
        });
      });

      //更新echart数据
      setEchartData({
        order: {
          xData,
          series,
        },
        user:{
            xData:userData.map(item => item.date),
            series:[
              {
                name:'新增用户',
                data:userData.map(item => item.new),
                type:"bar"
              },
              {
                name:'活跃用户',
                data:userData.map(item => item.active),
                type:"bar"
              }
            ]
        },
        video:{
          series:[
            {
              data:videoData,
              type:'pie'
            }
          ]
        }
      });
    });
  }, []);
  //定义table数据
  let [tableData, setTableData] = useState([]);
  //定义table列的数据
  const tableColumns = [
    {
      title: "商品",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "今日购买",
      dataIndex: "todayBuy",
      key: "todayBuy",
    },
    {
      title: "本月购买",
      dataIndex: "monthBuy",
      key: "monthBuy",
    },
    {
      title: "总购买",
      dataIndex: "totalBuy",
      key: "totalBuy",
    },
  ];
  //定义订单的数据
  const orderData = [
    {
      name: "今日支付订单",
      value: 100,
      icon: "CheckCircleOutlined",
      color: "#2ec7c9",
    },
    {
      name: "今日收藏订单",
      value: 200,
      icon: "ClockCircleOutlined",
      color: "#ffb980",
    },
    {
      name: "今日未支付订单",
      value: 50,
      icon: "CloseCircleOutlined",
      color: "#5ab1ef",
    },
    {
      name: "本月未支付订单",
      value: 1230,
      icon: "CheckCircleOutlined",
      color: "#2ec7c9",
    },
    {
      name: "本月收藏订单",
      value: 200,
      icon: "ClockCircleOutlined",
      color: "#ffb980",
    },
    {
      name: "本月未支付订单",
      value: 1020,
      icon: "CloseCircleOutlined",
      color: "#5ab1ef",
    },
  ];
  //动态获取图标
  const iconToElement = (name) => React.createElement(Icon[name]);
  return (
    <Row className="home">
      <Col span={8}>
        <Card hoverable>
          <div className="user">
            <div className="user-top">
              <img src={userImg}></img>
              <div className="userinfo">
                <p className="name">Admin</p>
                <p className="access">超级管理员</p>
              </div>
            </div>
            <div className="user-divider"></div>
            <div className="user-bottom">
              <p>
                上次登陆时间：<span>2022-03-01</span>
              </p>
              <p>
                上次登陆地点： <span>北京</span>
              </p>
            </div>
          </div>
        </Card>
        <Card className="mt-10" hoverable>
          <Table
            dataSource={tableData}
            columns={tableColumns}
            pagination={false}
          ></Table>
        </Card>
      </Col>
      <Col span={16}>
        <div className="num">
          {orderData.map((item, index) => {
            return (
              <Card hoverable key={index}>
                <div
                  className="icon-box"
                  style={{ backgroundColor: item.color }}
                >
                  {iconToElement(item.icon)}
                </div>
                <div className="detail">
                  <p className="num">¥{item.value}</p>
                  <p className="txt">{item.name}</p>
                </div>
              </Card>
            );
          })}
        </div>
        {
          echartData.order && <Echarts chartData={echartData.order} style={{height: '280px'}}></Echarts>
        }
        <div className="graph">
        {
          echartData.user && <Echarts chartData={echartData.user} style={{height: '240px',width:'50%'}}></Echarts>
        }
               {
          echartData.video && <Echarts chartData={echartData.video} style={{height: '240px',width:'50%'}} isAxisChart={false}></Echarts>
        }
        </div>
      </Col>
    </Row>
  );
}

export default Home;
