import React from 'react';

const Card = ({ title, description, imageUrl, amount, discount }) => {
  return (
    <div className="lg:w-[60rem] p-2">
      <div className="flex flex-col lg:flex-row rounded border border-black p-4 my-4 lg:ms-10">
        <img src={imageUrl} alt={title} className="w-20 lg:h-20 mr-4 lg:mb-0 mb-4" />
        <span className="ml-1 mr-2 text-2xl mt-6">+</span>
        <img src={imageUrl} alt={title} className="w-20 h-20 lg:mr-4 lg:mb-0 mb-4" />

        <div className="ml-4 flex flex-col items-center lg:items-start flex-grow">
          <h3 className="text-gray-700 mb-2 lg:mt-2 lg:ms-8">{title}</h3>
          <div className="flex justify-between w-full">
            <div className="flex flex-row">
              <div className="mr-5 lg:ms-8 line-through text-gray-500">
                <h3>Rs {discount}</h3>
              </div>
              <div>
                <h3>Rs {amount}</h3>
              </div>
            </div>
            <p className="text-sm">{description}</p>
            <div className="ml-auto">
              <i className="fa-regular fa-pen-to-square"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
