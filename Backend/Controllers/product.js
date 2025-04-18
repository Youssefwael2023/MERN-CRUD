const Product = require('../Models/product');

const createProduct = async (req, res) => {
  try {
    if (
      !req.body.name ||
      !req.body.description ||
      !req.body.price ||
      !req.body.quantity
    ) {
      return res.status(400).send({
        message: 'Send all required fields: name, description, price, quantity',
      });
    }
    const newProduct = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity,
    };

    const product = await Product.create(newProduct);

    return res.status(201).send(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    return res.status(200).json({
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    return res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
     if (
         !req.body.name ||
         !req.body.description ||
         !req.body.price ||
         !req.body.quantity
     ) {
       return res.status(400).send({
         message: 'Send all required fields: name, description, price, quantity',
       });
     }
 
     const { id } = req.params;
 
     const result = await Product.findByIdAndUpdate(id, req.body);
 
     if (!result) {
       return res.status(404).json({ message: 'Product not found' });
     }
 
     return res.status(200).send({ message: 'Product updated successfully' });
   } catch (error) {
     console.log(error.message);
     res.status(500).send({ message: error.message });
   }
};


const deleteProduct = async (req, res) => {
   try {
     const { id } = req.params;
 
     const result = await Product.findByIdAndDelete(id);
 
     if (!result) {
       return res.status(404).json({ message: 'Product not found' });
     }
 
     return res.status(200).send({ message: 'Product deleted successfully' });
   } catch (error) {
     console.log(error.message);
     res.status(500).send({ message: error.message });
   }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
