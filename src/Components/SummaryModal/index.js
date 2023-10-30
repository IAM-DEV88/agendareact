import React from "react";
import Modal from "react-bootstrap/Modal";
import AppButton from "../AppButton";
import DaySummary from "./DaySummary";
import MonthSummary from "./MonthSummary";
import CashSummary from "./CashSummary";
import FundsSummary from "./FundsSummary";
import "./SummaryModal.css"

const SummaryModal = ({
    showSummaryModal,
    closeSummaryModal,
    registers,
    selectedDate,
    summaryDay,
    summaryMonth,
}) => {
  return (
    <Modal show={showSummaryModal} onHide={closeSummaryModal}>
      <Modal.Header closeButton>
        <Modal.Title>Summary</Modal.Title>
      </Modal.Header>
      <Modal.Body className="summary">
        <DaySummary summaryDay={summaryDay} registers={registers} selectedDate={selectedDate} />
        <MonthSummary summaryMonth={summaryMonth} registers={registers} selectedDate={selectedDate} />
        <CashSummary registers={registers} />
        <FundsSummary registers={registers} />
      </Modal.Body>
      <Modal.Footer>
        <AppButton
          classes="app-button"
          type="button"
          label="Close"
          onClick={closeSummaryModal}
        />
      </Modal.Footer>
    </Modal>
  );
};

export default SummaryModal;
