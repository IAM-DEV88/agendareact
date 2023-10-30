import dayjs from "dayjs";
import { useAppContext } from "../../Context";

const MonthSummary = ({ registers, summaryMonth, selectedDate }) => {
  const context = useAppContext()

  const total = {
    income: 0,
    expense: 0,
    balance: 0,
    incomeCounter: 0,
    expenseCounter: 0,
    balanceCounter: 0,
  };

  const filteredByMonth = registers.filter((item) => {
    const itemDate = dayjs(item.date);
    const isCorrectDate = itemDate.isSame(selectedDate, "month");
    const isCorrectType = ["Income", "Expense", "Balance"].includes(item.type);

    return isCorrectDate && isCorrectType;
  });

  filteredByMonth.forEach((item) => {
    const amount = parseFloat(item.amount);
    if (item.type === "Income") {
      total.income += amount;
      total.incomeCounter++;
    } else if (item.type === "Expense") {
      total.expense += amount;
      total.expenseCounter++;
    } else if (item.type === "Balance") {
      total.balance += amount;
      total.balanceCounter++;
    }
  });

  return (
    <>
      <h2>Month {summaryMonth}:</h2>
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
                <td className="currency">{context.formatCurrency(total.balance)}</td>
              </tr>
              <tr>
                <td>({total.incomeCounter})</td>
                <td>Incomes</td>
                <td className="currency">{context.formatCurrency(total.income)}</td>
              </tr>
              <tr>
                <td>({total.balanceCounter})</td>
                <td>Expenses</td>
                <td className="currency">{context.formatCurrency(total.expense)}</td>
              </tr>
              <tr>
                <td></td>
                <td>Total</td>
                <td className="currency">{context.formatCurrency(total.income - total.expense)}</td>
              </tr>
            </tbody>
          </table>
    </>
  );
};

export default MonthSummary;
