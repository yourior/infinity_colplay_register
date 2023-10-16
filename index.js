const puppeteer = require('puppeteer');
var readlineSync = require('readline-sync');
var fs = require('fs');
const DM = require('./DeviceManager');
const xpath = require('./xpath');
var { createCursor } = require ("ghost-cursor");
var {installMouseHelper} = require('./mouse-view');
const { execPath } = require('process');
var startTime, endTime;
function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
  }
    function start() {
        startTime = new Date();
    };
  
  function end() {
    endTime = new Date();
    var timeDiff = endTime - startTime; //in ms
    // strip the ms
    timeDiff /= 1000;
  
    // get seconds 
    var seconds = Math.round(timeDiff);
    console.log("Time Wasted : "+seconds + " seconds");
  }
  async function Proxy(Location)
    {
        // Location = Location.trim();
        // console.log(Location);
        var Proxy = fs.readFileSync(Location, 'utf-8');
    //   var Proxy = JSON.parse(Proxy);
        i=0;
        var Array = Proxy.split("\n")
        console.log("Proxy Count : "+Array.length);
        return Array;
    }
(async () => {

    const proxy_count = await Proxy("./inserproxy_here.txt")
    //counting proxy
    console.log("Proxy Count : "+ proxy_count.length);

    try{
        var TotalAttempt = readlineSync.question('How Many Email you want to register : ');
        
    }catch(err)
    {
        console.log("Error Log : "+err);
        process.exit();
    }
    try{
        var Domain = readlineSync.question('Domain Name(ex: gmail.com) : ');
        
    }catch(err)
    {
        console.log("Error Log : "+err);
        process.exit();
    }
    try{
        var Nation_ID = readlineSync.question('Country ID (ex: Indonesia = ID) : ');
        
    }catch(err)
    {
        console.log("Error Log : "+err);
        process.exit();
    }
    //start process
    start();
    await DM.SetDefaultChromeFile(); 
    const ChromeFile = await DM.GetChromeFile();
    var count =0;
    while(TotalAttempt && count<proxy_count.length)
    {
        console.log("Attempt Left : "+TotalAttempt+"Proxy Left : "+(proxy_count.length - count));
        //launch browser
        const browser = await puppeteer.launch(
            { 
                // devtools: true,
                // userDataDir: './Log/Temp_Cache.txt',
                executablePath: ChromeFile,
                args: [
                  '--use-gl=egl',
                  '--no-sandbox',
                  '--disable-setuid-sandbox',
                  // '--disable-accelerated-2d-canvas',
                  // '--no-zygote',
                  // '--renderer-process-limit=1',
                  // '--no-first-run',
                  '--ignore-certificate-errors',
                  '--ignore-certificate-errors-spki-list',
                  // '--disable-dev-shm-usage',
                  // '--disable-infobars',
                  '--lang=en-US,en',
                  '--window-size=1280x720',
                  // '--disable-extensions',
                  // '--disable-web-security',
                  // '--disable-features=IsolateOrigins',
                  // '--disable-site-isolation-trials',
                  // '--disable-blink-features=AutomationControlled'
                  // '--proxy-server='+ proxyUrl
                  
                ],
                // args: ['--proxy-server='+ proxyUrl], 
                headless: false, 
                // slowMo: 150,
            });
        const page = await browser.newPage();
        
        // Navigate to the website
        await page.goto("https://infinity.coldplay.com");
      
        //create mouse
        cursor = createCursor(page);
        await installMouseHelper(page);

        //click to accept cookies
        // await page.click(xpath.acc_cookies);
        // console.log("Get acc cookies");
        // await page.waitForSelector(xpath.acc_cookies,{visible: true, hidden: false});
        // await cursor.move(xpath.acc_cookies);
        // await page.focus(xpath.acc_cookies);
        // await cursor.click();
        // console.log("clicked cookies");

        await delay(5000);

        // Generate random name and email
        const randomName = `User${Math.floor(Math.random() * 10000)}`;
        const randomEmail = randomName+"@"+Domain;
        const Rando_Delay = Math.floor(Math.random() * 100) + 50;
        // Fill out the form
        await page.type(xpath.name, randomName, { delay: Rando_Delay });
        await page.type(xpath.email, randomEmail, { delay: Rando_Delay });
        await page.select(xpath.country, Nation_ID); // Assuming ‘ID’ represents Indonesia
      
        // You can also submit the form if needed
        // await page.click(‘#submit-button’);
      
        // Close the browser
        await browser.close();
        // process count
        TotalAttempt--;
        count++;
    }
    //end process
    end();
  
})();
