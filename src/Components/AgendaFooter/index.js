/**
 * The `AgendaFooter` component renders a footer container with buttons for duplicating, deleting, and
 * creating new items, based on the selected registers in the app context.
 * @returns The AgendaFooter component is returning a JSX element, specifically a div element with a
 * className of 'footer-container'. Inside the div, there are conditional rendering of AppButton
 * components based on the length of the selectedRegisters array in the context. If the length is
 * greater than 0, two AppButton components with labels 'Duplicate' and 'Delete' are rendered.
 */
import AppButton from '../../Components/AppButton';
import { useAppContext } from '../../Context';

const AgendaFooter = () => {
  const context = useAppContext();
  return (
    <section className='footer-container'>
      {context.selectedRegisters.length > 0 && (
        <>
          <AppButton
            classes='app-button'
            type='button'
            label='Duplicate'
            onClick={() => context.duplicateHandler(context.selectedRegisters)}
            icon='ContentCopy'
          />
          <AppButton
            classes='app-button'
            type='button'
            label='Delete'
            onClick={() => context.deleteHandler(context.selectedRegisters)}
            icon='RemoveCircleOutline'
          />
        </>
      )}
      <AppButton
        classes='app-button'
        type='button'
        label='New'
        onClick={() => context.toggleModal(false)}
        icon='AddCircleOutline'
      />
    </section>
  );
};

export default AgendaFooter;
