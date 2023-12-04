const dev = process.env.NODE_ENV !== "production";
export const getserver = dev
  ? "http://localhost:3000"
  : "https://musereads.vercel.app";
