import Plugin from '../dev/Interfaces/Plugin';

const HelloPlugin: Plugin = {
  name: 'my-bot-plugin-hello',
  version: '1.0.0',
  
  async onLoad(client, botConfig) {
    // Logic of the plugin
  },

  onUnload() {
    // Optionally remove the event listener or cleanup
    // But depends on whether your code can actually unhook events dynamically
  }
};

export default HelloPlugin;
