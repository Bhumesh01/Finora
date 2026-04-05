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
  const [loaded, setLoaded] = useState<boolean>(false);
  const [admin, setIsAdmin] = useState<boolean>(true);
  const [theme, setTheme] = useState<"dark"|"light">("light");

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
    }
    finally{
      setLoaded(true);
    }
  }, []);
  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions, loaded]);
  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);
  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);
  return (
    <div className="max-h-fit flex flex-col gap-2 bg-bg-light dark:bg-bg-dark dark:text-text-dark transition duration-105">
      <Navbar theme={theme} setTheme={setTheme} setIsAdmin={setIsAdmin}></Navbar>
      <div className="mx-5">
        <InsightCard transactions={transactions}></InsightCard>
      </div>
      <Chart transactions={transactions}></Chart>
      <LogCard transactions={transactions} setTransactions={setTransactions} admin={admin}></LogCard>
    </div>
  )
}

export default App
