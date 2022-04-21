const midtransClient = require('midtrans-client');
// Create Snap API instance
let snap = new midtransClient.Snap({
        isProduction : false,
        serverKey : "SB-Mid-server-1-HkvVEJLZRailN5k4NqUlG3",
        clientKey : "SB-Mid-client-heHZKrmmGqGoiXQs"
    });

module.exports={snap}