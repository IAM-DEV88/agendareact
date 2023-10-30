import dayjs from "dayjs";
import { useAppContext } from "../../Context";

const DaySummary = ({ registers, summaryDay, selectedDate }) => {
  const context = useAppContext()

  const total = {
    dayIncome: 0,
    dayExpense: 0,
    dayBalance: 0,
    incomeCounter: 0,
    expenseCounter: 0,
    balanceCounter: 0,
  };

  const filteredBySelectedDay = registers.filter((item) => {
    const itemDate = dayjs(item.date);
    const isCorrectDate = itemDate.isSame(selectedDate, "day");
    const isCorrectType = ["Income", "Expense", "Balance"].includes(item.type);

    return isCorrectDate && isCorrectType;
  });

  filteredBySelectedDay.forEach((item) => {
    const amount = parseFloat(item.amount);
    if (item.type === "Income") {
      total.dayIncome += amount;
      total.incomeCounter++;
    } else if (item.type === "Expense") {
      total.dayExpense += amount;
      total.expenseCounter++;
    } else if (item.type === "Balance") {
      total.dayBalance += amount;
      total.balanceCounter++;
    }
  });

  return (
    <>
      <h2>Day {summaryDay}:</h2>
      <table>
        <tbody>
          <tr>
            <th>Registers</th>
            <th>Type</th>
            <th>Total</th>
          </tr>
          <tr>
            <td>({total.balanceCounter})</td>
            <td>Balances</td>
            <td className="currency">{context.formatCurrency(total.dayBalance)}</td>
          </tr>
          <tr>
            <td>({total.incomeCounter})</td>
            <td>Incomes</td>
            <td className="currency">{context.formatCurrency(total.dayIncome)}</td>
          </tr>
          <tr>
            <td>({total.expenseCounter})</td>
            <td>Expenses</td>
            <td className="currency">{context.formatCurrency(total.dayExpense)}</td>
          </tr>
          <tr>
            <td></td>
            <td>Total</td>
            <td className="currency">
              {context.formatCurrency(total.dayIncome - total.dayExpense)}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default DaySummary;
