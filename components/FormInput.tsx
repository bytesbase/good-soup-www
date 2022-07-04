import React from "react";

type Props = {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  onChange: () => void;
};

export default function FormInput({
  name,
  label,
  type,
  onChange,
  placeholder,
}: Props) {
  return (
    <div className="flex flex-col items-start w-full">
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        type={type}
        className="px-4 py-3 w-full"
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}
