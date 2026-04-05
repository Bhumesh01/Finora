import { useRef, useState } from "react"
import type{ TransactionType } from "../App"
interface ModalInterface{
    setTransactions: React.Dispatch<React.SetStateAction<TransactionType[]>>,
    setModal: React.Dispatch<React.SetStateAction<boolean>>,
    transactions: TransactionType[]
}
export default function Modal(props: ModalInterface){
    const dateRef = useRef<HTMLInputElement>(null);
    const categoryRef = useRef<HTMLSelectElement>(null);
    const amountRef = useRef<HTMLInputElement>(null);
    const typeRef = useRef<HTMLSelectElement>(null);
    const [error, setError] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    function add(){
        const date = dateRef.current?.value;
        const category = categoryRef.current?.value;
        const amount = amountRef.current?.value;
        const typeTransaction = typeRef.current?.value;
        if(!date || !category || !amount || ! typeTransaction){
            setError("All Fields are required");
            return;
        }
        setError("");
        let new_T: TransactionType = {
            date: date,
            category: category as TransactionType["category"],
            amount: `₹ ${amount}`,
            type: typeTransaction as TransactionType["type"]
        }
        const updated = [...props.transactions, new_T];
        props.setTransactions(updated);
        setMessage("Transaction Added Successfully")
        setTimeout(() => {
            props.setModal(false);
        }, 1000);
    }
    return(
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-white/30 backdrop-blur-sm"></div>
            <div className="relative z-10 w-100 p-6 rounded-2xl 
                bg-white/20 backdrop-blur-lg border border-white/30 
                shadow-xl flex flex-col gap-2">
                    {message&&<div className="text-green-500 text-center bg-green-100 rounded-2xl py-2 ">{message}</div>}
                <div className="flex justify-end font-semibold">
                    <div className="bg-red-500 hover:bg-red-500/75 px-4 py-1 rounded-2xl hover:scale-110 text-white cursor-pointer" onClick={()=>props.setModal(false)}>X</div>
                </div>
                <h1 className="font-semibold text-2xl text-center mb-5">Please Enter the Details: </h1>
                <div className="flex justify-start gap-5">
                    <h1 className="font-medium text-lg">Date: </h1>
                    <input ref={dateRef} type="date"></input>
                </div>
                <div className="flex justify-start gap-5">
                    <h1 className="font-medium text-lg">Category: </h1>
                    <select ref={categoryRef} className="px-2 py-1 rounded-md bg-white/30 border border-white/30 outline-none">
                        <option>Salary</option>
                        <option>Groceries</option>
                        <option>Rent</option>
                        <option>Travel</option>
                        <option>Health</option>
                        <option>Food</option>
                        <option>Others</option>
                    </select>
                </div>
                <div className="flex justify-start gap-5">
                    <h1 className="font-medium text-lg">Amount: </h1>
                    <input ref={amountRef} type="number" className="px-2 py-1 rounded-md bg-white/30 border border-white/30 outline-none" min={0} defaultValue={0}></input>
                </div>
                <div className="flex justify-start gap-5">
                    <h1 className="font-medium text-lg">Type: </h1>
                    <select ref={typeRef} className="px-2 py-1 rounded-md bg-white/30 border border-white/30 outline-none">
                        <option>Income</option>
                        <option>Expense</option>
                    </select>
                </div>
                {error&&(
                    <div className="text-red-500 text-center bg-red-100 rounded-2xl py-2 ">
                        {error}
                    </div>
                )}
                <button className="bg-blue-500 hover:bg-blue-600 transition-all text-white px-4 py-2 rounded-xl font-medium outline-none cursor-pointer" onClick={add}>
                        Add Transaction
                    </button>
            </div>
        </div>
    )
}