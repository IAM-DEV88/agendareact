/**
 * The `Agenda` function is a React component that renders an agenda page with a filter bar, a data
 * grid, and a footer.
 * @returns The `Agenda` component is returning a JSX structure that includes the following components:
 */
import Layout from '../../Components/Layout';
import AgendaFilterBar from '../../Components/AgendaFilterBar';
import AgendaDataGrid from '../../Components/AgendaDataGrid';
import AgendaFooter from '../../Components/AgendaFooter';
import { useAppContext } from '../../Context';

function Agenda() {
  const context = useAppContext()

  const filteredRegisters = context.registers.filter((item) => {
    const itemDateTime = new Date(item.date + ' ' + item.time); // Combina fecha y hora en un solo objeto Date
    const now = new Date();

    if (context.agendaFilter.planner) {
      return (
        (context.agendaFilter.planner && item.type === 'Appointment') ||
        (context.agendaFilter.historical && itemDateTime < now)
      );
    } else if (context.agendaFilter.historical) {
      return (
        item.type === 'Appointment' && // Verifica si el tipo es 'Appointment'
        itemDateTime < now && // Verifica si la fecha es anterior a 'now'
        (!context.agendaFilter.date || // Si context.agendaFilter.date no está habilitado O
          (context.agendaFilter.date && // Si context.agendaFilter.date está habilitado
            // Comprueba si la fecha coincide con la seleccionada
            itemDateTime.getDate() === context.agendaDate.$D &&
            itemDateTime.getMonth() === context.agendaDate.$M &&
            itemDateTime.getFullYear() === context.agendaDate.$y))
      );
    } else if (context.agendaFilter.date) {
      return (
        item.type === 'Appointment' && // Comprueba si el tipo es 'Appointment'
        ((context.agendaFilter.date && // Si context.agendaFilter.date está habilitado
          // Comprueba si la fecha coincide con la seleccionada
          itemDateTime.getDate() === context.agendaDate.$D &&
          itemDateTime.getMonth() === context.agendaDate.$M &&
          itemDateTime.getFullYear() === context.agendaDate.$y) ||
          (context.agendaFilter.historical && itemDateTime < now)) // O, si es histórico y la fecha es anterior a 'now'
      );
    }

    return true; // Si ningún filtro está seleccionado, muestra todo.
  });

    return (
      <Layout>
      <AgendaFilterBar />
      <AgendaDataGrid filteredRegisters={filteredRegisters} />  
      <AgendaFooter />
    </Layout>
  );
}

export default Agenda;
