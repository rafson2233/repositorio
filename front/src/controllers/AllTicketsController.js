import { useState, useEffect } from "react";

const fieldMap = {
  company: "companyName",
  budget: "companyBudget",
  date: "dateReport",
  level: "priorityLevel",
  error: "errorFound",
  user: "userName",
  responsible: "responsableName",
  link: "linkTicket",
};

export const AllTicketsController = () => {
  const [tickets, setTickets] = useState([]);
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filters, setFilters] = useState({ status: "", field: "", value: "" });
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handleOpenModal = (ticket) => {
    setSelectedTicket(ticket);
  };

  const handleCloseModal = () => {
    setSelectedTicket(null);
  };

  const BASE_URL =
    window.location.hostname === "localhost"
      ? "http://localhost:5000"
      : "https://ticketflow-7gd8.onrender.com";

  useEffect(() => {
    const fetchTickets = async () => {
      const realField = fieldMap[filters.field] || filters.field;

      try {
        const response = await fetch(`${BASE_URL}/api/tickets/allTickets`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            field: realField,
            filter: filters.value,
            status: filters.status ? [filters.status] : [],
            sortField: sortField ? fieldMap[sortField] || sortField : null,
            sortOrder,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          console.error("Error fetching tickets:", data.error);
          alert(data.error || "Unknown error.");
        } else {
          setTickets(data);
        }
      } catch (error) {
        console.error("Error in request:", error);
        alert("Network error or server unavailable.");
      }
    };

    fetchTickets();
  }, [filters, sortField, sortOrder]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    setCurrentPage(1);
  };

  const handleSort = (field) => {
    const newOrder = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newOrder);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTickets = tickets.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(tickets.length / itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return {
    sortedTickets: currentTickets,
    handleFilterChange,
    handleSort,
    filters,
    handleOpenModal,
    handleCloseModal,
    selectedTicket,
    currentPage,
    totalPages,
    goToPage,
    itemsPerPage,
    handleItemsPerPageChange,
  };
};
