import "./styles.css";

const btn = document.getElementById("btn")! as HTMLButtonElement;
const text = document.getElementById("text")! as HTMLInputElement;
const form = document.querySelector("form")!;
const list = document.getElementById("todolist")!;

interface TODO {
  todo: string;
  completed: boolean;
}

function saveTodos(todos: TODO[]) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// btn.addEventListener("click", () => {
//   text.value = "";
// });

const todos: TODO[] = readTodos();

function readTodos(): TODO[] {
  const todosJSON = localStorage.getItem("todos");
  return todosJSON === null ? ([] as number[]) : JSON.parse(todosJSON);
}

function createTodo(todo: TODO): void {
  const newLi = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("click", () => {
    todo.completed = checkbox.checked;
    saveTodos(todos);
  });
  checkbox.checked = todo.completed;
  newLi.append(todo.todo);
  newLi.append(checkbox);
  list.append(newLi);
}
todos.forEach(createTodo);

const handleSubmit = (e: SubmitEvent) => {
  e.preventDefault();
  const newTodo: TODO = {
    todo: text.value,
    completed: false
  };
  todos.push(newTodo);
  createTodo(newTodo);

  saveTodos(todos);
  text.value = "";
};

form.addEventListener("submit", handleSubmit);
