import Checkbox from "./Checkbox";
import DeleteButton from "./DeleteButton";

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
export default TodoItems;
