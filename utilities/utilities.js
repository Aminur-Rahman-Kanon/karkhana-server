const https = require('https');

function cronJobs () {
    const id = setInterval(() => {
        https.get('https://karkhana-server.onrender.com', (res) => {
            console.log('pinging...');
        })
    }, 840000);
    
    clearInterval(id);
}

module.exports = {
    cronJobs
}
