import express from 'express'
import pg from 'pg'
import axios from 'axios'
import livereload from 'livereload'
import connectLivereload from 'connect-livereload'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const app = express() // create an Express app
const port = 3000 // port to run the server on
app.use(express.static('public')) // to serve static files
app.use(express.json()) // to parse the JSON
app.use(express.urlencoded({ extended: true })) // to parse the form data
app.set('view engine', 'ejs') // to use EJS template engine

//  file to the project
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
// Watching and reloading webpage when some changing happens
const liveReloadServer = livereload.createServer({
  extraExts: ['ejs'], // watching ejs files
})
liveReloadServer.watch(__dirname) // watch the current directory
app.use(connectLivereload())

const db = new pg.Client({
  password: 'pg703818op',
  user: 'postgres',
  host: 'localhost',
  database: 'books',
  port: 5432,
})
db.connect() // connect to the database

let books = [] // to store the books

// get all the books from the database
async function getBooks() {
  //   const result = await db.query('SELECT * FROM books ORDER BY id ASC;');
  //   books = result.rows;
}

// render the home page
app.get('/', async (req, res) => {
  await getBooks() // get the books from the database
  res.render('index.ejs', { books: books })
})

// add a new book
app.post('/add', async (req, res) => {
  //   const book = req.body.book;
  //   const author = req.body.author;
  //   const result = await db.query(
  //     'INSERT INTO books (book, author) VALUES ($1, $2);',
  //     [book, author]
  //   );
  res.redirect('/')
})

// delete a book
app.post('/delete', async (req, res) => {
  //   const id = req.body.id;
  //   const result = await db.query('DELETE FROM books WHERE id = $1;', [id]);
  res.redirect('/')
})

// update a book
app.post('/update', async (req, res) => {
  //   const id = req.body.id;
  //   const book = req.body.book;
  //   const author = req.body.author;
  //   const result = await db.query(
  //     'UPDATE books SET book = $1, author = $2 WHERE id = $3;',
  //     [book, author, id]
  //   );
  res.redirect('/')
})

// listen on the port
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})

// Run the server using the following command:
// nodemon index.js --experimental-json-modules
// install nodemon using the following command:
// npm install -g nodemon
// Open the browser and go to http://localhost:3000 to see the app in action.
