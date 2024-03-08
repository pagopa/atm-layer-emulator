export {};

declare global {
  interface Window {
    BACKEND_URL: string;
    FRONTEND_URL: string;
  }
}