import { createContext } from "react";

const StaticData = createContext()

export default StaticData;

export const DataProvider = ({children}) => {
    //Have students, each student will represent a studet so the advisor has their data (foreign key)
    const advisor_connections = [{'adv': 'advisor1', 'stud': 'student1', 'label':'student1'}, 
                                 {'adv': 'advisor1', 'stud': 'student2', 'label':'student2'}, 
                                 {'adv': 'advisor2', 'stud': 'student2', 'label':'student2'}, 
                                 {'adv': 'advisor2', 'stud': 'student1', 'label':'student1'}]

    //course will have course id, name, credits, professor, location, days(MWF or TT)
    const course = [{'id': 'CS141', 'name': 'Intro to CS I', 'desc': 'too much lol', 'professor': 'Maciel', 'day': 'mwf'},
                    {'id': 'CS142', 'name': 'Intro to CS II', 'desc': 'too much lol', 'professor': 'Maciel', 'day': 'mwf'},
                    {'id': 'CS241', 'name': 'Computer Organization', 'desc': 'too much lol', 'professor': 'Thorpe', 'day': 'mwf'},
                    {'id': 'CS242', 'name': 'Programming Concepts in Java', 'desc': 'too much lol', 'professor': 'Dey', 'day': 'mwf'},
                    {'id': 'CS350', 'name': 'Software Design', 'desc': 'too much lol', 'professor': 'Banerjee', 'day': 't/th'},
                    {'id': 'CS444', 'name': 'Operating Systems', 'desc': 'too much lol', 'professor': 'Mathews', 'day': 't/th'},
                    {'id': 'CS456', 'name': 'Cryptography', 'desc': 'too much lol', 'professor': 'Tamon', 'day': 't/th'}]

    //semester will represent a semester for a student
    const semester = [{'semester_num': 1, "courses": [course[1],course[2],course[0],course[3],course[5]] }, 
                      {'semester_num': 2, "courses": [course[2],course[3],course[0],course[4],course[5]] }, 
                      {'semester_num': 3, "courses": [course[3],course[6],course[1],course[2],course[5]] },
                      {'semester_num': 4, "courses": [course[4],course[3],course[2],course[1],course[5]] },
                      {'semester_num': 5, "courses": [course[6],course[2],course[4],course[3],course[5]] },
                      {'semester_num': 6, "courses": [course[0],course[6],course[3],course[4],course[5]] },
                      {'semester_num': 7, "courses": [course[1],course[2],course[0],course[6],course[5]] },
                      {'semester_num': 8, "courses": [course[3],course[1],course[6],course[2],course[5]] }]

    const schedule1 = {'name':'schedule1', 'label':'schedule1','schedule':[semester[0], semester[1], semester[2], semester[3], semester[4], semester[5], semester[6], semester[7]]}
    const schedule2 = {'name':'schedule2', 'label':'schedule2','schedule':[semester[1], semester[5], semester[4], semester[3], semester[7], semester[0], semester[2], semester[6]]}

    //Students have schedules, major/minor, name, requests(for their advisor)
    let students = [{'name': 'student1', 'major': 'Compuer Science', 'minor': null, 'schedule': [schedule1, schedule2]},
                    {'name': 'student2', 'major': 'Compuer Science', 'minor': 'Math', 'schedule': [schedule2, schedule1]}]

    //This is the data that will be served in the context
    let contextData = {
        advisor_connections: advisor_connections,
        students: students
    }

    //we return the dataprovider such that the children of it have acess to the content
    return(
        <StaticData.Provider value={contextData}>
            {children}
        </StaticData.Provider>
    )
}
