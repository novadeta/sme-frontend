import React, { useId } from "react"
import clsx from "clsx"

interface labelInput extends React.InputHTMLAttributes<HTMLInputElement> {
  children: React.ReactNode;
  classLabel: string;
  classInput: string;

}

export default function Input({children, type, onChange, value, placeholder, className, classLabel, classInput}:labelInput) {
  return (
    <>
      <div className={clsx("flex flex-col", className)}>
        <label className={clsx("text-black ml-[2px]", classLabel)}>{children}</label>
        <input className={clsx("text-black py-1 px-2 outline-1 outline-gray-600 rounded-lg", classInput)} type={type} onChange={onChange} value={value} placeholder={placeholder} required/>
      </div>
    </>
  )
}
