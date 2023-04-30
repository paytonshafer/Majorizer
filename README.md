<h1 align="center">Clarkson University Majorizer by Software Surge</h1>
<p>
</p>

> The Majorizer is a project for CS350: Software Design and Devolopment at Clarkson University. It is a web application that allows students and their academic advisors to interact and accurately plan out full schedules for certian major and minor combintions. The current major offerings are Computer Science and Psychology. The current minor offerings are Mathematics and Literature. There is also an admin user who has control over the connections between students and advisors.

## Install
Ensure you clone or download the source code, you can run this command in the terminal to clone the project.
```sh
gh repo clone paytonshafer/Majorizer
```
The backend is run using the python framework REST Django, using a PostgreSQL server hosted by AWS. Ensure you have Python and pip installed and run the following command to install all the needed packages.
```sh
pip install django djangorestframework django-cors-headers djangorestframework-simplejwt PyJWT psycopg2
```

The frontend uses the JavaScript framwork React as well as other frontend libraries. Ensure you have Node.js and npm installed then run the following command to install all the needed packages.
```sh
npm install jwt-decode @mui/material @emotion/react @emotion/styled
```

## Usage
You will need to have two terminal windows open, one for the frontend and one for the backend. In the first window cd into the backend directory 
```sh
cd backend
```
Run the following command to start the backend server, the development server can be found at http://127.0.0.1:8000/ and be stopped by pressing CONTROL-C in the terminal window.
```sh
python manage.py runserver
```
Next go to the second window and cd into the frontend directoy
```sh
cd frontend
```
Run the following command to start the frontend server, the frontend can be viewed at http://127.0.0.1:3000/ and be stopped by pressing CONTROL-C in the terminal window. This is will land on the login page where the user can then login and create schedules, interact with advisors and students, and manage the advisor-student connections. For user info look in help.txt.
```sh
npm start
```
To run the production build, you will need to be on the test-run-build branch and run:
```sh
serve -s build
```

## Authors
**Payton Shafer, Ethan Matzek, Ceilidh Kiegle, Andrew Caruso, and Cole Caruso**
* Team name: Software Surge
* Team Website: https://webspace.clarkson.edu/classes/softwaresurge/public_html/
