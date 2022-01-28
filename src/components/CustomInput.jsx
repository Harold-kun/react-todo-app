import React from 'react';

const CustomInput = ({ clickHandler, onChangeHandler, value, name, id, placeholder, type }) => {
  return (
    <div className='custom-input-1'>
      <button className='btn-1' onClick={clickHandler}></button>
      <input
        type={type}
        className='input-field-1'
        name={name}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChangeHandler}
      />
    </div>
  );
}

export default CustomInput;
