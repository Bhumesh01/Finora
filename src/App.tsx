import Chart from "./components/Charts"
import InsightCard from "./components/InsightCard"
import LogCard from "./components/LogCard"
import Navbar from "./components/Navbar"
import { useState, useEffect } from "react"

export type TransactionType = {
    date: string,
    category: 'Salary'|'Groceries'|'Rent'|'Travel'|'Health'|"Others",
    amount: string,
    type: 'Income'|'Expense'
}


function App() {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);

  useEffect(()=>{
    try {
        const raw = localStorage.getItem("transactions");
        const parsed = raw ? JSON.parse(raw) : []
        if (Array.isArray(parsed)) {
            setTransactions(parsed);
        } else {
            console.warn("Invalid data in localStorage, resetting...");
            setTransactions([]);
        }
    } catch (err) {
        console.error("Parsing error:", err);
        setTransactions([]);
    }}, []);
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);
  return (
    <div className="h-screen flex flex-col gap-2">
      <Navbar></Navbar>
      <InsightCard transactions={transactions}></InsightCard>
      <Chart></Chart>
      <LogCard transactions={transactions} setTransactions={setTransactions}></LogCard>
    </div>
  )
}

export default App
