  import React, { useState, useEffect } from "react";
  import { toast, ToastContainer } from "react-toastify";
  import dayjs from "dayjs";
  import CountableRegisterList from "../component/CountableRegisterList";
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
      Todos: true,
      Ingresos: true,
      Egresos: true,
      Saldos: true,
      Fecha: false,
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
      if (filterName === "Todos") {
        setFilters({
          Todos: true,
          Ingresos: true,
          Egresos: true,
          Saldos: true,
          Fecha: false,
        });
      } else if (filterName === "Fecha") {
        setFilters({ Todos: false, Fecha: true });
      } else {
        setFilters({ ...filters, Todos: false, [filterName]: !filters[filterName] });
      }
    };

    const filteredList = list.filter((item) => {
      const itemDateTime = new Date(item.date + " " + item.time); // Combina fecha y hora en un solo objeto Date
      if (filters.Todos) {
        return item.type !== "Turno";
      }

      return (
        (filters.Ingresos && item.type === "Ingreso") ||
        (filters.Egresos && item.type === "Egreso") ||
        (filters.Saldos && item.type === "Saldo") ||
        (filters.Fecha &&
          itemDateTime.getDate() === selectedDate.$D &&
          itemDateTime.getMonth() === selectedDate.$M &&
          itemDateTime.getFullYear() === selectedDate.$y &&
          item.type !== "Turno")
      );
    });

    return (
      <>
      <CountableRegisterList
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
        <section className="filter-bar">
          <section>Mostrar en lista</section>
          <div>
            Todos
            <input
              type="checkbox"
              checked={filters.Todos}
              onChange={() => handleCheckboxChange("Todos")}
            />
          </div>
          <div>
            Ingresos
            <input
              type="checkbox"
              checked={filters.Ingresos}
              onChange={() => handleCheckboxChange("Ingresos")}
            />
          </div>
          <div>
            Egresos
            <input
              type="checkbox"
              checked={filters.Egresos}
              onChange={() => handleCheckboxChange("Egresos")}
            />
          </div>
          <div>
            Saldos
            <input
              type="checkbox"
              checked={filters.Saldos}
              onChange={() => handleCheckboxChange("Saldos")}
            />
          </div>
          <div>
            <label>
              Fecha
              <input
                type="checkbox"
                checked={filters.Fecha}
                onChange={() => handleCheckboxChange("Fecha")}
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

  export default Archivo;
