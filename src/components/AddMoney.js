import { useState } from "react";
import { api } from "../api/api";

function AddMoney({ onAdd }) {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const handleAddMoney = async () => {
    setError("");

    if (!amount || amount <= 0) {
      setError("Please enter a valid amount");
      return;
    }

   
    const optimisticTransaction = {
      id: Date.now(),
      type: "credit",
      amount: Number(amount),
      status: "success",
      date: new Date().toISOString(),
      optimistic: true
    };

    
    onAdd(optimisticTransaction);
    setAmount("");

    try {
      
      await api.post("/transactions", {
        type: "credit",
        amount: Number(amount),
        status: "success",
        date: new Date().toISOString()
      });

      
      onAdd();
    } catch (err) {
      
      setError("Transaction failed. Please try again.");
      onAdd(); 
    }
  };

  return (
    <div>
      <h2>➕ Add Money</h2>

      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />

      <button onClick={handleAddMoney}>Add</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default AddMoney;

