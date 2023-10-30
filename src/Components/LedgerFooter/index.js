import AppButton from "../AppButton";
import { useAppContext } from "../../Context";

const LedgerFooter = ({ toggleSummaryModal }) => {
  const context = useAppContext();
  return (
    <section className="footer-container">
      {context.selectedRegisters.length > 0 && (
        <>
          <AppButton
            classes="app-button"
            type="button"
            label="Duplicate"
            onClick={() => context.duplicateHandler(context.selectedRegisters)}
            icon="ContentCopy"
          />
          <AppButton
            classes="app-button"
            type="button"
            label="Delete"
            onClick={() => context.deleteHandler(context.selectedRegisters)}
            icon="RemoveCircleOutline"
          />
        </>
      )}
      <AppButton
        classes="app-button"
        type="button"
        label="Summary"
        onClick={() => toggleSummaryModal()}
        icon="QueryStats"
      />
      <AppButton
        classes="app-button"
        type="button"
        label="New"
        onClick={() => context.toggleModal(false)}
        icon="AddCircleOutline"
      />
    </section>
  );
};

export default LedgerFooter;
