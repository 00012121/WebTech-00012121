


// third party libs
const express = require('express')
const app = express()

// node libs
const fs = require('fs')
const PORT = 8000


app.set('view engine', 'pug')
app.use('/static', express.static('public'))
app.use(express.urlencoded({ extended: false }))

// http://localhost:8000
app.get('/', (req, res) => {
  fs.readFile('./data/bookings.json', (err, data) => {
    if (err) throw err

    const bookings = JSON.parse(data)

    res.render('home', { bookings: bookings })
  })
})

app.post('/add', (req, res) => {
  const formData = req.body

  if (formData.country.trim() == '') {
    fs.readFile('./data/bookings.json', (err, data) => {
      if (err) throw err

      const bookings = JSON.parse(data)

      res.render('home', { error: true, bookings: bookings },)
    })
  }



  else {
    fs.readFile('./data/bookings.json', (err, data) => {
      if (err) throw err

      const bookings = JSON.parse(data)

      const booking = {
        id: id(),
        country: formData.country,
        people: formData.number,
        phone: formData.phone,
        email: formData.email
      }

      bookings.push(booking)

      fs.writeFile('./data/bookings.json', JSON.stringify(bookings), (err) => {
        if (err) throw err

        fs.readFile('./data/bookings.json', (err, data) => {
          if (err) throw err

          const bookings = JSON.parse(data)

          res.render('home', { success: true, bookings: bookings })
        })
      })
    })
  }
})

app.post('/add', (req, res) => {
  const formData = req.body

  if (formData.people.parse(String) == '') {
    fs.readFile('./data/bookings.json', (err, data) => {
      if (err) throw err

      const bookings = JSON.parse(data)

      res.render('home', { error: true, bookings: bookings },)
    })
  }

  else {
    fs.readFile('./data/bookings.json', (err, data) => {
      if (err) throw err

      const bookings = JSON.parse(data)

      const booking = {
        id: id(),
        country: formData.country,
        people: formData.number,
        phone: formData.phone,
        email: formData.email
      }

      bookings.push(booking)

      fs.writeFile('./data/bookings.json', JSON.stringify(bookings), (err) => {
        if (err) throw err

        fs.readFile('./data/bookings.json', (err, data) => {
          if (err) throw err

          const bookings = JSON.parse(data)

          res.render('home', { success: true, bookings: bookings })
        })
      })
    })
  }
})

app.get('/:id/delete', (req, res) => {
  const id = req.params.id

  fs.readFile('./data/bookings.json', (err, data) => {
    if (err) throw err

    const bookings = JSON.parse(data)

    const filterBookings = bookings.filter(booking => booking.id != id)

    fs.writeFile('./data/bookings.json', JSON.stringify(filterBookings), (err) => {
      if (err) throw err

      res.render('home', { bookings: filterBookings, deleted: true })
    })
  })
})

app.listen(PORT, (err) => {
  if (err) throw err


  console.log(`This port is running on port ${PORT}`)
})

function id() {
  return '_' + Math.random().toString(36).substr(2, 9);
};