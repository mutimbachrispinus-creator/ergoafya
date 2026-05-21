// Minimal OpenNext Cloudflare configuration
export default {
  default: {
    override: {
      wrapper: "cloudflare-node",
      converter: "edge",
      proxyExternalRequest: "fetch",
    },
  },
  middleware: {
    external: true,
    override: {
      wrapper: "cloudflare-edge",
      converter: "edge",
      proxyExternalRequest: "fetch",
    },
  },
  edgeExternals: ["node:crypto"],
  cloudflare: {
    useWorkerdCondition: true,
  },
};
