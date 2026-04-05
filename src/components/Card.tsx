type CardPropsType = {
  color: "red" | "green" | "blue" | "yellow" | "purple"|"orange",
  label: string,
  amount: string,
  note?: string
}

export default function Card({ color, label, amount, note }: CardPropsType) {

  const colorMap = {
    red: "border-red-500",
    green: "border-green-500",
    blue: "border-blue-500",
    yellow: "border-yellow-300",
    purple: "border-purple-500",
    orange: "border-orange-500"
  };

  return (
    <div
      className={`flex flex-col justify-between w-full md:h-40 sm:w-[30%] p-6 rounded-2xl 
      border-t-4 ${colorMap[color]} border dark:bg-bg-dark-card bg-white shadow-md hover:shadow-lg transition-all duration-300`}
    >
      <h3 className="text-md font-medium dark:text-text-dark-muted text-gray-500 tracking-wide">
        {label}
      </h3>

      <h1 className="text-3xl md:text-4xl font-bold dark:text-text-dark text-gray-800 mt-2">
        {amount}
      </h1>

      {note && (
        <p className="text-sm text-gray-400 mt-3">
          {note}
        </p>
      )}
    </div>
  );
}