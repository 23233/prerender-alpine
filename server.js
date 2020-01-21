const prerender = require('prerender');
const server = prerender({
    chromeFlags: [
        '--headless',
        '--no-sandbox',
        '-–no-zygote',
        '-–no-first-run',
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '-–disable-setuid-sandbox',
        '--remote-debugging-port=9222',
        '-–single-process',
        '--hide-scrollbars',
        '--shm-size=1G',
    ],
    forwardHeaders: true,
    chromeLocation: '/usr/bin/chromium-browser',
    logRequests: true,
    // default 20000ms
    pageLoadTimeout: 6 * 1000,
    // default 500 ms
    pageDoneCheckInterval: 200,
});

//server.use(require('prerender-request-blacklist'));
server.use(prerender.removeScriptTags());
server.use(prerender.sendPrerenderHeader());
server.use(prerender.blockResources());
server.use(prerender.blacklist());
server.use(prerender.httpHeaders());
server.use(require('prerender-memory-cache'))

server.start();
