# Design: Payment Methods Introduction Page

**Date:** 2026-06-17  
**Scope:** English only (Spanish deferred)

## Goal

Create an introductory page at `/en/payments/payment-methods/introduction` that lists all documented payment methods in one place, grouped by category, each with a name (linked to its detail page) and a one-line description. The navigation already has the entry pointing to this URL; the file just needs to be created.

## File to Create

`src/pages/en/payments/payment-methods/introduction.mdx`

The Spanish navigation does not yet have a corresponding entry, so no Spanish file is created in this pass.

## Page Structure

```
export const description = '...'

# Payment Methods

Lead paragraph explaining the page purpose.

## Cards
- **[EBT](/payments/cards/ebt)** — one-line description

## Bank Debits
- **[ACH Bank Debit](/payments/external-redirects/ach-bank-debit)** — one-line description

## External Redirects
- **[ATH Móvil](/payments/external-redirects/ath-movil)** — one-line description
- **[Bre-B](/payments/external-redirects/bre-b)** — ...
- **[CeroPay](/payments/external-redirects/ceropay)** — ...
- **[Deuna!](/payments/external-redirects/deuna)** — ...
- **[Zunify](/payments/external-redirects/zunify)** — ...

## Cash
- **[Cash payment](/payments/cash/cash)** — one-line description

## Wallets
- **[Click to Pay](/payments/wallets/clicktopay)** — one-line description
- **[Google Pay](/payments/wallets/googlepay)** — one-line description
```

## Content Source

Descriptions are derived from `export const description` in each payment method's own MDX page. The category groupings and entries exactly mirror `TAB_NAVIGATION.payments[EN]` "Payment methods" section in `src/constants/navigations.js` (lines 504–545), so the intro page stays in sync with the nav by convention.

## Navigation

The English navigation already has the entry:
```js
{ title: 'Introduction', href: '/payments/payment-methods/introduction' }
```
No navigation changes needed.

## Conventions

- No `sectionMode` export needed (single-section page)
- Uses standard `##` headings for categories
- Stable heading IDs (`{{ id: '...' }}`) on each category heading to survive future edits
- No imports required beyond standard MDX globals
