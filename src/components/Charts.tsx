import { Chart as ChartJS, LineElement, ArcElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend} from "chart.js";

ChartJS.register( LineElement, ArcElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

import { Line, Pie } from "react-chartjs-2";
import type{ TransactionType } from "../App";

export default function Chart( props: {transactions: TransactionType[]}){
  const transactions = props.transactions;
  if (transactions.length === 0) {
    return <div className="text-center text-gray-500">No data for charts</div>
  }
  const sorted = [...transactions].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  
  let runningBalance = 0;
  let runningExpense = 0;

  const labels: string[] = [];
  const balanceData: number[] = [];
  const expenseData: number[] = [];

  sorted.forEach(t => {
      const amount = Number(t.amount.replace("₹ ", ""));

      if (t.type === "Income") {
          runningBalance += amount;
      } else {
          runningBalance -= amount;
          runningExpense += amount;
      }

      labels.push(
          new Date(t.date).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short"
          })
      );

      balanceData.push(runningBalance);
      expenseData.push(runningExpense);
  });
  const data1 = {
    labels,
    datasets: [
      {
        label: "Balance",
        data: balanceData,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59,130,246,0.2)",
        tension: 0.4,
        fill: true
      },
      {
        label: "Expenses",
        data: expenseData,
        borderColor: "#ef4444",
        backgroundColor: "rgba(239,68,68,0.2)",
        tension: 0.4,
        fill: true
      }
    ]
  };
  const categoryData: { [key: string]: number } = {};

  transactions.forEach(t => {
      if (t.type === "Expense") {
          const amount = Number(t.amount.replace("₹ ", ""));

          if (!categoryData[t.category]) {
              categoryData[t.category] = 0;
          }

          categoryData[t.category] += amount;
      }
  });

  const data2 = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        data: Object.values(categoryData),
        backgroundColor: [
          "#3b82f6",
          "#ef4444",
          "#22c55e",
          "#f59e0b",
          "#6b7280"
        ]
      }
    ]
  };
    return(
        <div className="flex flex-wrap gap-6 w-full p-4 rounded-2xl">
            <div className="flex-1 min-w-75 bg-white dark:bg-bg-dark-surface rounded-xl shadow shadow-bg-light-muted p-4">
              <h2 className="text-lg font-semibold mb-2 text-center">Balance Trend</h2>
              <div className="h-62.5 flex items-center justify-center">
                <Line data={data1} />
              </div>
            </div>

            <div className="flex-1 min-w-75 bg-white dark:bg-bg-dark-surface rounded-xl shadow shadow-bg-light-muted p-4">
              <h2 className="text-lg font-semibold mb-2 text-center">Expense Breakdown</h2>
              <div className="h-62.5 flex items-center justify-center">
                <Pie data={data2}/>
              </div>
            </div>

        </div>
    )
}