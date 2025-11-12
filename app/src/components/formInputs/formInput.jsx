import React from "react";

export default function FormInput({
  label,
  id,
  type = "text",
  placeholder,
  register,
  error,
  disabled = false,
}) {
  return (
    // se encapsula la lógica de los inputs en un componente reutilizable, de esta forma los forms originales quedan mas limpios
    <div>
      <div className="mb-2 block">
        <label className="text-black" htmlFor={id}>
          {label}
        </label>
      </div>
      <input
        className={`bg-[#f1f6f8] rounded-3xl px-3 py-2 w-full ${
          error ? "border-2 border-red-500" : ""
        }`}
        id={id}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        {...register}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
}
