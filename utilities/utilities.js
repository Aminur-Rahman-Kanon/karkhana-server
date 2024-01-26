const https = require('https');

function cronJobs () {
    setInterval(() => {
        https.get('https://karkhana-server.onrender.com', (res) => {
            console.log('pinging...');
        })
    }, 840000);
}

module.exports = {
    cronJobs
}
