import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'planazoar.app@gmail.com',
    pass: 'yiasgadcrpsggvcf', 
  },
});

const sendVerificationEmail = (email, token) => {
  const url = `http://localhost:5000/api/verify/${token}`;

  const mailOptions = {
    from: 'planazoar.app@gmail.com',
    to: email,
    subject: 'Verifica tu cuenta',
    text: `Haz clic en el siguiente enlace para verificar tu cuenta: ${url}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error al enviar el correo:', error);
    } else {
      console.log('Correo enviado:', info.response);
    }
  });
};

export default sendVerificationEmail;
