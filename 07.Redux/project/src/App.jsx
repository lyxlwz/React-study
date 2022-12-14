
import './app.css'
import { useSelector, useDispatch } from 'react-redux'
import { delTask, singleCheck, allCheck, addTask } from './store/modules/taskStore'
import { useState } from 'react'

function App () {
  const { list } = useSelector(state => state.taskStore)
  const dispatch = useDispatch()

  const [keywords, setKeywords] = useState('')
  const onChange = (e) => {
    setKeywords(e.target.value)
  }
  const onKeyUp = (e) => {
    if (e.keyCode === 13) {
      const task = {
        id: 3,
        title: keywords,
        done: false,
      }
      dispatch(addTask(task))
    }
  }

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          autoFocus
          autoComplete="off"
          placeholder="What needs to be done?"
          value={keywords}
          onChange={onChange}
          onKeyUp={onKeyUp}
        />
      </header>
      <section className="main">
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          checked={list.every((task) => task.done)}
          onChange={(e) => dispatch(allCheck(e.target.checked))} />
        <label htmlFor="toggle-all"></label>
        <ul className="todo-list">
          {list.map((task) => (
            <li key={task.id} className={task.done ? 'todo completed' : 'todo'}>
              <div className="view">
                <input
                  className="toggle"
                  type="checkbox"
                  checked={task.done}
                  onChange={() => dispatch(singleCheck(task.id))} />
                <label>{task.title}</label>
                <button
                  className="destroy"
                  onClick={() => dispatch(delTask(task.id))}></button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </section>
  )
}

export default App
