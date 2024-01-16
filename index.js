const { Client, GatewayIntentBits } = require('discord.js');

const TOKEN = process.env.BOT_TOKEN;
const GUILD_ID = '1173967180312875048';
const CHANNEL_ID = '1193233490758598706';
const ALLOWED_USER_ID = '1119592830327861358'; // Additional allowed user ID
const PORT = process.env.PORT || 3000;


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping
    ],
});

client.once('ready', () => {
    console.log('Bot is ready!');
});

client.on('messageCreate', async (message) => {
    // Check if the author is the owner of the guild or the allowed user
    if (message.content.toLowerCase() === '!setuprr' &&
        (message.author.id === message.guild.ownerId || message.author.id === ALLOWED_USER_ID)) {
        // Creating an embed with reaction roles
        const embed = {
            author: {
                name: 'Regiments Reaction Role Picker!',
            },
            title: '<:V1tal:1193922763749077052> **Self-Assignable Roles**',
            description:
                'Please select with the according options to give yourself your roles.\n' +
                '<:BA:1193924717783023676> **Regiment Roles**\n' +
                '<:uksf:1193228529022808094> - United Kingdom Special Forces\n' +
                '<:aab:1193228497531969586> - 16th Air Assault Brigade\n' +
                '<:ets:1193228544277491764>  - Education and Training Services\n' +
                '<:ifd:1193228441160536105> - 1st Infantry Forces Division\n' +
                '<:rmp:1193228413897560064>  - Royal Military Police\n' +
                '<:rgg:1193228430939017236> - The Grenadier Guards\n',
            footer: {
                text: 'V1tal Reaction Role Panel',
            },
        };

        const sentMessage = await message.channel.send({ embeds: [embed] });

        // Add reactions to the message using custom emoji IDs
        const reactions = [
            '1193228529022808094',
            '1193228497531969586',
            '1193228544277491764',
            '1193228441160536105',
            '1193228413897560064',
            '1193228430939017236',
        ];
        for (const reaction of reactions) {
            await sentMessage.react(reaction);
        }
    }
});

client.on('messageReactionAdd', async (reaction, user) => {
    if (user.bot) return; // Ignore reactions from bots

    // Define role mappings with custom emoji IDs
    const roleMappings = {
        '1193228529022808094': '1193181980733472850',
        '1193228497531969586': '1193181963771723857',
        '1193228544277491764': '1193181967328489563',
        '1193228441160536105': '1193181970600050752',
        '1193228413897560064': '1193181973674475582',
        '1193228430939017236': '1193181977428369408',
        // Add more mappings as needed
    };

    const guild = reaction.message.guild;
    const member = guild.members.cache.get(user.id);

    // Check if the reaction corresponds to a role
    const roleId = roleMappings[reaction.emoji.id];
    if (roleId) {
        const role = guild.roles.cache.get(roleId);
        if (role) {
            await member.roles.add(role);
            console.log(`Added role ${role.name} to ${member.user.tag}`);
        }
    }
});

client.on('messageReactionRemove', async (reaction, user) => {
    if (user.bot) return; // Ignore reactions from bots

    // Define role mappings with custom emoji IDs
    const roleMappings = {
        '1193228529022808094': '1193181980733472850',
        '1193228497531969586': '1193181963771723857',
        '1193228544277491764': '1193181967328489563',
        '1193228441160536105': '1193181970600050752',
        '1193228413897560064': '1193181973674475582',
        '1193228430939017236': '1193181977428369408',
        // Add more mappings as needed
    };

    const guild = reaction.message.guild;
    const member = guild.members.cache.get(user.id);

    // Check if the reaction corresponds to a role
    const roleId = roleMappings[reaction.emoji.id];
    if (roleId) {
        const role = guild.roles.cache.get(roleId);
        if (role) {
            await member.roles.remove(role);
            console.log(`Removed role ${role.name} from ${member.user.tag}`);
        }
    }
});

client.login(TOKEN);
