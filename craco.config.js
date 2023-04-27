const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@assets": path.resolve(__dirname, "src/assets"),
      "@components": path.resolve(__dirname, "src/components"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@recoil": path.resolve(__dirname, "src/recoil"),
      "@utils": path.resolve(__dirname, "src/utils"),
    },
  },
};
