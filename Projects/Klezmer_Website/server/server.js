const express = require("express");
const nodemailer = require("nodemailer");

require("dotenv").config();

const app = express();

const PORT = 3000;

// ================================
// EMAIL CONFIGURATION
// ================================
const transporter = nodemailer.createTransport({

    service: "gmail",

    auth: {
        user: process.env.EMAIL_USER,

        pass: process.env.EMAIL_APP_PASSWORD
    }
});

// ================================
// MIDDLEWARE
// ================================

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// Serve Klezmer website
app.use(express.static("../"));

// ================================
// HOMEPAGE
// ================================

app.get("/", (req, res) => {

    res.sendFile("index.html", { root: "../" });

});

// ================================
// CONTACT FORM
// ================================

app.post("/contact", async (req, res) => {

    const {
        full_name,
        organisation,
        work_email,
        telephone,
        service,
        contact_method,
        message,
        privacy_consent
    } = req.body;


// ================================
// SERVER-SIDE VALIDATION
// ================================

if (!full_name || !full_name.trim()) {

        return res.status(400).send(
            "Please provide your full name."
        );

    }


    if (!organisation || !organisation.trim()) {

        return res.status(400).send(
            "Please provide your organisation."
        );

    }


    if (!work_email || !work_email.trim()) {

        return res.status(400).send(
            "Please provide your email address."
        );

    }


    if (!service) {

        return res.status(400).send(
            "Please select a service."
        );

    }


    if (!contact_method) {

        return res.status(400).send(
            "Please select a preferred contact method."
        );

    }


    if (!message || !message.trim()) {

        return res.status(400).send(
            "Please tell us how we can help."
        );

    }


    if (!privacy_consent) {

        return res.status(400).send(
            "Privacy consent is required."
        );

    }

// ================================
// SEND EMAIL
// ================================   

try {

    await transporter.sendMail({
        from: `"Klezmer Website" <${process.env.EMAIL_USER}>`,

    to: process.env.EMAIL_USER,

    replyTo: work_email,

    subject: `New Klezmer Website Enquiry — ${service}`,

   // Plain-text fallback
    text: `
NEW KLEZMER WEBSITE ENQUIRY

Name: ${full_name}
Organisation: ${organisation}
Email: ${work_email}
Telephone: ${telephone || "Not provided"}
Service: ${service}
Preferred Contact Method: ${contact_method}

Message:
${message}
    `,

    // HTML email
    html: `

<!DOCTYPE html>

<html>

<head>

    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Klezmer Website Enquiry</title>

</head>

<body style="
    margin:0;
    padding:0;
    background-color:#f4f7fb;
    font-family:Arial, Helvetica, sans-serif;
">

    <table
        width="100%"
        cellpadding="0"
        cellspacing="0"
        border="0"
        style="background-color:#f4f7fb;"
    >

        <tr>

            <td align="center" style="padding:40px 15px;">

                <!-- MAIN CONTAINER -->

                <table
                    width="650"
                    cellpadding="0"
                    cellspacing="0"
                    border="0"
                    style="
                        width:100%;
                        max-width:650px;
                        background:#ffffff;
                        border-radius:16px;
                        overflow:hidden;
                    "
                >

                    <!-- ================= HEADER ================= -->

<tr>

    <td style="
        background:#071426;
        padding:28px 40px;
    ">

        <table
            cellpadding="0"
            cellspacing="0"
            border="0"
        >

            <tr>

                <td style="
                    background:#ffffff;
                    padding:12px 18px;
                    border-radius:10px;
                ">

                    <img
                        src="cid:klezmer-logo"
                        alt="Klezmer Technology Solutions"
                        width="240"
                        style="
                            display:block;
                            width:240px;
                            height:auto;
                            border:0;
                        "
                    >

                </td>

            </tr>

            <tr>

                <td style="
                    padding-top:12px;
                    color:#1267e8;
                    font-size:11px;
                    font-weight:700;
                    letter-spacing:0.18em;
                ">

                    ENTERPRISE TECHNOLOGY PARTNER

                </td>

            </tr>

        </table>

    </td>

</tr>


                    <!-- ================= INTRO ================= -->

                    <tr>

                        <td style="
                            padding:40px 40px 25px;
                        ">

                            <div style="
                                margin-bottom:12px;
                                color:#1267e8;
                                font-size:11px;
                                font-weight:700;
                                letter-spacing:0.2em;
                                text-transform:uppercase;
                            ">

                                New Website Enquiry

                            </div>

                            <h1 style="
                                margin:0;
                                color:#071426;
                                font-size:30px;
                                line-height:1.2;
                                font-weight:700;
                            ">

                                A new enquiry has arrived.

                            </h1>

                            <p style="
                                margin:15px 0 0;
                                color:#667085;
                                font-size:15px;
                                line-height:1.6;
                            ">

                                Someone has submitted an enquiry through
                                the Klezmer website.

                            </p>

                        </td>

                    </tr>


                    <!-- ================= CONTACT ================= -->

                    <tr>

                        <td style="
                            padding:10px 40px 30px;
                        ">

                            <div style="
                                margin-bottom:15px;
                                color:#071426;
                                font-size:12px;
                                font-weight:700;
                                letter-spacing:0.16em;
                                text-transform:uppercase;
                            ">

                                Contact Information

                            </div>


                            <table
                                width="100%"
                                cellpadding="0"
                                cellspacing="0"
                                border="0"
                                style="
                                    border:1px solid #e5eaf1;
                                    border-radius:10px;
                                "
                            >

                                <!-- NAME -->

                                <tr>

                                    <td style="
                                        width:35%;
                                        padding:16px;
                                        color:#667085;
                                        font-size:13px;
                                        border-bottom:1px solid #e5eaf1;
                                    ">

                                        Full Name

                                    </td>

                                    <td style="
                                        padding:16px;
                                        color:#071426;
                                        font-size:14px;
                                        font-weight:600;
                                        border-bottom:1px solid #e5eaf1;
                                    ">

                                        ${full_name}

                                    </td>

                                </tr>


                                <!-- ORGANISATION -->

                                <tr>

                                    <td style="
                                        padding:16px;
                                        color:#667085;
                                        font-size:13px;
                                        border-bottom:1px solid #e5eaf1;
                                    ">

                                        Organisation

                                    </td>

                                    <td style="
                                        padding:16px;
                                        color:#071426;
                                        font-size:14px;
                                        font-weight:600;
                                        border-bottom:1px solid #e5eaf1;
                                    ">

                                        ${organisation}

                                    </td>

                                </tr>


                                <!-- EMAIL -->

                                <tr>

                                    <td style="
                                        padding:16px;
                                        color:#667085;
                                        font-size:13px;
                                        border-bottom:1px solid #e5eaf1;
                                    ">

                                        Email

                                    </td>

                                    <td style="
                                        padding:16px;
                                        color:#1267e8;
                                        font-size:14px;
                                        border-bottom:1px solid #e5eaf1;
                                    ">

                                        ${work_email}

                                    </td>

                                </tr>


                                <!-- TELEPHONE -->

                                <tr>

                                    <td style="
                                        padding:16px;
                                        color:#667085;
                                        font-size:13px;
                                    ">

                                        Telephone

                                    </td>

                                    <td style="
                                        padding:16px;
                                        color:#071426;
                                        font-size:14px;
                                    ">

                                        ${telephone || "Not provided"}

                                    </td>

                                </tr>

                            </table>

                        </td>

                    </tr>


                    <!-- ================= SERVICE ================= -->

                    <tr>

                        <td style="
                            padding:0 40px 30px;
                        ">

                            <div style="
                                margin-bottom:15px;
                                color:#071426;
                                font-size:12px;
                                font-weight:700;
                                letter-spacing:0.16em;
                                text-transform:uppercase;
                            ">

                                Service of Interest

                            </div>


                            <div style="
                                display:inline-block;
                                padding:12px 16px;
                                background:#eef5ff;
                                border:1px solid #d8e7ff;
                                border-radius:8px;
                                color:#1267e8;
                                font-size:14px;
                                font-weight:700;
                            ">

                                ${service}

                            </div>

                        </td>

                    </tr>


                    <!-- ================= CONTACT METHOD ================= -->

                    <tr>

                        <td style="
                            padding:0 40px 30px;
                        ">

                            <div style="
                                margin-bottom:10px;
                                color:#071426;
                                font-size:12px;
                                font-weight:700;
                                letter-spacing:0.16em;
                                text-transform:uppercase;
                            ">

                                Preferred Contact Method

                            </div>

                            <div style="
                                color:#667085;
                                font-size:14px;
                            ">

                                ${contact_method}

                            </div>

                        </td>

                    </tr>


                    <!-- ================= MESSAGE ================= -->

                    <tr>

                        <td style="
                            padding:0 40px 40px;
                        ">

                            <div style="
                                margin-bottom:15px;
                                color:#071426;
                                font-size:12px;
                                font-weight:700;
                                letter-spacing:0.16em;
                                text-transform:uppercase;
                            ">

                                How Can We Help?

                            </div>


                            <div style="
                                padding:20px;
                                background:#f7f9fc;
                                border-left:4px solid #1267e8;
                                border-radius:6px;
                                color:#475467;
                                font-size:14px;
                                line-height:1.7;
                            ">

                                ${message}

                            </div>

                        </td>

                    </tr>


                    <!-- ================= FOOTER ================= -->

                    <tr>

                        <td style="
                            padding:28px 40px;
                            background:#071426;
                        ">

                            <div style="
                                color:#ffffff;
                                font-size:17px;
                                font-weight:800;
                                letter-spacing:0.1em;
                            ">

                                KLEZMER

                            </div>

                            <div style="
                                margin-top:8px;
                                color:#98a6b9;
                                font-size:12px;
                                line-height:1.5;
                            ">

                                Technology that keeps your organisation ready.

                            </div>

                        </td>

                    </tr>

                </table>

            </td>

        </tr>

    </table>

</body>

</html>

    `,

    attachments: [
        {
            filename: "Logo.png",
            path: "../assets/images/Logo.png",
            cid: "klezmer-logo"
        }
    ]
    });

    console.log("Email sent successfully!");

    // Send visitor to success page

    res.redirect("/pages/contact-success.html");

} catch (error) {

    console.error("Email failed:", error);

    res.status(500).send("Something went wrong while sending your enquiry.");

}
    });

// ================================
// START SERVER
// ================================
app.listen(PORT, () => {
    console.log(`Klezmer server running at http://localhost:${PORT}`);
});