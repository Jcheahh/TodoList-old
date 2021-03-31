import React from "react";
import PropTypes from "prop-types";

function Todo({
    todo, completeTodo, removeTodo, setEdit,
}) {
    return (
        <div className="my-2 px-5 border inline-flex items-center bg-white leading-none rounded-full p-2 shadow text-sm">
            <input type="checkbox" defaultChecked={todo.is_done} onClick={() => completeTodo(todo)} />
            <div className={`text-lg flex-1 ml-4 ${todo.is_done ? "line-through text-gray-400" : " "}`}>{todo.task}</div>
            <button type="button" className="border-blue mr-4" onClick={() => setEdit({ id: todo.id, value: todo.task })}>
                <svg height="14" viewBox="0 -1 401.52289 401" width="14" xmlns="http://www.w3.org/2000/svg">
                    <path d="m370.589844 250.972656c-5.523438 0-10 4.476563-10 10v88.789063c-.019532 16.5625-13.4375 29.984375-30 30h-280.589844c-16.5625-.015625-29.980469-13.4375-30-30v-260.589844c.019531-16.558594 13.4375-29.980469 30-30h88.789062c5.523438 0 10-4.476563 10-10 0-5.519531-4.476562-10-10-10h-88.789062c-27.601562.03125-49.96875 22.398437-50 50v260.59375c.03125 27.601563 22.398438 49.96875 50 50h280.589844c27.601562-.03125 49.96875-22.398437 50-50v-88.792969c0-5.523437-4.476563-10-10-10zm0 0" />
                    <path d="m376.628906 13.441406c-17.574218-17.574218-46.066406-17.574218-63.640625 0l-178.40625 178.40625c-1.222656 1.222656-2.105469 2.738282-2.566406 4.402344l-23.460937 84.699219c-.964844 3.472656.015624 7.191406 2.5625 9.742187 2.550781 2.546875 6.269531 3.527344 9.742187 2.566406l84.699219-23.464843c1.664062-.460938 3.179687-1.34375 4.402344-2.566407l178.402343-178.410156c17.546875-17.585937 17.546875-46.054687 0-63.640625zm-220.257812 184.90625 146.011718-146.015625 47.089844 47.089844-146.015625 146.015625zm-9.40625 18.875 37.621094 37.625-52.039063 14.417969zm227.257812-142.546875-10.605468 10.605469-47.09375-47.09375 10.609374-10.605469c9.761719-9.761719 25.589844-9.761719 35.351563 0l11.738281 11.734375c9.746094 9.773438 9.746094 25.589844 0 35.359375zm0 0" />
                </svg>
            </button>
            <button type="button" className="uppercase p-3 flex items-center border border-red-600 text-red-600 max-w-max shadow-sm hover:shadow-lg rounded-full w-10 h-10 " onClick={() => removeTodo(todo.id)}>
                <svg width="14" height="14" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32">
                    <path d="M12 12h2v12h-2z" fill="currentColor" />
                    <path d="M18 12h2v12h-2z" fill="currentColor" />
                    <path d="M4 6v2h2v20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8h2V6zm4 22V8h16v20z" fill="currentColor" />
                    <path d="M12 2h8v2h-8z" fill="currentColor" />
                </svg>
            </button>
        </div>
    );
}

Todo.propTypes = {
    todo: PropTypes.shape({
        id: PropTypes.number,
        task: PropTypes.string.isRequired,
        is_done: PropTypes.bool.isRequired,
    }).isRequired,
    completeTodo: PropTypes.func.isRequired,
    removeTodo: PropTypes.func.isRequired,
    setEdit: PropTypes.func.isRequired,
};

export default Todo;
