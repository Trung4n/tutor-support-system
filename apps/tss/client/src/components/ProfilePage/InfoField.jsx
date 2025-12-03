import React from "react";

const InfoField = ({ label, value, className = "" }) => (
  <div className={className}>
    <p className="text-black text-base font-bold font-roboto mb-2 leading-normal">{label}</p>
    <p className="text-black text-base font-roboto leading-normal break-words">{value}</p>
  </div>
);

export default InfoField;
