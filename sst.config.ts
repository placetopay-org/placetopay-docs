import { SSTConfig } from "sst";
import { StaticSite } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "placetopay-docs",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const site = new StaticSite(stack, "site", {
        buildOutput: "out",
        buildCommand: "npm run build",
        customDomain: {
          domainName: "placetopay-docs.placetopay.ws",
          hostedZone: "placetopay.ws",
        },
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
