const mysql = require('mysql')
const connection = mysql.createConnection({
  host: '192.168.122.5',
  user: 'dbuser',
  password: '201-409',
  database: 'safha-db2'
})

connection.connect()

connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
  if (err) throw err

  console.log('The solution is: ', rows[0].solution)
})

connection.end()
