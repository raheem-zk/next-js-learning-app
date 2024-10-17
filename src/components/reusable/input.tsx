import React from 'react';

const Input = (props) => {
  return (
    <div>
      <input
        className="border-b border-gray-400 w-full pb-4  mb-5 outline-none focus:border-blue-500"
        {...props}
      />
    </div>
  );
};

export default Input;
