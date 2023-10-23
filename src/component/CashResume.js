import { useAppContext } from "../Utils";

const MonthResume = ({ list }) => {
  const { formatCurrency } = useAppContext();

  const total = {
    income: 0,
    expense: 0,
    balance: 0,
    incomeCounter: 0,
    expenseCounter: 0,
    balanceCounter: 0,
  };

  list.forEach((item) => {
    const amount = parseFloat(item.amount);
    if (item.type === "Ingreso" && (item.wallet === "Caja" || !item.wallet)) {
      total.income += amount;
      total.incomeCounter++;
    } else if (
      item.type === "Egreso" &&
      (item.wallet === "Caja" || !item.wallet)
    ) {
      total.expense += amount;
      total.expenseCounter++;
    } else if (
      item.type === "Saldo" &&
      (item.wallet === "Caja" || !item.wallet)
    ) {
      total.balance += amount;
      total.balanceCounter++;
    }
  });

  return (
    <>
      <h2>Caja:</h2>
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
            <td>({total.expenseCounter})</td>
            <td>Egresos</td>
            <td className="currency">{formatCurrency(total.expense)}</td>
          </tr>
          <tr>
            <td></td>
            <td>Total</td>
            <td className="currency">
              {formatCurrency(total.income - total.expense)}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default MonthResume;
