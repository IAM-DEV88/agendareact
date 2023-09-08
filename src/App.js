import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Menu from "./component/Menu";
import { createBrowserRouter, RouterProvider, BrowserRouter as Router } from "react-router-dom";
import Agenda from "./routes/agenda";
import Archivo from "./routes/archivo";
import db from "./component/Database";
import React, { useState, useEffect, useCallback } from "react";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import "./App.css";


function App() {

  const [dbList, setDbList] = useState([]);
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
  const [showResumeModal, setShowResumeModal] = useState(false);
  
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
    });
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

  const toggleResumeModal = () => {
      setShowResumeModal(!showResumeModal);
 };

 const closeResumeModal = () => {
  setShowResumeModal(false);
};

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
      const existingRecord = dbList.find((item) => item.id === id);

      if (existingRecord) {
        const duplicatedRecord = {
          ...existingRecord,
          id: newId,
        };

        setDbList([...dbList, duplicatedRecord]);

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
      setDbList([...dbList, formData]);

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
        const existingRecord = dbList.find((item) => item.id === id);
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
      setDbList([...dbList, ...filteredNewRecords]);

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
        const remainingRecords = dbList.filter(
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

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Agenda
        list={dbList}
        deleteHandler={deleteHandler}
        toggleModal={toggleModal}
        selectedRecords={selectedRecords}
        setSelectedRecords={setSelectedRecords}
        showNotification={showNotification}
        showCustomNotification={showCustomNotification}
        customMessage={customMessage}
        setCustomMessage={setCustomMessage}
        setShowNotification={setShowNotification}
        formData={formData}
        showModal={showModal}
        closeModal={closeModal}
        isEditing={isEditing}
        deleteSelectedRecords={deleteSelectedRecords}
        duplicateSelectedRecords={duplicateSelectedRecords}
        insertAndReset={insertAndReset}
        duplicateHandler={duplicateHandler}
        handleInputChange={handleInputChange}
        AddCircleOutlineIcon={AddCircleOutlineIcon}
        RemoveCircleOutlineIcon={RemoveCircleOutlineIcon}
        ContentCopyIcon={ContentCopyIcon}
        QueryStatsIcon={QueryStatsIcon}
        />
      ),
    },
    {
      path: "/archivo",
      element: <Archivo 
      list={dbList}
      deleteHandler={deleteHandler}
      toggleModal={toggleModal}
      selectedRecords={selectedRecords}
      setSelectedRecords={setSelectedRecords}
      showNotification={showNotification}
      showCustomNotification={showCustomNotification}
      customMessage={customMessage}
      setCustomMessage={setCustomMessage}
      setShowNotification={setShowNotification}
      formData={formData}
      showModal={showModal}
      closeModal={closeModal}
      isEditing={isEditing}
      deleteSelectedRecords={deleteSelectedRecords}
      duplicateSelectedRecords={duplicateSelectedRecords}
      insertAndReset={insertAndReset}
      duplicateHandler={duplicateHandler}
      handleInputChange={handleInputChange}
      AddCircleOutlineIcon={AddCircleOutlineIcon}
      RemoveCircleOutlineIcon={RemoveCircleOutlineIcon}
      ContentCopyIcon={ContentCopyIcon}
      QueryStatsIcon={QueryStatsIcon}
      toggleResumeModal={toggleResumeModal}
      showResumeModal={showResumeModal}
        closeResumeModal={closeResumeModal} 
      />,
    },
  ]);

  return (
    <>
    <Router>
      <Menu />
    </Router>
      <RouterProvider router={router} />
    </>
  );
}
export default App;
