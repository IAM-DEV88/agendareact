import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Input from './Input';
import AppButton from './AppButton';

const RegistroModal = ({
  showModal,
  closeModal,
  isEditing,
  formData,
  handleInputChange,
  insertAndReset,
  duplicateHandler,
  deleteHandler,
  RemoveCircleOutlineIcon,
ContentCopyIcon
}) => {
  return (
    <Modal show={showModal} onHide={closeModal}>
      <form onSubmit={insertAndReset}>
        <Modal.Header closeButton>
          <Modal.Title>{!isEditing ? 'Nuevo' : 'Editar'} registro</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalBody">
        <h6>Tipo:</h6>
            <div className="registerType">
              {["Turno", "Ingreso", "Egreso", "Saldo"].map((option) => (
                <Input
                  key={option}
                  tipo="radio"
                  label={option}
                  nombre="tipo"
                  value={option}
                  checked={formData.tipo === option}
                  onChange={handleInputChange}
                />
              ))}
            </div>
            <hr/>
            <h6>Datos:</h6>
            <div className="registerData">
              <Input
                className="short"
                tipo="date"
                label="Fecha"
                nombre="fecha"
                value={formData.fecha}
                errmsg="Debe indicar una fecha"
                onChange={handleInputChange}
              />
              <Input
                className="short"
                tipo="time"
                label="Hora"
                nombre="hora"
                value={formData.hora}
                errmsg="Debe indicar una hora"
                onChange={handleInputChange}
              />
              <Input
                className="short"
                tipo="number"
                label="Monto"
                nombre="monto"
                value={formData.monto}
                errmsg="Debe indicar un monto"
                onChange={handleInputChange}
              />
              <Input
                className="full"
                tipo="text"
                label="Descripcion"
                nombre="descripcion"
                value={formData.descripcion}
                errmsg="Debe indicar una descripcion"
                onChange={handleInputChange}
              />
            </div>
        </Modal.Body>
        <Modal.Footer>
          <AppButton
            variant="success"
            type="submit"
            label={!isEditing ? 'Guardar' : 'Actualizar'}
          />
          {isEditing && (
            <>
              <AppButton
                variant="primary"
                type="button"
                label="Duplicar"
                onClick={() => duplicateHandler(formData.id)}
                icono={ContentCopyIcon}
                />
              <AppButton
                variant="danger"
                type="button"
                label="Eliminar"
                onClick={() => deleteHandler(formData.id)}
                icono={RemoveCircleOutlineIcon}
              />
            </>
          )}
          <AppButton
            variant="secondary"
            type="button"
            label="Cancelar"
            onClick={closeModal}
          />
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default RegistroModal;
