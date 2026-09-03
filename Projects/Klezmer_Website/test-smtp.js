require("dotenv").config({ path: "./server/.env" });

const fs = require("fs");
const nodemailer = require("nodemailer");
const { ConfidentialClientApplication } = require("@azure/msal-node");

const CLIENT_ID = "0c5ecd35-643a-4869-9b4e-28c379dd364a";
const TENANT_ID = "581ea70d-a955-416e-bc3c-6e4682e0cae4";
const MAILBOX = "ntsikelelod@mabtechnologies.co.za";

const privateKey = fs.readFileSync(
    "./Klezmer-SMTP-App-private-key.pem",
    "utf8"
);

const cca = new ConfidentialClientApplication({
    auth: {
        clientId: CLIENT_ID,
        authority: `https://login.microsoftonline.com/${TENANT_ID}`,
        clientCertificate: {
            thumbprintSha256: process.env.CERT_THUMBPRINT,
            privateKey: privateKey
        }
    }
});

async function testSmtp() {
    try {
        console.log("Requesting Microsoft 365 access token...");

        const tokenResponse = await cca.acquireTokenByClientCredential({
            scopes: ["https://outlook.office365.com/.default"]
        });

        if (!tokenResponse?.accessToken) {
            throw new Error("No access token received.");
        }

        console.log("OAuth token received.");

        const tokenParts = tokenResponse.accessToken.split(".");

const tokenPayload = JSON.parse(
    Buffer.from(tokenParts[1], "base64url").toString("utf8")
);

console.log("Token audience:", tokenPayload.aud);
console.log("Token app ID:", tokenPayload.appid);
console.log("Token roles:", tokenPayload.roles);

        console.log("Connecting to Microsoft 365 SMTP...");

        const transporter = nodemailer.createTransport({
            host: "smtp.office365.com",
            port: 587,
            secure: false,
            auth: {
                type: "OAuth2",
                user: MAILBOX,
                accessToken: tokenResponse.accessToken
            }
        });

        await transporter.verify();

        console.log("SMTP connection verified successfully!");

        const info = await transporter.sendMail({
            from: MAILBOX,
            to: "ntsikelelod@mabtechnologies.co.za",
            subject: "Klezmer SMTP Test",
            text: "This is a test email from the Klezmer website backend."
        });

        console.log("EMAIL SENT SUCCESSFULLY!");
        console.log("Message ID:", info.messageId);

        transporter.close();

    } catch (error) {
        console.error("\nSMTP TEST FAILED");
        console.error(error);
    }
}

testSmtp();