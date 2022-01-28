import React, { useState } from 'react';
import uniqid from 'uniqid';
import CustomInput from './CustomInput';
import ListItem from './ListItem';

function Todo() {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([]);
  const [numberOfUncompletedTask, setNumberOfUncompletedTask] = useState(0)
  const [showAll, setShowAll] = useState(true);
  const [onlyShowActive, setOnlyShowActive] = useState(false)

  const updateText = event => {
    setText(event.target.value)
  }

  const addTodo = () => {
    if (text !== '') {
      setTodos([
        ...todos,
        {
          id: uniqid(),
          text: text,
          isMarkedAsDone: false
        }
      ])

      setText('');
      setNumberOfUncompletedTask(numberOfUncompletedTask + 1)
    }
  }

  const markAsDone = event => {
    setTodos(
      todos.map(todo => {
        if (todo.id === event.currentTarget.id && !todo.isMarkedAsDone) {
          todo.isMarkedAsDone = true;
          setNumberOfUncompletedTask(numberOfUncompletedTask - 1)
        }
        return todo;
      }))

  }

  const deleteTodo = event => {
    setTodos(todos.filter(todo => {
      if (todo.id !== event.currentTarget.id) {
        return todo;
      } else {
        !todo.isMarkedAsDone && setNumberOfUncompletedTask(numberOfUncompletedTask - 1);
        return null;
      }
    }))
  }

  const deleteCompleted = () => {
    setTodos(todos.filter(todo => !todo.isMarkedAsDone))
  }

  const showAllTodo = () => {
    setShowAll(true);
    setOnlyShowActive(false);
  }

  const showActive = () => {
    setOnlyShowActive(true);
    setShowAll(false);
  }

  const showCompleted = () => {
    setShowAll(false);
    setOnlyShowActive(false);
  }

  const listItemComponent = todo => {
    return (
      <ListItem
        key={todo.id}
        text={todo.text}
        isMarkedAsDone={todo.isMarkedAsDone}
        markAsDone={markAsDone}
        deleteTodo={deleteTodo}
        id={todo.id}
      />
    )
  }

  return (
    <div>
      <div>
        <h1>TODO</h1>

        <CustomInput
          clickHandler={addTodo}
          onChangeHandler={updateText}
          btnClassName='btn-1'
          inputClassName='input-field-1'
          name='todo'
          id='todo'
          placeholder='Create a new todo'
          value={text}
        />

        <div>
          <ul>
            {
              todos.map(todo => {
                if (showAll) {
                  return listItemComponent(todo);
                } else if (onlyShowActive) {
                  return !todo.isMarkedAsDone && listItemComponent(todo);
                } else {
                  // only show completed task
                  return todo.isMarkedAsDone && listItemComponent(todo);
                }
              })
            }
          </ul>

          <div>
            <span>{numberOfUncompletedTask} uncompleted task</span>
            <button onClick={deleteCompleted}>Clear Completed</button>
          </div>
        </div>

        <div>
          <button onClick={showAllTodo}>All</button>
          <button onClick={showActive}>Active</button>
          <button onClick={showCompleted}>Completed</button>
        </div>
      </div>
    </div>
  );
}

export default Todo;
