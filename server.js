const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000; // Utilisation d'un port dynamique

// Middleware pour servir les fichiers statiques (CSS, images)
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Route pour la page d'accueil
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route pour la page À propos
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'apropos.html'));
});

// Route pour la page Services
app.get('/services', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'services.html'));
});

// Route pour la page Contact
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

// Route POST pour traiter les messages du formulaire de contact
app.post('/send-message', (req, res) => {
    const { name, email, message } = req.body;

    // Configuration de Nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ndougafabienne77@gmail.com', // Remplace par ton email
            pass: 'iofn hvve wolj ybht'        // Remplace par ton App Password Google
        }
    });

    const mailOptions = {
        from: email,
        to: 'ndougafabienne77@gmail.com', // Ton adresse pour recevoir le message
        subject: `Nouveau message de ${name}`,
        text: `Nom : ${name}\nEmail : ${email}\nMessage : ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Erreur lors de l\'envoi de l\'email :', error);
            res.status(500).send('Erreur lors de l\'envoi du message.');
        } else {
            console.log('Email envoyé : ' + info.response);
            res.status(200).send('Message envoyé avec succès !');
        }
    });
});

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
