# سایت استودیو طراحی داخلی (React + Vite)

## اجرای محلی

```bash
npm install
npm run dev
```

آدرس `http://localhost:5173` را در مرورگر باز کنید.

## دیپلوی روی GitHub Pages (خودکار)

1. یک ریپازیتوری جدید در GitHub بسازید و کدهای این پوشه را در شاخه `main` push کنید.
2. به **Settings ← Pages** بروید و در بخش **Build and deployment** گزینه **Source** را روی **GitHub Actions** قرار دهید.
3. از این به بعد با هر push روی `main`، سایت به‌صورت خودکار ساخته و منتشر می‌شود.

آدرس سایت: `https://نام-کاربری.github.io/نام-ریپازیتوری/`

## ویرایش محتوا

- **متن خدمات، پروژه‌ها، مراحل کار و نظرات:** فایل `src/data.js`
- **تماس و آدرس:** ثابت‌های `EMAIL` و `PHONE` در ابتدای `src/App.jsx`
- **رنگ‌ها و فونت‌ها:** متغیرهای `:root` در `src/styles.css`
- **عکس پروژه‌ها:** در `data.js` به‌جای `gradient` می‌توانید `image` بگذارید و در `App.jsx` از `backgroundImage` استفاده کنید. عکس‌ها را در پوشه `public/` قرار دهید.
