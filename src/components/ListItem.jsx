import React from 'react';
import crossImg from '../assets/images/icon-cross.svg';
import checkImg from '../assets/images/icon-check.svg';

const ListItem = ({ text, isMarkedAsDone, id, markAsDone, deleteTodo }) => {
  return (
    <li>
      <button
        className='btn-1'
        id={id}
        onClick={markAsDone}
      >
        {isMarkedAsDone && <img src={checkImg} alt='check icon' />}
      </button>
      {text}
      <button
        className=''
        id={id}
        onClick={deleteTodo}
      >
        <img src={crossImg} alt='cross icon' />
      </button>
    </li >
  )

}

export default ListItem;
