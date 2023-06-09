import {configureStore} from "@reduxjs/toolkit";

// 引入redux模块定义的reducer函数
import appSlice from "./appSlice";
import userSlice from "@/pages/login/slice";

// 集中式存储数据的仓库
// 所有redux状态数据都存在store中
// TODO：汇总所有redux模块reducer函数，将来就能读取/更新对应redux模块的数据
export const store = configureStore({
  reducer: {
    app: appSlice,
    user: userSlice,
  },
});

/*
  整个redux管理的数据：
    {
      user: {
        name: string;
        avatar: string;
        token: string;
        routes: string[];
        buttons: string[];
      },
      app: {
        lang: string
      }
    }
*/

// dispatch 触发更新的方法
// 定义 dispatch 方法的类型
// typeof 在js文件中，检测js的数据类型，返回js的数据类型
// typeof 在ts文件中，检测ts的数据类型，返回ts的数据类型
export type AppDispatch = typeof store.dispatch;

// getState 读取数据的方法（得到所有数据）
// typeof store.getState 得到 getState函数 的类型
// ReturnType<typeof store.getState> 得到  getState函数 返回值的类型
// RootState 就是整个redux管理的数据的类型
export type RootState = ReturnType<typeof store.getState>;
