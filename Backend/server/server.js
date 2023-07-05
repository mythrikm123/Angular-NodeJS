const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const fs = require('fs');
const products = require('./products.json');
app.use(cors());
app.use(bodyParser.json());


//get the data
app.get('/api/products', (req, res) => {
  const product = require('./products.json');
  res.json(product);
});

// Add the data
app.post('/api/products', (req, res) => {
    fs.readFile('products.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error reading data');
      } else {
        const jsonData = JSON.parse(data);
        const { userId, id, title, body } = req.body;
        const newData = {
          userId,
          id,
          title,
          body
        };
        jsonData.push(newData);
        fs.writeFile('products.json', JSON.stringify(jsonData), (err) => {
          if (err) {
            console.error(err);
            res.status(500).send('Error writing data');
          } else {
            res.status(201).json(newData);
          }
        });
      }
    });
  });

// Update a data
app.put('/api/products/:id', (req, res) => {
  const id = req.params.id;
  const updatedProduct = req.body;
  const title = products.findIndex((product) => {if(product.id == id ){
    return id
  }else{
    return -1
  }
  ;});
  
  const body=products.findIndex((product)=>product.id ===id)
  console.log(title);
  if (title !== -1) {
    products[title] =updatedProduct;
    products[body]= updatedProduct;
    fs.writeFile('./products.json', JSON.stringify(products), (err) => {

      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error writing to products.json' });
      } else {
        res.json({ message: 'Product updated successfully' });
      }
    });
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});


// Delete the data
app.delete('/api/products/:id', (req, res) => {
  const id = req.params.id;
  fs.readFile('products.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to read data file.' });
    }
    let products = JSON.parse(data);
    const index = products.findIndex((product) => product.id == id);
    if (index !== -1) {
      products.splice(index, 1);

      fs.writeFile('products.json', JSON.stringify(products), (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Failed to update data file.' });
        }
        return res.status(200).json({ message: 'Product deleted successfully.' });
      });
    } else {
      return res.status(404).json({ error: 'Product not found.' });
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});

  

  

  
  



