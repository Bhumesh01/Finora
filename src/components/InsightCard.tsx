import Card from "./Card"
import type{ TransactionType } from "../App"
export default function InsightCard(props:{transactions:TransactionType[]}){ 
    const { transactions } = props;
    if (transactions.length === 0) {
        return (
            <div className="px-5 my-5 text-gray-400">
                No data available
            </div>
        );
    }
    const latestDate = new Date(
        Math.max(...transactions.map(t => new Date(t.date).getTime()))
    );

    const month = latestDate.getMonth();
    const year = latestDate.getFullYear();

    const filtered = transactions.filter(t => {
        const d = new Date(t.date);
        return d.getMonth() === month && d.getFullYear() === year;
    });
    const income = filtered
        .filter(t => t.type === "Income")
        .reduce((sum, t) => sum + Number(t.amount.replace("₹ ", "")), 0);

    const expenses = filtered
        .filter(t => t.type === "Expense")
        .reduce((sum, t) => sum + Number(t.amount.replace("₹ ", "")), 0);

    const balance = income - expenses;

    const monthName = latestDate.toLocaleString("default", { month: "long" });

    return(
        <div className="flex justify-between px-5 my-5 flex-wrap gap-5">
            <Card label={`${monthName} Income`}  color="red" amount={`₹ ${income}`}></Card>
            <Card label={`${monthName} Balance`}  color="blue" amount={`₹ ${balance}`}></Card>
            <Card label={`${monthName} Expenses`}  color="yellow" amount={`₹ ${expenses}`}></Card>
          </div>
    )
}