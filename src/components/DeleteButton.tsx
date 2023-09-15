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
export default DeleteButton;
