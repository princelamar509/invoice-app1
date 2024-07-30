import React, { useState } from 'react';

const BillDetails = ({ onAddItem, setFrom, setBillTo }) => {
    const [item, setItem] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');

    const handleAddItem = () => {
        if (!item.trim()) {
            setErrorMessage('Please input data in the Item section.');
            return;
        }

        if (quantity <= 0) {
            setErrorMessage('Quantity should be greater than zero.');
            return;
        }

        // Check if the item contains only alphabetical characters
        if (!/^[a-zA-Z]+$/.test(item)) {
            setErrorMessage('Item should only contain alphabetical characters.');
            return;
        }

        const newItem = { item, quantity, price };
        onAddItem(newItem);
        setItem('');
        setQuantity(1);
        setPrice(0);
        setErrorMessage('');
    };

    return (
        <div>
            <h2>Bill Details</h2>
            <label>From:</label>
            <input
                type="text"
                onChange={(e) => setFrom(e.target.value)}
                placeholder='Enter your Name/Company Name'
            />
            <label>Bill To:</label>
            <input
                type="text"
                onChange={(e) => setBillTo(e.target.value)}
                placeholder='Enter Name/Company Name'
            />
            <label>Item:</label>
            <input
                type="text"
                value={item}
                onChange={(e) => setItem(e.target.value)}
                placeholder='Enter Item Name'
            />
            <label>Quantity:</label>
            <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
            />
            <label>Price:</label>
            <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
            />
            <button onClick={handleAddItem}>
                Add Item
            </button>
            <p>{errorMessage}</p>
        </div>
    );
};

export default BillDetails;

