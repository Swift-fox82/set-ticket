const { SlashCommandBuilder, EmbedBuilder, ChannelType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const con = require('../../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ticketsetup')
        .setDescription('setup ticket channel')
        .addChannelOption(option => option.setName('channel').setDescription('set in channel').addChannelTypes(ChannelType.GuildText).setRequired(true)),
    /**
     *
     * @param {import('discord.js').ChatInputCommandInteraction} interaction
     * @returns
     */
    async execute(interaction) {
        let channel = interaction.options.getChannel('channel');
        if(!con.Dev.hyron.includes(interaction.user.id)) return interaction.reply({content: 'no permission in command', ephemeral: true})

        const embedTicket = new EmbedBuilder()
        .setTitle('**Ticket system**')
        .setDescription('open ticket in **click button**')
        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL() })
        .setThumbnail(interaction.guild.iconURL())
        .setColor(con.color.green)

        const btn = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
            .setCustomId('setup-ticket')
            .setLabel('ticket')
            .setStyle(ButtonStyle.Success)
        )
        
        interaction.reply({ content: `set ticket ${interaction.user.tag} to ${channel.name}`, ephemeral: true })
        return channel.send({ embeds: [embedTicket], components: [btn] })
    }
};