import { createSlice } from "@reduxjs/toolkit";

const tabSlice = createSlice({
  name: "tab",
  initialState: {
    isCollspased: false,
    tabList: [
      {
        path: "/",
        name: "home",
        label: "首页",
      },
    ],
    currentMenu: {},
  },
  reducers: {
    setCollspased(state) {
      state.isCollspased = !state.isCollspased;
    },
    //设置菜单
    selectMenuList(state, { payload: val }) {
      if (val.name != "home") {
        //去除掉已经存在的菜单
        state.currentMenu = val;
        let result = state.tabList.findIndex((item) => item.name === val.name);
        if (result === -1) {
          state.tabList.push(val);
        }
      } else if (val.name === "home" && state.tabList.length === 1) {
        state.currentMenu = {};
      }
    },
    //关闭菜单
    closeTab(state, { payload: val }) {
      let result = state.tabList.findIndex((item) => item.name === val.name);
      if (result !== -1) {
        state.tabList.splice(result, 1);
      }
    },
    //设置当前菜单
    setCurrentMenu(state, { payload: val }) {
      if (val.name != "home") {
        state.currentMenu = {};
      } else {
        state.currentMenu = val;
      }
    },
  },
});

export const { setCollspased, selectMenuList, closeTab,setCurrentMenu } = tabSlice.actions;
export default tabSlice.reducer;
