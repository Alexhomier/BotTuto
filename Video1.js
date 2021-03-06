const Discord = require('discord.js'); //Importe la librairie de discord

const client = new Discord.Client(); // Demande à la librairie discord de créer le bot qui s'appelle (client)

client.on('ready', () => { //Cette fonction est déclanchée lorsque le bot est connecté.
  console.log(`Logged in as ${client.user.tag}!`); // console.log() permet d'écrire directement dans la console cmd ${client.user.tag} est le nom discord du bot
}); // Ne pas oublier de fermer la fonction

client.on('message', message => { //Lorsqu'un message est envoyé et que le Bot le voit.
  if (message.content === 'ping') { // message.content est le message envoyé ping est la commande envoyé par n'importe quel utilisateur === signifie la valeur et la variable sont pareil.
    message.reply('Pong!'); //Répondre à l'utilisateur qui envoie la commande par la synthaxe Nom de l'utilisateur, Pong! 
  }
}); // Ne pas oublier de fermer la fonction

client.login('token'); //Permet d'enregistrer le bot avec son token.
