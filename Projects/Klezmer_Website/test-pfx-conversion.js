const fs = require("fs");
const forge = require("node-forge");

const pfxPath = "./Klezmer-SMTP-App-New.pfx";

const password = process.env.PFX_PASSWORD;

if (!password) {
    console.error("❌ PFX_PASSWORD is not set.");
    process.exit(1);
}

try {
    const pfxBuffer = fs.readFileSync(pfxPath);

    const pfxDer = forge.util.createBuffer(pfxBuffer.toString("binary"));
    const asn1 = forge.asn1.fromDer(pfxDer);

    const p12 = forge.pkcs12.pkcs12FromAsn1(
        asn1,
        true,
        password
    );

    const keyBags = p12.getBags({
        bagType: forge.pki.oids.pkcs8ShroudedKeyBag
    })[forge.pki.oids.pkcs8ShroudedKeyBag];

    if (!keyBags || keyBags.length === 0) {
        throw new Error("Private key was not found in the PFX.");
    }

    const privateKey = forge.pki.privateKeyToPem(keyBags[0].key);

    fs.writeFileSync(
        "./Klezmer-SMTP-App-key.pem",
        privateKey,
        { encoding: "utf8" }
    );

    console.log("✅ PFX successfully converted.");
    console.log("✅ Private key written to Klezmer-SMTP-App-key.pem");

} catch (error) {
    console.error("❌ Conversion failed:");
    console.error(error.message);
    process.exit(1);
}