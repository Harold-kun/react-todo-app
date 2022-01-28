import React from 'react';
import crossImg from '../assets/images/icon-cross.svg';
import checkImg from '../assets/images/icon-check.svg';

const ListItem = ({ text, isMarkedAsDone, id, markAsDone, deleteTodo }) => {
  return (
    <li className='card-1__item'>
      <div className='flex-align-center'>
        <button
          className={isMarkedAsDone ? 'btn-1 bg-gradient flex-center' : 'btn-1'}
          id={id}
          onClick={markAsDone}
        >
          {isMarkedAsDone && <img className='check-img' src={checkImg} alt='check icon' />}
        </button>
        <span className={isMarkedAsDone ? 'wrap-word completed' : 'wrap-word'}>{text}</span>
      </div >
      <button
        className='btn-2'
        id={id}
        onClick={deleteTodo}
      >
        <img src={crossImg} alt='cross icon' />
      </button>
    </li >
  )

}

export default ListItem;
