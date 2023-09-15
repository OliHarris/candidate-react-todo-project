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
export default UserInput;
