import sqlite3 from 'sqlite3';

export default (db) => {
  const createRideTableSchema = `
        CREATE TABLE Rides
        (
        rideID INTEGER PRIMARY KEY AUTOINCREMENT,
        startLat DECIMAL NOT NULL,
        startLong DECIMAL NOT NULL,
        endLat DECIMAL NOT NULL,
        endLong DECIMAL NOT NULL,
        riderName TEXT NOT NULL,
        driverName TEXT NOT NULL,
        driverVehicle TEXT NOT NULL,
        created DATETIME default CURRENT_TIMESTAMP
        )
    `;

  db.run(createRideTableSchema);

  return db;
};

const sqlite3Verbose = sqlite3.verbose();
export const db = new sqlite3Verbose.Database(':memory:');
