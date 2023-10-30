const Input = ({
  label,
  className,
  tipo,
  nombre,
  value,
  placeholder,
  checked,
  onChange,
  selectList,
  selected,
}) => {
  const isSelect = tipo === "select";

  return (
    <>
      <span className={className}>
        <label htmlFor={label}>{label}</label>
        {isSelect ? (
          <select
            name={nombre}
            id={label}
            onChange={onChange}
            value={selected || ""} // Establece el valor seleccionado o vacío
          >
            <option value="">Seleccionar</option>
            {selectList.map((item, index) => (
              <option
                key={index}
                value={typeof item === "object" ? item.value : item}
              >
                {typeof item === "object" ? item.label : item}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={tipo}
            name={nombre}
            id={label}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            {...(checked !== null ? { checked: checked } : {})}
          />
        )}
      </span>
    </>
  );
};

export default Input;
