require("dotenv").config({ path: "./server/.env" });

const fs = require("fs");
const { ConfidentialClientApplication } = require("@azure/msal-node");

const CLIENT_ID = "0c5ecd35-643a-4869-9b4e-28c379dd364a";
const TENANT_ID = "581ea70d-a955-416e-bc3c-6e4682e0cae4";

const PRIVATE_KEY_PATH = "./Klezmer-SMTP-App-private-key.pem";

const privateKey = fs.readFileSync(PRIVATE_KEY_PATH, "utf8");

console.log("Private key loaded successfully.");

const msalConfig = {
    auth: {
        clientId: CLIENT_ID,
        authority: `https://login.microsoftonline.com/${TENANT_ID}`,
        clientCertificate: {
            thumbprintSha256: process.env.CERT_THUMBPRINT,
            privateKey: privateKey
        }
    }
};

const cca = new ConfidentialClientApplication(msalConfig);

async function testAuthentication() {
    try {
        console.log("Requesting Microsoft 365 access token...");

        const result = await cca.acquireTokenByClientCredential({
            scopes: ["https://outlook.office365.com/.default"]
        });

        if (!result || !result.accessToken) {
            throw new Error("No access token was returned.");
        }

        console.log("SUCCESS! Microsoft 365 access token received.");
        console.log("Token type:", result.tokenType);
        console.log("Expires on:", result.expiresOn);

    } catch (error) {
        console.error("AUTHENTICATION FAILED");
        console.error(error);
    }
}

testAuthentication();