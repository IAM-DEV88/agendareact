import React from "react";
import Modal from "react-bootstrap/Modal";
import Input from "./Input";
import AppButton from "./AppButton";
import { useAppContext } from "../Utils";

const RegistroModal = () => {
  const {
    showModal,
    closeModal,
    SaveIcon,
    CloseIcon,
    isEditing,
    formData,
    handleInputChange,
    insertAndReset,
    duplicateHandler,
    deleteHandler,
    RemoveCircleOutlineIcon,
    ContentCopyIcon,
  } = useAppContext();
  return (
    <Modal show={showModal} onHide={closeModal}>
      <form onSubmit={insertAndReset}>
        <Modal.Header closeButton>
          <Modal.Title>{!isEditing ? "Nuevo" : "Editar"} registro</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalBody">
          <h6>Tipo:</h6>
          <div className="register-type">
            {["Turno", "Ingreso", "Egreso", "Saldo"].map((option, index) => (
              <Input
                key={index}
                className={option}
                tipo="radio"
                label={option}
                nombre="type"
                value={option}
                checked={formData.type === option}
                onChange={handleInputChange}
              />
            ))}
          </div>
          <hr />
          <h6>Datos:</h6>
          <div className="register-data">
            <Input
              className="short"
              tipo="date"
              label="Fecha"
              nombre="date"
              value={formData.date}
              errmsg="Debe indicar una fecha"
              onChange={handleInputChange}
            />
            <Input
              className="short"
              tipo="time"
              label="Hora"
              nombre="time"
              value={formData.time}
              errmsg="Debe indicar una hora"
              onChange={handleInputChange}
            />
            <Input
              className="short"
              tipo="number"
              label="Valor"
              nombre="amount"
              value={formData.amount}
              errmsg="Debe indicar un monto"
              onChange={handleInputChange}
            />

            <Input
              className="short"
              tipo="select"
              label="Billetera"
              nombre="wallet"
              selected={formData.wallet}
              selectList={[
                { value: "Caja", label: "Caja" },
                { value: "Nequi", label: "Nequi" },
              ]}
              onChange={handleInputChange}
            />

            <Input
              className="full"
              tipo="text"
              label="Descripcion"
              nombre="description"
              value={formData.description}
              errmsg="Debe indicar una descripcion"
              onChange={handleInputChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          {isEditing && (
            <>
              <AppButton
                variant="danger"
                type="button"
                label="Eliminar"
                onClick={() => deleteHandler([formData.id])}
                icono={RemoveCircleOutlineIcon}
              />
              <AppButton
                variant="primary"
                type="button"
                label="Duplicar"
                onClick={() => duplicateHandler([formData.id])}
                icono={ContentCopyIcon}
              />
            </>
          )}
          <AppButton
            variant="success"
            type="submit"
            label={!isEditing ? "Guardar" : "Actualizar"}
            icono={SaveIcon}
          />
          <AppButton
            variant="secondary"
            type="button"
            label="Cancelar"
            onClick={closeModal}
            icono={CloseIcon}
          />
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default RegistroModal;
