const express = require('express')
const bodyParser = require('body-parser')
const db = require('./models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const port = process.env.PORT || 3000

const app = express()
  .use(bodyParser.json())

var sequelize = new Sequelize('postgres://postgres:secret@localhost:5432/postgres')


app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
  next()
})
const { Player } = db
const { tops } = db

//PLAYERS
app.get('/players', (req, res) => {
  const players = Player
    .findAll()
    .then((players) => {
      res.json(players)
    })
    .catch((err) => {
      console.error(err)
      res.status(500)
      res.json({ message: 'Oops! There was an error getting the players. Please try again' })
    })
})

//adddogstoplayer
app.patch('/players/:id', (req, res) => {
  const alldogs = Player
    .findById(req.params.id)
    .then((p) => {
      if (p) {
        p.dogs= p.dogs.concat(req.body.dogs)
        p.save()
          .then((updatedP) => {
            res.json(updatedP)
          })
          .catch((err) => {
            res.status(422)
            res.json({ message: err.message })
          })
      } else {
        res.status(404)
        res.json({ message: 'Player not found!' })
      }
    })
    .catch((err) => {
      console.error(err)
      res.status(500)
      res.json({ message: 'Oops! There was an error getting the player. Please try again' })
    })
})

//CreateNewPlayer
app.post('/players', (req, res) => {
  const players = req.body

  Player.create(players)
    .then(entity => {
      res.status(201)
      res.json(entity)
    })
    .catch(err => {
      res.status(422)
      res.json({ message: err.message })
    })
})

//TOP10
app.get('/top10', (req, res) => {
  const dogs = tops
    .findAll({  attributes: ['dogname', 'score']})
    .then((dogs) => {
      res.json(dogs)
    })
    .catch((err) => {
      console.error(err)
      res.status(500)
      res.json({ message: 'Oops! There was an error getting the players. Please try again' })
    })
})


app.patch('/top10/:id', (req, res) => {
  const dogs = tops
    .findById(req.params.id)
    .then((p) => {
      if (p) {
        p.score = req.body.score
        p
          .save()
          .then((updatedP) => {
            res.json(updatedP)
          })
          .catch((err) => {
            res.status(422)
            res.json({ message: err.message })
          })
      } else {
        res.status(404)
        res.json({ message: 'Player not found!' })
      }
    })
    .catch((err) => {
      console.error(err)
      res.status(500)
      res.json({ message: 'Oops! There was an error getting the player. Please try again' })
    })
})


app.post('/top10', (req, res) => {
  const dogname = req.body

  tops.create(dogname)
    .then(entity => {
      res.status(201)
      res.json(entity)
    })
    .catch(err => {
      res.status(422)
      res.json({ message: err.message })
    })
})



app.listen(port, () => {
  console.log(`
Server is listening on ${port}.

Open http://localhost:${port}

to see the app in your browser.
    `)
})
