import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useAppContext } from "../../Context";

const DateSelector = ({ listType }) => {
  const context = useAppContext();
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={listType === "agenda" ? context.agendaDate : context.ledgerDate}
        onChange={(value) => {
          if (listType === "agenda") {
            context.setAgendaDate(value);
          } else {
            context.setLedgerDate(value);
          }
        }}
      />
    </LocalizationProvider>
  );
};

export default DateSelector;
