import dayjs from "dayjs";
import { useAppContext } from "../Utils";

const MonthResume = ({ list, resumeMonth, selectedDate }) => {
  const { formatCurrency } = useAppContext();

  const total = {
    income: 0,
    expense: 0,
    balance: 0,
    incomeCounter: 0,
    expenseCounter: 0,
    balanceCounter: 0,
  };

  const filteredByMonth = list.filter((item) => {
    const itemDate = dayjs(item.date);
    const isCorrectDate = itemDate.isSame(selectedDate, "month");
    const isCorrectType = ["Ingreso", "Egreso", "Saldo"].includes(item.type);

    return isCorrectDate && isCorrectType;
  });

  filteredByMonth.forEach((item) => {
    const amount = parseFloat(item.amount);
    if (item.type === "Ingreso") {
      total.income += amount;
      total.incomeCounter++;
    } else if (item.type === "Egreso") {
      total.expense += amount;
      total.expenseCounter++;
    } else if (item.type === "Saldo") {
      total.balance += amount;
      total.balanceCounter++;
    }
  });

  return (
    <>
      <h2>Mes {resumeMonth}:</h2>
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
                <td className="currency">{formatCurrency(total.balance)}</td>
              </tr>
              <tr>
                <td>({total.incomeCounter})</td>
                <td>Ingresos</td>
                <td className="currency">{formatCurrency(total.income)}</td>
              </tr>
              <tr>
                <td>({total.balanceCounter})</td>
                <td>Egresos</td>
                <td className="currency">{formatCurrency(total.expense)}</td>
              </tr>
              <tr>
                <td></td>
                <td>Total</td>
                <td className="currency">{formatCurrency(total.income - total.expense)}</td>
              </tr>
            </tbody>
          </table>
    </>
  );
};

export default MonthResume;
