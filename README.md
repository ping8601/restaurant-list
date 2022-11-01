# restaurant-list

A restaurant list website built with Node.js and Express. It allows the users to create their own acocunts and manage their favorite restaurants.

## Features
* Users can register with their name, email, and password
* Users can also choose to register and login with Facebook or Google accounts
* User can create a new restaurant
* Users can view the detail information of the restaurants by clicking on the cards
* Users can edit the detail of the restaurants
* Users can search for the restaurants with keywords
* Users can delete the restaurants

# Website Screenshot
* Register
![image](https://user-images.githubusercontent.com/107028314/199236093-081e517c-d922-4fbf-93ca-5cc1ce0d7e41.png)
* Login
![image](https://user-images.githubusercontent.com/107028314/199236052-0d5d34f6-4f09-4107-81fa-edd0a5548538.png)
* Home page
![image](https://user-images.githubusercontent.com/107028314/199236205-08c3100e-74a2-4854-bce1-47bcf5a40788.png)
* Detail page
![image](https://user-images.githubusercontent.com/107028314/199236801-ec257ad6-669c-4973-99da-84968fbdf525.png)
* Create new restaurant
![image](https://user-images.githubusercontent.com/107028314/199236304-b94a520c-4703-4982-8731-0420b9742a3d.png)
* Edit restaurant
![image](https://user-images.githubusercontent.com/107028314/199236365-0c57cb1b-8b38-4081-94d7-bef0ed523293.png)

# Getting Started

## Environment
* Node.js 16.17.0 
* npm 8.15.0
* MongoDB 

## Installation
1. Open the Terminal and clone the repo
```bash
git clone https://github.com/ping8601/restaurant-list/
```
2. Use the Terminal to open the folder of the project
```bash
cd restaurant-list
```
3. Install all the needed package with npm
```bash
npm install
```
4. Add a file .env and add required environment variables mentioned in .env.example

5. Add the seed restaurant and seed users
```bash
npm run seed
```
6. Start the server
```bash
npm run start
```
7. If you see this message, the server is successfully started
```bash
Express is now listening on localhost:3000
```
8. Open your brower and enter the link http://localhost:3000 to start exploring the website!

9. Use two test accounts in the seed data to login or create your own acocunt.
```bash
email: user1@example.com
password: 12345678
--------------------------
email: user2@example.com
password: 12345678
```
10. Press control + c to end the server

# Development Tools
* Bcryptjs 2.4.3
* Bootstrap 4.3.1
* Connect-Flash 0.1.1
* Dotenv 8.2.0
* Node.js 16.7.0
* Express 4.16.4
* Express-Handlebars 3.0.0
* Express-Session 1.17.1
* Font-awesome 5.8.1
* Method-Override 3.0.0
* Mongoose 5.9.7
