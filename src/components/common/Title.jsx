import React from "react";

const Title = ({ name, namebold }) => {
  return (
    <h2 className="text-primary text-center text-[26px] font-normal lg:text-[35px]">
      {name} <span className="font-bold">{namebold}</span>
    </h2>
  );
};

export default Title;
