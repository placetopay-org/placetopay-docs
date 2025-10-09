# SST v2 to v3 Migration Summary

## ✅ Completed Changes

### 1. Package Updates
- **Updated SST**: `^2.19.1` → `^3.3.34` (Latest: 3.17.14 installed)
- **Removed CDK dependencies**: 
  - Removed `aws-cdk-lib`
  - Removed `constructs`

### 2. Configuration Files

#### `sst.config.ts`
- ✅ Backed up original to `sst.config.ts.bk`
- ✅ Converted from v2 `StaticSite` construct to v3 `Nextjs` component
- ✅ Updated configuration structure:
  - No more `stacks()` - everything in `run()` function
  - No more CDK imports
  - Using new `$config` syntax
  - Domain configuration simplified (no CDK certificate import needed)
  - Removal policy now set per stage in `app()` config

#### `sst-env.d.ts`
- ✅ Updated type reference path from `.sst/types/index.ts` to `.sst/platform/config.d.ts`

#### `package.json`
- ✅ Updated `dev` script: `next dev` → `sst dev`
- ✅ Removed `sst:dev` script (no longer needed, `sst dev` handles it)
- ✅ No more `sst bind` wrapper needed

### 3. Key Differences in v3

#### No CloudFormation/CDK
- State is now stored locally and backed up to S3
- No more stacks - all resources defined in single `run()` function
- Outputs are now returned from `run()` instead of `stack.addOutputs()`

#### sst dev
- Now runs a multiplexer that deploys app AND runs frontends together
- No need to start frontend separately
- No need for `sst bind` wrapper

#### Component Changes
- `StaticSite` → `Nextjs` (since you're using Next.js)
- The new `Nextjs` component:
  - Auto-detects Next.js configuration
  - Automatically handles build output from `next build`
  - No need to specify `buildOutput` or `buildCommand`

## 🔧 Environment Variables

Your environment variables are still used the same way:
- `APP_DOMAIN_NAME` - Custom domain for the site
- `AWS_CERT_ARN` - Certificate ARN for custom domain
- `NEXT_PUBLIC_FEEDBACK_FORM_URL` - Public feedback form URL
- `NEXT_PUBLIC_GITHUB_REPO_URL` - Public GitHub repo URL

## 📝 Next Steps

### For Development (Non-Prod Stage)

1. **Test locally first**:
   ```bash
   npm run dev
   # or
   npx sst dev
   ```
   This will:
   - Deploy your infrastructure
   - Start your Next.js dev server
   - Watch for changes

2. **Deploy to a test stage**:
   ```bash
   npx sst deploy --stage dev
   ```

### For Production

⚠️ **IMPORTANT**: Before deploying to production, you need to:

1. **Keep v2 app running** with retention policy (already set in your backup)

2. **Use a different stage name** for v3 production initially:
   ```bash
   # If your v2 prod stage is "prod", use "production" for v3
   npx sst deploy --stage production
   ```

3. **Domain Migration** (if using custom domain):
   - First deploy without domain to test
   - Then add domain with `dns: false` (since using external domain)
   - Update DNS records to point to new CloudFront distribution

4. **Certificate Handling**:
   - Your certificate ARN is now passed directly via `cert` prop
   - No need for CDK certificate import

## 🔍 Important Notes

### Domain Configuration
Your current setup uses an external domain with an existing certificate. In v3:
```typescript
domain: process.env.APP_DOMAIN_NAME ? {
  name: process.env.APP_DOMAIN_NAME,
  cert: process.env.AWS_CERT_ARN,
  dns: false,  // Set to false for external domains
} : undefined,
```

### Build Output
SST v3 with the `Nextjs` component automatically handles:
- Running `next build`
- Detecting the output directory (`out` from your `next.config.mjs`)
- Deploying to S3 + CloudFront
- File purging on each deploy

### Removal Policy
- Production stage (`prod`): Resources are retained on removal
- Other stages: Resources are removed when stack is removed

## 📚 Additional Resources

- [SST v3 Documentation](https://sst.dev/docs/)
- [SST v3 Nextjs Component](https://sst.dev/docs/component/aws/nextjs)
- [Migration Guide](https://sst.dev/docs/migrate-from-v2/)
- [SST Console](https://console.sst.dev/) - For autodeploy and monitoring

## 🐛 Troubleshooting

### If you see TypeScript errors:
```bash
npx sst install
```

### To see what will be deployed:
```bash
npx sst diff --stage <stage-name>
```

### To check SST version:
```bash
npx sst version
```

### Common Commands

```bash
# Start dev environment
npm run dev

# Deploy to specific stage
npx sst deploy --stage <stage-name>

# Remove a stage
npx sst remove --stage <stage-name>

# View secrets (now stored in state file, encrypted)
npx sst secret list --stage <stage-name>

# Set a secret
npx sst secret set <name> <value> --stage <stage-name>
```

## ✨ New Features in v3

1. **Faster deployments** - No CloudFormation waiting
2. **Better dev experience** - Integrated dev server
3. **Multi-cloud support** - Can deploy to any cloud via Pulumi providers
4. **Better state management** - Local state with S3 backup
5. **SST Console** - Built-in deployment dashboard and monitoring

## 🚀 Testing the Migration

Start with a test deployment:

```bash
# Terminal 1: Start development
npm run dev

# This will:
# - Deploy infrastructure to AWS
# - Start Next.js dev server
# - Enable hot reload
# - Link resources automatically
```

The site should work exactly as before, but with v3 benefits!
