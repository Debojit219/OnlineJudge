# OnlineJudge

This is a online judge project. 
- It has a frontend to add new problems and view the problems.
- In the backend, there are two main tasks, CRUD for problems and Compiling the source code for a problem.

Let's take a deeper dive into the proeject.

## Installation and Setup
You can run this project in your local by using the following: 

### First pull the project
```
git pull https://github.com/Debojit219/OnlineJudge.git
```

### Install the dependencies
get inside the `backend` and the `frontend` separately and run:
```
npm install
```
NOTE: It is mandatory to have NodeJS installed in your system. 

### Setting up the Environment Variables
- Create a `.env` file in the frontend and backend directories. Just move inside `./frontend` and create a `.env` file. Do the same for the `./backend` too. 
- You need to setup the environment variables for the backend as:
```
MONGO_URI = "<Add your MongoDB URI>"
API_KEY = "<Add your Rapid API Judge0 key>"
```
Link to [Rapid API Judge0](https://rapidapi.com/judge0-official/api/judge0-ce)

- Environment Variables for the frontend
```
REACT_APP_SERVER_PORT = '<Add your port for the server like 8000>'
```

### Running the project
The frontend is in ReactJS, after the installations are done, in the frontend directory run the following command to start the React Server.
```
npm run start
```

The backend is in NodeJS, inside the backend directory, run the following command to start the NodeJS Server.
```
nodemon App.js
OR
node App.js
```

That's it, your project is up and running. 

## Working of the project

There are two functionalities you can do using the front end:
- Add a problem
- Solve an existing problem

### Adding a Problem 
<img width="1470" alt="Screenshot 2023-07-28 at 2 35 43 PM" src="https://github.com/Debojit219/OnlineJudge/assets/58102871/ff964877-1e03-459d-a736-4ac7bea0c00e">

Here you can add the problem.
- Add the problem title.
- Add the problem statement, constraints, example user input/output
- Explanation for the input output.

<img width="1016" alt="Screenshot 2023-07-28 at 2 37 27 PM" src="https://github.com/Debojit219/OnlineJudge/assets/58102871/dfb9f004-7966-49f1-aac1-e4891fc38655">
- Test case files.
- Click the submit button to create a new problem

This problem will be visible in the Problems page. You can navigate using the Navigation Bar.

### Solving a problem
- In the home page select a problem, I will solve the `Add two numbers` problem.
<img width="1470" alt="Screenshot 2023-07-28 at 2 39 28 PM" src="https://github.com/Debojit219/OnlineJudge/assets/58102871/e70a747f-095a-44ea-a191-3d4f221bdbd5">
- Read the problem statement.
- Select the language you want, and write the code.
<img width="1470" alt="Screenshot 2023-07-28 at 2 40 12 PM" src="https://github.com/Debojit219/OnlineJudge/assets/58102871/e9845e0f-f77c-4233-8c36-ced217ff7186">
- Add some custom inputs and run the test case to get output for the custom input.
- Click on `Submit Code` button to run against the test case files.
- If all the test cases are passed you will get a verdict of `Accepted`, else `Wrong Answer`.
<img width="766" alt="Screenshot 2023-07-28 at 2 46 15 PM" src="https://github.com/Debojit219/OnlineJudge/assets/58102871/67d16ca8-0a63-49a4-ab9e-6fb76cda13f6">


That's it! 

## Things planned ahead
- Multiple test case files running and adding a scoring feature based on the number of test cases passed.
- Adding a login page, and authorize only admins to add problems
- Builing a compiler backend, instead of using an external API, the code compiles in our backend. 
