require("dotenv").config();
const express = require('express')
const bodyParser = require("body-parser");
var Imap = require("imap");
const cors = require("cors");
const inspect = require("util").inspect;

var imap = new Imap({
    user: "cireneu_guilherme@hotmail.com",
    password: process.env.EMAIL_PASS,
    host: "outlook.office365.com",
    port: 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false }
});

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// const uri = '/api'

// app.use(`${uri}/send-mail`,sendMailRouter)

function openInbox(cb) {
    imap.openBox("INBOX", true, cb);
}


imap.once("ready", function () {
    openInbox(function (err, box) {
        if (err) throw err;
        imap.search(["UNSEEN", ["SINCE", "December 10, 2022"]], function (err, results) {
            if (err) throw err;
            var f = imap.fetch(results, { bodies: "" });
            f.on("message", function (msg, seqno) {
                console.log("Message #%d", seqno);
                var prefix = "(#" + seqno + ") ";
                msg.on("body", function (stream, info) {
                    console.log(prefix + "Body");

                    // stream.pipe(fs.createWriteStream("msg-" + seqno + "-body.txt"));
                });

                msg.once("attributes", function (attrs) {
                    console.log(prefix + "Attributes: %s", inspect(attrs, false, 8));
                });

                msg.once("end", function () {
                    console.log(prefix + "Finished");
                });
            });

            f.once("error", function (err) {
                console.log("Fetch error: " + err);
            });
            f.once("end", function () {
                console.log("Done fetching all messages!");
                imap.end();
            });

        });

    });

});


imap.once("error", function (err) {
    console.log(err);
});

imap.once("end", function () {
    console.log("Connection ended");
});

imap.connect();




const port = process.env.PORT || 3001
app.listen(port, () => console.log(`servidor rodando na porta ${port}`))

module.exports = app;
