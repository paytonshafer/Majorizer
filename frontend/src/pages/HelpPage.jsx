//This is the help page it will contain instructions for everything
import React from 'react';
import './styles/HelpPage.css'

const HelpPage = () => {
    return (
        <div className='outsidebox'>
        <div className='contentbox'>
            <h1 id='top'>Welcome to the Help Page</h1>
            <br/>
            <h2><u>Table of Contents</u></h2>
            <h2>
            <a href='#student'>i. Student Help</a>
            <br/>
            <a href='#advisor'>ii. Advisor Help</a>
            <br/>
            <a href='#admin'>iii. Admin Help</a>
            </h2>
            <br/>
            <h2 id = 'student'><u>Student Help</u></h2>
            <br/>
            <h3>Home Page</h3><br/>
            <p>The home page is the hub of our website. Its purpose is to provide easy access to all other pages. Use the navigation bar at the top
                of your screen to access the other pages. Simply click on the name of the page you want to go to, and you'll be sent there. The options for 
                pages are: <b>Home | Build Schedule | View Schedule | Send Request | Help | Logout</b>
            </p><br/>
            <h3>Build Schedule Page</h3><br/>
            <p>This page of the website is where the core functionality lies. On this page, you can choose a major and minor, build a schedule
                with classes pertaining to your selected major and minor, and use our forecasting tool to recommend classes for
                you and guide you through the process. 
            </p><br/>
            <h3>View Schedule Page</h3><br/>
            <p>The view schedule page allows you to view all of your saved schedules. By opening the 'select' dropdown menu, you can pick a schedule
                to view. Then, click the 'select' button beneath the dropdown menu to update the shown schedule to the one picked in the dropdown. 
                <b> Note: </b>The view schedule page is only used to see schedules. To edit them, use the <a href='#stubuild'>Build Schedule Page.</a></p><br/>
            <h3>Send Request Page</h3> <br/>
            <p>The send request page is your link to your advisor. As a student, you have access to one advisor, whose job is to help you make the
                best schedule you can. If you have questions regarding courses, or want to officially change your schedule, you can use this page to do so.
                Use the 'Subject' text input box to type in the name of the message you want to send. Then, use the text box below to type out your request.
                Finally, click the 'Send' button to send the request. You will be greeted with a confirmation alert upon clicking the button to prevent
                accidental submits. Click 'Ok' to pass the confirmation, or 'Cancel' to stop the message from sending. 
            </p>
            <br/>
            <h2 id = 'advisor'><u>Advisor Help</u></h2>
            <br/>
            <h3>Home Page</h3><br/>
            <p>The home page is the hub of our website. Its purpose is to provide easy access to all other pages. Use the navigation bar at the top
                of your screen to access the other pages. Simply click on the name of the page you want to go to, and you'll be sent there. The options for 
                pages are: <b>Home | Build Schedule | View Schedule | View Request | Help | Logout</b></p>
            <br/>
            <h3>Build Schedule</h3><br/>
            <p>This page of the website is where the core functionality lies. On this page, you can choose a major and minor, build a schedule
                with classes pertaining to your selected major and minor, and use our forecasting tool to recommend classes for
                you and guide you through the process. As an advisor, this page is a tool to help you recommend courses to students and
                simulate their schedules.</p><br/>
            <h3>View Schedule</h3><br/>
            <p>As an advisor, the view schedule page is the location where you can view all of your assigned student's schedules. Use the 'Select' 
                dropdown menu to choose a student whose schedule you would like to view, and then press the 'Select' button beneath the dropdown
                to show that student's schedule.
            </p>
            <br/><h3>View Request</h3><br/>
            <p>The view request page allows you to see active requests from your students, and confirm or deny them to make the requested changes.
                The mail icon on the center of the page will have a red badge in the top left corner if you have any active requests. This badge
                will disappear if their are no current requests. Below the icon, if there are requests available, they will be displayed in 
                boxes which state, from top to bottom, the student's name, the courses the student has already taken and the courses they are
                currently taking, the request, and a pair of buttons to approve or deny the request. After reading a request, clicking either the
                approve or deny button will perform that action, after a confirmation window appears asking if you are sure of your decision. 'Ok'ing
                the confirmation will finalize your decision, and the request will disappear from your page. If you press cancel in the confirm, no
                action will occur regarding the request.
            </p>
            <br/><h2 id = 'admin'><u>Admin Help</u></h2><br/>
            <h3>Home Page</h3><br/>
            <p>The home page is the hub of our website. Its purpose is to provide easy access to all other pages. Use the navigation bar at the top
                of your screen to access the other pages. Simply click on the name of the page you want to go to, and you'll be sent there. The options for 
                pages are: <b>Home | Manage Connections | Help | Logout</b></p>
            <br/><h3>Manage Connections</h3><br/>
            <p>Your job as an admin is to control the connections between students and their advisors. The manage connections page helps you accomplish
                this in two ways. Firstly, you have the option to change which students are assigned to which advisors. This changes which student's 
                requests the advisors have access to, and who the students can send their requests to. Your second method of control is the ability to 
                approve connections between students and advisors. When a student sends a request to an advisor, and the advisor approves or denies it,
                it will be displayed on this page for you to have final say in whether or not the connection is actually approved.
            </p>
            <br/><h3><a href='#top'>Back to Top</a></h3>
            </div>
        </div>
    )
}

export default HelpPage;