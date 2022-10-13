# restaurant-list

A restaurant list website built with Node.js and Express. It allows the users to manage and search for their favorite restaurants.

## Features
* Users can view and sort all the restaurants in the list
![image](https://user-images.githubusercontent.com/107028314/195610019-4085e8aa-4202-4c04-9ab6-77cae2c62f07.png)
* Users can search for the restaurants with keywords
![image](https://user-images.githubusercontent.com/107028314/195610265-faf56434-37a2-423f-860d-ffdbdc23e488.png)
* Users can view the detail information of the restaurants by clicking on the cards
![image](https://user-images.githubusercontent.com/107028314/195610317-b2e277b2-c281-40b0-87f8-14a2918b9320.png)
* Users can edit the detail of the restaurants
![image](https://user-images.githubusercontent.com/107028314/195610406-5a9cdbc9-d97a-45ab-bee1-88126ac00630.png)
* Users can delete the restaurants

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
cd restaurantList
```
3. Install all the needed package with npm
```bash
npm install
```
4. Set MONGODB_URI as a environment variable for MongoBD connection
```bash
export MONGODB_URI="Your MongoDB connection URL"
```
5. Add the seeds
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
9. Press control + c to end the server

# Development Tools
* Node.js 16.7.0
* Express 4.16.4
* Express-Handlebars 3.0.0
* Bootstrap 4.3.1
* Font-awesome 5.8.1
* mongoose 5.9.7
