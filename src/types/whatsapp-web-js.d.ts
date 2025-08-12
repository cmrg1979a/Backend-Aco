import "whatsapp-web.js";

declare module "whatsapp-web.js" {
  interface Client {
    getMe(): Promise<{
      id: { user: string; server: string; _serialized: string };
    }>;
  }
}
