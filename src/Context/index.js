/* The above code is creating a React context called `AppContext` and a provider component called
`AppProvider`. The `AppProvider` component is responsible for managing the state and providing it to
the components that are wrapped inside it. */
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import dayjs from 'dayjs';
import axios from 'axios';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [registers, setRegisters] = useState([]);
  useEffect(() => {
    async function loadData() {
      try {
        const response = await axios.get('/api/list');
        setRegisters(response.data);
      } catch (error) {
        console.error('Error:', error);
        throw error;
      }
    }
    loadData();
  }, []);

  const [agendaFilter, setAgendaFilter] = useState({
    planner: true,
    historical: false,
    date: false,
  });
  const [agendaDate, setAgendaDate] = useState(dayjs(new Date()));
  const [formData, setFormData] = useState({
    type: '',
    date: '',
    time: '',
    amount: '',
    description: '',
    wallet: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [customMessage, setCustomMessage] = useState('');
  const [selectedRegisters, setSelectedRegisters] = useState([]);
  const [ledgerFilter, setLedgerFilter] = useState({
    all: true,
    income: true,
    expense: true,
    balance: true,
    date: false,
  });
  const [ledgerDate, setLedgerDate] = useState(dayjs(new Date()));

  const handleFilterChange = (listType, filterName) => {
    if (listType === 'agenda') {
      if (filterName === 'planner') {
        setAgendaFilter({
          historical: false,
          planner: !agendaFilter.planner,
          date: false,
        });
      } else if (filterName === 'historical') {
        setAgendaFilter({
          ...agendaFilter,
          planner: false,
          historical: !agendaFilter.historical,
        });
      } else if (filterName === 'byDate') {
        setAgendaFilter({
          ...agendaFilter,
          planner: false,
          date: !agendaFilter.date,
        });
      }
    }
    if (listType === 'ledger') {
      if (filterName === 'all') {
        setLedgerFilter({
          all: true,
          income: true,
          expense: true,
          balance: true,
          date: false,
        });
      } else if (filterName === 'byDate') {
        setLedgerFilter({ ...ledgerFilter, date: true, all: false });
      } else {
        setLedgerFilter({
          ...ledgerFilter,
          all: false,
          [filterName]: !ledgerFilter[filterName],
        });
      }
    }
  };

  const formatCurrency = (value) => {
    // Verifica si el valor es un número válido
    if (typeof value !== 'number' || isNaN(value)) {
      return 'Invalido';
    }

    // Formatea el valor en pesos colombianos (COP)
    const formattedValue = `$${value
      .toFixed(0)
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
    return formattedValue;
  };

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

  const resetForm = () => {
    setIsEditing(false);
    setFormData({
      type: '',
      date: '',
      time: '',
      amount: '',
      description: '',
      wallet: '',
    });
  };

  const toggleModal = useCallback(
    (edit, register) => {
      setIsEditing(edit);
      if (edit) {
        setFormData(register);
      } else {
        setFormData({
          ...formData,
          date: getCurrentDate(),
          time: getCurrentTime(),
        });
      }
      setShowModal(!showModal);
      setSelectedRegisters([]);
    },
    [showModal, formData]
  );

  const closeModal = () => {
    resetForm();
    setShowModal(false);
  };

  const showCustomNotification = (message) => {
    setCustomMessage(message);
    setShowNotification(true);
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
      '¿Estás seguro de actualizar este registro?'
    );
    if (isConfirmed) {
      try {
        const response = await axios.post(`/api/update/`, formData);
        if (response.status === 201) {
          const updatedRegisterList = await loadRegisterList();
          setRegisters(updatedRegisterList);
        }
        showCustomNotification(response.data.message);
        resetForm();
        setSelectedRegisters([]);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const deleteHandler = async (idArray) => {
    const isConfirmed = window.confirm(
      '¿Estás seguro de eliminar este registro?'
    );
    if (isConfirmed) {
      try {
        // Realizar una solicitud DELETE para eliminar registros
        const response = await axios.delete('/api/delete', {
          data: { idArray }, // Pasar el array de IDs como parte del cuerpo de la solicitud
        });
        if (response.status === 201) {
          // Si la eliminación tiene éxito, cargar la lista actualizada
          const updatedRegisterList = await loadRegisterList();
          setRegisters(updatedRegisterList); // Actualizar la lista en el estado
        }
        showCustomNotification(response.data.message);
        closeModal();
        resetForm();
        setSelectedRegisters([]);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const loadRegisterList = async () => {
    try {
      const response = await axios.get('/api/list');
      return response.data; // Devuelve los datos cargados
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  const duplicateHandler = async (idArray) => {
    const isConfirmed = window.confirm(
      '¿Estás seguro de duplicar este registro?'
    );
    if (isConfirmed) {
      try {
        const response = await axios.post(`/api/duplicate/`, idArray);
        if (response.status === 201) {
          const updatedRegisterList = await loadRegisterList();
          setRegisters(updatedRegisterList);
        }
        showCustomNotification(response.data.message);
        closeModal();
        resetForm();
        setSelectedRegisters([]);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const insertAndReset = async (e) => {
    e.preventDefault();
    const { type, date, time, amount, description, wallet } = formData;
    if (!type || !date || !time || !amount || !description || !wallet) {
      console.error('Por favor, complete todos los campos antes de guardar.');
      return;
    }
    if (!isEditing) {
      try {
        const response = await axios.post('/api/new', formData); // Envía los datos en el cuerpo de la solicitud
        if (response.status === 201) {
          const updatedRegisterList = await loadRegisterList();
          setRegisters(updatedRegisterList);
        }
        showCustomNotification(response.data.message);
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      updateHandler();
    }
    setIsEditing(false);
    closeModal();
  };

  const sharedState = {
    registers,
    selectedRegisters,
    setSelectedRegisters,
    agendaFilter,
    setAgendaFilter,
    ledgerFilter,
    setLedgerFilter,
    agendaDate,
    setAgendaDate,
    ledgerDate,
    setLedgerDate,
    handleFilterChange,
    formatCurrency,
    toggleModal,
    showNotification,
    showCustomNotification,
    customMessage,
    setCustomMessage,
    setShowNotification,
    formData,
    showModal,
    closeModal,
    isEditing,
    handleInputChange,
    updateHandler,
    deleteHandler,
    duplicateHandler,
    insertAndReset,
  };

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
};

// Hook personalizado para consumir el contexto
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext debe utilizarse dentro de un AppProvider');
  }
  return context;
};

export default AppProvider;
