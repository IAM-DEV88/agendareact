import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import dayjs from "dayjs";
import Lista from "../component/Lista";
import AppButton from "../component/AppButton";
import RegistroModal from "../component/RegistroModal";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ResumenModal from "../component/ResumenModal";
import es from "dayjs/locale/es";
import { useAppContext } from "../Utils";

const Archivo = () => {
  const {
    list,
    toggleModal,
    selectedRecords,
    showNotification,
    customMessage,
    setCustomMessage,
    setShowNotification,
    formData,
    deleteSelectedRecords,
    duplicateSelectedRecords,
    AddCircleOutlineIcon,
    RemoveCircleOutlineIcon,
    ContentCopyIcon,
    QueryStatsIcon,
  } = useAppContext();

  const [selectedDate, setSelectedDate] = useState(dayjs(new Date()));
  const [showResumeModal, setShowResumeModal] = useState(false);

  const toggleResumeModal = () => {
    setShowResumeModal(!showResumeModal);
  };

  const closeResumeModal = () => {
    setShowResumeModal(false);
  };

  const [totals, setTotals] = useState({
    ingresosDia: 0,
    egresosDia: 0,
    saldosDia: 0,
    ingresosMes: 0,
    egresosMes: 0,
    saldosMes: 0,
  });

  const [filteredListDia, setFilteredListDia] = useState([]);

  // Configura la configuración regional en español
  dayjs.locale(es);

  // Obtiene el número del día
  const selectedDayNumber = selectedDate.format("D");

  // Obtiene el nombre del día en español
  const selectedDayName = selectedDate.format("dddd", { locale: "es" });

  // Define el día seleccionado en formato "N NombreDia"
  const resumeDay = `${selectedDayNumber} ${selectedDayName}`;

  // Obtiene el nombre del mes en español
  const selectedMonthName = selectedDate.format("MMMM", { locale: "es" });

  // Define the modal title with the selected month name
  const resumeMonth = `${selectedMonthName}`;

  useEffect(() => {
    if (showNotification) {
      toast.info(customMessage, {
        autoClose: 10000,
        position: "top-right",
        hideProgressBar: true,
        onClose: () => {
          setShowNotification(false);
          setCustomMessage("");
        },
        onClick: () => toggleModal(true, formData),
      });
    }
  }, [
    setShowNotification,
    showNotification,
    setCustomMessage,
    customMessage,
    formData,
    toggleModal,
  ]);

  useEffect(() => {
    const filteredListDia = list.filter((item) => {
      const itemDate = dayjs(item.fecha);
      const isCorrectDate = itemDate.isSame(selectedDate, "day");
      const isCorrectType = ["Ingreso", "Egreso", "Saldo"].includes(item.tipo);

      return isCorrectDate && isCorrectType;
    });

    const filteredListMes = list.filter((item) => {
      const itemDate = dayjs(item.fecha);
      const isCorrectDate = itemDate.isSame(selectedDate, "month");
      const isCorrectType = ["Ingreso", "Egreso", "Saldo"].includes(item.tipo);

      return isCorrectDate && isCorrectType;
    });

    const newTotalDia = {
      ingresosDia: 0,
      egresosDia: 0,
      saldosDia: 0,
      contadorIngresosDia: 0, // Agregar contador de ingresos
      contadorEgresosDia: 0, // Agregar contador de egresos
      contadorSaldosDia: 0, // Agregar contador de saldos
    };

    const newGrandTotal = {
      ingresosTotal: 0,
      egresosTotal: 0,
      saldosTotal: 0,
      contadorIngresosTotal: 0, // Agregar contador de ingresos
      contadorEgresosTotal: 0, // Agregar contador de egresos
      contadorSaldosTotal: 0, // Agregar contador de saldos
    };

    list.forEach((item) => {
      const monto = parseFloat(item.monto);
      if (item.tipo === "Ingreso") {
        newGrandTotal.ingresosTotal += monto;
        newGrandTotal.contadorIngresosTotal++; // Incrementar contador de ingresos
      } else if (item.tipo === "Egreso") {
        newGrandTotal.egresosTotal += monto;
        newGrandTotal.contadorEgresosTotal++; // Incrementar contador de egresos
      } else if (item.tipo === "Saldo") {
        newGrandTotal.saldosTotal += monto;
        newGrandTotal.contadorSaldosTotal++; // Incrementar contador de saldos
      }
    });

    filteredListDia.forEach((item) => {
      const monto = parseFloat(item.monto);
      if (item.tipo === "Ingreso") {
        newTotalDia.ingresosDia += monto;
        newTotalDia.contadorIngresosDia++; // Incrementar contador de ingresos
      } else if (item.tipo === "Egreso") {
        newTotalDia.egresosDia += monto;
        newTotalDia.contadorEgresosDia++; // Incrementar contador de egresos
      } else if (item.tipo === "Saldo") {
        newTotalDia.saldosDia += monto;
        newTotalDia.contadorSaldosDia++; // Incrementar contador de saldos
      }
    });

    const newTotalMes = {
      ingresosMes: 0,
      egresosMes: 0,
      saldosMes: 0,
      contadorIngresosMes: 0, // Agregar contador de ingresos
      contadorEgresosMes: 0, // Agregar contador de egresos
      contadorSaldosMes: 0, // Agregar contador de saldos
    };

    filteredListMes.forEach((item) => {
      const monto = parseFloat(item.monto);
      if (item.tipo === "Ingreso") {
        newTotalMes.ingresosMes += monto;
        newTotalMes.contadorIngresosMes++; // Incrementar contador de ingresos
      } else if (item.tipo === "Egreso") {
        newTotalMes.egresosMes += monto;
        newTotalMes.contadorEgresosMes++; // Incrementar contador de egresos
      } else if (item.tipo === "Saldo") {
        newTotalMes.saldosMes += monto;
        newTotalMes.contadorSaldosMes++; // Incrementar contador de saldos
      }
    });

    setTotals({ ...newTotalDia, ...newTotalMes, ...newGrandTotal });
    setFilteredListDia(filteredListDia); // Asignar filteredListDia al estado
  }, [list, selectedDate]);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="datePicker">
          <DatePicker
            value={selectedDate}
            onChange={(value) => {
              setSelectedDate(value);
            }}
          />
        </div>
      </LocalizationProvider>
      <Lista
        list={filteredListDia}
        gridColumns={[
          { field: "descripcion", headerName: "Descripción", width: 190 },
          { field: "monto", headerName: "Valor", width: 110 },
        ]}
      />
      <RegistroModal />
      <div className="AppButtonCtn">
        {selectedRecords.length > 0 && (
          <>
            <AppButton
              variant="secondary"
              type="button"
              label="Duplicar"
              onClick={duplicateSelectedRecords}
              icono={ContentCopyIcon}
            />
            <AppButton
              variant="danger"
              type="button"
              label="Eliminar"
              onClick={deleteSelectedRecords}
              icono={RemoveCircleOutlineIcon}
            />
          </>
        )}
        <AppButton
          variant="info"
          type="button"
          label="Resumen"
          onClick={() => toggleResumeModal(totals)}
          icono={QueryStatsIcon}
        />
        <AppButton
          variant="primary"
          type="button"
          label="Nuevo"
          onClick={() => toggleModal(false)}
          icono={AddCircleOutlineIcon}
        />
      </div>
      <ToastContainer />
      <ResumenModal
        resumeDay={resumeDay}
        resumeMonth={resumeMonth}
        showResumeModal={showResumeModal}
        closeResumeModal={closeResumeModal}
        totals={totals}
      />
    </>
  );
};

export default Archivo;
