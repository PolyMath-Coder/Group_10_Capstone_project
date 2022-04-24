const http = require('http');

const port = 3000;

const app = http.createServer((req, res) => {
  const urlPath = req.url;

  if (urlPath === '/') {
    res.statusCode = 201;
    res.setHeader('Content-Type', 'text/plain');
    res.end("Hello from SideHustle...Here's the Home Page!");
  } else if (urlPath === '/about') {
    res.statusCode = 201;
    res.setHeader('Content-Type', 'text/plain');
    res.end("Hello...Here's the about page");
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Oops! You made a huge error!');
  }
});

app.listen(port, () => {
  console.log(`Server now listening on port ${port}`);
});
