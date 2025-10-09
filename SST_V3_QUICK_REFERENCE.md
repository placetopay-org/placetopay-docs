# SST v3 Quick Reference

## Common Commands

### Development
```bash
# Start development environment (deploys + runs Next.js dev server)
npm run dev

# Or directly
npx sst dev

# Stop dev environment: Ctrl+C
```

### Deployment
```bash
# Deploy to current stage (uses your AWS profile)
npx sst deploy

# Deploy to specific stage
npx sst deploy --stage production
npx sst deploy --stage dev
npx sst deploy --stage staging

# Preview changes before deployment
npx sst diff --stage production
```

### State Management
```bash
# View current state
npx sst state

# Remove a stage (deletes resources based on removal policy)
npx sst remove --stage dev
```

### Secrets Management
```bash
# List all secrets
npx sst secret list --stage production

# Set a secret
npx sst secret set MY_SECRET "secret-value" --stage production

# Remove a secret
npx sst secret remove MY_SECRET --stage production
```

### Debugging
```bash
# Check SST version
npx sst version

# Reinstall providers (if you see type errors)
npx sst install

# View logs (coming from AWS)
# Use AWS Console or CloudWatch for now
```

## Environment Variables

Create a `.env` file in your project root:

```env
# Required for custom domain
APP_DOMAIN_NAME=docs.example.com
AWS_CERT_ARN=arn:aws:acm:us-east-1:123456789012:certificate/xxx

# Next.js public variables
NEXT_PUBLIC_FEEDBACK_FORM_URL=https://forms.example.com
NEXT_PUBLIC_GITHUB_REPO_URL=https://github.com/org/repo
```

## Stage-Specific Variables

For stage-specific environment variables, use:

```bash
# Set environment variable for a specific stage
npx sst secret set APP_DOMAIN_NAME "staging.example.com" --stage staging
```

## Outputs

After deployment, SST outputs the site URL:

```bash
✔  Complete
   SiteUrl: https://d1234567890.cloudfront.net
```

## Project Structure

```
placetopay-docs/
├── .sst/                 # SST state and generated files (gitignored)
│   ├── platform/         # Platform types
│   └── state/           # Local state files
├── sst.config.ts        # SST v3 configuration
├── sst.config.ts.bk     # Backup of v2 config
├── sst-env.d.ts         # TypeScript definitions
├── package.json         # Updated dependencies
└── MIGRATION_V3.md      # Full migration guide
```

## Important Notes

### Domain Configuration
- `dns: false` means SST won't manage your DNS records
- You need to manually point your domain to the CloudFront distribution
- Certificate must exist in ACM before deployment

### Build Process
- SST automatically runs `next build`
- Output directory (`out`) is detected from `next.config.mjs`
- Files are uploaded to S3 and served via CloudFront

### Removal Policy
- **Production stage (`prod`)**: Resources are retained
- **Other stages**: Resources are removed when stage is removed

## Troubleshooting

### TypeScript errors in sst.config.ts
```bash
npx sst install
```

### "Cannot find name '$config'"
Make sure SST v3 is installed:
```bash
npm install
npx sst version
```

### Environment variables not working
1. Check `.env` file exists
2. Verify variable names match in `sst.config.ts`
3. For Next.js public vars, use `NEXT_PUBLIC_` prefix

### Build fails
```bash
# Check Next.js build locally
npm run build

# View detailed logs
npx sst deploy --verbose
```

## Migration Checklist

- [x] Update package.json (SST v3, remove CDK)
- [x] Update sst.config.ts (v3 syntax)
- [x] Update sst-env.d.ts (v3 path)
- [x] Update dev script (sst dev)
- [x] Install dependencies
- [ ] Set up environment variables (.env)
- [ ] Test locally (npm run dev)
- [ ] Deploy to test stage
- [ ] Verify site works
- [ ] Update DNS records (if using custom domain)
- [ ] Deploy to production
- [ ] Monitor for issues

## Resources

- [SST v3 Documentation](https://sst.dev/docs/)
- [SST Nextjs Component](https://sst.dev/docs/component/aws/nextjs)
- [SST Console](https://console.sst.dev/)
- [SST Discord](https://sst.dev/discord)
