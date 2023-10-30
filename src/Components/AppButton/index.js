import React from 'react';
import AppIcon from '../AppIcon';

const AppButton = ({ type, onClick, label, icon, classes }) => {

  return (
    <button className={classes} type={type} onClick={onClick}>
      {icon ? <AppIcon iconName={icon} /> : null} {/* Renderiza el IconComponent solo si el icono no es nulo */}
      {icon ? <br /> : null}
      {label}
    </button>
  );
};

export default AppButton;
