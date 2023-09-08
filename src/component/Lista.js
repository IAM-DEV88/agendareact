import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

const Lista = ({ list, gridColumns, toggleModal, showCustomNotification, setSelectedRecords }) => {

  const [gridRows, setGridRows] = useState([]);

  const formatTiempoRestante = (ms) => {
    const minutos = Math.floor(ms / 60000);
    const horas = Math.floor(minutos / 60);
    const minutosRestantes = minutos % 60;
    const sufijoHoras = horas === 1 ? "hora" : "horas";
    const sufijoMinutos = minutosRestantes === 1 ? "minuto" : "minutos";
    let tiempoRestante = "";
    if (horas > 0) {
      tiempoRestante += `${horas} ${sufijoHoras}`;
    }
    if (minutosRestantes > 0) {
      tiempoRestante += ` ${minutosRestantes} ${sufijoMinutos}`;
    }
    return tiempoRestante.trim();
  };

  useEffect(() => {
    const updateTiempoRestante = () => {
      const ahora = new Date();
      const updatedRows = list.map((registro) => {
        const fechaHoraRegistro = new Date(
          registro.fecha + " " + registro.hora
        );
        const diferenciaTiempo = fechaHoraRegistro - ahora;
        let tiempoRestante =
          diferenciaTiempo <= 0
            ? "Ya pasó"
            : formatTiempoRestante(diferenciaTiempo);

        if (diferenciaTiempo > 0 && diferenciaTiempo <= 60000) {
          // Verifica si el cliente ya ha sido notificado
          if (!registro.notified) {
            showCustomNotification("Cliente por llegar", registro);
            // Agrega el ID del cliente a la lista de notificados
            registro.notified = true;
          }
          tiempoRestante = "Cliente por llegar";
        }

        if (diferenciaTiempo > 3000000 && diferenciaTiempo <= 3600000) {
          // Verifica si el cliente ya ha sido notificado
          if (!registro.notified) {
            showCustomNotification("Es buen momento para llamar", registro);
            // Agrega el ID del cliente a la lista de notificados
            registro.notified = true;
          }
          tiempoRestante = "Llamar cliente";
        }

        return {
          id: registro.id,
          fecha: registro.fecha,
          descripcion: registro.descripcion,
          hora: registro.hora,
          monto: registro.monto,
          tipo: registro.tipo,
          tiempoRestante: tiempoRestante,
        };
      }).sort((a, b) => {
        // Ordenar por fecha y hora
        const fechaA = new Date(`${a.fecha} ${a.hora}`);
        const fechaB = new Date(`${b.fecha} ${b.hora}`);
        return fechaA - fechaB;
      });

      setGridRows(updatedRows);
    };

    // Actualizar los tiempos restantes cada minuto
    const timer = setInterval(updateTiempoRestante, 1000);

    // Llamar a la función de actualización inicial
    updateTiempoRestante();

    // Limpiar el temporizador al desmontar el componente
    return () => {
      clearInterval(timer);
    };
  }, [list, showCustomNotification]);

  const onRowsSelectionHandler = (ids) => {
    setSelectedRecords(ids)
    console.log(ids);
  }


  return (
    <>
      <div style={{ height: "60vh", width: "100%" }}>
        <DataGrid
          labelRowsPerPage={"Filas por pagina"}
          rows={gridRows}
          columns={gridColumns}
          onRowClick={(params) => toggleModal(true, params.row)}
          checkboxSelection
          disableRowSelectionOnClick
          {...list}
          onRowSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
        />
      </div>
    </>
  );
};

export default Lista;
