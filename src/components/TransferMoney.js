import { useState } from "react";
import { api } from "../api/api";

const FEE_PERCENT = 0.02;
const LIMIT = 10000;

function TransferMoney({ onTransfer, balance }) {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  /*
   STEP 1:
   User clicks "Transfer"
   → Only validate
   → If valid, open modal
  */
  const handleTransfer = () => {
    setError("");

    if (!amount || amount <= 0) {
      setError("Enter a valid amount");
      return;
    }

    if (amount > LIMIT) {
      setError("Transfer limit exceeded (₹10,000)");
      return;
    }

    const fee = amount * FEE_PERCENT;
    const totalDeduction = Number(amount) + fee;

    if (totalDeduction > balance) {
      setError("Insufficient balance");
      return;
    }

    // ✅ Validation passed → open confirmation modal
    setShowModal(true);
  };

  /*
   STEP 2:
   User clicks "Confirm" in modal
   → Now ACTUALLY transfer money
   → API call happens here
  */
  const confirmTransfer = async () => {
    const fee = amount * FEE_PERCENT;

    await api.post("/transactions", {
      type: "debit",
      amount: Number(amount),
      fee: fee,
      status: "success",
      date: new Date().toISOString()
    });

    // Close modal & reset
    setShowModal(false);
    setAmount("");
    onTransfer(); // refresh transactions
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <h2>Transfer Money</h2>

      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />

      {/* STEP 1 trigger */}
      <button onClick={handleTransfer}>Transfer</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* STEP 2: Confirmation Modal */}
      {showModal && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <h3>Confirm Transfer</h3>

            <p>Amount: ₹{amount}</p>
            <p>Fee (2%): ₹{(amount * FEE_PERCENT).toFixed(2)}</p>

            <p>
              <strong>
                Total Deduction: ₹
                {(Number(amount) + amount * FEE_PERCENT).toFixed(2)}
              </strong>
            </p>

            <div style={{ marginTop: "15px" }}>
              {/* STEP 2 trigger */}
              <button onClick={confirmTransfer}>Confirm</button>

              <button
                onClick={() => setShowModal(false)}
                style={{ marginLeft: "10px", backgroundColor: "#777" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* Modal styles */
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999
};

const modalStyle = {
  backgroundColor: "#ffffff",
  padding: "25px",
  borderRadius: "12px",
  width: "320px",
  textAlign: "center",
  boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
};

export default TransferMoney;
