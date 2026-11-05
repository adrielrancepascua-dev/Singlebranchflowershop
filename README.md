# Flowershop

Single-shop back office for a flower shop. It opens in **admin mode** with sample products, stock, orders, and sales already loaded in the browser.

The screens a one-location shop uses:

- **Home** — today’s sales, open orders, and low stem counts
- **Orders** — calendar and list for walk-ins, pickups, and deliveries
- **Inventory** — stock in and stock out for flowers, wrappers, and gift items
- **Products** — flower types, colors, and shop extras
- **Reports** — sales, supplier costs, and a printable shop report

Inter-branch transfers, team accounts, and the other locations are not part of this shop.

## Run locally

```bash
npm install
npm run dev
```

The app serves at [http://127.0.0.1:4721](http://127.0.0.1:4721) and lands on the admin home page. Sample data lives in this browser’s local storage, so edits stay on this computer until you clear site data.
