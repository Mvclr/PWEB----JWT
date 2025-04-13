const connection = require('../db/connection');

const numProdutos = connection.query(
    'SELECT COUNT(product_id) AS total FROM products',
    (error, results) => {
      if (error) {
        console.error('Error fetching number of products:', error);
        return;
      }
      console.log('Number of products:', results[0].total);
    }
  )

 export default numProdutos;