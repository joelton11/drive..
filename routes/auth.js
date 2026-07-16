const express = require("express");
const { google } = require("googleapis");

const router = express.Router();

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
);


// iniciar login
router.get("/auth", (req, res) => {

    const url = oauth2Client.generateAuthUrl({

        access_type: "offline",

        prompt: "consent",

        scope: [
            "https://www.googleapis.com/auth/drive.file"
        ]

    });


    res.redirect(url);

});



// retorno do Google
router.get("/oauth2callback", async (req, res) => {

    try {

        const code = req.query.code;


        const { tokens } = await oauth2Client.getToken(code);



        console.log("\n==============================");
        console.log("SEU REFRESH TOKEN:");
        console.log("==============================\n");


        console.log(tokens.refresh_token);


        console.log("\n==============================\n");



        res.send(`

            <h1>OAuth concluído!</h1>

            <p>Volte ao terminal e copie o Refresh Token.</p>

        `);


    } catch(error) {

        console.log(error);

        res.status(500).send("Erro no OAuth");


    }

});


module.exports = router;