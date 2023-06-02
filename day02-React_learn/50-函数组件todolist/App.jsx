import React, { useState } from "react";
import "./App.css";
import { nanoid } from "nanoid";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
const App = () => {
  let [todos, setTodos] = useState([//第一个值todos是下面三个对象,第二个值setTodos是修改页面后要渲染的值
    { id: nanoid(), title: "吃饭", isDone: false },
    { id: nanoid(), title: "睡觉", isDone: false },
    { id: nanoid(), title: "打豆豆", isDone: false },
  ]);
  console.log(setTodos);
  const addTodo = (title) => {
    let todo = {
      id: nanoid(),
      title,
      isDone: false,
    };
    // setTodos([...todos,todo]); //使用...获取到todos的所有值,并向后追加todo
    setTodos([todo, ...todos]); //使用...获取到todos的所有值,并向前追加todo
  };

  const checkOne = (todo) => {
    todo.isDone = !todo.isDone;
    setTodos([...todos]);
  };

  const deleteTodo = (id) => {
    if (!window.confirm("确定删除?")) return;
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const checkAll = (isDone) => {
    // todos.map(todo=>{
    //   todo.isDone = isDone;
    //   return todo
    // })
    setTodos(todos.map((todo) => {
      todo.isDone = isDone;
      return todo;
    }));
  };
  const clearDone = () => {
    if(!window.confirm('确定删除所有?'))return;
    setTodos(todos.filter((todo)=>!todo.isDone))}
  return (
    <div className="todo-container">
      <div className="todo-wrap">
        <Header addTodo={addTodo} />
        <Main todos={todos} checkOne={checkOne} deleteTodo={deleteTodo} />
        <Footer todos={todos} checkAll={checkAll} clearDone={clearDone}/>
      </div>
    </div>
  );
};
export default App