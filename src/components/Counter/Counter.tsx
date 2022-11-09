import { useReducer, useState } from 'react'

interface CounterAction {
  type: 'INCREMENT' | 'DECREMENT'
}
interface CounterActionWithPayload {
  type: 'INCREMENT BY' | 'DECREMENT BY'
  payload: number
}
type CounterActions = CounterAction | CounterActionWithPayload

const reducer = (state: number, action: CounterActions) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    case 'INCREMENT BY':
      return state + action.payload
    case 'DECREMENT BY':
      return state - action.payload
    default:
      return state
  }
}

const Counter = () => {
  const [counter, dispatch] = useReducer(reducer, 0)
  const [counterInput, setCounterInput] = useState(0)

  return (
    <div>
      <h3>Counter: {counter}</h3>
      <div>
        <button onClick={() => dispatch({ type: 'INCREMENT' })}>
          increment by 1 (+)
        </button>
        <button onClick={() => dispatch({ type: 'DECREMENT' })}>
          decrement by 1 (-)
        </button>
        <div>
          <input
            type="text"
            value={counterInput}
            onChange={(e) => {
              if (!isNaN(Number(e.target.value)))
                setCounterInput(Number(e.target.value))
            }}
          />
          <button
            onClick={() =>
              dispatch({ type: 'INCREMENT BY', payload: counterInput })
            }
          >
            increment by (+)
          </button>
          <button
            onClick={() =>
              dispatch({ type: 'DECREMENT BY', payload: counterInput })
            }
          >
            decrement by (-)
          </button>
        </div>
      </div>
    </div>
  )
}

export default Counter
