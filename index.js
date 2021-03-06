const { Client, Collection } = require('discord.js'); //Importe la librairie de discord, la technique utilisé ici est la déstructuration qui permet de ne pas prendre toute la librairie, car elle est lourde pour le systeme.
const { TOKEN, PREFIX } = require('./config'); //Ici nous appellons le fichier config créer et nous ajouter les variables.
const { readdirSync } = require("fs"); //Nécessaire pour aller chercher les commandes

const client = new Client(); // Demande à la librairie discord de créer le bot qui s'appelle (client)

["commands"].forEach(x => client[x] = new Collection()); //Ajoute les commandes dans une collection

const loadCommands = (dir = "./commands/") => { //Création de la fonction loadCommand() qui accèdera à vos fichiers dans le dossier commands, changer le nom de commands si votre dossier de commande ne s'appelle pas comme ça
    readdirSync(dir).forEach(dirs => { //Cette commande signifie, pour chaque fichier faire le code ci-dessous.
        const commands = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js")); //Ajouter dans une variable tous les dossier qui contiennent un fichier .js (dans le dossier commande.)
        
        for (const file of commands) { //Pour chaque fichier dans la variable commande, donc les fichiers .js faire ceci
            const getFileName = require(`${dir}/${dirs}/${file}`); //Ajouter le dossier dans une variable getFileName.
            client.commands.set(getFileName.help.name, getFileName); //Attribuer au bot la commande par nom.
        };  
    });
}; //Ne pas oublié de bien fermer les accolades

loadCommands(); //Demander à executer la fonction.

client.on('ready', () => { //Cette fonction est déclanchée lorsque le bot est connecté.
  console.log(`Logged in as ${client.user.tag}!`); // console.log() permet d'écrire directement dans la console cmd ${client.user.tag} est le nom discord du bot
}); // Ne pas oublier de fermer la fonction

client.on('message', message => { //Lorsqu'un message est envoyé et que le Bot le voit.
    if(!message.content.startsWith(PREFIX) || message.author.bot) return; //Si le message envoyé provient du bot ou ne comprends pas le prefix nous quittons la fonction donc rien ne se passe.
    const args = message.content.slice(PREFIX.length).split(/ +/); // Nous coupons le prefix pour n'avoir que la commande et les arguments.
    const commandName = args.shift().toLowerCase();//Remet en minuscule l'argument passé à la commande.

    const command = client.commands.get(commandName) || client.
    commands.find(cmd => cmd.help.aliases && cmd.help.aliases. //Nous cherchons si la commande fait partie de la collection de commande.
    includes(commandName));
    if (!command) return message.reply("Commande éronnée"); //Si non on renvoie commande éronné.

    command.run(client, message, args);//Actionne les commandes
}); // Ne pas oublier de fermer la fonction

client.login(TOKEN); //Permet d'enregistrer le bot avec son token, pas besoin de guillemets pour une variable.