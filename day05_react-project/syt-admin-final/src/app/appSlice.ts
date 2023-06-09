import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface AppState {
  lang: string;
}

function getInitialState(): AppState {
  const lang = localStorage.getItem("lang") || "zh_CN";

  return {
    lang,
  };
}

// 1. 定义当前redux模块数据的初始值
let initialState: AppState = getInitialState();

/*
  const initialState: Xxx = {
    xxx: xxx,
    yyy: xxx
  }
*/

// 2. 创建redux模块
export const appSlice = createSlice({
  // redux模块的名称，要求必须唯一
  name: "app",
  // 初始化状态数据
  initialState,
  // 定义reducer函数 --> 会自动生成同步action函数
  reducers: {
    // reducer函数接受两个参数
    // state：当前模块管理的state数据（更新前的，所以也叫prevState）
    // action：调用dispatch传递的action对象 {type: xxx, payload: 参与更新的数据}
    setLang(state, action) {
      const lang = action.payload;
      localStorage.setItem("lang", lang);
      // 直接更新数据即可，不需要返回newState
      state.lang = lang;
    },
  },
});

// 暴露一个 用来获取数据 的方法
// 将组件使用, 读取lang数据：const lang = useAppSelector(selectLang)
export const selectLang = (state: RootState) => state.app.lang;

// 暴露自动生成的同步action函数（自动生成action函数名称和reducer函数名称一致）
// 将来组件使用，更新lang数据：
// const dispatch = useAppDispatch()
// dispatch(setLang(参与更新的数据))  参与更新的数据就是payload的值
export const { setLang } = appSlice.actions;

// 3. 将redux模块中reducer暴露出去，给store汇总
// 汇总之后才能读取/更新当前模块的数据
export default appSlice.reducer;
