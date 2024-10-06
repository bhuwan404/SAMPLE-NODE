## demo app - developing with Docker

This demo app shows a simple user profile app set up using 
- index.html with pure js and css styles
- nodejs backend with express module
- mongodb for data storage

All components are docker-based

### With Docker

#### To start the application

Step 1: start mongodb 

    docker run -d -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=password --name mongodb  mongo

Step 2: start mongo-express (optional)
    
    docker run -d -p 8081:8081 -e ME_CONFIG_MONGODB_ADMINUSERNAME=admin -e ME_CONFIG_MONGODB_ADMINPASSWORD=password --name mongo-express -e ME_CONFIG_MONGODB_SERVER=mongodb mongo-express   

Step 3: create `user-account` _db_ and `users` _collection_ in mongo-express

Step 4: Start the nodejs application locally - go to `app` directory of project 

    npm install 
    node server.js

Step 5: Start the nodejs application with docker container

    sudo docker build -t my-app:1 .
    sudo docker image ls
    sudo docker run -d -p 3000:3000 -e MONGODB_HOST=172.17.0.2 -e MONGODB_PORT=27017 --name myapp my-app:1
    
Step 6: Access you nodejs application UI from browser

    http://localhost:3000

### With Docker Compose

#### To start the application

Step 1: start mongodb and mongo-express

    docker-compose -f docker-compose.yaml up
    
_You can access the mongo-express under localhost:8080 from your browser_
    
Step 2: in mongo-express UI - create a new database "my-db"

Step 3: in mongo-express UI - create a new collection "users" in the database "my-db"       
    
Step 4: start node server 

    npm install
    node server.js
    
Step 5: access the nodejs application from browser 

    http://localhost:3000

#### To build a docker image from the application

    docker build -t my-app:1.0 .       
    
The dot "." at the end of the command denotes location of the Dockerfile.
