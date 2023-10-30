/**
 * The `AgendaDataGrid` component is a React component that displays a data grid with agenda
 * information, including time left, description, time, date, and amount.
 * @returns The component `AgendaDataGrid` is being returned.
 */
import { useAppContext } from '../../Context';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import "./AgendaDataGrid.css"

const AgendaDataGrid = ({ filteredRegisters }) => {
  const context = useAppContext();

  const gridColumns = [
    { field: 'timeLeft', headerName: 'Agenda', maxWidth: 75 },
    { field: 'description', headerName: 'Description',flex: 1, minWidth:175 },
    { field: 'time', headerName: 'Time', maxWidth: 55 },
    { field: 'date', headerName: 'Date', maxWidth: 55 },
    {
      field: 'amount',
      headerName: 'Amount',
      minWidth: 120,
      valueGetter: (params) =>
        context.formatCurrency(parseInt(params.value, 10)),
    },
  ];
  const [gridRows, setGridRows] = useState([]);

  const formatTimeLeft = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const hours = Math.floor(minutes / 60);
    const minutesLeft = minutes % 60;
    const hourSufix = hours === 1 ? 'hour' : 'hours';
    const minuteSufix = minutesLeft === 1 ? 'minute' : 'minutes';
    let timeLeft = '';
    if (hours > 0) {
      timeLeft += `${hours} ${hourSufix}`;
    }
    if (minutesLeft > 0) {
      timeLeft += ` ${minutesLeft} ${minuteSufix}`;
    }
    return timeLeft.trim();
  };

  useEffect(() => {
    const updateTimeLeft = () => {
      const now = new Date();
      const updatedRows = filteredRegisters
        .map((register) => {
          const registerDateTime = new Date(
            register.date + ' ' + register.time
          );
          const timeDifference = registerDateTime - now;
          let registerStatus = register.type!== 'Appointment' ? 'Saved as ' + register.type : 'Status pending'
          let timeLeft =
            timeDifference <= 0
              ? registerStatus
              : formatTimeLeft(timeDifference);

          if (timeDifference > 0 && timeDifference <= 60000) {
            // Verifica si el cliente ya ha sido notificado
            if (!register.upcomingCliet) {
              context.showCustomNotification('Upcoming client', register);
              // Agrega el ID del cliente a la lista de notificados
              register.upcomingCliet = true;
            }
            timeLeft = 'Upcoming client';
          }

          if (timeDifference > 3000000 && timeDifference <= 3600000) {
            // Verifica si el cliente ya ha sido notificado
            if (!register.callConfirmation) {
              context.showCustomNotification(
                'Good time to call',
                register
              );
              // Agrega el ID del cliente a la lista de notificados
              register.callConfirmation = true;
            }
            timeLeft = 'Call confirmation';
          }

          return {
            id: register._id,
            date: register.date,
            description: register.description,
            time: register.time,
            amount: register.amount,
            type: register.type,
            wallet: register.wallet,
            timeLeft: timeLeft,
          };
        })
        .sort((a, b) => {
          // Ordenar por fecha y hora
          const initialDate = new Date(`${a.date} ${a.time}`);
          const finalDate = new Date(`${b.date} ${b.time}`);
          return initialDate - finalDate;
        });

      setGridRows(updatedRows);
    };

    // Actualizar los tiempos restantes cada segundo
    const timer = setInterval(updateTimeLeft, 1000);

    // Llamar a la función de actualización inicial
    updateTimeLeft();

    // Limpiar el temporizador al desmontar el componente
    return () => {
      clearInterval(timer);
    };
  }, [filteredRegisters, context]);

  return (
    <>
      <section className='list-container'>
        <DataGrid
          {...filteredRegisters}
          initialState={{
            ...filteredRegisters,
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[10, 20, 30]}
          rows={gridRows}
          columns={gridColumns}
          onRowClick={(params) => context.toggleModal(true, params.row)}
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={(ids) => context.setSelectedRegisters(ids)}
          getRowClassName={(params) => {
            const registerType = params.row.type;
            let style = registerType;
            return style;
          }}
        />
      </section>
    </>
  );
};

export default AgendaDataGrid;
