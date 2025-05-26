import { FaSortUp, FaSortDown, FaSort } from "react-icons/fa";
import "./TableHeader.css"; 

const TableHeader = ({ headers, sortField, sortOrder, onSort }) => {
  return (
    <thead>
      <tr>
        {headers.map((header) => (
          <th
            key={header}
            onClick={() => onSort(header.toLowerCase())}
            style={{ cursor: "pointer" }}
          >
            <div className="table-header-content">
              <span>{header}</span>
              {sortField === header.toLowerCase() ? (
                sortOrder === "asc" ? (
                  <FaSortUp />
                ) : (
                  <FaSortDown />
                )
              ) : (
                <FaSort />
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
