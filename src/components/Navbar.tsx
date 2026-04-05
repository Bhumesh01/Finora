import ModeLogo from "../assets/mode_logo.png"

export default function Navbar(props:{
    setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>
}){
    return(
        <div className="flex justify-between items-center py-4 px-6 bg-white shadow-md">
            <h1 className="text-3xl font-bold text-gray-800 tracking-wide">Finora</h1>
            <div className="flex items-center gap-4">
                <select onChange={(e)=>{
                    let val = e.target.value;
                    if(val==='Role: Admin'){
                        props.setIsAdmin(true);
                    }
                    else{
                        props.setIsAdmin(false);
                    }
                }} className="bg-blue-500 hover:bg-blue-600 transition-all text-white px-4 py-2 rounded-xl font-medium outline-none cursor-pointer">
                    <option>Role: Admin</option>
                    <option>Role: Viewer</option>
                </select>
                <div className="p-2 rounded-full hover:bg-gray-100 cursor-pointer transition">
                    <img width="28" src={ModeLogo} alt="Switch Mode Logo" className="hover:scale-110 transition-transform"/>
                </div>

            </div>
        </div>
    )
}