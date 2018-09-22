const https = require('https');
const query = require('./lib/query.js');

const defaultAgent = 'WeebWrapper/1.0';

class Weeb {
    constructor() {
        this.token = undefined;
        this.agent = undefined;
    }

    login(token, agent) {
        if (!token) return console.error('[weeb] missing token, failed to log in');
        if (token.match(/((Wolke) [A-z0-9/+=]{88})|((Bearer) [A-z0-9/+=\-_.]{300})/g)) {
            this.token = token;
            console.log('[weeb] successfully logged in')
        } else {return console.error('[weeb] malformed token, failed to log in')};
        if (!agent) return console.error('[weeb] warning! it is strongly advised to set a user-agent');
        if (agent.match(/([^\/\s]+)([\/])([^\/\s]+)(([\/])([^\/\s]+))?/g)[0] == agent) {
            this.agent = agent;
            console.log('[weeb] user-agent set to ' + agent);
        } else {console.error('[weeb] malformed user-agent')};
    }

    async tophRandom(endpoint, options = {}) {
        return new Promise((resolve, reject) => {
            let params = query([
                {name: 'type', value: endpoint},
                {name: 'tags', value: options.tags},
                {name: 'nsfw', value: options.nsfw},
                {name: 'hidden', value: options.hidden},
                {name: 'filetype', value: options.filetype}
            ]);

            let request = {
                'host': 'api.weeb.sh',
                'path': `/images/random${params}`,
                'method': 'GET',
                headers: {'Authorization': this.token, 'User-Agent': this.agent}
            };

            if (this.agent === undefined) {
                console.error('[weeb] warning! requested without valid user-agent');
                request.headers['User-Agent'] = defaultAgent;
            }

            https.get(request, (res) => {
                res.setEncoding('utf8');
                let body = '';
                res.on("data", (data) => {body += data});
                res.on("end", () => {
                    resolve(new Image(JSON.parse(body)));
                });
            });
        });
    }

    async tophTypes(options = {}) {
        return new Promise((resolve, reject) => {
            let params = query([
                {name: 'hidden', value: options.hidden},
                {name: 'nsfw', value: options.nsfw},
                {name: 'preview', value: options.preview}
            ]);

            let request = {
                'host': 'api.weeb.sh',
                'path': `/images/types${params}`,
                'method': 'GET',
                headers: {'Authorization': this.token, 'User-Agent': this.agent}
            };

            if (this.agent === undefined) {
                console.error('[weeb] warning! requested without valid user-agent');
                request.headers['User-Agent'] = defaultAgent;
            }

            https.get(request, (res) => {
                res.setEncoding('utf8');
                let body = '';
                res.on("data", (data) => {body += data});
                res.on("end", () => {
                    resolve(JSON.parse(body).types);
                });
            });

        })
    }

    async tophTags(options = {}) {
        return new Promise((resolve, reject) => {
            let params = query([
                {name: 'hidden', value: options.hidden},
                {name: 'nsfw', value: options.nsfw}
            ]);

            let request = {
                'host': 'api.weeb.sh',
                'path': `/images/tags${params}`,
                'method': 'GET',
                headers: {'Authorization': this.token, 'User-Agent': this.agent}
            };

            if (this.agent === undefined) {
                console.error('[weeb] warning! requested without valid user-agent');
                request.headers['User-Agent'] = defaultAgent;
            }

            https.get(request, (res) => {
                res.setEncoding('utf8');
                let body = '';
                res.on("data", (data) => {body += data});
                res.on("end", () => {
                    resolve(JSON.parse(body).tags);
                });
            });

        })
    }

    async tophInfo(imageId) {
        return new Promise((resolve, reject) => {

            let request = {
                'host': 'api.weeb.sh',
                'path': `/images/info/${encodeURIComponent(imageId)}`,
                'method': 'GET',
                headers: {'Authorization': this.token, 'User-Agent': this.agent}
            };

            if (this.agent === undefined) {
                console.error('[weeb] warning! requested without valid user-agent');
                request.headers['User-Agent'] = defaultAgent;
            }

            https.get(request, (res) => {
                res.setEncoding('utf8');
                let body = '';
                res.on("data", (data) => {body += data});
                res.on("end", () => {
                    resolve(new Image(JSON.parse(body)));
                });
            });

        })
    }
}

class Image {
    constructor(data) {
        this.id = data.id;
        this.type = data.type;
        this.baseType = data.baseType;
        this.nsfw = data.nsfw;
        this.fileType = data.fileType;
        this.mimeType = data.mimeType;
        this.account = data.account;
        this.hidden = data.hidden;
        this.tags = data.tags;
        this.url = data.url;
        this.timestamp = Date.now();
    }
}

module.exports = new Weeb();
