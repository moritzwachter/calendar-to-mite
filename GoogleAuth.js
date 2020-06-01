const fs = require('fs');
const readline = require('readline');
const {google: googleAuth} = require('googleapis');
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];

const config = require('./Config.js');
const directory = config.GOOGLE_AUTH_DIRECTORY;
const credentialsPath = directory + 'credentials.json';
const tokenPath = directory + 'token.json'

    class GoogleAuth {
    auth (callback) {
        // Load client secrets from a local file.
        fs.readFile(credentialsPath, (err, content) => {
            if (err) return console.log('Error loading client secret file:', err);
            // Authorize a client with credentials, then call the Google Calendar API.
            return this.authorize(JSON.parse(content), callback);
        });
    }

    /**
     * Create an OAuth2 client with the given credentials, and then execute the
     * given callback function.
     * @param {Object} credentials The authorization client credentials.
     * @param {function} callback The callback to call with the authorized client.
     */
    authorize(credentials, callback) {
        const {client_secret, client_id, redirect_uris} = credentials.installed;
        const oAuth2Client = new googleAuth.auth.OAuth2(
            client_id, client_secret, redirect_uris[0]);

        // Check if we have previously stored a token.
        fs.readFile(tokenPath, (err, token) => {
            if (err) return getAccessToken(oAuth2Client, callback);
            oAuth2Client.setCredentials(JSON.parse(token));
            callback(oAuth2Client);
        });
    }

    /**
     * Get and store new token after prompting for user authorization, and then
     * execute the given callback with the authorized OAuth2 client.
     * @param {googleAuth.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
     * @param {getEventsCallback} callback The callback for the authorized client.
     */
    getAccessToken(oAuth2Client, callback) {
        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES,
        });
        console.log('Authorize this app by visiting this url:', authUrl);
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        rl.question('Enter the code from that page here: ', (code) => {
            rl.close();
            oAuth2Client.getToken(code, (err, token) => {
                if (err) return console.error('Error retrieving access token', err);
                oAuth2Client.setCredentials(token);
                // Store the token to disk for later program executions
                fs.writeFile(tokenPath, JSON.stringify(token), (err) => {
                    if (err) return console.error(err);
                    console.log('Token stored to', tokenPath);
                });
                return callback(oAuth2Client);
            });
        });
    }
}

module.exports = new GoogleAuth();