import { useState, useEffect } from "react";
import { api } from "../api/api";

const ITEMS_PER_PAGE = 5;

function TransactionList({ transactions, onUpdate }) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // 🔹 Apply filters
  const filteredTransactions = transactions.filter(tx => {
    if (tx.isDeleted) return false;

    if (statusFilter !== "all" && tx.status !== statusFilter) {
      return false;
    }

    if (dateFilter) {
      const txDate = new Date(tx.date).toISOString().split("T")[0];
      if (txDate !== dateFilter) return false;
    }

    return true;
  });

  // 🔹 Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, dateFilter]);

  // 🔹 Pagination logic
  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);

  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // 🔹 Soft delete
  const deleteTransaction = async (id) => {
    await api.patch(`/transactions/${id}`, { isDeleted: true });
    onUpdate();
  };

  return (
    <div>
      <h2>🧾 Transactions</h2>

      {/* Filters */}
      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "15px",
          alignItems: "center"
        }}
      >
        <div>
          <label>Status</label><br />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="success">Success</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        <div>
          <label>Date</label><br />
          <input
            type="date"
            value={dateFilter}
            onChange={e => setDateFilter(e.target.value)}
          />
        </div>
      </div>

      {/* Transaction List */}
      {paginatedTransactions.length === 0 ? (
        <p style={{ color: "#777" }}>
          No transactions found. Try changing filters 📭
        </p>
      ) : (
        paginatedTransactions.map(tx => (
          <div
            key={tx.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px",
              marginBottom: "8px",
              borderRadius: "8px",
              backgroundColor: "#f9fafb",
              borderLeft: `6px solid ${
                tx.type === "credit" ? "#2e7d32" : "#c62828"
              }`,
              opacity: tx.optimistic ? 0.7 : 1
            }}
          >
            {/* Left */}
            <div>
              <strong
                style={{
                  color: tx.type === "credit" ? "#2e7d32" : "#c62828"
                }}
              >
                {tx.type.toUpperCase()}
              </strong>

              <div style={{ fontSize: "14px", color: "#555" }}>
                ₹{tx.amount}
                {tx.fee && ` (Fee: ₹${tx.fee})`}
              </div>

              <div style={{ fontSize: "12px", color: "#888" }}>
                Status: {tx.status}
                {tx.optimistic && (
                  <span style={{ color: "#ff9800", marginLeft: "6px" }}>
                    (processing...)
                  </span>
                )}
              </div>
            </div>

            {/* Right */}
            {!tx.optimistic && (
              <button
                onClick={() => deleteTransaction(tx.id)}
                style={{
                  backgroundColor: "#e53935",
                  color: "white",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
              >
                Delete
              </button>
            )}
          </div>
        ))
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "12px",
            marginTop: "15px"
          }}
        >
          <button
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default TransactionList;


