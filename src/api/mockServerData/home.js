import Mock from "mockjs";

//图表数据
let list = [];

export default {
  getStatisticalData: () => {
    //Mock.Random.float 产生随机数100到8000之间 保留小数 最小0位 最大0位
    for (let i = 0; i < 7; i++) {
      list.push({
        苹果: Mock.Random.float(100, 8000, 0, 0),
        vivo: Mock.Random.float(100, 8000, 0, 0),
        oppo: Mock.Random.float(100, 8000, 0, 0),
        小米: Mock.Random.float(100, 8000, 0, 0),
        三星: Mock.Random.float(100, 8000, 0, 0),
        华为: Mock.Random.float(100, 8000, 0, 0),
        红米: Mock.Random.float(100, 8000, 0, 0),
      });
    }
    return {
      code: 20000,
      data: {
        //饼图
        videoData: [
          {
            name: "vivo",
            value: 1500,
          },
          {
            name: "oppo",
            value: 2000,
          },
          {
            name: "苹果",
            value: 3000,
          },
          {
            name: "小米",
            value: 4000,
          },
          {
            name: "三星",
            value: 5000,
          },
        ],
        //柱状图
        userData: [
          {
            date: "周一",
            new: 5,
            active: 100,
          },
          {
            date: "周二",
            new: 10,
            active: 200,
          },
          {
            date: "周三",
            new: 15,
            active: 300,
          },
          {
            date: "周四",
            new: 20,
            active: 400,
          },
          {
            date: "周五",
            new: 25,
          },
          {
            date: "周六",
            new: 30,
          },
          {
            date: "周日",
            new: 35,
          },
        ],
        //折线图
        orderData: {
          date: [
            "20191001",
            "20191002",
            "20191003",
            "20191004",
            "20191005",
            "20191006",
            "20191007",
          ],
          data: list,
        },
        //表格
        tableData: [
          {
            name: "oppo",
            todayBuy: 100,
            monthBuy: 2000,
            totalBuy: 45200,
          },
          {
            name: "苹果",
            todayBuy: 200,
            monthBuy: 3000,
            totalBuy: 45200,
          },
          {
            name: "vivo",
            todayBuy: 300,
            monthBuy: 4000,
            totalBuy: 45200,
          },
          {
            name: "小米",
            todayBuy: 400,
            monthBuy: 5000,
            totalBuy: 59200,
          },
        ],
      },
    };
  },
};
