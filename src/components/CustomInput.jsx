import React from 'react';

const CustomInput = ({ clickHandler, onChangeHandler, value, btnClassName, inputClassName, name, id, placeholder }) => {
  return (
    <div>
      <button className={btnClassName} onClick={clickHandler}></button>
      <input
        className={inputClassName}
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
