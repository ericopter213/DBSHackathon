const mongoose = require('mongoose');
const Transaction = require('./models/transactions'); // Adjust based on your project structure

mongoose.connect('mongodb://localhost:27017/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Sample data
const transactionsData = [
    { description: 'Transaction 1', amount: 100, date: new Date() },
    { description: 'Transaction 2', amount: 200, date: new Date() },
    // Add more transactions as needed
];

// Populate the collection
async function populateData() {
    try {
        await Transaction.insertMany(transactionsData);
        console.log('Data populated successfully');
    } catch (error) {
        console.error('Error populating data:', error);
    } finally {
        mongoose.disconnect();
    }
}

populateData();
