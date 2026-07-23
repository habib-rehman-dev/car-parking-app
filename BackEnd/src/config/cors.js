import cors from "cors";
import "./env.js";

export default cors({
  // Vercel's Origin header never has a trailing slash, so neither should this
  // value. Override it with CLIENT_URL in the Vercel backend project settings.
  origin:  "https://car-parking-app-qc9f.vercel.app/",
  credentials: true,
});
