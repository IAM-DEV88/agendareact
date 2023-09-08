const Input = ({
  label,
  className,
  tipo,
  nombre,
  value,
  placeholder,
  checked,
  onChange,
}) => {
  return (
    <>
      <span>
        <label htmlFor={label}>{label}</label>
        <input
        className={className}
          type={tipo}
          name={nombre}
          id={label}
          value={value}
            {...(checked !== null ? { checked: checked } : {})}
          placeholder={placeholder}
          onChange={onChange}
        />
      </span>
    </>
  );
};
export default Input;