import React from "react";
import Modal from "react-bootstrap/Modal";
import AppButton from "./AppButton";
import DayResume from "./DayResume";
import MonthResume from "./MonthResume";
import CashResume from "./CashResume";
import FundsResume from "./FundsResume";

const ResumenModal = ({
  showResumeModal,
  closeResumeModal,
  list,
  selectedDate,
  resumeDay,
  resumeMonth,
}) => {


  return (
    <Modal show={showResumeModal} onHide={closeResumeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Resumen</Modal.Title>
      </Modal.Header>
      <Modal.Body className="resumen">
        <DayResume resumeDay={resumeDay} list={list} selectedDate={selectedDate} />
        <MonthResume resumeMonth={resumeMonth} list={list} selectedDate={selectedDate} />
        <CashResume list={list} />
        <FundsResume list={list} />
      </Modal.Body>
      <Modal.Footer>
        <AppButton
          variant="secondary"
          type="button"
          label="Cerrar"
          onClick={closeResumeModal}
        />
      </Modal.Footer>
    </Modal>
  );
};

export default ResumenModal;
