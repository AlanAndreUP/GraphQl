const webhooks = {};

const registerWebhook = async (event, url) => {
  if (!webhooks[event]) {
    webhooks[event] = [];
  }
  webhooks[event].push(url);
};

const triggerWebhook = async (event, data) => {
  const hooks = webhooks[event] || [];
  hooks.forEach((hookUrl) => {
    // Implement the logic to trigger the webhook. For example, you might use a library like axios to send a POST request to the hookUrl with the data.
    console.log(`Triggering webhook ${hookUrl} for event ${event} with data ${JSON.stringify(data)}`);
  });
};

export const webhookService = {
  registerWebhook,
  triggerWebhook,
};
