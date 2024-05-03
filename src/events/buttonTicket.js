const { Events, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const con = require('../../config.json');

module.exports = {
    name: Events.InteractionCreate,
    /**
     * 
     * @param {import('discord.js').Interaction} interaction 
     * @returns 
     */
    async execute(interaction) {
        if (!interaction.isButton()) return;

        switch(interaction.customId) {
            case "close":
            await interaction.channel.permissionOverwrites.edit(interaction.user.id, {
                ViewChannel: false,
            });
            return interaction.reply({ content: 'Ticket closed successfully!', ephemeral: true });

            case "delete": 
            interaction.reply({ content: "delete **ticket channel**", ephemeral: true })
            setTimeout(async () => await interaction.channel.delete(), 5000)
            break;
        }
    },
};