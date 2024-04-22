import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  //   host: "smtp.ethereal.email",
  //   port: 587,
  // secure: false, // Use `true` for port 465, `false` for all other ports
  service: "gmail",
  auth: {
    user: process.env.NODE_MAIL_AUTH_EMAILID,
    pass: process.env.NODE_MAIL_AUTH_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const sendResetEmail = async ({
  email,
  userName,
  resetId,
  resetLink,
  baseURL,
}) => {
  try {
    // console.log(resetLink);
    const mailOptions = {
      from: `"ConnectIT Support" <${process.env.NODE_MAIL_AUTH_EMAILID}>`,
      to: `${process.env.NODE_MAIL_AUTH_EMAILID}, ${email}`,
      subject: "Reset Your Password",
      text: "",
      html: `<div>
      <h4>Dear ${userName}</h4>
      <p>Based on your Password Reset Request, below is the Password Reset link,</p>
          <a href='${resetLink}' target="_blank">
            Reset the Password
          </a>
          <br />
          <div>
            <p>
              If you are not initiated this Request, please click on Report
              below
            </p>
            <a
              href='${baseURL}/report-password?resetId=${resetId}'
              target="_blank"
            >
              Report & Block this Request
            </a>
          </div>
        </div>`,
    };
    const res = await transporter.sendMail(mailOptions);
    // console.log(res);
    return res.messageId;
  } catch (error) {
    throw Error(error.message || error.stack || error);
  }
};
