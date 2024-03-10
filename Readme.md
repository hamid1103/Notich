# Notich

## About
This is an online document editor with a build in "AI teacher".  

It uses langchain, mongoose, socket.io and express.js for the backend and svelte, socket.io and tailwind for the front-end. 

## Requirements
For the back-end, you need to have mongodb database. You can run one locally or one in mongo's cloud. You will need to change the `CMDBPW` variable in the env and change the db url in `/Server/db.js`

You also need a key for the news api https://newsapi.org
## .ENV File
The .env file needs to be in the `/Server` folder. 
> OPENAI_API_TYPE=  
OPENAI_API_VERSION=  
OPENAI_API_BASE=  
AZURE_OPENAI_API_KEY=  
DEPLOYMENT_NAME=  
ENGINE_NAME=  
ADA_ENGINE_NAME=  
INSTANCE_NAME=  
newsKey=   
#Authentication & Security Envs  
SECRET_KEY=  
mancerKey=  
#MongoDB Env  
MONGODB_URI=  
CMDBPW=  
privatekey=  
certificate=  
chain=

## Installation
1. Clone the repository 
2. Open a terminal into the project folder
3. Install the requirements in both Server and Client folders
> cd Server & npm i
> cd ../Client & npm i

## Start Development Servers
1. Change the `lurl` variable in `Server/lib/url` to the back-end's location. Most likely `localhos:3000`
2. Start the back-end in the Server folder

> npm run start

3. Start the front-end in the Client folder

> npm run dev

## Build Front-end
1. Change the `lurl` variable in `Server/lib/url` to the back-end's location.
2. Build the front-end
> npm build
3. The output will be in `/Client/dist`

## HTTPS Back-end setup 
1. If the front-end is hosted on a secure server, you will need to generate ssl files. This can be done using certbot.
The project includes a `certgen` file which you can use for the a-challenge. 
2. Include the generated files in the env. You might need to run the server as sudo.