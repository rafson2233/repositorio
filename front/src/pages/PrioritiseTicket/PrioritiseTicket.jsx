import Header from '../../components/header/PageHeader';
import Sidebar from '../../components/sideBar/SideBar';
import TableHeader from '../../components/header/TableHeader';
import { PrioritiseTicketsController } from '../../controllers/PrioritiseTicketController';
import PrioritiseTicketModal from '../../components/modals/PrioritiseTicketsModal';
import './prioritiseTicket.css';

const menuTickets = [];
const headers = [
  'Company', 'Budget', 'Date', 'Level', 'Error', 'User', 'Responsible', 'Weight', 'Priority ', 'Status', 'Link', 'Options'
];

const AllTickets = () => {
  const response = PrioritiseTicketsController();

  return (
    <>
      <Header menuItems={menuTickets} />
      <Sidebar />
      <div>
        <main className='tickets-page'>
          <div className='tickets-content'>

            <div className="filters-wrapper">
              <div className="filters">
                <select name="status" value={response.filters.status} onChange={response.handleFilterChange}>
                  <option value="">Select type</option>
                  <option value="not started">Not started</option>
                  <option value="in progress">In progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="blocked">Blocked</option>
                </select>

                <input
                  type="text"
                  name="value"
                  placeholder="Filter by..."
                  value={response.filters.value}
                  onChange={response.handleFilterChange}
                />

                <select name="field" value={response.filters.field} onChange={response.handleFilterChange}>
                  <option value="">Field</option>
                  {headers.map((field) => (
                    <option key={field} value={field.toLowerCase()}>
                      {field}
                    </option>
                  ))}
                </select>
              </div>


              <div className="filters">
                <select value={response.itemsPerPage} onChange={response.handleItemsPerPageChange}>
                  <option value={5}>Display 5 items per page</option>
                  <option value={10}>Display 10 items per page</option>
                  <option value={20}>Display 20 items per page</option>
                </select>
              </div>
            </div>

            <div className='table-container'>
              <table>
                <TableHeader
                  headers={headers}
                  sortField={response.filters.field}
                  sortOrder={response.filters.sortOrder}
                  onSort={response.handleSort}
                />
                <tbody>
                  {response.sortedTickets.length === 0 ? (
                    <tr>
                      <td colSpan="9">No tickets found.</td>
                    </tr>
                  ) : (
                    response.sortedTickets.map((ticket, index) => (
                      <tr key={index}>
                        <td>{ticket.companyName}</td>
                        <td>{ticket.companyBudget}</td>
                        <td>
                          {(() => {
                            const d = new Date(ticket.dateReport);
                            const day = String(d.getUTCDate()).padStart(2, '0');
                            const month = String(d.getUTCMonth() + 1).padStart(2, '0');
                            const year = d.getUTCFullYear();
                            return `${day}/${month}/${year}`;
                          })()}
                        </td>
                        <td>{ticket.priorityLevel}</td>
                        <td>{ticket.errorFound}</td>
                        <td>{ticket.userName}</td>
                        <td>{ticket.responsableName || 'Not assigned'}</td>
                        <td>{ticket.weight || '-'}</td>
                        <td>{ticket.priority || '-'}</td>
                        <td>{ticket.status}</td>
                        <td>
                          <a href={ticket.linkTicket} target='_blank' rel='noopener noreferrer'>
                            Link
                          </a>
                        </td>
                        <td>
                          <button className='btn-open-modal' onClick={() => response.handleOpenModal(ticket)}>
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>


         

            <div className="pagination-buttons">
              <button onClick={() => response.goToPage(response.currentPage - 1)} disabled={response.currentPage === 1}>
                Previous
              </button>
              <span>Page {response.currentPage} de {response.totalPages}</span>
              <button onClick={() => response.goToPage(response.currentPage + 1)} disabled={response.currentPage === response.totalPages}>
                Next
              </button>
            </div>
          </div>

          <PrioritiseTicketModal ticket={response.selectedTicket} onClose={response.handleCloseModal} onDelete={response.handleDelete} />
        </main>
      </div>
    </>
  );
};

export default AllTickets;
