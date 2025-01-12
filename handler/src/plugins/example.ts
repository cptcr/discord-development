import Plugin from '../dev/Interfaces/Plugin';

const HelloPlugin: Plugin = {
  name: 'example',
  version: '1.0.0',
  
  async onLoad(client, botConfig) {
    client.on("ready", async () => {
        // Plugin Logic
        console.log("Wohoo the plugin works!")
    })
  },

  onUnload() {
    // Optionally remove the event listener or cleanup
    // But depends on whether your code can actually unhook events dynamically
  }
};

export default HelloPlugin;
