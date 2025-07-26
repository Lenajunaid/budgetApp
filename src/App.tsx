import React, { useState } from 'react';
import './App.css';
import  IncomeForm  from './components/IncomeForm';
import ExpenseForm from './components/ExpenseForm';
import SavingForm from './components/SavingForm';

type IncomeEntry = {
  source: string;
  amount: number;
  date: string;
};

type ExpenseEntry = {
  source: string;
  amount: number;
  date: string;
};

function App() {
  const [incomeList, setIncomeList] = useState<IncomeEntry[]>([]);
  const [expenseList, setExpenseList] = useState<ExpenseEntry[]>([]);
  const [savingGoal, setSavingGoal] = useState<number>(0);
  const [savedAmount, setSavedAmount] = useState<number>(0);
  const [transferInput, setTransferInput] = useState<number>(0);

  const handleIncomeAdd = (entry: IncomeEntry) => {
    setIncomeList([...incomeList, entry]);
  };

  const handleExpenseAdd = (entry: ExpenseEntry) => {
    setExpenseList([...expenseList, entry]);
  };

  const removeIncome = (index: number) => {
    const updated = [...incomeList];
    updated.splice(index, 1);
    setIncomeList(updated);
  };

  const removeExpense = (index: number) => {
    const updated = [...expenseList];
    updated.splice(index, 1);
    setExpenseList(updated);
  };

  const totalIncome = incomeList.reduce((sum, item) => sum + item.amount, 0);
  const totalExpense = expenseList.reduce((sum, item) => sum + item.amount, 0);
  const availableBalance = totalIncome - totalExpense - savedAmount;
  const savingProgress = savingGoal > 0 ? (savedAmount / savingGoal) * 100 : 0;

  const handleSavingTransfer = () => {
    if (transferInput <= availableBalance) {
      setSavedAmount(savedAmount + transferInput);
      setTransferInput(0);
    } else {
      alert("You don't have enough balance for this transfer.");
    }
  };

  return (
    <div className="App">
      <h1>My Budget Planner</h1>

      <div className="forms-container">
        <div className="form-box">
          <h2>Income</h2>
          <IncomeForm onAddIncome={handleIncomeAdd} />
        </div>

        <div className="form-box">
          <h2>Expense</h2>
          <ExpenseForm onAddExpense={handleExpenseAdd} />
        </div>

        <div className="form-box">
          <h2>Saving Goals</h2>
          <SavingForm
            setTargetSaving={setSavingGoal}
            setCurrentSaving={setSavedAmount}
          />
        </div>
      </div>

      <div className="saving-summary">
        <h2>Summary</h2>
        <p>Goal: ${savingGoal}</p>
        <p>Saved: ${savedAmount}</p>
        <p>Balance: ${availableBalance}</p>

        <div className="transfer-section">
          <input
            type="number"
            placeholder="Transfer amount"
            value={transferInput}
            onChange={(e) => setTransferInput(Number(e.target.value))}
          />
          <button onClick={handleSavingTransfer}>Transfer</button>
        </div>

        <div className="progress-bar">
          <div
            className="progress"
          ></div>
        </div>
        <p>Progress: {savingProgress.toFixed(1)}%</p>
      </div>

      <h2>Income Entries</h2>
      <ul>
        {incomeList.map((entry, i) => (
          <li key={i}>
            {entry.source} - ${entry.amount} - {entry.date}
            <button onClick={() => removeIncome(i)}></button>
          </li>
        ))}
      </ul>

      <h2>Expense Entries</h2>
      <ul>
        {expenseList.map((entry, i) => (
          <li key={i}>
            {entry.source} - ${entry.amount} - {entry.date}
            <button onClick={() => removeExpense(i)}></button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;