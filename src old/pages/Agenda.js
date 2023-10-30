import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import dayjs from "dayjs";
import AgendaRegisterList from "../component/AgendaRegisterList";
import AppButton from "../component/AppButton";
import ModalRegister from "../component/ModalRegister"; // Importa el nuevo componente
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useAppContext } from "../Utils";

const Agenda = () => {
  const {
    list,
    toggleModal,
    selectedRecords,
    showNotification,
    customMessage,
    setCustomMessage,
    setShowNotification,
    formData,
    deleteHandler,
    duplicateHandler,
    AddCircleOutlineIcon,
    RemoveCircleOutlineIcon,
    ContentCopyIcon,
    formatCurrency,
  } = useAppContext();

console.log(list)


  const [filters, setFilters] = useState({
    planner: true,
    historical: false,
    date: false,
  });
  const [selectedDate, setSelectedDate] = useState(dayjs(new Date()));

  const filteredList = list.filter((item) => {
    const itemDateTime = new Date(item.date + " " + item.time); // Combina fecha y hora en un solo objeto Date
    const now = new Date();

    if (filters.planner) {
      return (
        (filters.planner && item.type === "Turno") ||
        (filters.historical && itemDateTime < now)
      );
    } else if (filters.historical) {
      return (
        item.type === "Turno" && // Verifica si el tipo es "Turno"
        itemDateTime < now && // Verifica si la fecha es anterior a "now"
        (!filters.date || // Si filters.date no está habilitado O
          (filters.date && // Si filters.date está habilitado
            // Comprueba si la fecha coincide con la seleccionada
            itemDateTime.getDate() === selectedDate.$D &&
            itemDateTime.getMonth() === selectedDate.$M &&
            itemDateTime.getFullYear() === selectedDate.$y))
      );
    } else if (filters.date) {
      return (
        item.type === "Turno" && // Comprueba si el tipo es "Turno"
        ((filters.date && // Si filters.date está habilitado
          // Comprueba si la fecha coincide con la seleccionada
          itemDateTime.getDate() === selectedDate.$D &&
          itemDateTime.getMonth() === selectedDate.$M &&
          itemDateTime.getFullYear() === selectedDate.$y) ||
          (filters.historical && itemDateTime < now)) // O, si es histórico y la fecha es anterior a "now"
      );
    }

    return true; // Si ningún filtro está seleccionado, muestra todo.
  });

  const handleFilterChange = (filterName) => {
    if (filterName === "Planner") {
      setFilters({ historical: false, planner: !filters.planner, date: false });
    } else if (filterName === "Historical") {
      setFilters({
        ...filters,
        planner: false,
        historical: !filters.historical,
      });
    } else if (filterName === "byDate") {
      setFilters({ ...filters, planner: false, date: !filters.date });
    }
  };

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

  return (
    <>
      <section className="filter-bar">
        <section>Mostrar en lista</section>
        <div>
          Turno
          <input
            type="checkbox"
            checked={filters.planner}
            onChange={() => handleFilterChange("Planner")}
          />
        </div>
        <div>
          Ya paso
          <input
            type="checkbox"
            checked={filters.historical}
            onChange={() => handleFilterChange("Historical")}
          />
        </div>
        <div>
          <label>
            Por fecha
            <input
              type="checkbox"
              checked={filters.date}
              onChange={() => handleFilterChange("byDate")}
            />
          </label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={selectedDate}
              onChange={(value) => {
                setSelectedDate(value);
              }}
            />
          </LocalizationProvider>
        </div>
      </section>
      <AgendaRegisterList
        list={filteredList}
        gridColumns={[
          { field: "tiempoRestante", headerName: "Agenda", width: 90 },
          { field: "description", headerName: "Descripción", width: 130 },
          { field: "time", headerName: "Hora", width: 90 },
          { field: "date", headerName: "Fecha", width: 90 },
          {
            field: "amount",
            headerName: "Valor",
            width: 80,
            valueGetter: (params) => formatCurrency(parseInt(params.value, 10)),
          },
        ]}
      />
      <ModalRegister />
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
          variant="primary"
          type="button"
          label="Nuevo"
          onClick={() => toggleModal(false)}
          icono={AddCircleOutlineIcon}
        />
      </div>
      <ToastContainer />
    </>
  );
};

export default Agenda;
