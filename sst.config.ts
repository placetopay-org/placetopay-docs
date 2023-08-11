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
          domainName: process.env.APP_DOMAIN_NAME,
          isExternalDomain: true,
          cdk: {
            certificate: Certificate.fromCertificateArn(stack, "MyCert", process.env.AWS_CERT_ARN),
          }
        },
        environment: {
          NEXT_PUBLIC_FEEDBACK_FORM_URL: process.env.NEXT_PUBLIC_FEEDBACK_FORM_URL,
        }
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });

      if (app.stage !== "prod") {
        app.setDefaultRemovalPolicy("destroy");
      }
    });
  },
} satisfies SSTConfig;
