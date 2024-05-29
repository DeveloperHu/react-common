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
        state.currentMenu = val
        //去除掉已经存在的菜单
        let result = state.tabList.findIndex((item) => item.name === val.name);
        if (result === -1) {
          state.tabList.push(val);
        }
      }else {
        state.currentMenu = {}
      }
    },
  },
});

export const { setCollspased, selectMenuList } = tabSlice.actions;
export default tabSlice.reducer;
