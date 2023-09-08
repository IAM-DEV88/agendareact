import React from 'react';
import Modal from 'react-bootstrap/Modal';
import AppButton from './AppButton';

const ResumenModal = ({
  showResumeModal,
  closeResumeModal,
  totals,
  resumeDay,
  resumeMonth
}) => {
  return (
    <Modal show={showResumeModal} onHide={closeResumeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Resumen</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalBody">
        <h2>Día {resumeDay}:</h2>
        <table>
            <tbody>

            <tr>
                <td>({totals.contadorSaldosDia}) Saldos</td>
                <td>({totals.contadorIngresosDia}) Ingresos</td>
                <td>({totals.contadorEgresosDia}) Egresos</td>
                <td>Total</td>
            </tr>
            <tr>
                <td>{totals.saldosDia}</td>
                <td>{totals.ingresosDia}</td>
                <td>{totals.egresosDia}</td>
                <td>{totals.ingresosDia-totals.egresosDia}</td>
            </tr>
            </tbody>
        </table>
        <h2>Mes {resumeMonth}:</h2>
        <table>
            <tbody>
            <tr>
                <td>({totals.contadorSaldosMes}) Saldos</td>
                <td>({totals.contadorIngresosMes}) Ingresos</td>
                <td>({totals.contadorSaldosMes}) Egresos</td>
                <td>Total</td>
            </tr>
            <tr>
                <td>{totals.saldosMes}</td>
                <td>{totals.ingresosMes}</td>
                <td>{totals.egresosMes}</td>
                <td>{totals.ingresosMes-totals.egresosMes}</td>
            </tr>
            </tbody>
        </table>
        <h2>Caja:</h2>
        <table>
            <tbody>
            <tr>
                <td>({totals.contadorSaldosTotal}) Saldos</td>
                <td>({totals.contadorIngresosTotal}) Ingresos</td>
                <td>({totals.contadorSaldosTotal}) Egresos</td>
                <td>Total</td>
            </tr>
            <tr>
                <td>{totals.saldosTotal}</td>
                <td>{totals.ingresosTotal}</td>
                <td>{totals.egresosTotal}</td>
                <td>{totals.ingresosTotal-totals.egresosTotal}</td>
            </tr>
            </tbody>
        </table>
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
