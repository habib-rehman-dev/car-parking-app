import cors from "cors";
import "./env.js";

const clientUrl = (
  process.env.CLIENT_URL || "https://car-parking-app-qc9f.vercel.app"
).replace(/\/+$/, "");

export default cors({
  origin: clientUrl,
  credentials: true,
});
