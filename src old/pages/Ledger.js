  import React, { useState, useEffect } from "react";
  import { toast, ToastContainer } from "react-toastify";
  import dayjs from "dayjs";
  import LedgerRegisterList from "../component/LedgerRegisterList";
  import AppButton from "../component/AppButton";
  import RegistroModal from "../component/ModalRegister";
  import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
  import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
  import ResumenModal from "../component/ResumenModal";
  import es from "dayjs/locale/es";
  import { useAppContext } from "../Utils";

  const Ledger = () => {
    const {
      list,
      toggleModal,
      selectedRecords,
      showNotification,
      customMessage,
      setCustomMessage,
      setShowNotification,
      formData,
      duplicateHandler,
      deleteHandler,
      AddCircleOutlineIcon,
      RemoveCircleOutlineIcon,
      ContentCopyIcon,
      QueryStatsIcon,
      formatCurrency,
    } = useAppContext();

    const [selectedDate, setSelectedDate] = useState(dayjs(new Date()));
    const [showResumeModal, setShowResumeModal] = useState(false);

    const toggleResumeModal = () => {
      setShowResumeModal(!showResumeModal);
    };

    const closeResumeModal = () => {
      setShowResumeModal(false);
    };

    // Configura la configuración regional en español
    dayjs.locale(es);

    const [filters, setFilters] = useState({
      All: true,
      Income: true,
      Expense: true,
      Balance: true,
      Date: false,
    });

    useEffect(() => {
      if (showNotification) {
        toast.info(customMessage, {
          autoClose: 3000,
          position: "bottom-right",
          style: {
            marginBottom: "5rem",
          },
          hideProgressBar: false,
          onClose: () => {
            setShowNotification(false);
            setCustomMessage("");
          },
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

    const handleCheckboxChange = (filterName) => {
      if (filterName === "All") {
        setFilters({
          All: true,
          Income: true,
          Expense: true,
          Balance: true,
          Date: false,
        });
      } else if (filterName === "Date") {
        setFilters({...filters,
          Date: true,
          All: false
        });
      } else {
        setFilters({ ...filters, All: false, [filterName]: !filters[filterName] });
      }
    };

    const filteredList = list.filter((item) => {
      const itemDateTime = new Date(item.date + " " + item.time); // Combina fecha y hora en un solo objeto Date
      if (filters.All && (filters.Income || filters.Expense || filters.Balance)) {
        return (
          (item.type !== "Turno") &&
          ((filters.Income && item.type === "Ingreso") ||
          (filters.Expense && item.type === "Egreso") ||
          (filters.Balance && item.type === "Saldo"))
        );
      }
      if (filters.Date && (filters.Income || filters.Expense || filters.Balance)) {
        return (
          filters.Date &&
          itemDateTime.getDate() === selectedDate.$D &&
          itemDateTime.getMonth() === selectedDate.$M &&
          itemDateTime.getFullYear() === selectedDate.$y &&
          item.type !== "Turno" &&
          ((filters.Income && item.type === "Ingreso") ||
            (filters.Expense && item.type === "Egreso") ||
            (filters.Balance && item.type === "Saldo"))
        );
      }else{
        return (
          (item.type !== "Turno") &&
          ((filters.Income && item.type === "Ingreso") ||
          (filters.Expense && item.type === "Egreso") ||
          (filters.Balance && item.type === "Saldo"))
        );
      }
    });

    return (
      <>
      
        <section className="filter-bar">
          <section>Mostrar en lista</section>
          <div>
            Todos
            <input
              type="checkbox"
              checked={filters.All}
              onChange={() => handleCheckboxChange("All")}
            />
          </div>
          <div>
            Ingresos
            <input
              type="checkbox"
              checked={filters.Income}
              onChange={() => handleCheckboxChange("Income")}
            />
          </div>
          <div>
            Egresos
            <input
              type="checkbox"
              checked={filters.Expense}
              onChange={() => handleCheckboxChange("Expense")}
            />
          </div>
          <div>
            Balance
            <input
              type="checkbox"
              checked={filters.Balance}
              onChange={() => handleCheckboxChange("Balance")}
            />
          </div>
          <div>
            <label>
              Fecha
              <input
                type="checkbox"
                checked={filters.Date}
                onChange={() => handleCheckboxChange("Date")}
              />
            </label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={selectedDate || dayjs(new Date())}
                onChange={(value) => {
                  setSelectedDate(value);
                }}
              />
            </LocalizationProvider>
          </div>
        </section>
        <LedgerRegisterList
        list={filteredList}
        gridColumns={[
          { field: "description", headerName: "Descripción", width: 130 },
          {
            field: "amount",
            headerName: "Valor",
            width: 90,
            valueGetter: (params) => formatCurrency(parseInt(params.value, 10)),
          },
          { field: "wallet", headerName: "Billetera", width: 90 },
          { field: "date", headerName: "Fecha", width: 90 },
        ]}
      />
        <RegistroModal />
        <div className="footer-container">
          {selectedRecords.length > 0 && (
            <>
              <AppButton
                variant="secondary"
                type="button"
                label="Duplicar"
                onClick={() => duplicateHandler(selectedRecords)}
                icono={ContentCopyIcon}
              />
              <AppButton
                variant="danger"
                type="button"
                label="Eliminar"
                onClick={() => deleteHandler(selectedRecords)}
                icono={RemoveCircleOutlineIcon}
              />
            </>
          )}
          <AppButton
            variant="info"
            type="button"
            label="Resumen"
            onClick={() => toggleResumeModal()}
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
          resumeDay={selectedDate.format("D dddd", { locale: "es" })}
          list={list}
          selectedDate={selectedDate}
          resumeMonth={selectedDate.format("MMMM", { locale: "es" })}
          showResumeModal={showResumeModal}
          closeResumeModal={closeResumeModal}
        />
      </>
    );
  };

  export default Ledger;
