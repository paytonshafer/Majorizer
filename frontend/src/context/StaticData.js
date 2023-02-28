import { createContext } from "react";

const StaticData = createContext()

export default StaticData;

export const DataProvider = ({children}) => {
    //Have students, each student will represent a studet so the advisor has their data (foreign key)
    let advisors

    //course will have course id, name, credits, professor, location, days(MWF or TT)
    let course 

    //schedules have x semesters each with ~5 classes
    let schedule

    //Students have schedules, major/minor, name, requests(for their advisor)
    let students


    let contextData = {
        
    }

    return(
        <StaticData.Provider value={contextData}>
            {children}
        </StaticData.Provider>
    )
}
