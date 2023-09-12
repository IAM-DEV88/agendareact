import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import dayjs from "dayjs";
import Lista from "../component/Lista";
import AppButton from "../component/AppButton";
import RegistroModal from "../component/RegistroModal"; // Importa el nuevo componente
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
    deleteSelectedRecords,
    duplicateSelectedRecords,
    AddCircleOutlineIcon,
    RemoveCircleOutlineIcon,
    ContentCopyIcon,
  } = useAppContext();

  const [selectedDate, setSelectedDate] = useState(dayjs(new Date()));

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

  const filteredList = list.filter((item) => {
    const itemDate = new Date(item.fecha);
    return (
      itemDate.getDate() + 1 === selectedDate.$D &&
      itemDate.getMonth() === selectedDate.$M &&
      itemDate.getFullYear() === selectedDate.$y &&
      item.tipo === "Turno"
    );
  });

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
        list={filteredList}
        gridColumns={[
          { field: "tiempoRestante", headerName: "Agenda", width: 150 },
          { field: "descripcion", headerName: "Descripción", width: 150 },
          { field: "hora", headerName: "Hora", width: 110 },
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
