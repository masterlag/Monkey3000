const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser');
const morgan = require('morgan');
const models = require('./models/index');


// Decode json and x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Add a bit of logging
app.use(morgan('short'))

app.set('view engine', 'pug');
app.set('views' , path.join(__dirname, '../views'))

app.use(express.static(path.join(__dirname, "../public")));

models.Monkeys.belongsTo(models.Enclos);
models.Enclos.hasMany(models.Monkeys, { as: "Monkeys" });


app.get('/',function (req, res){
	res.render('index', {
	  title: 'Homepage'
	})
})

//Monkeys
// Get all the monkeys defined
app.get('/Monkeys', function (req, res) {
    models.Monkeys.findAll()
		.then((monkey) => {
      MonkeysVar = monkey;
			res.render('singes', { title: 'Singes', monkeys: MonkeysVar})
		})
})



app.get('/Monkeys/:id', function (req, res) {
    models.Monkeys.findOne({ where: { id: req.params.id } })
        .then((monkey) => {
            res.render('singe', { title: 'Singe', monkeyOnly: monkey});
        })
})

app.get('/CreateMonkey', function(req, res) {
  res.render('ajouter_singe')
})

// Add a new user to the database
app.post('/Monkeys', function(req, res) {
  models.Monkeys.create({
    Mname: req.body.Mname,
    age: req.body.age,
    taille: req.body.taille,
    poids: req.body.poids,
    job: req.body.job,
    enclo: req.body.enclo
  })
    .then(() => {
      res.render('Monkey-Added')
    })
})

//Delete
app.get('/DeleteMonkey/:id', function(req, res) {
  models.Monkeys.destroy({ where: {id: req.params.id}})
    .then((monkey) =>{
        res.render('Monkey-Deleted')
      })
})

//Update 
app.get('/UpdateMonkey/:id', function(req, res) {
  res.render('update-monkey', {title:'Update Monkey', id: req.params.id});
})

app.post('/Monkeys/Update/:id', function(req, res) {
  models.Monkeys.update({Mname: req.body.Mname, age: req.body.age, taille: req.body.taille, poids: req.body.poids, job: req.body.job, enclo: req.body.enclo }, {where: {id: req.params.id}})
  .then(() =>{ 
      res.render('Monkey-Updated')
    })
})


//Enclos
//Show All Enclos
app.get('/Enclos', function (req, res) {
	models.Enclos.findAll()
		.then((enclo) => {
      EnclosVar = enclo;
			res.render('enclos', {title: 'Enclos',enclos: EnclosVar})
		})
})

app.get('/Enclos/:id', function(req, res) {
	models.Enclos.findOne({ where: {id: req.params.id} })
	.then((enclo) => {
    res.render('enclo', {title:'Enclo', enclo: enclo });
	})
})

// Add a new Enclo to the database
app.get('/CreateEnclo', function(req, res){
  res.render('ajouter_enclo');
})

app.post('/Enclos', function(req, res) {
  models.Enclos.create({
    TailleMax: req.body.TailleMax,
    EncloName: req.body.EncloName
  })
    .then(() => {
      res.render('Enclo-Added')
    })
})

//Delete Enclo
app.get('/DeleteEnclo/:id', function(req, res) {
  models.Enclos.destroy({ where: {id: req.params.id }})
  .then((enclo) =>{
      res.render('Enclo-Deleted')
    })
})

app.get('/UpdateEnclo/:id', function(req, res){
  res.render('update-enclo', {title:'Update Enclo', id: req.params.id})
})

//Update Enclo
app.post('/Enclos/Update/:id', function(req, res) {
  models.Enclos.update({
    TailleMax: req.body.TailleMax,
    EncloName: req.body.EncloName },
  {where: {id: req.params.id}
	})
  .then(() =>{ 
      res.render('Enclo-Updated')
    })
})

//Getter By Enclo
app.get('/Enclos/Monkeys/:enclo', function(req,res) {
	models.Monkeys.findAll({
		where: {enclo: req.params.enclo}
	})
	.then((monkeys) => {
		res.json(monkeys)
	})
})


app.get('/MonkeyByEnclo/:id', function(req, res) {
  models.Monkeys.findAll({ where: {id: req.body.enclo }})
  .then((monkeys) => {
    res.render('Monkey-By-Enclo', {title:'MonkeyByEnclo', monkeys: monkeys})
  })
})

// Synchronize models
models.sequelize.sync().then(function() {
  /**
   * Listen on provided port, on all network interfaces.
   * 
   * Listen only when database connection is sucessfull
   */
  app.listen(process.env.PORT, function() {
    console.log('Express server listening on port ' + process.env.PORT);
  });
});