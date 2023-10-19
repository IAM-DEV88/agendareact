import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import dayjs from "dayjs";
import AgendaRegisterList from "../component/AgendaRegisterList";
import AppButton from "../component/AppButton";
import RegistroModal from "../component/RegistroModal"; // Importa el nuevo componente
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useAppContext } from "../Utils";

const Agenda = () => {
  const [filterTodos, setFilterTodos] = useState(true); // Inicialmente "Todos" está marcado
  const [filterYaPaso, setFilterYaPaso] = useState(false);
  const [filterPorFecha, setFilterPorFecha] = useState(false);

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

  const [selectedDate, setSelectedDate] = useState(dayjs(new Date()));

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

  const filteredList = list.filter((item) => {
    const itemDateTime = new Date(item.date + " " + item.time); // Combina fecha y hora en un solo objeto Date

    if (filterTodos) {
      return item.type === "Turno";
    } else if (filterYaPaso) {
      const now = new Date();
      return itemDateTime < now && item.type === "Turno";
    } else if (filterPorFecha) {
      return (
        itemDateTime.getDate() === selectedDate.$D &&
        itemDateTime.getMonth() === selectedDate.$M &&
        itemDateTime.getFullYear() === selectedDate.$y &&
        item.type === "Turno"
      );
    }

    return true; // Si ningún filtro está seleccionado, muestra todo.
  });

  const handleCheckboxChange = (filterName) => {
    if (filterName === "Todos") {
      setFilterTodos(!filterTodos);
      setFilterYaPaso(false);
      setFilterPorFecha(false);
    } else if (filterName === "YaPaso") {
      setFilterTodos(false);
      setFilterYaPaso(!filterYaPaso);
      setFilterPorFecha(false);
    } else if (filterName === "PorFecha") {
      setFilterTodos(false);
      setFilterYaPaso(false);
      setFilterPorFecha(!filterPorFecha);
    }
  };

  return (
    <>
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
      <section className="filter-bar">
        <section>Mostrar en lista</section>
        <div>
          Turno
          <input
            type="checkbox"
            checked={filterTodos}
            onChange={() => handleCheckboxChange("Todos")}
          />
        </div>
        <div>
          Ya paso
          <input
            type="checkbox"
            checked={filterYaPaso}
            onChange={() => handleCheckboxChange("YaPaso")}
          />
        </div>
        <div>
          <label>
            Por fecha
            <input
              type="checkbox"
              checked={filterPorFecha}
              onChange={() => handleCheckboxChange("PorFecha")}
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
