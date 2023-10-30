import Layout from "../../Components/Layout";
import LedgerFilterBar from "../../Components/LedgerFilterBar";
import LedgerDataGrid from "../../Components/LedgerDataGrid";
import LedgerFooter from "../../Components/LedgerFooter";
import SummaryModal from "../../Components/SummaryModal";
import { useAppContext } from "../../Context";
import { useState } from "react";

function Ledger() {
  const context = useAppContext()

    const [showSummaryModal, setShowSummaryModal] = useState(false);

    const toggleSummaryModal = () => {
      setShowSummaryModal(!showSummaryModal);
    };

    const closeSummaryModal = () => {
      setShowSummaryModal(false);
    };

  const filteredRegisters = context.registers.filter((item) => {
    const itemDateTime = new Date(item.date + " " + item.time); // Combina fecha y hora en un solo objeto Date
    if (context.ledgerFilter.all && (context.ledgerFilter.income || context.ledgerFilter.expense || context.ledgerFilter.balance)) {
      return (
        (item.type !== "Appointment") &&
        ((context.ledgerFilter.income && item.type === "Income") ||
        (context.ledgerFilter.expense && item.type === "Expense") ||
        (context.ledgerFilter.balance && item.type === "Balance"))
      );
    }
    if (context.ledgerFilter.date && (context.ledgerFilter.income || context.ledgerFilter.expense || context.ledgerFilter.balance)) {
      return (
        context.ledgerFilter.date &&
        itemDateTime.getDate() === context.ledgerDate.$D &&
        itemDateTime.getMonth() === context.ledgerDate.$M &&
        itemDateTime.getFullYear() === context.ledgerDate.$y &&
        item.type !== "Appointment" &&
        ((context.ledgerFilter.income && item.type === "Income") ||
          (context.ledgerFilter.expense && item.type === "Expense") ||
          (context.ledgerFilter.balance && item.type === "Balance"))
      );
    }else{
      return (
        (item.type !== "Appointment") &&
        ((context.ledgerFilter.income && item.type === "Income") ||
        (context.ledgerFilter.expense && item.type === "Expense") ||
        (context.ledgerFilter.balance && item.type === "Balance"))
      );
    }
  });

    return (
      <Layout>
      <LedgerFilterBar />
      <LedgerDataGrid filteredRegisters={filteredRegisters} />  
      <LedgerFooter toggleSummaryModal={toggleSummaryModal}  />
      <SummaryModal
          summaryDay={context.ledgerDate.format("D dddd", { locale: "es" })}
          registers={context.registers}
          selectedDate={context.ledgerDate}
          summaryMonth={context.ledgerDate.format("MMMM", { locale: "es" })}
          showSummaryModal={showSummaryModal}
          closeSummaryModal={closeSummaryModal}
        />
    </Layout>
  );
}

export default Ledger;
