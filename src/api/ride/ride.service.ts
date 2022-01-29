import { db } from '../../schemas';

export const list = async (query) => {
  const limit = +query.pageSize ?? 'ALL';
  let skip = 0;

  if (limit !== 'ALL' && query.page) {
    skip = +query.page > 0 ? (+query.page - 1) * limit : 0;
  }

  const page = query.page ?? '0';
  let sql = `SELECT * FROM Rides LIMIT ${limit} OFFSET ${skip}`;
  return new Promise(function (resolve, reject) {
    db.all(sql, function (err, rows) {
      console.log(err);

      if (err) {
        return resolve({
          error_code: 'SERVER_ERROR',
          message: 'Unknown error',
        });
      }

      if (rows.length === 0) {
        return resolve({
          error_code: 'RIDES_NOT_FOUND_ERROR',
          message: 'Could not find any rides',
        });
      }

      return resolve(rows);
    });
  });
};

export const create = async (body) => {
  const startLatitude = Number(body.start_lat);
  const startLongitude = Number(body.start_long);
  const endLatitude = Number(body.end_lat);
  const endLongitude = Number(body.end_long);
  const riderName = body.rider_name;
  const driverName = body.driver_name;
  const driverVehicle = body.driver_vehicle;

  if (
    startLatitude < -90 ||
    startLatitude > 90 ||
    startLongitude < -180 ||
    startLongitude > 180
  ) {
    return {
      error_code: 'VALIDATION_ERROR',
      message:
        'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
    };
  }

  if (
    endLatitude < -90 ||
    endLatitude > 90 ||
    endLongitude < -180 ||
    endLongitude > 180
  ) {
    return {
      error_code: 'VALIDATION_ERROR',
      message:
        'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
    };
  }

  if (typeof riderName !== 'string' || riderName.length < 1) {
    return {
      error_code: 'VALIDATION_ERROR',
      message: 'Rider name must be a non empty string',
    };
  }

  if (typeof driverName !== 'string' || driverName.length < 1) {
    return {
      error_code: 'VALIDATION_ERROR',
      message: 'Rider name must be a non empty string',
    };
  }

  if (typeof driverVehicle !== 'string' || driverVehicle.length < 1) {
    return {
      error_code: 'VALIDATION_ERROR',
      message: 'Rider name must be a non empty string',
    };
  }

  const values = [
    body.start_lat,
    body.start_long,
    body.end_lat,
    body.end_long,
    body.rider_name,
    body.driver_name,
    body.driver_vehicle,
  ];

  return new Promise(function (resolve, reject) {
    db.run(
      'INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)',
      values,
      function (err) {
        if (err) {
          return resolve({
            error_code: 'SERVER_ERROR',
            message: 'Unknown error',
          });
        }

        db.all(
          'SELECT * FROM Rides WHERE rideID = ?',
          this.lastID,
          function (err, rows) {
            if (err) {
              return resolve({
                error_code: 'SERVER_ERROR',
                message: 'Unknown error',
              });
            }
            return resolve(rows);
          }
        );
      }
    );
  });
};

export const getById = async (id) => {
  const sql = `SELECT * FROM Rides WHERE rideID='${id}'`;
  return new Promise(function (resolve, reject) {
    db.all(sql, function (err, rows) {
      if (err) {
        return resolve({
          error_code: 'SERVER_ERROR',
          message: 'Unknown error',
        });
      }

      if (rows.length === 0) {
        return resolve({
          error_code: 'RIDES_NOT_FOUND_ERROR',
          message: 'Could not find any rides',
        });
      }

      return resolve(rows);
    });
  });
};
