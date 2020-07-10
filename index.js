const Nightmare = require('nightmare')
let nightmare;

const config = require('config.json');

const hoopURL = config.url;
let proxies = [config.proxies];

for(let i = 0;i < config.threads;i++) {
    setTimeout(() => {
        let pickedProxy = `${proxies[Math.floor(Math.random() * proxies.length)]}`;
        nightmare = Nightmare({
            show: true, 
            switches: {
                'proxy-server': `${pickedProxy}`,
                'ignore-certificate-errors': true
            }
        });

        nightmare
        .goto(hoopURL,  // You can change some commented headers, but those MUST be simulating some sort of browser
        [
            "Host: hoop.photo",
            "User-Agent: Mozilla/5.0 (Windows NT 10.0; rv:68.0) Gecko/20100101 Firefox/68.0", // You can change this header
            "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language: en-US,en;q=0.5",                                                // You can change this header
            "Accept-Encoding: gzip, deflate, br",
            "Connection: keep-alive",
            "Upgrade-Insecure-Requests: 1",
            "Cache-Control: max-age=0",
            "TE: Trailers"
        ])
        .wait('#store-button > a:nth-child(1) > img:nth-child(1)')
        .wait(Math.floor((Math.random() * 5 ) * 1000))
        .evaluate(() => document.querySelector('#store-button > a:nth-child(1) > img:nth-child(1)').href)
        .click('#logo_hoop')
        .click('#background')
        .click('#store-button > a:nth-child(1) > img:nth-child(1)')
        .wait(Math.floor((Math.random() * 5 ) * 1000))
        .end()
        .then(console.log(`Done received from ${pickedProxy}`))
        .catch(error => {
        console.error(`Failed received from ${pickedProxy}`)
        })
    }, (Math.random() * 7) * 1000);
}
