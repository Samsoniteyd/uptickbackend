const { MongoClient } = require('mongodb');

// Use your actual connection string here
const uri = "mongodb+srv://username:password@cluster0.3zwylbq.mongodb.net/uptickbackend?retryWrites=true&w=majority";

async function testConnection() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('✅ Connected successfully to MongoDB');
    
    // List databases to verify connection
    const databasesList = await client.db().admin().listDatabases();
    console.log('Databases:');
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
  } finally {
    await client.close();
  }
}

testConnection();