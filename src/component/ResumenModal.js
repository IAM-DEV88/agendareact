import React from "react";
import Modal from "react-bootstrap/Modal";
import AppButton from "./AppButton";
import { useAppContext } from "../Utils";
import { useState, useEffect } from "react";
import dayjs from "dayjs";

const ResumenModal = ({
  showResumeModal,
  closeResumeModal,
  list,
  selectedDate,
  resumeDay,
  resumeMonth,
}) => {

  const [totals, setTotals] = useState({
    ingresosDia: 0,
    egresosDia: 0,
    saldosDia: 0,
    contadorIngresosDia: 0,
    contadorEgresosDia: 0,
    contadorSaldosDia: 0,
    ingresosMes: 0,
    egresosMes: 0,
    saldosMes: 0,
    contadorIngresosMes: 0,
    contadorEgresosMes: 0,
    contadorSaldosMes: 0,
    ingresosDiaCaja: 0,
    egresosDiaCaja: 0,
    saldosDiaCaja: 0,
    contadorIngresosDiaCaja: 0,
    contadorEgresosDiaCaja: 0,
    contadorSaldosDiaCaja: 0,
    ingresosDiaNequi: 0,
    egresosDiaNequi: 0,
    saldosDiaNequi: 0,
    contadorIngresosDiaNequi: 0,
    contadorEgresosDiaNequi: 0,
    contadorSaldosDiaNequi: 0,
  });


  const {
    formatCurrency
  } = useAppContext();


  useEffect(() => {
    const filteredBySelectedDay = list.filter((item) => {
      const itemDate = dayjs(item.date);
      const isCorrectDate = itemDate.isSame(selectedDate, "day");
      const isCorrectType = ["Ingreso", "Egreso", "Saldo"].includes(item.type);

      return isCorrectDate && isCorrectType;
    });

    const filteredListMes = list.filter((item) => {
      const itemDate = dayjs(item.date);
      const isCorrectDate = itemDate.isSame(selectedDate, "month");
      const isCorrectType = ["Ingreso", "Egreso", "Saldo"].includes(item.type);

      return isCorrectDate && isCorrectType;
    });

    const newTotals = {
      ingresosDia: 0,
      egresosDia: 0,
      saldosDia: 0,
      contadorIngresosDia: 0,
      contadorEgresosDia: 0,
      contadorSaldosDia: 0,
      ingresosMes: 0,
      egresosMes: 0,
      saldosMes: 0,
      contadorIngresosMes: 0,
      contadorEgresosMes: 0,
      contadorSaldosMes: 0,
      ingresosDiaCaja: 0,
      egresosDiaCaja: 0,
      saldosDiaCaja: 0,
      contadorIngresosDiaCaja: 0,
      contadorEgresosDiaCaja: 0,
      contadorSaldosDiaCaja: 0,
      ingresosDiaNequi: 0,
      egresosDiaNequi: 0,
      saldosDiaNequi: 0,
      contadorIngresosDiaNequi: 0,
      contadorEgresosDiaNequi: 0,
      contadorSaldosDiaNequi: 0,
    };

    const newGrandTotal = {
      ingresosTotal: 0,
      egresosTotal: 0,
      saldosTotal: 0,
      contadorIngresosTotal: 0,
      contadorEgresosTotal: 0,
      contadorSaldosTotal: 0,
      ingresosTotalCaja: 0,
      egresosTotalCaja: 0,
      saldosTotalCaja: 0,
      contadorIngresosTotalCaja: 0,
      contadorEgresosTotalCaja: 0,
      contadorSaldosTotalCaja: 0,
      ingresosTotalNequi: 0,
      egresosTotalNequi: 0,
      saldosTotalNequi: 0,
      contadorIngresosTotalNequi: 0,
      contadorEgresosTotalNequi: 0,
      contadorSaldosTotalNequi: 0,
    };

    list.forEach((item) => {
      const monto = parseFloat(item.amount);
      if (item.type === "Ingreso") {
        newGrandTotal.ingresosTotal += monto;
        newGrandTotal.contadorIngresosTotal++;
        if (item.wallet === "Caja" || !item.wallet) {
          newGrandTotal.ingresosTotalCaja += monto;
          newGrandTotal.contadorIngresosTotalCaja++;
        } else if (item.wallet === "Nequi") {
          newGrandTotal.ingresosTotalNequi += monto;
          newGrandTotal.contadorIngresosTotalNequi++;
        }
      } else if (item.type === "Egreso") {
        newGrandTotal.egresosTotal += monto;
        newGrandTotal.contadorEgresosTotal++;
        if (item.wallet === "Caja" || !item.wallet) {
          newGrandTotal.egresosTotalCaja += monto;
          newGrandTotal.contadorEgresosTotalCaja++;
        } else if (item.wallet === "Nequi") {
          newGrandTotal.egresosTotalNequi += monto;
          newGrandTotal.contadorEgresosTotalNequi++;
        }
      } else if (item.type === "Saldo") {
        newGrandTotal.saldosTotal += monto;
        newGrandTotal.contadorSaldosTotal++;
        if (item.wallet === "Caja" || !item.wallet) {
          newGrandTotal.saldosTotalCaja += monto;
          newGrandTotal.contadorSaldosTotalCaja++;
        } else if (item.wallet === "Nequi") {
          newGrandTotal.saldosTotalNequi += monto;
          newGrandTotal.contadorSaldosTotalNequi++;
        }
      }
    });

    filteredBySelectedDay.forEach((item) => {
      const monto = parseFloat(item.amount);
      if (item.type === "Ingreso") {
        newTotals.ingresosDia += monto;
        newTotals.contadorIngresosDia++;
        if (item.wallet === "Caja" || !item.wallet) {
          newTotals.ingresosDiaCaja += monto;
          newTotals.contadorIngresosDiaCaja++;
        } else if (item.wallet === "Nequi") {
          newTotals.ingresosDiaNequi += monto;
          newTotals.contadorIngresosDiaNequi++;
        }
      } else if (item.type === "Egreso") {
        newTotals.egresosDia += monto;
        newTotals.contadorEgresosDia++;
        if (item.wallet === "Caja" || !item.wallet) {
          newTotals.egresosDiaCaja += monto;
          newTotals.contadorEgresosDiaCaja++;
        } else if (item.wallet === "Nequi") {
          newTotals.egresosDiaNequi += monto;
          newTotals.contadorEgresosDiaNequi++;
        }
      } else if (item.type === "Saldo") {
        newTotals.saldosDia += monto;
        newTotals.contadorSaldosDia++;
        if (item.wallet === "Caja" || !item.wallet) {
          newTotals.saldosDiaCaja += monto;
          newTotals.contadorSaldosDiaCaja++;
        } else if (item.wallet === "Nequi") {
          newTotals.saldosDiaNequi += monto;
          newTotals.contadorSaldosDiaNequi++;
        }
      }
    });

    const newTotalMes = {
      ingresosMes: 0,
      egresosMes: 0,
      saldosMes: 0,
      contadorIngresosMes: 0,
      contadorEgresosMes: 0,
      contadorSaldosMes: 0,
      ingresosMesCaja: 0,
      egresosMesCaja: 0,
      saldosMesCaja: 0,
      contadorIngresosMesCaja: 0,
      contadorEgresosMesCaja: 0,
      contadorSaldosMesCaja: 0,
      ingresosMesNequi: 0,
      egresosMesNequi: 0,
      saldosMesNequi: 0,
      contadorIngresosMesNequi: 0,
      contadorEgresosMesNequi: 0,
      contadorSaldosMesNequi: 0,
    };

    filteredListMes.forEach((item) => {
      const monto = parseFloat(item.amount);
      if (item.type === "Ingreso") {
        newTotalMes.ingresosMes += monto;
        newTotalMes.contadorIngresosMes++;
        if (item.wallet === "Caja" || !item.wallet) {
          newTotalMes.ingresosMesCaja += monto;
          newTotalMes.contadorIngresosMesCaja++;
        } else if (item.wallet === "Nequi") {
          newTotalMes.ingresosMesNequi += monto;
          newTotalMes.contadorIngresosMesNequi++;
        }
      } else if (item.type === "Egreso") {
        newTotalMes.egresosMes += monto;
        newTotalMes.contadorEgresosMes++;
        if (item.wallet === "Caja" || !item.wallet) {
          newTotalMes.egresosMesCaja += monto;
          newTotalMes.contadorEgresosMesCaja++;
        } else if (item.wallet === "Nequi") {
          newTotalMes.egresosMesNequi += monto;
          newTotalMes.contadorEgresosMesNequi++;
        }
      } else if (item.type === "Saldo") {
        newTotalMes.saldosMes += monto;
        newTotalMes.contadorSaldosMes++;
        if (item.wallet === "Caja" || !item.wallet) {
          newTotalMes.saldosMesCaja += monto;
          newTotalMes.contadorSaldosMesCaja++;
        } else if (item.wallet === "Nequi") {
          newTotalMes.saldosMesNequi += monto;
          newTotalMes.contadorSaldosMesNequi++;
        }
      }
    });

    setTotals({ ...newTotals, ...newTotalMes, ...newGrandTotal });
  }, [list, selectedDate]);


  return (
    <Modal show={showResumeModal} onHide={closeResumeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Resumen</Modal.Title>
      </Modal.Header>
      <Modal.Body className="resumen">
        <div>
          <h2>Día {resumeDay}:</h2>
          <table>
            <tbody>
              <tr>
                <th>Cantidad</th>
                <th>Tipo</th>
                <th>Total</th>
              </tr>
              <tr>
                <td>({totals.contadorSaldosDia})</td>
                <td>Saldos</td>
                <td className="currency">{formatCurrency(totals.saldosDia)}</td>
              </tr>
              <tr>
                <td>({totals.contadorIngresosDia})</td>
                <td>Ingresos</td>
                <td className="currency">{formatCurrency(totals.ingresosDia)}</td>
              </tr>
              <tr>
                <td>({totals.contadorEgresosDia})</td>
                <td>Egresos</td>
                <td className="currency">{formatCurrency(totals.egresosDia)}</td>
              </tr>
              <tr>
                <td></td>
                <td>Total</td>
                <td className="currency">{formatCurrency(totals.ingresosDia - totals.egresosDia)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h2>Mes {resumeMonth}:</h2>
          <table>
            <tbody>
              <tr>
                <th>Cantidad</th>
                <th>Tipo</th>
                <th>Total</th>
              </tr>
              <tr>
                <td>({totals.contadorSaldosMes})</td>
                <td>Saldos</td>
                <td className="currency">{formatCurrency(totals.saldosMes)}</td>
              </tr>
              <tr>
                <td>({totals.contadorIngresosMes})</td>
                <td>Ingresos</td>
                <td className="currency">{formatCurrency(totals.ingresosMes)}</td>
              </tr>
              <tr>
                <td>({totals.contadorSaldosMes})</td>
                <td>Egresos</td>
                <td className="currency">{formatCurrency(totals.egresosMes)}</td>
              </tr>
              <tr>
                <td></td>
                <td>Total</td>
                <td className="currency">{formatCurrency(totals.ingresosMes - totals.egresosMes)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h2>Caja:</h2>
          <table>
            <tbody>
              <tr>
                <th>Cantidad</th>
                <th>Tipo</th>
                <th>Total</th>
              </tr>
              <tr>
                <td>({totals.contadorSaldosTotalCaja})</td>
                <td>Saldos</td>
                <td className="currency">{formatCurrency(totals.saldosTotalCaja)}</td>
              </tr>
              <tr>
                <td>({totals.contadorIngresosTotalCaja})</td>
                <td>Ingresos</td>
                <td className="currency">{formatCurrency(totals.ingresosTotalCaja)}</td>
              </tr>
              <tr>
                <td>({totals.contadorEgresosTotalCaja})</td>
                <td>Egresos</td>
                <td className="currency">{formatCurrency(totals.egresosTotalCaja)}</td>
              </tr>
              <tr>
                <td></td>
                <td>Total</td>
                <td className="currency">{formatCurrency(totals.ingresosTotalCaja - totals.egresosTotalCaja)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h2>Nequi:</h2>
          <table>
            <tbody>
              <tr>
                <th>Cantidad</th>
                <th>Tipo</th>
                <th>Total</th>
              </tr>
              <tr>
                <td>({totals.contadorSaldosTotalNequi})</td>
                <td>Saldos</td>
                <td className="currency">{formatCurrency(totals.saldosTotalNequi)}</td>
              </tr>
              <tr>
                <td>({totals.contadorIngresosTotalNequi})</td>
                <td>Ingresos</td>
                <td className="currency">{formatCurrency(totals.ingresosTotalNequi)}</td>
              </tr>
              <tr>
                <td>({totals.contadorSaldosTotalNequi})</td>
                <td>Egresos</td>
                <td className="currency">{formatCurrency(totals.egresosTotalNequi)}</td>
              </tr>
              <tr>
                <td></td>
                <td>Total</td>
                <td className="currency">{formatCurrency(totals.ingresosTotalNequi - totals.egresosTotalNequi)}</td>
              </tr>
            </tbody>
          </table>
        </div>
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
