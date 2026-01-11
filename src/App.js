import { useEffect, useState } from "react";
import { api } from "./api/api";
import AddMoney from "./components/AddMoney";
import TransferMoney from "./components/TransferMoney";
import TransactionList from "./components/TransactionList";
import "./App.css";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  
  const fetchTransactions = async (optimisticTx = null) => {
    
    if (optimisticTx) {
      setTransactions(prev => [optimisticTx, ...prev]);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await api.get("/transactions");
      setTransactions(res.data);
    } catch (err) {
      setError("Failed to load transactions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    fetchTransactions();
  }, []);

  
  const balance = transactions.reduce((total, tx) => {
    if (tx.type === "credit") return total + tx.amount;
    if (tx.type === "debit") return total - tx.amount - (tx.fee || 0);
    return total;
  }, 0);

  return (
    
    <div className={`container ${darkMode ? "dark" : "light"}`}>
      
      
      <button
        onClick={() => setDarkMode(prev => !prev)}
        style={{ marginBottom: "15px" }}
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <h1>💳 Mini Wallet</h1>

      {/* Loading & Error states */}
      {loading && <p>Loading transactions...</p>}
      {error && <p className="error">{error}</p>}

      {/* Wallet Balance */}
      <div className="card">
        <h2>Wallet Balance</h2>
        <h1 className="balance">₹{balance}</h1>
      </div>

      
      <div className="card">
        <AddMoney onAdd={fetchTransactions} />
      </div>

      
      <div className="card">
        <TransferMoney onTransfer={fetchTransactions} balance={balance} />
      </div>

      
      {!loading && !error && (
        <div className="card">
          <TransactionList
            transactions={transactions}
            onUpdate={fetchTransactions}
          />
        </div>
      )}
    </div>
  );
}

export default App;







