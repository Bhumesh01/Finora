import { Chart as ChartJS, LineElement, ArcElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend} from "chart.js";

ChartJS.register( LineElement, ArcElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

import { Line, Pie } from "react-chartjs-2";

const data1 = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Balance",
      data: [25000, 40000, 42000, 58000, 50000, 70000],
      borderColor: "#3b82f6",
      backgroundColor: "rgba(59,130,246,0.2)",
      tension: 0.4, // smooth curve
      fill: true
    }
  ]
};

const data2 = {
  labels: ["Food", "Rent", "Shopping", "Travel", "Other"],
  datasets: [
    {
      data: [35, 25, 15, 20, 5],
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

export default function Chart(){
    return(
        <div className="flex flex-wrap justify-between gap-6 w-full px-5">
            <div className="bg-white rounded-xl shadow p-4 flex-1">
              <h2 className="text-lg font-semibold mb-2 text-center">Balance Trend</h2>
              <div className="flex items-center justify-center">
                <Line data={data1} />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-4 flex-1">
              <h2 className="text-lg font-semibold mb-2 text-center">Expense Breakdown</h2>
              <div className="flex items-center justify-center">
                <Pie data={data2}/>
              </div>
            </div>

        </div>
    )
}