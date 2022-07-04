import React, { ChangeEventHandler } from "react";

type Props = {
  name: string;
  label: string;
  type: string;
  required: boolean;
  placeholder: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export default function FormInput({
  name,
  label,
  type,
  required,
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
        required={required}
        placeholder={placeholder}
      />
    </div>
  );
}
