/**
 * The `AgendaFilterBar` component renders a filter bar for an agenda, allowing the user to toggle
 * between different types of appointments and filter by date.
 * @returns The AgendaFilterBar component is being returned.
 */
import DateSelector from '../DateSelector'
import { useAppContext } from '../../Context';

const AgendaFilterBar = () => {
  const context = useAppContext()
  return (
    <section className='filter-bar'>
        <section>Show in list</section>
        <div>
          Appointments
          <input
            type='checkbox'
            checked={context.agendaFilter.planner}
            onChange={() => context.handleFilterChange('agenda', 'planner')}
          />
        </div>
        <div>
          Unconfirmed
          <input
            type='checkbox'
            checked={context.agendaFilter.historical}
            onChange={() => context.handleFilterChange('agenda', 'historical')}
          />
        </div>
        <div>
          <label>
            By date
            <input
              type='checkbox'
              checked={context.agendaFilter.date}
              onChange={() => context.handleFilterChange('agenda', 'byDate')}
            />
          </label>
          <DateSelector listType='agenda'/>
        </div>
      </section>
  );
};

export default AgendaFilterBar;

