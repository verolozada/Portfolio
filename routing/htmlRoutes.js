const path = require("path");

module.exports = app => {
    //index.html will be the default, also in case no other route is found
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });
};