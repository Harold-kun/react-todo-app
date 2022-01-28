import React, { useEffect, useState } from 'react';
import uniqid from 'uniqid';
import CustomInput from './CustomInput';
import ListItem from './ListItem';

function Todo() {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([]);
  const [numberOfUncompletedTask, setNumberOfUncompletedTask] = useState(0)
  const [showAll, setShowAll] = useState(true);
  const [onlyShowActive, setOnlyShowActive] = useState(false)

  useEffect(() => {
    window.addEventListener('keyup', event => {
      if (event.key === 'Enter') {
        addTodo();
      }
    });
  }, [text])



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
        if (todo.id === event.currentTarget.id) {
          todo.isMarkedAsDone = !todo.isMarkedAsDone;
          setNumberOfUncompletedTask(
            todo.isMarkedAsDone ?
              numberOfUncompletedTask - 1 : numberOfUncompletedTask + 1
          )
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
        itemClassName='card-1__item'
        isMarkedAsDone={todo.isMarkedAsDone}
        markAsDone={markAsDone}
        deleteTodo={deleteTodo}
        id={todo.id}
      />
    )
  }



  return (
    <div className='container'>
      <div className='background-top'></div>
      <div className='wrapper'>
        <h1 className='wrapper__title'>TODO</h1>

        <CustomInput
          type='text'
          clickHandler={addTodo}
          onChangeHandler={updateText}
          btnClassName='btn-1'
          name='todo'
          id='todo'
          placeholder='Create a new todo'
          value={text}
        />

        <div className='card-1'>
          <ul className='card-1__list'>
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

          <div className='card-1__content flex-container-1'>
            <span className='highlight-1'>{numberOfUncompletedTask} uncompleted task</span>
            <button className='btn-3' onClick={deleteCompleted}>Clear Completed</button>
          </div>
        </div>

        <div className='card-2 flex-center'>
          <button className={showAll ? 'btn-4 active' : 'btn-4'} onClick={showAllTodo}>All</button>
          <button className={onlyShowActive ? 'btn-4 active' : 'btn-4'} onClick={showActive}>Active</button>
          <button className={!showAll && !onlyShowActive ? 'btn-4 active' : 'btn-4'} onClick={showCompleted}>Completed</button>
        </div>
      </div>
    </div>
  );
}

export default Todo;
