import dayjs from "dayjs";
import { useAppContext } from "../Utils";

const DayResume = ({ list, resumeDay, selectedDate }) => {
  const { formatCurrency } = useAppContext();

  const total = {
    dayIncome: 0,
    dayExpense: 0,
    dayBalance: 0,
    incomeCounter: 0,
    expenseCounter: 0,
    balanceCounter: 0,
  };

  const filteredBySelectedDay = list.filter((item) => {
    const itemDate = dayjs(item.date);
    const isCorrectDate = itemDate.isSame(selectedDate, "day");
    const isCorrectType = ["Ingreso", "Egreso", "Saldo"].includes(item.type);

    return isCorrectDate && isCorrectType;
  });

  filteredBySelectedDay.forEach((item) => {
    const monto = parseFloat(item.amount);
    if (item.type === "Ingreso") {
      total.dayIncome += monto;
      total.incomeCounter++;
    } else if (item.type === "Egreso") {
      total.dayExpense += monto;
      total.expenseCounter++;
    } else if (item.type === "Saldo") {
      total.dayBalance += monto;
      total.balanceCounter++;
    }
  });

  return (
    <>
      <h2>Día {resumeDay}:</h2>
      <table>
        <tbody>
          <tr>
            <th>Cantidad</th>
            <th>Tipo</th>
            <th>Total</th>
          </tr>
          <tr>
            <td>({total.balanceCounter})</td>
            <td>Saldos</td>
            <td className="currency">{formatCurrency(total.dayBalance)}</td>
          </tr>
          <tr>
            <td>({total.incomeCounter})</td>
            <td>Ingresos</td>
            <td className="currency">{formatCurrency(total.dayIncome)}</td>
          </tr>
          <tr>
            <td>({total.expenseCounter})</td>
            <td>Egresos</td>
            <td className="currency">{formatCurrency(total.dayExpense)}</td>
          </tr>
          <tr>
            <td></td>
            <td>Total</td>
            <td className="currency">
              {formatCurrency(total.dayIncome - total.dayExpense)}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default DayResume;
