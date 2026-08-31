import sharp from "sharp";

const source = "public/images/miscellaneous/melimedics-logo-signatur.webp";
const target = "public/images/miscellaneous/melimedics-logo-header.webp";

await sharp(source)
  .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .webp({ quality: 92, smartSubsample: true })
  .toFile(target);
