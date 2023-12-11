const cassandra = require('cassandra-driver');

const contactPoint = process.env.CASSANDRA_HOST || 'localhost';
const keyspace = process.env.CASSANDRA_KEYSPACE || "system"

const connection = new cassandra.Client({
    contactPoints: [contactPoint],// payment_DB 
    keyspace: "system",
    localDataCenter: 'datacenter1' 
});



async function initialize() {
    try {
      console.log("CASSANDRA_HOST",contactPoint)
      await connection.connect();
      
      // Create your keyspace
      await connection.execute(`CREATE KEYSPACE IF NOT EXISTS ${keyspace} WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1}`);
  
      // Switch to your keyspace
      await connection.execute(`USE ${keyspace}`);
  
      // Create your tables or perform other setup tasks here
      await connection.execute(`
        CREATE TABLE IF NOT EXISTS method (
                method_id UUID PRIMARY KEY,
                type text,
                cardNumber text,
                threeDigitCode text,
                user_id int
            );
        `);

      await connection.execute(`
        CREATE TABLE IF NOT EXISTS payment(
            payment_id UUID PRIMARY KEY,
            method_id UUID,
            amount float,
            refund boolean,
            user_id int
            );
        `)
      await connection.execute(`
        CREATE TABLE IF NOT EXISTS wallet (
            wallet_id UUID PRIMARY KEY,
            wallet float,
            user_id int
        )
      `)
  
      console.log('Keyspace and tables created successfully.');
    } finally {
      console.log("Database initialization finished ")
    }
  }
  
  initialize();


module.exports = connection;