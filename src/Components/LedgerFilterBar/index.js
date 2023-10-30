import DateSelector from "../DateSelector"
import { useAppContext } from "../../Context";

const LedgerFilterBar = () => {
  const context = useAppContext()
  return (
    <section className="filter-bar">
          <section>Show in list</section>
          <div>
            All
            <input
              type="checkbox"
              checked={context.ledgerFilter.all}
              onChange={() => context.handleFilterChange("ledger","all")}
            />
          </div>
          <div>
            Income
            <input
              type="checkbox"
              checked={context.ledgerFilter.income}
              onChange={() => context.handleFilterChange("ledger","income")}
            />
          </div>
          <div>
            Expense
            <input
              type="checkbox"
              checked={context.ledgerFilter.expense}
              onChange={() => context.handleFilterChange("ledger","expense")}
            />
          </div>
          <div>
            Balance
            <input
              type="checkbox"
              checked={context.ledgerFilter.balance}
              onChange={() => context.handleFilterChange("ledger","balance")}
            />
          </div>
          <div>
            <label>
              By date
              <input
                type="checkbox"
                checked={context.ledgerFilter.date}
                onChange={() => context.handleFilterChange("ledger","byDate")}
              />
            </label>
            <DateSelector listType="ledger"/>
          </div>
        </section>
  );
};

export default LedgerFilterBar;

