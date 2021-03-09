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

    if(command.help.args && args[0] == undefined)
        return message.reply("Vous devez fournir des arguments à votre commande.");//Message envoyé à l'utilisateur qui envoie la commande si un ou des arguments sont demandées et aucun n'est défini.

    //Aller chercher la variable booléan dans le fichier de la commande et aller chercher la permission de l'utilisateur qui est mentionné. Si il a la permission de Ban et que la valeur booléan est sur true, faire le code suivant.
    if(command.help.isUserAdmin && message.guild.member(message.mentions.users.first()))//S'assure qu'un utilisateur est mentionné.
        if(message.guild.member(message.mentions.users.first()).hasPermission('BAN_MEMBERS'))//Liste de tous les permissions: https://discord.com/developers/docs/topics/permissions
            return message.reply("L'utilisateur mentionné est un admin, commande annulée.");//Message envoyé à l'utilisateur qui envoie la commande si l'utilisateur mentionné à la permission configuré.
            //Cette commande annule la commande de l'utilisateur et renvoie le message plus haut.

    //Aller chercher la variable booléan dans le fichier de la commande et aller chercher la permission de l'utilisateur qui demande la commande. Si il a la permission de Ban et que la valeur booléan est sur true, faire le code suivant.
    if(command.help.permissions && !message.member.hasPermission('BAN_MEMBERS'))
        return message.reply("Vous ne pouvez pas utiliser cette commande, commande annulée.");//Message envoyé si l'utilisateur qui essaie la commande n'est pas admin.

    command.run(client, message, args);//Actionne les commandes avec les arguments client, message et args.
}); // Ne pas oublier de fermer la fonction

client.login(TOKEN); //Permet d'enregistrer le bot avec son token, pas besoin de guillemets pour une variable.

true 