/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "placetopay-docs",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      providers: {
        aws: {
          region: "us-east-1",
        },
      },
    };
  },
  async run() {
    const siteDomain = process.env.APP_DOMAIN_NAME?.trim();
    const configuredPublicSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
    const resolvedPublicSiteUrl = configuredPublicSiteUrl || (siteDomain ? `https://${siteDomain}` : "");

    const site = new sst.aws.StaticSite("site", {
      build: {
        command: "npm run build",
        output: "out",
      },
      domain: siteDomain ? {
        name: siteDomain,
        cert: process.env.AWS_CERT_ARN,
        dns: false,
      } : undefined,
      environment: {
        NEXT_PUBLIC_GITHUB_REPO_URL: process.env.NEXT_PUBLIC_GITHUB_REPO_URL || "",
        NEXT_PUBLIC_SITE_URL: resolvedPublicSiteUrl,
      },
      errorPage: "404.html",
    });

    return {
      SiteUrl: site.url,
      SiteAssets: site.nodes.assets,
      siteCDN: site.nodes.cdn,
    };
  },
});
