'''
This forecasting algorithm requires the major to be split up into groups based on the types of classes required
For example CS major is split into common expirience, free electives, core, math, science, and CS electives
Each group has a capacity of how many courses can be added in the group per semester
The algorithm then takes a list of groups which is a dict with the capacity per sem, the courses and a code
The algo then loops through the groups adding courses that it can based on if the prereqs were satisfied and if there is a min
semester to be in to take the course. 
The approved courses are added to the semester and this process is repeated for each group for each semester
The groups are created using the create group funcion which takes the majors and minors desired and created the correct group

Note: 
The order in which courses are put into the group matter, put the courses in the group in an order that corresponds with the order that they should be taken in.
The order in which the algorithm goes through each group also matters, you may need to test it to find the optimal order

Below are examples for this to run, a CS major, PY major, both with a combo of LIT and MA minors and a double major respectivly. The com_exp and free elecs are shared between all majors
'''

#TODO: Add random class choosing for maybe py and cs science classes
#TODO: Deal with previously taken classes
#TODO: Deal with overload: what happens when a requested schedule needs more than 8 sem to be completed
from pprint import pprint 
from random import randint, shuffle

#common expirence classes
com_exp = {
    'name': 'com_exp',
    'cap': 1,
    'courses': {
        'KA101': {'prereq': []},
        'KA102': {'prereq': []},
        'KA103': {'prereq': []},
        'KA104': {'prereq': []},
        'KA105': {'prereq': []},
    }
    
}

#free electives, they act as filler
free = {
    'name': 'free',
    'cap': 2,
    'courses': {
        'FE101': {'prereq': []},
        'FE102': {'prereq': []},
        'FE103': {'prereq': []},
        'FE104': {'prereq': []},
        'FE105': {'prereq': []},
        'FE106': {'prereq': []},
        'FE107': {'prereq': []},
        'FE108': {'prereq': []},
        'FE109': {'prereq': []},
        'FE110': {'prereq': []},
        'FE111': {'prereq': []},
        'FE112': {'prereq': []},
        'FE113': {'prereq': []},
        'FE114': {'prereq': []},
        'FE115': {'prereq': []},
        'FE116': {'prereq': []},
    }
    
}

#computer science major core courses
cs_core = {
    'name': 'cs_core',
    'cap': 2,
    'courses': {
        'CS141': {'prereq': []},
        'CS142': {'prereq': ['CS141']},
        'CS242': {'prereq': ['CS142']},
        'CS341': {'prereq': ['CS142']},
        'CS241': {'prereq': ['CS142']},
        'CS344': {'prereq': ['CS142']},
        'CS345': {'prereq': ['CS142', 'MA211']},
        'CS350': {'prereq': ['CS242']},
        'CS444': {'prereq': ['CS241', 'CS344']},
    }
    
}

#computer science major math
cs_math = {
    'name': 'cs_math',
    'cap': 1,
    'courses': {
        'MA131': {'prereq': []},
        'MA132': {'prereq': ['MA131']},
        'MA211': {'prereq': ['MA132']},
        'MA339': {'prereq': ['MA132']},
        'STAT383': {'prereq': ['MA132']},
    }
    
}

#computer science major scince
cs_science = {
    'name': 'cs_science',
    'cap': 1,
    'courses': {
        'CM131': {'prereq': []},
        'CM132': {'prereq': ['CM131']},
        'PH131': {'prereq': ['CM132']},
    }
}

#computer science major elective paths
softwaredd = {
    'CS458': {'prereq': ['CS142'], 'sem_min': 6}, #formal meth
    'CS459': {'prereq': ['CS142'], 'sem_min': 6}, #com hum interaction
    'CS460': {'prereq': ['CS142'], 'sem_min': 6}, #db sys
    'CS447': {'prereq': ['CS142'], 'sem_min': 6}, #algo
    'CS475': {'prereq': ['CS142'], 'sem_min': 6}  #ethics
}
infotech = {
    'CS460': {'prereq': ['CS142'], 'sem_min': 6}, #db
    'CS471': {'prereq': ['CS142'], 'sem_min': 6}, #sys admin
    'CS459': {'prereq': ['CS142'], 'sem_min': 6}, #h-c interaction
    'CS455': {'prereq': ['CS142'], 'sem_min': 6}, #networks
    'CS457': {'prereq': ['CS142'], 'sem_min': 6}  #net-sec
}
ai = {
    'CS451': {'prereq': ['CS142'], 'sem_min': 6}, #ai
    'CS473': {'prereq': ['CS142'], 'sem_min': 6}, #com vision
    'CS470': {'prereq': ['CS142'], 'sem_min': 6}, #deep learing
    'CS472': {'prereq': ['CS142'], 'sem_min': 6}, #image understanfing
    'CS461': {'prereq': ['CS142'], 'sem_min': 6}  #mixed reality
}
theory = {
    'CS447': {'prereq': ['CS142'], 'sem_min': 6}, #algo
    'CS469': {'prereq': ['CS142'], 'sem_min': 6}, #quantum
    'CS442': {'prereq': ['CS142'], 'sem_min': 6}, #com complex
    'CS456': {'prereq': ['CS142'], 'sem_min': 6}, #crypto
    'CS445': {'prereq': ['CS142'], 'sem_min': 6}  #compiler
}
cs_elec_paths = [softwaredd, infotech, ai, theory]
cs_electives = {
    'name': 'cs_electives',
    'cap': 2,
    'courses': cs_elec_paths[randint(0,3)]
}

#psycology major core classes
cognitive = ['PY358', 'PY357', 'PY359', 'PY360', 'PY461']
physiological = ['PY454', 'PY458']
temp = randint(0,1)
py_core = {
    'name': 'py_core',
    'cap': 2,
    'courses': {
        'PY151': {'prereq': []},
        'PY253': {'prereq': ['PY151']},
        'PY255': {'prereq': ['PY151']},
        cognitive[randint(0,4)]: {'prereq': ['PY255'], 'sem_min': 4}, #Cognitive requirement: PY358 PY357 PY359 PY360 PY461, grab rand one
        'PY456': {'prereq': ['PY151', 'STAT282'], 'sem_min': 5},
        'PY457': {'prereq': ['PY151', 'STAT282'], 'sem_min': 5},
        physiological[temp]: {'prereq': ['PY456']}, #Physiological requirement
        'PY401': {'prereq': [physiological[temp]]}, #Research/Internship Requirement
    }
}

#psycology major math
py_math = {
    'name': 'py_math',
    'cap': 1,
    'courses': {
        'MA180': {'prereq': []},
        'MA181': {'prereq': ['MA180']},
        'STAT282': {'prereq': ['MA181']},
    }
}

#psycology major science
py_science = {
    'name': 'py_science',
    'cap': 2,
    'courses': {
        'NS131': {'prereq': []}, #natual science 1
        'NS132': {'prereq': ['NS131']}, #natual science 2
        'NS101': {'prereq': ['NS131']}, #natual science lab
    }
}

#psycology major electives
psych_elecs1 = ['PY311', 'PY319', 'PY286', 'PY315']
psych_elecs2 = ['PY370', 'PY363',  'PY340', 'PY372']
psych_elecs3 = ['PY464', 'PY462', 'PY463', 'PY361']
#grab 3 rand elects, look to see if some go w other so we can do paths like for cs elecs
py_electives = {
    'name': 'py_electives',
    'cap': 1,
    'courses': {
        psych_elecs1[randint(0,3)]: {'prereq': []},
        psych_elecs2[randint(0,3)]: {'prereq': []},
        psych_elecs3[randint(0,3)]: {'prereq': []},
    }
}

#math minor stuff below
ma_minor = {
    'name': 'ma_minor',
    'cap': 1,
    'courses': {
        'MA131': {'prereq': []},
        'MA132': {'prereq': ['MA131']},
        'STAT383': {'prereq': ['MA132']},
        'MA211': {'prereq': ['MA132']},
        'MA339': {'prereq': ['MA132']},
        'MA231': {'prereq': ['MA132']},
        'MA200': {'prereq': ['MA131']},
    }
}

#grabs 5 rand lit/film courses
#lit minor stuff below, when we do it for real, have a list of all the lit courses and pull a random 5 to take
all_lit = ['LIT226', 'LIT235', 'LIT275', 'LIT255', 'LIT223', 'FILM345', 'LIT270', 'LIT220', 'LIT380', 'LIT250', 'FILM260', 'LIT221', 'FILM237', 'LIT355', 'LIT262', 'LIT240', 'LIT230', 'LIT227', 'LIT225', 'LIT222', 'FILM322', 'LIT253', 'LIT248', 'LIT265']
shuffle(all_lit)
lit_minor = {
    'name': 'lit_minor',
    'cap': 1,
    'courses': {
        all_lit[0]: [],
        all_lit[1]: [],
        all_lit[2]: [],
        all_lit[3]: [],
        all_lit[4]: [],
    }
}

#this is for building the list of groups so we can check when stuff is covered by other majors or minors
groups_covered = {
    'cs_math': ['ma_minor'],
    'py_math': ['ma_minor', 'cs_math'],
    'py_science': ['cs_science']
}

#group order: science, math, core, extra if needed, com_exp, electives, free, only exception is pure cs -> electoves last
#NOTE it will be impossible to call this with maj1 = maj1 and min1 = min2 since there will be a check in the form and a check in the backend
#NOTE ALSO maj1 is a required argument that will always be passed
#[cs_science, cs_math, cs_core, py_core, com_exp, py_electives, cs_electives, free]
def create_group_list(maj1, maj2, min1, min2):
    groups = [com_exp, free]

    #fill groups list based on selected majors/minors
    match maj1:
        case 'computer science':
            groups.insert(1,cs_electives)
            groups.insert(0,cs_core)
            groups.insert(0,cs_math)
            groups.insert(0,cs_science)

        case 'psychology':
            groups.insert(1,py_electives)
            groups.insert(0,py_core)
            groups.insert(0,py_math)
            groups.insert(0,py_science)

        case _:
            pass

    match maj2: #[s m c ce e f]
        case 'computer science':  
            cssci = False
            csmath = False          
            groups.insert(4,cs_electives)
            groups.insert(2,cs_core)
            for i in groups_covered:
                for j in groups:
                    if i == j['name']:
                        for k in groups_covered[i]:
                            if k == 'cs_math':
                                if not(cs_math in groups):
                                    groups = [cs_math if item['name'] == i else item for item in groups]
                                    csmath = True
                            if k == 'cs_science':
                                if not(cs_science in groups):
                                    groups = [cs_science if item['name'] == i else item for item in groups]
                                    cssci = True
            
            if not csmath:
                groups.insert(0, cs_math)

            if not cssci:
                groups.insert(0, cs_science)

        case 'psychology':
            groups.insert(4,py_electives)
            groups.insert(3,py_core)
            pymath = False
            for i in groups_covered['py_math']:
                for j in groups:
                    if j['name'] == i:
                        pymath = True
            if not pymath:
                groups.insert(0,cs_math)

            pysci = False
            for i in groups_covered['py_science']:
                for j in groups:
                    if j['name'] == i:
                        pysci = True
            if not pysci:
                groups.insert(0,py_science)

        case _:
            pass

    match min1: #[s m c ce e f]
        case 'mathematics':
            addmath = False
            for i in groups_covered:
                for j in groups:
                    if i == j['name']:
                        for k in groups_covered[i]:
                            if k == 'ma_minor':
                                if not(ma_minor in groups):
                                    groups = [ma_minor if item['name'] == i else item for item in groups]
                                    addmath = True

            if not(addmath):
                groups.insert(len(groups)-2,lit_minor)

        case 'literature':
            groups.insert(len(groups)-1,lit_minor)
        case _:
            pass

    match min2:
        case 'mathematics':
            for i in groups_covered:
                for j in groups:
                    if i == j['name']:
                        for k in groups_covered[i]:
                            if k == 'ma_minor':
                                if not(ma_minor in groups):
                                    groups = [ma_minor if item['name'] == i else item for item in groups]
                                    addmath = True

            if not(addmath):
                groups.insert(len(groups)-2,lit_minor)

        case 'literature':
            groups.insert(len(groups)-1,lit_minor)
        case _:
            pass

    return groups

#generate code here
def gen_code(maj1, maj2, min1, min2):
    code = ''

    match maj1:
        case 'computer science':
            code = code + 'cs_'
        case 'psychology':
            code = code + 'py_'
        case _:
            code = code + '0_'
    match maj2:
        case 'computer science':
            code = code + 'cs_'
        case 'psychology':
            code = code + 'py_'
        case _:
            code = code + '0_'
    match min1:
        case 'mathematics':
            code = code + 'ma_'
        case 'literature':
            code = code + 'lit_'
        case _:
            code = code + '0_'
    match min2:
        case 'mathematics':
            code = code + 'ma'
        case 'literature':
            code = code + 'lit'
        case _:
            code = code + '0'
    
    return code

#list of classes that are covered by higher classes
covered = {
    'MA180': 'MA131', #ex: bussiness calc is covered by calc 1
    'MA181': 'MA132',
    'STAT282': 'STAT383'
}

#this function checks for equivialance of 2 classes like how MA131 would satisfy MA180/181 then returns higher level class
def check_equivilance(course1, course2):
    #this function checks covered to see if they are equivilant
    if course1 in covered:
        if covered[course1] == course2:
            return True
    if course2 in covered:
        if covered[course2] == course1:
            return True
    return False

#checks if a prereq is already counted by a cource that is seen as equivilant
def already_counted(course, schedule):
    for sem in schedule:
        if covered[course] in schedule[sem]:
            return True

#function to check if course if in a given schedule
def taken(course, schedule, semester):
    for x in schedule: #loop through each semester
        if x == semester:
            break
        for y in schedule[x]: #loop through each course
            if y == course or check_equivilance(y, course): #return true if course is there
                return True
    return False #return false if course never found

#function to check if the builder is able to add a course to a schedule
def canAdd(semester, course, courses, schedule):
    if len(courses[str(course)]) == 0:  # if no prereqs
        return True
    else:
        if 'sem_min' in courses[course]: #checks if there a min semester to take this in
            if courses[course]['sem_min'] > semester:
                return False
        
        if course in covered:
            if already_counted(course, schedule): #checks is the course has been covered by another
                return False

        for i in courses[course]['prereq']:  # iterate through prereqs
            if not taken(i, schedule, semester) or i in schedule[semester]:  # if prereq has not been taken or if it is in the same semester
                return False
    
        return True

#goes through each group and adds the next course that needs to be added
def add_course_in_group(sem, group, cap, group_cap, schedule):
    for y in group: #go through all courses in the group
        if not taken(y, schedule, sem) and len(schedule[sem]) < 5:  # if the course has not been put into schedule and the semester has less than 5 courses
            if canAdd(sem, y, group, schedule):  #passes semester number and course to canAdd, checks if can add to semester
                schedule[sem].append(y) #add approved course
                cap = cap + 1 #set cap count to + 1, for the added course
                if cap == group_cap: #checks if cap has been hit for the group in this semester
                    cap = 0 #reset cap and break out of loop
                    break

#this function takes a schedule, groups, and the schedule code and creates a full 8 semester schedule
def forecast(maj1, maj2, min1, min2):
    schedule = {
        1: ["UNIV190", "FY100"],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
        7: [],
        8: [],
    } 

    groups = create_group_list(maj1, maj2, min1, min2)
    code = gen_code(maj1, maj2, min1, min2)

    for x in schedule: #go through each semster
        for y in groups: #go through each group of classes
            match code:
                case 'cs_0_0_0':
                    if x == 7: #make this visible for cs major, sets proper number of free elecs
                        groups[5]['cap'] = 4
                case 'cs_0_ma_0':
                    if x == 7: #make this visible for cs major with math minor, sets proper number of free elecs
                        groups[5]['cap'] = 5
                case 'cs_0_lit_0':
                    if x == 7: #make this visible for cs major with lit minor, sets proper number of free elecs
                        groups[6]['cap'] = 4
                case 'py_0_0_0':
                    if x == 6: #make this visible for py major or w ma minor, sets proper number of free elecs
                        groups[5]['cap'] = 5 #sets cap of 5 free elects per sem after semester 6 
                case 'py_0_ma_0':
                    if x == 6: #make this visible for py major or w ma minor, sets proper number of free elecs
                        groups[5]['cap'] = 5 #sets cap of 5 free elects per sem after semester 6 
                case 'py_0_lit_0':
                    if x == 6: #make this visible for py major with lit minor, sets proper number of free elecs
                        groups[6]['cap'] = 5
                case 'cs_py_0_0':
                    if x == 7: #make this visible for cs py double major
                        groups[6]['cap'] = 5
                        groups[4]['cap'] = 5
                case _:
                    print("You have an invalid code")
                    exit() 

            cap_count = 0 #intially set cap_count = 0 for each group
            add_course_in_group(x, y['courses'], cap_count, y['cap'], schedule) #gooes through all courses in the group to see what to add

    return schedule
