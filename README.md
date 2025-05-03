## 🗳️ Poll App – MEAN Stack Application with Real-Time Chat 💬

This is a full-featured Poll Application built using the MEAN stack (MongoDB, Express, Angular, Node.js) with Socket.IO-powered real-time chat. Users can vote on polls and interact with other participants in real time through chat rooms.

This project is hosted and live: https://www.pollapp.homeserviceapp.site

## ✨ Features
## 👥 User Side

User registration and login (JWT-based)

View and participate in active polls

Submit a vote (restricted to one vote per poll)

See live poll results instantly

Join poll-specific real-time chat rooms via Socket.IO

## 🛠️ Admin Side

Admin login with role-based access

Create, edit, and delete polls

Enable/disable voting and chat for each poll

Moderate poll chats (optional enhancement)

View poll statistics and user engagement

## 🧰 Tech Stack

Frontend: Angular

Backend: Node.js, Express.js

Database: MongoDB (Mongoose)

Authentication: JWT

Real-Time Communication: Socket.IO

UI Styling: Angular Material / Tailwind CSS (as per your implementation)

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## 📁 Folder Structure

poll-app-frontend/
├── src/
│   ├── app/
│   │   ├── components/
│   │   ├── services/
│   │   ├── guards/
│   │   ├── models/
│   │   └── sockets/ 

## 🚀 Getting Started

git clone https://github.com/yourusername/poll-app-frontend.git
cd poll-app-frontend
npm install
ng serve
Visit the app at:
http://localhost:4200

## 📡 Real-Time Chat

Each poll acts as a chat room.

Users can join rooms when viewing a poll.

Messages are broadcast live using Socket.IO.

Message history is preserved in MongoDB (if implemented).


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
