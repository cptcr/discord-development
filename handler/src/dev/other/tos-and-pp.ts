import { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, Interaction } from "discord.js";
import * as legalJSON from "../../../legal.json";
  
// Builds an Embed from a generic legal data object (e.g., "privacy-policy" or "terms-of-service")
/**
 * Builds an Embed from a generic legal data object (e.g., "privacy-policy" or "terms
 * @param {any} data - The legal data object to build the embed from
 * @returns {EmbedBuilder} - The built Embed
 */
function buildEmbedFromLegalData(data: any) {
    const embed = new EmbedBuilder();
  
    // Use short-circuit logic with optional chaining:
    data?.title       && embed.setTitle(data.title);
    data?.description && embed.setDescription(data.description);
    data?.url         && embed.setURL(data.url);
    data?.color       && embed.setColor(data.color);  // data.color should be a valid Discord color (integer or hex string)
  
    // Author
    (data?.author?.name || data?.author?.icon_url || data?.author?.url) &&
      embed.setAuthor({
        name: data?.author?.name ?? "No Author",
        iconURL: data?.author?.icon_url,
        url: data?.author?.url
      });
  
    // Thumbnail
    data?.thumbnail?.url && embed.setThumbnail(data.thumbnail.url);
  
    // Image
    data?.image?.url && embed.setImage(data.image.url);
  
    // Timestamp
    data?.timestamp && embed.setTimestamp(new Date(data.timestamp));
  
    // Footer
    data?.footer &&
      embed.setFooter({
        text: data.footer.text ?? "",
        iconURL: data.footer.icon_url
      });
  
    // Fields (only if it's an array and each field has name + value)
    Array.isArray(data?.fields) && data.fields.forEach((field: any) => {
      field?.name && field?.value &&
        embed.addFields({ name: field.name, value: field.value, inline: !!field.inline });
    });
  
    return embed;
}

/**
 * Builds an Embed from a generic legal data object (e.g., "privacy-policy" or "terms-of-service")
 * @param {boolean} enabled - Whether the embed is enabled
 * @returns {EmbedBuilder | false} - The built Embed
*/
  
export default function legal(enabled: boolean) {
    // If we don't want to build anything at all when disabled, just return
    if (!enabled) return;
  
    // Optional chaining for safe property access
    const privacy = legalJSON?.["privacy-policy"];
    const terms   = legalJSON?.["terms-of-service"];
  
    // Decide on a heading description based on what data is available
    const headingDescription =
      privacy && terms
        ? "Hello there! Please review our Privacy Policy and Terms of Service."
        : privacy
        ? "Hello there! Please review our Privacy Policy."
        : terms
        ? "Hello there! Please review our Terms of Service."
        : "";
  
    // If neither policy nor terms exist, headingDescription will be an empty string
    if (!headingDescription) return;
  
    // Create a general "heading" embed
    const headingEmbed = new EmbedBuilder()
    .setTitle("Legal")
    .setDescription(headingDescription)
    .setColor("Blurple");
  
    // Dynamically build individual embeds if the corresponding data exists
    const privacyEmbed = privacy ? buildEmbedFromLegalData(privacy) : null;
    const termsEmbed   = terms   ? buildEmbedFromLegalData(terms)   : null;
  
    // Collect all embeds in an array
    const embeds = [headingEmbed];
    privacyEmbed && embeds.push(privacyEmbed);
    termsEmbed   && embeds.push(termsEmbed);
  
    // Optionally, create a row with buttons (remove if you don't need them)
    const actionRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId("acceptTerms")
        .setLabel("Agree")
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
        .setCustomId("dismissTerms")
        .setLabel("Dismiss")
        .setStyle(ButtonStyle.Danger)
    );
  
    // Return the embeds (and buttons) in the format discord.js expects
    return {
      embeds,
      components: [actionRow]
    };
}