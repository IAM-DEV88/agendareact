import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import db from "./component/Database";
import { v4 as uuidv4 } from "uuid";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import QueryStatsIcon from "@mui/icons-material/QueryStats";

// Creamos un contexto
const AppContext = createContext();

// Provider personalizado que contendrá la lógica y los datos compartidos
export const AppProvider = ({ children }) => {
  const [list, setDbList] = useState([]);
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [customMessage, setCustomMessage] = useState("");
  const [formData, setFormData] = useState({
    id: 0,
    tipo: "",
    fecha: "",
    hora: "",
    monto: 0,
    descripcion: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    db.registros.toArray().then((data) => {
      if (data.length === 0) {
        db.registros.bulkAdd([]).then(() => {
          setDbList([]);
        });
      } else {
        setDbList(data);
      }
    }, []);
  }, []);

  const deleteHandler = (id) => {
    const isConfirmed = window.confirm(
      "¿Estás seguro de eliminar este registro?"
    );

    if (isConfirmed) {
      db.registros
        .where("id")
        .equals(id)
        .delete()
        .then(() => {
          setDbList((prevList) => prevList.filter((item) => item.id !== id));
        });
      closeModal();
    }
  };

  const toggleModal = useCallback(
    (edit, register) => {
      setIsEditing(edit);
      if (edit) {
        setFormData(register);
      } else {
        setFormData((prevData) => ({
          ...prevData,
          id: uuidv4(),
        }));
      }
      setShowModal(!showModal);

      // Deseleccionar todos los registros cuando se abre el modal
      setSelectedRecords([]);
    },
    [showModal]
  );

  const showCustomNotification = (message, formData) => {
    setCustomMessage(message);
    setFormData(formData);
    setShowNotification(true);
  };

  const resetForm = () => {
    setIsEditing(false);
    setFormData({
      id: 0,
      tipo: "",
      fecha: "",
      hora: "",
      descripcion: "",
      monto: 0,
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

  const duplicateHandler = (id) => {
    const isConfirmed = window.confirm(
      "¿Estás seguro de duplicar este registro?"
    );

    if (isConfirmed) {
      const newId = uuidv4();
      const existingRecord = list.find((item) => item.id === id);

      if (existingRecord) {
        const duplicatedRecord = {
          ...existingRecord,
          id: newId,
        };

        setDbList([...list, duplicatedRecord]);

        db.registros
          .add(duplicatedRecord)
          .then(() => {
            // Manejar éxito
          })
          .catch((error) => {
            // Manejar errores si es necesario
          });
      }
      closeModal();
    }
  };

  const updateHandler = () => {
    const isConfirmed = window.confirm(
      "¿Estás seguro de actualizar este registro?"
    );

    if (isConfirmed) {
      db.registros
        .where("id")
        .equals(formData.id)
        .modify({
          tipo: formData.tipo,
          fecha: formData.fecha,
          hora: formData.hora,
          descripcion: formData.descripcion,
          monto: formData.monto,
        })
        .then(() => {
          setDbList((prevList) =>
            prevList.map((item) =>
              item.id === formData.id
                ? {
                    ...item,
                    tipo: formData.tipo,
                    fecha: formData.fecha,
                    hora: formData.hora,
                    descripcion: formData.descripcion,
                    monto: formData.monto,
                  }
                : item
            )
          );
        });
    }
  };

  const insertAndReset = (e) => {
    e.preventDefault();

    const { tipo, fecha, hora, monto, descripcion } = formData;
    if (!tipo || !fecha || !hora || !monto || !descripcion) {
      console.error("Por favor, complete todos los campos antes de guardar.");
      return;
    }

    if (!isEditing) {
      setDbList([...list, formData]);

      db.registros
        .add(formData)
        .then(() => {
          // Manejar éxito
        })
        .catch((error) => {
          // Manejar errores si es necesario
        });
    } else {
      updateHandler();
    }
    setIsEditing(false);
    closeModal();
    // Deseleccionar todos los registros después de guardar o actualizar
    setSelectedRecords([]);
  };

  const duplicateSelectedRecords = async () => {
    const isConfirmed = window.confirm(
      `¿Estás seguro de duplicar ${selectedRecords.length} registros?`
    );

    if (isConfirmed) {
      const duplicatedRecords = selectedRecords.map((id) => {
        const existingRecord = list.find((item) => item.id === id);
        if (existingRecord) {
          return {
            ...existingRecord,
            id: uuidv4(),
          };
        }
        return null;
      });

      const filteredNewRecords = duplicatedRecords.filter(
        (record) => record !== null
      );

      // Ahora, guardamos los registros duplicados en la base de datos
      for (const record of filteredNewRecords) {
        try {
          await db.registros.add(record);
          console.log(record);
        } catch (error) {
          // Manejar errores si es necesario
          console.error("Error al guardar el registro:", error);
        }
      }

      // Actualizamos el estado con los registros duplicados
      setDbList([...list, ...filteredNewRecords]);

      // Cerramos el modal u realizamos otras acciones necesarias
      closeModal();
    }
  };

  const deleteSelectedRecords = async () => {
    const isConfirmed = window.confirm(
      `¿Estás seguro de eliminar ${selectedRecords.length} registros?`
    );

    if (isConfirmed) {
      try {
        const remainingRecords = list.filter(
          (item) => !selectedRecords.includes(item.id)
        );

        await db.registros.bulkDelete(selectedRecords);

        setDbList(remainingRecords);
      } catch (error) {
        // Manejar errores si es necesario
        console.error("Error al eliminar los registros:", error);
      }

      closeModal();
    }
  };

  const sharedState = {
    list,
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
    deleteSelectedRecords,
    duplicateSelectedRecords,
    insertAndReset,
    duplicateHandler,
    handleInputChange,
    AddCircleOutlineIcon,
    RemoveCircleOutlineIcon,
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
