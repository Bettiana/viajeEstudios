// Copyright IBM Corp. 2014. All Rights Reserved.
// Node module: loopback-example-offline-sync
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

module.exports = {
  mysqlDs: {
    connector: 'mysql',
    hostname: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'viajeEstudio',
  },
  myEmailDataSource: {
    name: "myEmailDataSource",
    connector: "mail",
    transports: [{
      type: "smtp",
      host: "smtp.private.com",
      secure: false,
      port: 465,
     
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    }]

        
  }
};
