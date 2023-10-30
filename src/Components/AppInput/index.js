const AppInput = ({
  label,
  className,
  type,
  name,
  value,
  placeholder,
  checked,
  onChange,
  selectList,
  selected,
}) => {
  const isSelect = type === 'select';

  return (
    <>
      <span className={className}>
        <label htmlFor={label}>{label}</label>
        {isSelect ? (
          <select
            name={name}
            id={label}
            onChange={onChange}
            value={selected || ''} // Establece el valor seleccionado o vacío
          >
            <option value=''>Select</option>
            {selectList.map((item, index) => (
              <option
                key={index}
                value={typeof item === 'object' ? item.value : item}
              >
                {typeof item === 'object' ? item.label : item}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            name={name}
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

export default AppInput;
