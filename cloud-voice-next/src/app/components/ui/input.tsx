import React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string | null;
  value?: any | null
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, value, type, ...props }, ref) => {
    return (
      <>
        {label ? <label className="block text-[#9BB8CF]">{label}</label> : null}
        <input
          type={type}
          className={"form-input p-2 rounded block bg-[#111F28] px-2 w-full"}
          ref={ref}
          value={value}
          {...props}
        />
      </>
    );
  }
);
Input.displayName = "Input";

export default Input;
