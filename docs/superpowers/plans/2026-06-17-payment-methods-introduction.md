# Payment Methods Introduction Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create `src/pages/en/payments/payment-methods/introduction.mdx` — an English intro page listing all payment methods grouped by category, each as a plain link, mirroring the navigation structure.

**Architecture:** Single new MDX file under `src/pages/en/payments/payment-methods/`. No navigation changes needed — the English nav already points to `/payments/payment-methods/introduction`. Categories and entries mirror `TAB_NAVIGATION.payments[EN]` "Payment methods" section in `src/constants/navigations.js`.

**Tech Stack:** Next.js 16 static export, MDX, standard MDX component globals (no extra imports needed).

---

### Task 1: Create the payment methods introduction page

**Files:**
- Create: `src/pages/en/payments/payment-methods/introduction.mdx`

- [ ] **Step 1: Create the directory and file**

```bash
mkdir -p src/pages/en/payments/payment-methods
```

- [ ] **Step 2: Write the MDX file**

Create `src/pages/en/payments/payment-methods/introduction.mdx` with this exact content:

```mdx
export const description =
  'Overview of all payment methods supported by Placetopay, grouped by category.'

# Payment Methods {{ id: 'payment-methods' }}

An overview of all payment methods available through Placetopay integrations.

## Cards {{ id: 'cards' }}

- [EBT](/payments/cards/ebt)

## Bank Debits {{ id: 'bank-debits' }}

- [ACH Bank Debit](/payments/external-redirects/ach-bank-debit)

## External Redirects {{ id: 'external-redirects' }}

- [ATH Móvil](/payments/external-redirects/ath-movil)
- [Bre-B](/payments/external-redirects/bre-b)
- [CeroPay](/payments/external-redirects/ceropay)
- [Deuna!](/payments/external-redirects/deuna)
- [Zunify](/payments/external-redirects/zunify)

## Cash {{ id: 'cash' }}

- [Cash payment](/payments/cash/cash)

## Wallets {{ id: 'wallets' }}

- [Click to Pay](/payments/wallets/clicktopay)
- [Google Pay](/payments/wallets/googlepay)
```

- [ ] **Step 3: Verify the build compiles without errors**

```bash
npm run build
```

Expected: build completes with no errors. The page `/en/payments/payment-methods/introduction` should appear in the `/out` directory.

- [ ] **Step 4: Verify the dev server renders the page**

```bash
npm run dev
```

Open `http://localhost:3000/en/payments/payment-methods/introduction` and confirm:
- Page title is "Payment Methods"
- All 5 category headings are present
- All 10 links are present and point to the correct hrefs
- Sidebar shows "Introduction" as active under "Payment methods"

- [ ] **Step 5: Commit**

```bash
git add src/pages/en/payments/payment-methods/introduction.mdx
git commit -m "feat(payments): add English payment methods introduction page"
```
