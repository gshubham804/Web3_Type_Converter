const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8000;
const staticDir = path.join(__dirname, 'src');

app.use(express.static(staticDir));

app.get('/', (_req, res) => {
  res.sendFile(path.join(staticDir, 'index.html'));
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
