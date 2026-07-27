# MAVA Water — React + Vite

واجهة رئيسية عربية حديثة لمشروع MAVA Water، مبنية باستخدام React وVite وFramer Motion.

## التشغيل

```bash
npm install
npm run dev
```

## بنية الصفحات

- `src/App.jsx`: مسؤول فقط عن توجيه الصفحات.
- `src/pages/HomePage.jsx`: محتوى الصفحة الرئيسية.
- `src/styles.css`: التصميم، الاستجابة والحركات.
- `public/assets`: الصور والشعارات.

يمكن إضافة أي صفحة جديدة داخل `src/pages` ثم تسجيل مسارها داخل `src/App.jsx`.

## الخط

يتم تحميل Alexandria محليًا من حزمة `@fontsource/alexandria` عند تنفيذ `npm install`، لذلك لا يعتمد الموقع على Google Fonts أثناء التشغيل.
