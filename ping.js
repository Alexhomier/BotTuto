module.exports.run = (client, message, args) => { // Client est le bot, message est le message et args sont les arguments passé.
    message.reply("pong!");
}

module.exports.help = {
    name: "ping", //Représente le nom de la commande.
    description: "Réponse si le bot fonctionne", //Représente sa description.
    isUserAdmin: false,
    permissions: false,
    args: false,
}