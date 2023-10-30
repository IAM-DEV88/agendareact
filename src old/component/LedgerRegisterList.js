import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useAppContext } from "../Utils";

const CountableRegisterList = ({ list, gridColumns }) => {
  const { toggleModal, setSelectedRecords } =
    useAppContext();

  const [gridRows, setGridRows] = useState([]);

  useEffect(() => {
      const updatedRows = list
        .map((registro) => {
          return {
            id: registro._id,
            date: registro.date,
            description: registro.description,
            time: registro.time,
            amount: registro.amount,
            type: registro.type,
            wallet: registro.wallet,
          };
        })
        .sort((a, b) => {
          // Ordenar por fecha y hora
          const fechaA = new Date(`${a.date} ${a.time}`);
          const fechaB = new Date(`${b.date} ${b.time}`);
          return fechaB - fechaA;
        });
      setGridRows(updatedRows);
    },[setGridRows, list]);


  const onRowsSelectionHandler = (ids) => {
    setSelectedRecords(ids);
  };

  return (
    <>
      <div className="list-container">
        <DataGrid
        {...list}
        initialState={{
          ...list.initialState,
          pagination: { paginationModel: { pageSize: 8 } },
        }}
          pageSizeOptions={[8, 16, 24]}
          rows={gridRows}
          columns={gridColumns}
          onRowClick={(params) => toggleModal(true, params.row)}
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
          getRowClassName={(params) => {
            const tipoRegistro = params.row.type;
            let claseEstilo = tipoRegistro;
            return claseEstilo;
          }}
        />
      </div>
    </>
  );
};

export default CountableRegisterList;
