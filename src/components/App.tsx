import { useState, useReducer } from "react";

import UserInput from "./UserInput";
import TodoItems from "./TodoItems";

const App = () => {
  const [todoVal, setTodoVal] = useState<string>("");

  // reducer logic
  interface AppState {
    id: number;
    name: string;
    status: boolean;
  }
  type Update = { type: "update"; payload: string };
  type Add = { type: "add"; payload: string };
  type Remove = { type: "remove"; payload: string };
  type AppActions = Update | Add | Remove;
  const appReducer = (state: AppState[], action: AppActions) => {
    // copy todoListState array to return new array (no mutate original array)
    let newArray = [...state];
    switch (action.type) {
      case "update":
        // if updateTodoVal function
        console.log("UPDATE");
        // update relevant array status
        newArray.map((todo: { id: number; status: boolean }, index: number) => {
          if (todo.id.toString() === action.payload) {
            todo.status
              ? (newArray[index].status = false)
              : (newArray[index].status = true);
          }
        });
        break;
      case "add":
        // if addTodoVal function
        console.log("ADD");
        // push to todoListState array only if todoVal
        if (action.payload !== "") {
          setTodoVal("");
          newArray.push({
            id: newArray.length + 1,
            name: action.payload,
            status: false,
          });
        }
        break;
      case "remove":
        // if removeTodoVal function
        console.log("REMOVE");
        // return filtered newArray
        newArray = newArray.filter(
          (todo: { id: number; status: boolean }) =>
            todo.id.toString() !== action.payload
        );
        break;
      default:
    }
    console.log(newArray);
    return newArray;
  };
  const [todoListState, dispatch] = useReducer(appReducer, []);

  // render main logic
  return (
    <main>
      <section className="row">
        <div id="header" className="small-12 columns">
          <h1>Todo App</h1>
          <hr />
          <UserInput
            dispatch={dispatch}
            todoVal={todoVal}
            setTodoVal={setTodoVal}
          />
          <hr />
        </div>
        <TodoItems todoListState={todoListState} dispatch={dispatch} />
      </section>
    </main>
  );
};

export default App;
