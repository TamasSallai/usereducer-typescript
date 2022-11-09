import { useReducer, useState } from 'react'
import { Todo, Priority, isPriority } from '../../type'

import './TodoForm.css'

type Action =
  | {
      type: 'ADD'
      payload: Todo
    }
  | {
      type: 'UPDATE'
      payload: Todo
    }
  | {
      type: 'REMOVE'
      payload: Todo
    }

const reducer = (todos: Todo[], action: Action) => {
  const currentTodo = action.payload
  switch (action.type) {
    case 'ADD':
      return todos.concat(currentTodo)
    case 'UPDATE':
      return todos.map((todo) => {
        if (todo.id === currentTodo.id) {
          return currentTodo
        }
        return todo
      })
    case 'REMOVE':
      return todos.filter((todo) => todo.id !== currentTodo.id)
    default:
      return todos
  }
}

const TodoForm = () => {
  const [todos, dispatch] = useReducer(reducer, [])
  const [description, setDescription] = useState('')
  const [isCompleted, setIsCompleted] = useState(false)
  const [selectedPriority, setSelectedPriority] = useState<Priority>(
    Priority.Low
  )

  const handlePriorityChange = (option: string) => {
    if (option && isPriority(option)) {
      setSelectedPriority(option)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch({
      type: 'ADD',
      payload: {
        id: 1,
        description: description,
        isCompleted: isCompleted,
        priority: selectedPriority,
      },
    })
  }

  return (
    <div>
      <form className="todo-form" onSubmit={handleSubmit}>
        <div>
          <label>Write a description: </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>is completed? </label>
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={() => setIsCompleted(!isCompleted)}
          />
        </div>
        <div>
          <label>Choose a Priority:</label>
          <select
            value={selectedPriority}
            onChange={(e) => handlePriorityChange(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="blocker">Blocker</option>
          </select>
        </div>
        <input type="submit" value="Submit" />
      </form>
      {JSON.stringify(todos)}
    </div>
  )
}

export default TodoForm
