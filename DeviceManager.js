// const DeviceDetector = require('node-device-detector');
// const detector = new DeviceDetector;
// const userAgent = 'Mozilla/5.0 (Linux; Android 5.0; NX505J Build/KVT49L) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.78 Mobile Safari/537.36';
// const result = detector.detect(userAgent);
// console.log('result parse', result);

const { platform } = require('node:process');
var fs = require('fs');
var Chrome_Ubuntu = '/usr/bin/google-chrome';
var Chrome_Windows = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
// console.log(`This platform is ${platform}`);

exports.DeviceDetect = async () =>
{
    return platform; 
}
exports.SetDefaultChromeFile = async() =>
{
    var device = await this.DeviceDetect();
    console.log("Device Detected : "+device);
    if(device == 'linux')
    {
        this.ChromeFile = await Chrome_Ubuntu;
    }else if(device == 'win32')
    {
        return this.ChromeFile = await Chrome_Windows;
    }else{
        return false;
    }
}
exports.SetChromeFile = async(ChromeFile) =>
{
    this.ChromeFile = await ChromeFile;
}
exports.GetChromeFile = async() =>
{
    return await this.ChromeFile;
}
exports.TestRun = async() =>
{
    console.log("Chrome Location : "+await this.ChromeFile);
    fs.access(await this.ChromeFile, fs.constants.X_OK, (err) => {
        console.log(err ? 'cannot execute' : 'can execute');
    });
}