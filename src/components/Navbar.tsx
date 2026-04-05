import toggleOffLogo from "../assets/toggleOff.svg"
import toggleOnLogo from "../assets/toggleOn.svg"
import darkThemeLogo from "../assets/dark_logo.svg"
import lighyThemeLogo from "../assets/light_logo.svg"
export default function Navbar(props:{
    setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>,
    setTheme: React.Dispatch<React.SetStateAction<"light"|"dark">>,
    theme: "dark"|"light"
}){
    return(
        <div className="flex justify-between items-center py-4 px-6 dark:bg-bg-dark bg-white shadow-md dark:shadow-bg-dark-card">
            <div className="flex justify-around items-center gap-2">
                {props.theme==="dark"?(<div>
                <img src={darkThemeLogo}></img>
                </div>):(<div><img src={lighyThemeLogo}></img></div>)}
                <h1 className="text-5xl font-bold dark:bg-bg-dark text-text-light tracking-wide dark:text-text-dark">Finora</h1>
            </div>
            <div className="flex items-center gap-4">
                <select onChange={(e)=>{
                    let val = e.target.value;
                    if(val==='Role: Admin'){
                        props.setIsAdmin(true);
                    }
                    else{
                        props.setIsAdmin(false);
                    }
                }} className="bg-accent-blue hover:bg-accent-blue-hover transition-all text-white px-4 py-2 rounded-xl font-medium outline-none cursor-pointer text-center dark:bg-accent dark:hover:bg-accent-hover">
                    <option>Role: Admin</option>
                    <option>Role: Viewer</option>
                </select>
                <div onClick={()=>{
                    const theme = localStorage.getItem("theme");
                    if(theme === "light"){
                        props.setTheme("dark");
                    }
                    else if(theme === "dark"){
                        props.setTheme("light")
                    }
                }} className="p-2 rounded-full bg-bg-light hover:bg-gray-100 cursor-pointer transition">
                    <img width="40" src={props.theme==="light"?toggleOffLogo:toggleOnLogo} alt="Switch Mode Logo" className="hover:scale-110 transition-transform"/>
                </div>

            </div>
        </div>
    )
}