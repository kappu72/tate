const path = require("path");

module.exports = require('./buildConfig')(
    {
        "challenge": path.join(__dirname, "app", "app")
    },
    {
        base: __dirname,
        dist: path.join(__dirname, "dist"),
        code: path.join(__dirname, "app" ),
        appHtml: path.join(__dirname, "index.html")
    },
    true,
    "./"
);
