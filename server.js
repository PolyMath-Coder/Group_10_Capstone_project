const http = require('http');
const path = require('path');
const fs = require('fs');
const os = require('os');

const port = 3000;

const indexPage = fs.readFileSync(__dirname + '/pages/index.html');
const aboutPage = fs.readFileSync(__dirname + '/pages/about.html');
const errorPage = fs.readFileSync(__dirname + '/pages/404.html');

const app = http.createServer((req, res) => {
  const urlPath = req.url;
  if (urlPath === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    res.end(indexPage);
  } else if (urlPath === '/about') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(aboutPage);
  } else if (urlPath === '/sys') {
    res.writeHead(201, { 'Content-Type': 'text/plain' });

    const data = JSON.stringify({
      hostname: os.hostname(),
      platform: os.platform(),
      architecture: os.arch(),
      numberOfCPUS: os.cpus().length,
      networkInterfaces: os.networkInterfaces(),
      uptime: os.uptime(),
    });
    console.log(data);
    res.write('Your OS info has been saved successfully!');
    fs.writeFile('osinfo.json', data, function() {
      console.log('The file was saved!');
    });
    res.end();
  } else {
    res.statusCode = 404;
    res.writeHead(404, { 'Content-Type': 'text/html' });

    // fs.writeFileSync(path.join(__dirname, 'osinfo.json'), data);
    res.end(errorPage);
  }
});

app.listen(port, () => {
  console.log(`Server now listening on port ${port}`);
});
