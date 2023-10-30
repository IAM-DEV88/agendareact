import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

// Creamos un contexto
const AppContext = createContext();

// Provider personalizado que contendrá la lógica y los datos compartidos
export const AppProvider = ({ children }) => {
  const [list, setDbList] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [customMessage, setCustomMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    type: "",
    date: "",
    time: "",
    amount: "",
    description: "",
    wallet:"",
  });
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
      async function loadData() {
        try {
          const response = await axios.get("/api/list");
          setDbList(response.data);
        } catch (error) {
          console.error("Error:", error);
          throw error;
        }
      }
      loadData();
  }, []);
  

  const toggleModal = useCallback(
    (edit, register) => {
      setIsEditing(edit);
      if (edit) {
        setFormData(register);
      }else{
        setFormData({
          ...formData,
          date: getCurrentDate(),
          time: getCurrentTime(),
        });
      }
      setShowModal(!showModal);
      setSelectedRecords([]);
    },
    [showModal, formData]
  );

  const showCustomNotification = (message, formData) => {
    setCustomMessage(message);
    setFormData(formData);
    setShowNotification(true);
  };

  const resetForm = () => {
    setIsEditing(false);
    setFormData({
      type: "",
      date: "",
      time: "",
      amount: "",
      description: "",
      wallet: "",
    });
  };

  const closeModal = () => {
    resetForm();
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const updateHandler = async () => {
    const isConfirmed = window.confirm(
      "¿Estás seguro de actualizar este registro?"
    );
    if (isConfirmed) {
      try {
        const response = await axios.post(`/api/update/`, formData);
        if (response.status === 201) {
          const updatedRegisterList = await loadRegisterList();
          setDbList(updatedRegisterList);
        }
        showCustomNotification(response.data.message, formData);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    setSelectedRecords([]);
  };

  const deleteHandler = async (idArray) => {
    console.log(idArray);
    const isConfirmed = window.confirm(
      "¿Estás seguro de eliminar este registro?"
    );
    if (isConfirmed) {
      try {
        // Realizar una solicitud DELETE para eliminar registros
        const response = await axios.delete("/api/delete", {
          data: { idArray }, // Pasar el array de IDs como parte del cuerpo de la solicitud
        });
        if (response.status === 201) {
          // Si la eliminación tiene éxito, cargar la lista actualizada
          const updatedRegisterList = await loadRegisterList();
          setDbList(updatedRegisterList); // Actualizar la lista en el estado
        }
        showCustomNotification(response.data.message);
        closeModal();
        resetForm();
        setSelectedRecords([]);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const loadRegisterList = async () => {
    try {
      const response = await axios.get("/api/list");
      return response.data; // Devuelve los datos cargados
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  const duplicateHandler = async (idArray) => {
    const isConfirmed = window.confirm(
      "¿Estás seguro de duplicar este registro?"
    );
    if (isConfirmed) {
      try {
        const response = await axios.post(`/api/duplicate/`, idArray);
        if (response.status === 201) {
          const updatedRegisterList = await loadRegisterList();
          setDbList(updatedRegisterList);
        }
        showCustomNotification(response.data.message);
        closeModal();
        resetForm();
        setSelectedRecords([]);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const insertAndReset = async (e) => {
    e.preventDefault();
    const { type, date, time, amount, description, wallet } = formData;
    if (!type || !date || !time || !amount || !description || !wallet ) {
      console.error("Por favor, complete todos los campos antes de guardar.");
      return;
    }
    if (!isEditing) {
      try {
        const { id, ...formDataWithoutId } = formData;
        const response = await axios.post("/api/new", formDataWithoutId); // Envía los datos en el cuerpo de la solicitud
        if (response.status === 201) {
          const updatedRegisterList = await loadRegisterList();
          setDbList(updatedRegisterList);
        }
        showCustomNotification(response.data.message);
        resetForm();
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      updateHandler();
    }
    setIsEditing(false);
    closeModal();
  };

  const formatCurrency = useMemo(() => (value) => {
    // Verifica si el valor es un número válido
    if (typeof value !== "number" || isNaN(value)) {
      return "Invalido";
    }

    // Formatea el valor en pesos colombianos (COP)
    const formattedValue = `$${value
      .toFixed(0)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
    return formattedValue;
  }, []);

  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const sharedState = {
    getCurrentDate,
getCurrentTime,
    list,
    formatCurrency,
    deleteHandler,
    toggleModal,
    selectedRecords,
    setSelectedRecords,
    showNotification,
    showCustomNotification,
    customMessage,
    setCustomMessage,
    setShowNotification,
    formData,
    showModal,
    closeModal,
    isEditing,
    insertAndReset,
    duplicateHandler,
    handleInputChange,
    AddCircleOutlineIcon,
    RemoveCircleOutlineIcon,
    SaveIcon,
    CloseIcon,
    ContentCopyIcon,
    QueryStatsIcon,
  };

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
};

// Hook personalizado para consumir el contexto
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext debe utilizarse dentro de un AppProvider");
  }
  return context;
};

export default AppProvider;
