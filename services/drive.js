const { google } = require("googleapis");
const fs = require("fs");

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
);

oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
});

const drive = google.drive({
    version: "v3",
    auth: oauth2Client
});


async function uploadToDrive(file) {

    const resposta = await drive.files.create({

        requestBody: {

            name: file.originalname,

            parents: [
                process.env.DRIVE_FOLDER_ID
            ]

        },

        media: {

            mimeType: file.mimetype,

            body: fs.createReadStream(file.path)

        }

    });


    return resposta.data.id;

}


module.exports = uploadToDrive;