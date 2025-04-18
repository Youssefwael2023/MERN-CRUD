import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CrudProduct = () => {
    const [form, setForm] = useState({
        name: '',
        price: '',
        description: '',
        quantity: ''
    });
    const [products, setProducts] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const fetchProducts = async () => {
        const res = await axios.get('http://localhost:4000/products/get');
        setProducts(res.data.data);
    };

    const addProduct = async () => {
        if (editMode) {
            await axios.put(`http://localhost:4000/products/update/${editId}`, form);
            setEditMode(false);
            setEditId(null);
        } else {
            await axios.post('http://localhost:4000/products/create', form);
        }

        fetchProducts();
        setForm({ name: '', price: '', description: '', quantity: '' });
    };


    const deleteProduct = async (id) => {
        await axios.delete(`http://localhost:4000/products/delete/${id}`);
        fetchProducts();
    };

    const handleEdit = (product) => {
        setForm({
            name: product.name,
            price: product.price,
            description: product.description,
            quantity: product.quantity
        });
        setEditMode(true);
        setEditId(product._id);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (

        <div className="container my-5 pt-5" >
            <h1 className="text-center text-white">Product CRUD</h1>
            <label htmlFor="name">Product Name</label>
            <input
                type="text"
                name="name"
                placeholder="Product Name"
                className="form-control mt-3 p-3 mb-4"
                value={form.name}
                onChange={handleChange}
            />

            <label htmlFor="price">Product Price</label>
            <input
                type="number"
                name="price"
                placeholder="Product Price"
                className="form-control mt-3 p-3 mb-4"
                value={form.price}
                onChange={handleChange}
            />

            <label htmlFor="quantity">Product quantity</label>
            <input
                type="number"
                name="quantity"
                placeholder="Product Quantity"
                className="form-control mt-3 p-3 mb-4"
                value={form.quantity}
                onChange={handleChange}
            />

            <label htmlFor="description">Product Description</label>
            <textarea
                name="description"
                placeholder="Product Description"
                className="form-control mt-3 p-3 mb-4"
                value={form.description}
                onChange={handleChange}
            />

            <button
                className="my-5 btn text-light p-3 fs-5"
                style={{ backgroundColor: editMode ? 'orange' : 'green' }}
                onClick={addProduct}
            >
                {editMode ? 'Update Product' : 'Add Product'}
            </button>




            <div className="pt-5 mt-5">
                <table className="table table-bordered text-center text-white">
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, i) => (
                            <tr key={product._id}>
                                <td>{i + 1}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.quantity}</td>
                                <td>{product.description}</td>
                                <td>
                                    <button className="btn btn-warning" onClick={() => handleEdit(product)}>Update</button>
                                </td>

                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => deleteProduct(product._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CrudProduct;