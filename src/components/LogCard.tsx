import { useState } from "react";
import Modal from "./Modal";
import type{ TransactionType } from "../App";
export default function LogCard(props:{
    transactions: TransactionType[], 
    setTransactions: React.Dispatch<React.SetStateAction<TransactionType[]>>
}){
    const transactions = props.transactions;
    const setTransactions = props.setTransactions;
    const [modal, setModal] = useState<boolean>(false);

    return(
        <div className="px-2 py-2 flex flex-col rounded-2xl border border-gray-400 gap-5 justify-center mx-10">
            {modal&&<Modal setTransactions={setTransactions} setModal={setModal} transactions={transactions}></Modal>}
            <h1 className="text-2xl font-semibold">Recent Transactions</h1>
            <div className="flex justify-between mt-2">
                <div className="flex gap-5">
                    <select className="px-4 py-2 rounded-xl font-medium outline-none cursor-pointer border border-gray-400">
                        <option>All</option>
                    </select>
                    <select className="px-4 py-2 rounded-xl font-medium outline-none cursor-pointer border border-gray-400">
                        <option>Sort: Date</option>
                    </select>
                    <button className="bg-blue-500 hover:bg-blue-600 transition-all text-white px-4 py-2 rounded-xl font-medium outline-none cursor-pointer" onClick={()=>setModal(true)}>
                        Add Transaction
                    </button>
                </div>
            </div>
            <div className="rounded-xl overflow-hidden border border-gray-500">
                <div className="grid grid-cols-4 bg-gray-100 text-gray-600 font-semibold px-4 py-3 border-b border-gray-400">
                        <div>Date</div>
                        <div>Category</div>
                        <div>Amount</div>
                        <div>Type</div>
                    </div>
                {transactions.length===0?(
                    <div className="text-center py-6 text-gray-400">
                        No Transactions Yet
                    </div>
                ):(
                    transactions.map((t, index)=>(
                    <div key={index} className="w-full grid grid-cols-4 border border-gray-400 px-2 py-3">
                        <div>{t.date}</div>
                        <div>{t.category}</div>
                        <div>{t.amount}</div>
                        <div>{t.type}</div>
                    </div>
                ))
                )
                }
            </div>
        </div>
    )
}