import Card from "./components/Card"

function App() {
  return (
    <div className="h-screen flex flex-col">
      <div>NaBar</div>
      <div className="flex justify-between px-2 my-5 flex-wrap gap-5">
        <Card label="Total Income" color="red" amount="₹ 70000" note="Increased Last Month"></Card>
        <Card label="Total Balance" color="blue" amount="₹ 50000" note="Increased Last Month"></Card>
        <Card label="Total Expenses" color="yellow" amount="₹ 20000" note="Increased Last Month"></Card>
      </div>
    </div>
  )
}

export default App
