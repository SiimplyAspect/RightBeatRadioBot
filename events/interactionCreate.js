const client = require("../index");
const axios = require("axios");
client.on("interactionCreate", async (interaction) => {
  // Slash Command Handling
  if (interaction.isCommand()) {
    const cmd = client.slashCommands.get(interaction.commandName);
    if (!cmd) return interaction.followUp({ content: "An error has occured " });

    const args = [];

    for (let option of interaction.options.data) {
      if (option.type === "SUB_COMMAND") {
        if (option.name) args.push(option.name);
        option.options?.forEach((x) => {
          if (x.value) args.push(x.value);
        });
      } else if (option.value) args.push(option.value);
    }
    interaction.member = interaction.guild.members.cache.get(
      interaction.user.id
    );

    cmd.run(client, interaction, args);
  }

  // Context Menu Handling
  if (interaction.isContextMenu()) {
    await interaction.deferReply({ ephemeral: false });
    const command = client.slashCommands.get(interaction.commandName);
    if (command) command.run(client, interaction);
  }
  if (interaction.isAutocomplete()) {
    const userInput = interaction.options.getFocused().toString();

    switch (interaction.commandName) {
      case "help":
        if (interaction.options.getSubcommand() === "command") {
          const commandName = interaction.options.getString("name");

          if (!commandName) {
            return interaction
              .respond([
                {
                  name: "Start typing the name of a command to show more options.",
                  value: userInput,
                },
              ])
              .catch((err) => {
                return;
              });
          } else {
            let filtered = client.slashCommands.filter((x) =>
              x.name.toLowerCase().includes(commandName.toLowerCase())
            );
            await interaction
              .respond(
                filtered
                  .map((choice) => ({
                    name: choice.name,
                    value: choice.name,
                  }))
                  .slice(0, 25)
              )
              .catch((err) => {
                return;
              });
          }
        }
    }
  }
});
