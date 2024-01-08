import EditIcon from "@/components/EditIcon";
import React, { ChangeEvent, useState } from "react";

const Card = ({ name, designation, ...rest }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [details, setDetails] = useState({ name, designation, ...rest });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDetails({
      ...details,
      [event.target.name]: event.target.value,
    });
  };
  const handleEditClick = () => {
    setIsEdit(true);
  };

  const handleSave = () => {
    const { node } = rest;
    node.editValue(details);
    setIsEdit(false);
  };

  return (
    <div
      className="h-56 w-60 bg-white rounded-md border-t-2 border-purple-500
     shadow-md p-2"
    >
      <div className="flex justify-end cursor-pointer">
        {!isEdit && (
          <div onClick={handleEditClick}>
            <EditIcon />
          </div>
        )}
        {isEdit && (
          <button
            className="bg-sky-500 rounded-md text-white px-4 py-2"
            onClick={handleSave}
          >
            Save
          </button>
        )}
      </div>
      <div className=" flex justify-center items-center flex-col">
        <div className="flex justify-center items-center flex-col">
          <User />
          {!isEdit && <h1>{details.name}</h1>}
          {isEdit && (
            <input
              className="border"
              placeholder="Enter name"
              value={details.name}
              onChange={handleChange}
              name="name"
            />
          )}
        </div>
        <div className="flex  items-center gap-2 mt-2">
          <div className="text-xs p-1 rounded bg-purple-200">ROLE</div>
          {!isEdit && (
            <span className="text-xs text-slate-500">{designation}</span>
          )}
          {isEdit && (
            <input
              className="border"
              placeholder="Enter designation"
              value={details.designation}
              onChange={handleChange}
              name="designation"
            />
          )}
        </div>
      </div>
    </div>
  );
};

const User = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-12 h-12"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    />
  </svg>
);

export default Card;
