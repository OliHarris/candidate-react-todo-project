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
export default Checkbox;
