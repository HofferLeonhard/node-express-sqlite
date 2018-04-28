// Chargement des modules
const express = require('express')
const app = express()
var sqlite3 = require('sqlite3').verbose()
var path    = require("path")
var bodyParser = require('body-parser')
var multer = require('multer') // v1.0.5
var upload = multer() // for parsing multipart/form-data


// Déclaration des variables et constantes
let port = process.env.PORT || 3000; // Choisi un port libre ou prend le port 3000
var db = new sqlite3.Database('databases/user.sqlite3'); // Ouverture de la BD avec comme nom de la BD : user.sqlite3

// Gestion des routes de l'API

// Utilisation du repertoire client avec tous ses fichiers dans toutes les routes
app.use(express.static(__dirname+"/client")); 

// Utilisation des modules pour pouvoir uploader via les formulaires
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


// gestion de la route principale :  /
app.get('/', function (req, res) {  // Route par défaut : /
  console.log("User intered in a root page");
  
  res.sendFile(path.join(__dirname+'/client/index.html'));
})

// gestion de la route : /info
app.get('/info', function (req, res) { // Route info : /info
  var response = "API Rest v1.0";
  	  response += "<br/> @Author : me@email.com";
  	  response += "<br/> @Path : info";

  res.send(response);
})


// gestion de la route : /user/identifiant
app.get('/user/:id', function (req, res) { // Route info : /info
  console.log("Get user Id : "+req.params.id);

  	db.serialize(function() {
	  var users = {};

	  	// Lecture de tout les utilisateurs de la BD
	  	db.all("SELECT rowid AS id, nom, prenom, sexe, email FROM users WHERE id = "+req.params.id, function(err, rows) {
			if(!err){
				rows.forEach(function (row) {
		           users[row.id] = {nom:row.nom, prenom:row.prenom, sexe:row.sexe, email:row.email};
					
		        });
				
				res.json(users);
			} 
			else{ // Erreur lors de l'exécution de la requete
				var response = '<span style="color:red">Erreur</span>';
			  	  	response += "<br/> Désolé, votre base de données ne contient aucun enregistrement dans users correspondant à l'id : "+req.params.id;
			  	  	
			  	console.log("Erreur sqlite : "+err);
				res.send(response);
			}
	  	});

	  	
	});

})

// gestion de la route : /user/
app.get('/user/', function (req, res) { // Route user : /user/, pour récupérer la liste des utlisateurs

  	db.serialize(function() {
	  var users = {};
	  	// Lecture de tout les utilisateurs de la BD
	  	db.all("SELECT rowid AS id, nom, prenom, sexe, email FROM users", function(err, rows) {
	  		
			if(!err){
				console.log("Get all users : "+rows.length);

				rows.forEach(function (row) {
		           users[row.id] = {nom:row.nom, prenom:row.prenom, sexe:row.sexe, email:row.email};
					
		        });
				
				res.json(users);
			} 
			else{ // Erreur lors de l'exécution de la requete
				var response = '<span style="color:red">Erreur</span>';
			  	  	response += "<br/> Désolé, votre base de données ne contient aucun enregistrement dans users ";
			  	  	
			  	console.log("Erreur sqlite : "+err);
				res.send(response);
			}
	  	});

	  	
	});

  	
});


// gestion de la route : /user/add
app.post('/user/add/', upload.array(), function (req, res, next) { // Route user/add : /user/add, pour ajouter un utilisateur à la liste des utlisateurs
	var user = req.body;

  	// Insertion des données dans la BD
	db.serialize(function() {
	  db.run("CREATE TABLE IF NOT EXISTS users (nom TEXT, prenom TEXT, sexe TEXT, email TEXT)");

	  var stmt = db.prepare("INSERT INTO users VALUES (?, ?, ?, ?)");
	  stmt.run(user.nom, user.prenom, user.sexe, user.email);
	  stmt.finalize();
	});

	console.log(req.body);
  	res.json(req.body);
});

// gestion de la route : /user/add/multi
app.post('/user/add/multi', upload.array(), function (req, res, next) { // Route user/add : /user/add, pour ajouter plusieurs utilisateurs à la liste des utlisateurs
	var users = req.body;
	for(var id in users){
		users[id] = JSON.parse(users[id]);

		// Insertion des données dans la BD
		db.serialize(function() {
		  db.run("CREATE TABLE IF NOT EXISTS users (nom TEXT, prenom TEXT, sexe TEXT, email TEXT)");

		  var stmt = db.prepare("INSERT INTO users VALUES (?, ?, ?, ?)");
		  stmt.run(users[id].nom, users[id].prenom, users[id].sexe, users[id].email);
		  stmt.finalize();
		});

	}

  	console.log(users);
  	res.json(users);
});



// Lancement de l'écoute du serveur sur le port : port
app.listen(port, function () {
  console.log('Serveur démarré sur le port '+port+" à l'écoute des requetes. Url : http://localhost:"+port);
})

