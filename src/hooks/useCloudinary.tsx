// Create and configure your Cloudinary instance.
import { Cloudinary } from "@cloudinary/url-gen/index";
const cldConfig = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLD_NAME,
    apiKey: import.meta.env.VITE_CLD_API_KEY,
    apiSecret: import.meta.env.VITE_CLD_API_SECRET,
  }
});

export default cldConfig;