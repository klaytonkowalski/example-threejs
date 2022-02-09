const express = require(`express`);
const path = require(`path`);

const app = express();

app.use(express.static(path.join(__dirname, `public`)));
app.use(`/build`, express.static(path.join(__dirname, `node_modules`, `three`, `build`)));
app.use(`/jsm`, express.static(path.join(__dirname, `node_modules`, `three`, `examples`, `jsm`)));

app.listen(4106, () =>
{
    console.log(`Visit http://localhost:4106/.`);
});