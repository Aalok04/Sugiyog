import React from 'react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  block = false,
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) {
  const variantClass = `btn-${variant}`;
  const sizeClass = size === 'sm' ? 'btn-sm' : size === 'lg' ? 'btn-lg' : '';
  const blockClass = block ? 'btn-block' : '';

  return (
    <button
      type={type}
      className={`btn ${variantClass} ${sizeClass} ${blockClass} ${className}`.trim()}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
