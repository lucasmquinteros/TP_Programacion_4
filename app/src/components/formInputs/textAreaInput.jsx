import React from "react";

export default function FormTextarea({
  label,
  id,
  placeholder,
  register,
  error,
  rows = 4,
  disabled = false,
}) {
  return (
    //se tiene que hacer otro componente para el textarea porque la estructura que tiene es distinta a la de los otros inputs
    <div>
      <div className="mb-2 block">
        <label className="text-black" htmlFor={id}>
          {label}
        </label>
      </div>
      <textarea
        className={`bg-white rounded-3xl px-3 py-2 w-full border ${
          error ? "border-2 border-red-500" : "border-gray-300"
        }`}
        id={id}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        {...register}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
}
