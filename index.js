const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, EmbedBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, ActionRowBuilder } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.commands = new Collection();

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

const words = ["NIGGER",
                "NEGRO",
                "NIGS",
                "MONKEY",
                "FAG",
                "FAGGOT",
                "FAGGLE",
                "FAGG",
                "KYS",
                "KILL YOURSELF",
                "KILLYOUR SELF",
                "KILL YOUR SELF",
                "KILLYOURSELF",
                "DISCORD"];

client.on("messageCreate", function(message){
    console.log(`a message was created`);
    console.log(message.author.username)
    if (message.author.username == "Yeeti") {
        for (let embed of message.embeds) {
            console.log(embed.description.toUpperCase());
            for (var i = 0; i < words.length; i++) {
                let fuck = embed.description.toUpperCase();
                if (fuck.includes(words[i])) {
                    const link = new ButtonBuilder()
                    .setLabel('Message')
                    .setURL(`https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`)
                    .setStyle(ButtonStyle.Link);
    
                    const profile = new ButtonBuilder()
                    .setLabel('Profile')
                    .setURL(`${embed.author.url}`)
                    .setStyle(ButtonStyle.Link);
    
                    const row = new ActionRowBuilder()
                        .addComponents(link, profile);

                    const exampleembed = new EmbedBuilder()
                        .setColor(0x0099FF)
                        .setTitle('We have flagged a message on the server!')
                        .setDescription(`"${embed.description}"`)
    
                    client.channels.cache.get('1124893268602273882').send({
                        //content: `User ${message.author.toString()} said "${embed.description}"!`,
                        embeds: [exampleembed],
                        components: [row],
                    });
                }
            }
        }
    }
});

// Log in to Discord with your client's token
client.login(token);