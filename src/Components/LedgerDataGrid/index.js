import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useAppContext } from "../../Context";

const LedgerDataGrid = ({ filteredRegisters }) => {
  const context = useAppContext();

  const gridColumns = [
    { field: "description", headerName: "Description", flex: 1, minWidth: 175 },
    {
      field: "amount",
      headerName: "Amount",
      width: 120,
      valueGetter: (params) =>
        context.formatCurrency(parseInt(params.value, 10)),
    },
    { field: "date", headerName: "Date", maxWidth: 55, minWidth: 55 },
    { field: "wallet", headerName: "Wallet", width: 120 },
  ];

  const [gridRows, setGridRows] = useState([]);

  useEffect(() => {
    const updatedRows = filteredRegisters
      .map((register) => {
        return {
          id: register._id,
          date: register.date,
          description: register.description,
          time: register.time,
          amount: register.amount,
          type: register.type,
          wallet: register.wallet,
        };
      })
      .sort((a, b) => {
        // Ordenar por fecha y hora
        const initialDate = new Date(`${a.date} ${a.time}`);
        const finalDate = new Date(`${b.date} ${b.time}`);
        return finalDate - initialDate;
      });
    setGridRows(updatedRows);
  }, [setGridRows, filteredRegisters]);

  return (
    <>
      <section className="list-container">
        <DataGrid
          {...filteredRegisters}
          initialState={{
            ...filteredRegisters.initialState,
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
            let styleClass = registerType;
            return styleClass;
          }}
        />
      </section>
    </>
  );
};

export default LedgerDataGrid;
