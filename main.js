const express = require(`express`);
const path = require(`path`);

const app = express();

app.use(express.static(path.join(__dirname, `public`)));
app.use(`/lib/three`, express.static(path.join(__dirname, `node_modules`, `three`, `build`, `three.module.js`)));
app.use(`/lib/orbit-controls`, express.static(path.join(__dirname, `node_modules_custom`, `OrbitControls.js`)));

app.listen(4106, () =>
{
    console.log(`Visit http://localhost:4106/.`);
});