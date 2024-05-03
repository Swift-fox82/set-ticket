const { Events, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const con = require('../../config.json')

module.exports = {
	name: Events.InteractionCreate,
    /**
     * 
     * @param {import('discord.js').Interaction} interaction 
     * @returns 
     */
	async execute(interaction) {
		if (interaction.isChatInputCommand()){
            const command = interaction.client.commands.get(interaction.commandName);
            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found.`);
                return;
            }
            await command.execute(interaction);
        }

        else if(interaction.isButton) {
            if(interaction.customId === "setup-ticket") {
                if(interaction.guild.channels.cache.some(some => some.topic == interaction.user.id)) return interaction.reply({content: 'you have already opnen ticket', ephemeral: true })

                await interaction.guild.channels.create({
                    name: `ticket-${interaction.user.id}`,
                    parent: con.guild.category,
                    topic: interaction.user.id,
                    permissionOverwrites: [
                        {
                            id: interaction.user.id,
                            allow: ["ViewChannel", "SendMessages"],
                            deny: ["MentionEveryone"]
                        }, 
                        {
                            id: interaction.guild.roles.everyone,
                            deny: ["ViewChannel"]
                        }
                    ]
                }).then(async channel => {
                    const embed = new EmbedBuilder()
                    .setTitle('ticket')
                    .setDescription('ticket and close ticket in **click button**')
                    .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL() })
                    .setThumbnail(interaction.user.avatarURL())
                    .setTimestamp()
                    .setColor(con.color.darkBlue)

                    const btn = new ActionRowBuilder().addComponents(
                        new ButtonBuilder()
                        .setCustomId('close')
                        .setLabel('Close')
                        .setStyle(ButtonStyle.Primary),

                        new ButtonBuilder()
                        .setCustomId('delete')
                        .setLabel('Delete')
                        .setStyle(ButtonStyle.Danger)
                    )

                    await interaction.reply({content: `open ticket ${interaction.user} to ${channel}`, ephemeral: true})
                    return channel.send({ embeds: [embed], content: `**open ticket** <@${interaction.user.id}>`, components: [btn] })
                })
            }
        }
	},
};