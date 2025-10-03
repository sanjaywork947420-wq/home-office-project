import { createContext, useContext, useState } from "react";


const AppContext=createContext();

export const AppProvider=({children})=>{
    const [state,setstate]=useState({
        open:true,
        theme:"light",
        globalfilter:""
    });

    const updateState = (key, value) => {
    setstate(prev => ({ ...prev, [key]: value }));
  };


    


    return(
        <AppContext.Provider value={{state,updateState}}>
                {children}
        </AppContext.Provider>
    )

}



// Custom hook for easier consumption
export const useAppContext = () => useContext(AppContext);

