class webhookUtil {
  /**
   *
   * @param {String} WebhookID The ID of the webhook
   * @param {String} WebhookToken The Token of the webhook
   */
  constructor(WebhookID, WebhookToken) {
    this.webhook = {
      ID: WebhookID,
      Token: WebhookToken,
    };
    this.webhookURL = `https://discord.com/api/webhooks/${this.webhook.ID}/${this.webhook.Token}`;
  }
  /**
   *
   * @param {String} message The message to display to the person looking at the webhook message
   * @param {Object} options The options for the message.
   */
  postToWebhook = async (message, options) => {
    try {
      const response = await fetch(this.webhookURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: message || "Unspecified",
          ...options,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to post message to webhook");
      }
    } catch (err) {
      console.error(err);
    }
  };
}
export default webhookUtil;
