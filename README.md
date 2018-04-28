# Node Express Sqlite

simple nodejs app for using expressjs with sqlite package.

## How to use

The project is divided into two parts: a client and a server.

### # Server Part
It is this one which manages the reception of the requests and the sending of the answers through the API rest developed with express.
 
##### Install the Server
To use the server, you must install it. For that, it will be necessary to have an installation of nodejs in advance, which will make available npm for the installation of the packages. If you do not have one, you can download it here:
 
	https://nodejs.org

Once nodejs install, you will be able to provide by the installation of the necessary packages to the good operation of the server by:

1- Launch the console and position yourself at the root of the project (which you can download here or use git).

2- Type the command

	npm install

3- Wait for the installation of the packages to finish.

##### Launch the Server
Once all packages are installed, you can launch your server for testing. To do this, type the following command in the command:

	node server

##### Customer launch
You can access the client here in two ways:

1 - Through the server you just launched, via the url that was given to you at the console, namely: http: // domain: port

	Example: http://localhost:3000

2- By directly accessing the client directory through your browser, ie by directly accessing the "index.html" file of the "client" directory

### # Client Part
This part is very easy to use, just launch it to get the tests of its use.

It uses the AngularJS framework and its $ http module or service to issue asynchronous requests at the Rest Server.

Two tests here are highlighted:
1- Inserting a user, via the POST method of $ http, which sends the data of a form in JSON format.
More info on the $ http service at: 

	https://docs.angularjs.org/api/ng/service/$http

2- Insertion of several users, via the POST method of $ http, which sends the data of a form in JSON format. Here, the data is loaded into the form in such a way that the server can retrieve it through a JSON object.


## # How to exploit
You can test the operation of the API set up in the server by simply using a browser.

For that, just access the different routes created, for example:
- route "/"
  url: http: // localhost: 3000 /
  Redirects you to the customer's home page: client / index.html

- route "/info"
  url: http: // localhost: 3000 / info
  
	For information on the API

- route "/user"
  url: http://localhost:3000/user

  	For a list of registered users in the comic strip

- route "/user/:id"
  url: http://localhost:3000/user/:id
  
	To obtain the information of a user from his id (exp: 1,2,3, ...) which corresponds to his position in the comic strip

- route "/user/add"
  url: http://localhost:3000/user/add
  
	To add a user through the POST method, waiting for a JSON object as input

- route "/user/multi"
  url: http://localhost:3000/user/multi
  
	To add multiple users at once, through the POST method, which wait for a JSON object as input, then route and convert all the stringified entries during client-side submission through JSON.stringify


NB: le code est fortement commenté pour une meilleure compréhension

Enjoy it !