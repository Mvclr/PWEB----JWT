const connection = require('../../db/db_server.js')


const numClientes = connection.query(
    'SELECT COUNT(client_id) AS total FROM clients',
    (error, results) => {
      if (error) {
        console.error('Error fetching number of clients:', error);
        return;
      }
      console.log('Number of clients:', results[0].total);
    }
  )

export default numClientes;



