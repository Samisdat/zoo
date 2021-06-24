module.exports = ({ env }) => ({
    email: {
      provider: 'smtp2',
      providerOptions: {
        host: 'smtp.mailbox.org', //SMTP Host
        port: 465   , //SMTP Port
        secure: true,
        username: 'bastian@pertz.eu',
        password: 'nosobZNrfrV9b$ZsyQKUq6NXPM7rCGr86AFXp2BdUhyM',
        rejectUnauthorized: true,
        requireTLS: true,
        connectionTimeout: 1,
      },
      settings: {
        from: 'bastian@pertz.eu',
        replyTo: 'bastian@pertz.eu',
      },
    },
  });