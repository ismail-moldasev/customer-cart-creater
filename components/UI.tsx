import React from 'react';
import { LucideIcon } from 'lucide-react';

interface BigButtonProps {
  onClick: () => void;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  colorClass: string;
}

export const BigButton: React.FC<BigButtonProps> = ({ onClick, title, subtitle, icon, colorClass }) => (
  <button 
    onClick={onClick}
    className={`${colorClass} w-full p-6 rounded-2xl shadow-lg transform transition active:scale-95 flex flex-col items-center justify-center text-center gap-2`}
  >
    {icon && <div className="text-4xl mb-2">{icon}</div>}
    <h3 className="text-xl font-bold">{title}</h3>
    {subtitle && <p className="text-sm opacity-80">{subtitle}</p>}
  </button>
);

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input: React.FC<InputProps> = ({ label, className, ...props }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input 
      {...props}
      className={`w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition ${className}`}
    />
  </div>
);

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string | number; label: string }[];
}

export const Select: React.FC<SelectProps> = ({ label, options, className, ...props }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <select 
      {...props}
      className={`w-full p-3 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition ${className}`}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, ...props }) => (
  <label className="flex items-center space-x-3 mb-4 p-3 bg-white rounded-xl border border-gray-200 cursor-pointer">
    <input 
      type="checkbox" 
      {...props}
      className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500 border-gray-300"
    />
    <span className="text-gray-700 font-medium">{label}</span>
  </label>
);

interface ActionButtonProps {
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  children: React.ReactNode;
  disabled?: boolean;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ onClick, variant = 'primary', children, disabled }) => {
  const baseStyle = "w-full py-4 rounded-xl font-bold text-lg shadow-md transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-emerald-600 text-white hover:bg-emerald-700",
    secondary: "bg-blue-600 text-white hover:bg-blue-700",
    danger: "bg-red-500 text-white hover:bg-red-600",
    outline: "bg-white text-emerald-700 border-2 border-emerald-600 hover:bg-emerald-50"
  };

  return (
    <button onClick={onClick} disabled={disabled} className={`${baseStyle} ${variants[variant]}`}>
      {children}
    </button>
  );
};
