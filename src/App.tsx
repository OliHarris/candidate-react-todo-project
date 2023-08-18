import { useState, useReducer } from "react";

interface UserInputInterface {
  dispatch: (action: { type: "add"; payload: string }) => void;
  todoVal: string;
  setTodoVal: (value: string) => void;
}
const UserInput = ({ dispatch, todoVal, setTodoVal }: UserInputInterface) => {
  const addTodoVal = (newTodoVal: string) => {
    // parsed in todoVal
    dispatch({ type: "add", payload: newTodoVal });
  };

  return (
    <div className="center">
      <input
        type="textbox"
        value={todoVal}
        // collect value when user types in
        onChange={(e) => setTodoVal(e.target.value)}
        placeholder="Enter todo"
      />
      <button
        className="rounded"
        onClick={() => addTodoVal(todoVal)}
        disabled={todoVal === ""}
      >
        Add
      </button>
    </div>
  );
};

interface CheckboxInterface {
  dispatch: (action: { type: "update"; payload: string }) => void;
  todoId: number;
  todoStatus: boolean;
}
const Checkbox = ({ dispatch, todoId, todoStatus }: CheckboxInterface) => {
  const updateTodoVal = (todoId: number) => {
    // parsed in todo.id
    dispatch({ type: "update", payload: todoId.toString() });
  };

  return (
    <>
      <label
        htmlFor="checkbox"
        className="rounded"
        onClick={() => {
          updateTodoVal(todoId);
        }}
      >
        Done?
        <input type="checkbox" readOnly />
        <span className={todoStatus ? "checked" : ""}></span>
      </label>
    </>
  );
};

interface DeleteButtonInterface {
  dispatch: (action: { type: "remove"; payload: string }) => void;
  todoId: number;
}
const DeleteButton = ({ dispatch, todoId }: DeleteButtonInterface) => {
  const removeTodoVal = (todoId: number) => {
    // parsed in todo.id
    dispatch({ type: "remove", payload: todoId.toString() });
  };

  return (
    <button className="right rounded" onClick={() => removeTodoVal(todoId)}>
      &#128465;
    </button>
  );
};

interface TodoItemsInterface {
  todoListState: { id: number; name: string; status: boolean }[];
  dispatch: (action: { type: "update" | "remove"; payload: string }) => void;
}
const TodoItems = ({ todoListState, dispatch }: TodoItemsInterface) => {
  return (
    <div id="todo-items" className="small-12 columns">
      <ul className="no-disc">
        {/* loop through each object in todoListState array */}
        {todoListState.map(
          (
            todo: { id: number; name: string; status: boolean },
            index: number
          ) => (
            <li key={index} className="row">
              <div className="small-12 columns">
                <div className="row">
                  <div className="small-7 medium-3 columns">
                    <Checkbox
                      dispatch={dispatch}
                      todoId={todo.id}
                      todoStatus={todo.status}
                    />
                  </div>
                  <div className="small-12 medium-6 columns hide-small show-large">
                    <h2 className="center">"{todo.name}"</h2>
                  </div>
                  <div className="small-5 medium-3 columns">
                    <div className="cf">
                      <DeleteButton dispatch={dispatch} todoId={todo.id} />
                    </div>
                  </div>
                  <div className="small-12 columns hide-large">
                    <h2 className="center">"{todo.name}"</h2>
                  </div>
                </div>
                <hr />
              </div>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

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
