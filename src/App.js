import React, { useState } from 'react';
import BillDetails from './components/BillDetails';
import ItemList from './components/ItemList';
import TotalAmount from './components/TotalAmount';
import { jsPDF } from 'jspdf';
import './App.css';

function App() {
    const [items, setItems] = useState([]);
    const [from, setFrom] = useState('');
    const [billTo, setBillTo] = useState('');

    const handleAddItem = (item) => {
        setItems([...items, item]);
    };

    const handleDeleteItem = (index) => {
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        setItems(updatedItems);
    };

    const calculateTotalAmount = () => {
        return items.reduce(
            (total, item) =>
                total +
                item.quantity *
                item.price, 0);
    };

    const handleDownloadPDF = () => {
        const pdf = new jsPDF();
    
        // Add title
        pdf.text('Invoice', 20, 20);
        
        // Add static information
        pdf.text(`Date: ${new Date().toLocaleDateString()}`, 20, 30);
        pdf.text(`From: ${from}`, 20, 40);
        pdf.text(`Bill To: ${billTo}`, 20, 50);
    
        // Add table headers
        pdf.text("Item", 20, 60);
        pdf.text("Quantity", 80, 60);
        pdf.text("Price", 140, 60);
    
        // Add items to PDF
        items.forEach((item, index) => {
            const yPos = 70 + index * 10;
            pdf.text(item.item, 20, yPos);
            pdf.text(item.quantity.toString(), 80, yPos);
            pdf.text(item.price.toFixed(2).toString(), 140, yPos);
        });
    
        // Add total amount to PDF
        const totalAmount = calculateTotalAmount();
        pdf.text(`Total Amount: $${totalAmount.toFixed(2)}`, 20, 80 + items.length * 10);
    
        // Save the PDF
        pdf.save('invoice.pdf');
    };
    

    return (
        <div className="App">
            <h1>Bill/Invoice Generator</h1>
            <h3 >Bill/Invoice # : {items.length + 1} </h3>
            <h3>Date{new Date().toLocaleDateString()}</h3>
            <BillDetails onAddItem={handleAddItem} setFrom={setFrom} setBillTo={setBillTo} />
            <ItemList items={items} onDeleteItem={handleDeleteItem} />
            <TotalAmount total={calculateTotalAmount()} />
            <button onClick={handleDownloadPDF}>Download PDF</button>
        </div>
    );
}

export default App;
