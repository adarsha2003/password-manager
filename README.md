# PassNotes - A personal Password Manager
I am developing password manager for BON VOYAGE MLH hackathon

# Requirements:

A Computer with node.js installed. You can install it from https://nodejs.org/en/download/

# How to Deploy?
1.First clone this repository using command
```
git clone https://github.com/adarsha2003/Passnotes
```
*OR you can also fork this reposiroty
2. Edit conn.js file in /src/db/conn.js, with your database connection details
4. (Optional) You can change port to run this app, by editing /src/app.js
5. Go to root directory of this project then run this command to install dependencies
```
cd Passnotes
npm install
```
5. Run this command in terminal to start the node.js server
```
npm run passnotes
```
6. Go to http://localhost:3000 to view application
## Inspiration
We can see a lot of paid tools on internet which provides service to manage a users passwords. I thought why can't i build a application which uses Cockroach DB to store password, Node.js to host web application. This will be my first step of Contribution to Open Source Projects.
## What it does
This WEB Application adds Password along with URL, email, username to database. Then it displays data stored on database. You can sort the passwords in table and also you can use search feature to find password.
## How I built it
I hosted this using Node.js. I have build an API which runs SQL commands to manage database. I have used Express.js during the creation of API. I used Datatables to display passwords store in database in form of table. For Frontend I have used Bootstrap.
## Challenges we ran into
Initially I thought to build multiple user support. But due to time shortage I didn't added that feature.
## What I learned
Creating an API in node.js. Usage of express.js in node.js
## What's next for PassNotes
I am thinking to add delete, edit feature for passwords. Also i am thinking to add multiple user support and authentication system to make PassNotes more secure. 
