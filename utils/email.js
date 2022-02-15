const fs = require('fs');
const path = require('path');
const handlebars = require("handlebars")
const nodemailer =require('nodemailer')
const AVAILABE_TEMPLATE = {
  SiGNUP: "signup",
}
class Email {
  constructor(template = "") {
    if (template) {
      this.template = template;
    }
    this.body = "";
    this.subject = "";
    this.cc = [];
  }
  setTemplate(template) {
    if (!Object.values(AVAILABE_TEMPLATE).includes(template)) {
      throw new Error("invalid template")
    }
    this.template = template;
    switch (template) {
      case AVAILABE_TEMPLATE:
        this.subject = "welcome to uor website"
        break;

      default:
        break;
    }
  }
  setbody(data) {
    const filebody = fs.readFileSync(path.join(__dirname,"..",`/views/templates/${this.template}.hbs`)).toString()
    const template = handlebars.compile(filebody)
    this.body = template(data);
  }
  setRawBody(body){
    this.body =body;
  }
  setSubject(subject){
    this.subject=subject;
  }
  setCC(email){
    this.cc=email;
  }
 async send(email) {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "suyash.k@chapter247.com" , // generated ethereal user
        pass: "suyash247@1998", // generated ethereal password
      },
    });
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: `"Google Project " <suyash.k@chapter247.com>`, // sender address
      to: email, // list of receivers
      subject: "Welcome To Our Webite", // Subject line
      html: this.body, // html body
    });
    console.log(info)
    return info ;

  }
}
module.exports={
  Email,
  AVAILABE_TEMPLATE
}