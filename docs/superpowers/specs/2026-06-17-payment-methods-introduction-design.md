# Design: Payment Methods Introduction Page

**Date:** 2026-06-17  
**Scope:** English only (Spanish deferred)

## Goal

Create an introductory page at `/en/payments/payment-methods/introduction` that lists all documented payment methods in one place, grouped by category, each with a name linked to its detail page. No descriptions are shown in the list. The navigation already has the entry pointing to this URL; the file just needs to be created.

## File to Create

`src/pages/en/payments/payment-methods/introduction.mdx`

The Spanish navigation does not yet have a corresponding entry, so no Spanish file is created in this pass.

## Page Structure

```
export const description = '...'

# Payment Methods

Lead paragraph explaining the page purpose.

## Cards
- [EBT](/payments/cards/ebt)

## Bank Debits
- [ACH Bank Debit](/payments/external-redirects/ach-bank-debit)

## External Redirects
- [ATH Móvil](/payments/external-redirects/ath-movil)
- [Bre-B](/payments/external-redirects/bre-b)
- [CeroPay](/payments/external-redirects/ceropay)
- [Deuna!](/payments/external-redirects/deuna)
- [Zunify](/payments/external-redirects/zunify)

## Cash
- [Cash payment](/payments/cash/cash)

## Wallets
- [Click to Pay](/payments/wallets/clicktopay)
- [Google Pay](/payments/wallets/googlepay)
```

## Content Source

Category groupings and entries exactly mirror `TAB_NAVIGATION.payments[EN]` "Payment methods" section in `src/constants/navigations.js` (lines 504–545), so the intro page stays in sync with the nav by convention. No descriptions are included in list items.

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
