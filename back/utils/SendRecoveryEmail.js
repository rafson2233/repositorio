const nodemailer = require('nodemailer');

const sendRecoveryEmail = async (email, recoveryLink) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"TicketFlow" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Recuperação de Conta - TicketFlow',
      html: `
        <p>Você solicitou a recuperação da sua conta.</p>
        <p><a href="${recoveryLink}">Clique aqui para redefinir sua senha</a></p>
        <p>Se você não solicitou, ignore este e-mail.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`E-mail enviado para ${email}`);
  } catch (error) {
    console.error('Erro ao enviar e-mail de recuperação:', error);
    throw new Error('Erro ao enviar e-mail');
  }
};

module.exports = sendRecoveryEmail;
