# NodeJS Chat App


NodeJs, ExpressJs & Socket.io based real-time chat service.


## Getting Started
### To run the project:  
1. Clone the project  
```sh
git clone git@github.com:deepak41/nodejs-chat-app.git
```


2. Then enter the following commands:   
```sh
cd nodejs-chat-app
npm i
npm run dev
```

The app should be up and running. 

### To provide port no.:
```sh
npm run dev port 7001
```

### To run on AWS EC2 server using PM2:
```sh
sudo pm2 start index.js -- port 80
```
