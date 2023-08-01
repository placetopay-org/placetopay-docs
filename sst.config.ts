import { SSTConfig } from "sst";
import { StaticSite } from "sst/constructs";
import { Certificate } from "aws-cdk-lib/aws-certificatemanager";

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
          domainName: "docs.placetopay.dev",
          isExternalDomain: true,
          cdk: {
            certificate: Certificate.fromCertificateArn(stack, "MyCert", "arn:aws:acm:us-east-1:688114292561:certificate/76e63cf5-56ae-4e0b-a61f-562b23c9d9f5"),
          }
        },
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
