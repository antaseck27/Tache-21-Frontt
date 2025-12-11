import React from "react";

export default function Input({ label, type = "text", value, onChange, placeholder }) {
  return (
    <div className="flex flex-col gap-2 my-2 w-full">
      {label && <label className="font-medium text-sm">{label}</label>}

      <input type={type}value={value}onChange={onChange}placeholder={placeholder}className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"/>
    </div>
  );
}
