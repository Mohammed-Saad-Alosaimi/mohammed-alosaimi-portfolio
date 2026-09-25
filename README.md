# Mohammed Alosaimi Portfolio

المستودع الرسمي للموقع الشخصي والمهني لـ **Mohammed Saad Alosaimi**.

المشروع عبارة عن Portfolio احترافي مبني باستخدام **Next.js / React / Vinext** ومهيأ للعمل على **Cloudflare**، مع لوحة تحكم لإدارة المحتوى، وتخزين البيانات باستخدام **Cloudflare D1** والملفات باستخدام **Cloudflare R2**.

---

# العربية

## نظرة عامة

يتكون المشروع من واجهتين رئيسيتين:

1. **الموقع العام Portfolio**
   - يعرض الملف المهني.
   - الخبرات العملية.
   - المشاريع.
   - الأعمال التصميمية.
   - البرامج التدريبية.
   - العلاقات المهنية.
   - الملفات القابلة للتحميل مثل السيرة الذاتية والتوصيات.

2. **لوحة التحكم Admin Panel**
   - تعديل محتوى الموقع بدون الحاجة لتعديل الكود.
   - إضافة وتعديل المشاريع والخبرات والتدريب والأعمال.
   - رفع الصور والملفات.
   - نشر التحديثات مباشرة.

يتم حفظ المحتوى المنشور في **Cloudflare D1**، بينما يتم تخزين الملفات والصور والمستندات في **Cloudflare R2**.

---

## التقنيات المستخدمة

- **Next.js 16**
- **React 19**
- **TypeScript**
- **Vinext**
- **Vite**
- **Cloudflare Workers**
- **Cloudflare Pages**
- **Cloudflare D1**
- **Cloudflare R2**
- **Drizzle ORM**
- **Tailwind CSS**
- **ESLint**

---

## متطلبات التشغيل

يتطلب المشروع:

```bash
Node.js >= 22.13.0
```

ويُفضّل استخدام:

```bash
pnpm
```

لأن المشروع يحتوي على:

```text
pnpm-lock.yaml
pnpm-workspace.yaml
```

---

## التشغيل المحلي

### 1. استنساخ المستودع

```bash
git clone https://github.com/Mohammed-Saad-Alosaimi/mohammed-alosaimi-portfolio.git
```

ثم:

```bash
cd mohammed-alosaimi-portfolio
```

---

### 2. تثبيت الحزم

باستخدام pnpm:

```bash
pnpm install
```

أو باستخدام npm:

```bash
npm install
```

---

### 3. تشغيل بيئة التطوير

```bash
pnpm dev
```

أو:

```bash
npm run dev
```

بعد التشغيل، افتح العنوان المحلي الذي يظهر في Terminal.

---

## بناء المشروع

لإنشاء نسخة Production:

```bash
pnpm build
```

أو:

```bash
npm run build
```

---

## تشغيل الاختبارات

```bash
pnpm test
```

أو:

```bash
npm test
```

يقوم أمر الاختبار ببناء المشروع أولًا ثم تشغيل اختبارات المشروع.

---

## فحص الكود

```bash
pnpm lint
```

أو:

```bash
npm run lint
```

---

# بنية المشروع

```text
mohammed-alosaimi-portfolio/
│
├── .openai/
│   └── hosting.json
│
├── app/
│   ├── admin/
│   ├── api/
│   │   ├── admin/
│   │   ├── public-content/
│   │   └── public-files/
│   ├── chatgpt-auth.ts
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── portfolio-content.ts
│   └── portfolio-store.ts
│
├── build/
│   └── sites-vite-plugin.ts
│
├── db/
│   ├── index.ts
│   └── schema.ts
│
├── drizzle/
│   ├── migrations
│   └── meta/
│
├── public/
│   ├── assets/
│   ├── downloads/
│   ├── admin-content.js
│   ├── _headers
│   ├── favicon.svg
│   └── og.png
│
├── tests/
│
├── worker/
│   └── index.ts
│
├── .gitignore
├── README.md
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── drizzle.config.ts
├── eslint.config.mjs
├── postcss.config.mjs
├── tsconfig.json
└── vite.config.ts
```

---

## شرح أهم المجلدات

### `app/`

يحتوي على التطبيق الرئيسي.

أهم الملفات:

```text
app/page.tsx
```

الصفحة الرئيسية للـPortfolio.

```text
app/portfolio-content.ts
```

المحتوى الافتراضي للموقع.

```text
app/portfolio-store.ts
```

طبقة التعامل مع المحتوى المخزن.

---

### `app/admin/`

لوحة التحكم الخاصة بإدارة الموقع.

تسمح بتعديل:

- بيانات الموقع.
- الخبرات.
- المشاريع.
- الأعمال التصميمية.
- البرامج التدريبية.
- الملفات.
- العلاقات المهنية.

---

### `app/api/admin/`

واجهات API المحمية الخاصة بلوحة الإدارة.

تشمل:

```text
/api/admin/content
```

لإدارة محتوى الموقع.

و:

```text
/api/admin/upload
```

لرفع الملفات.

---

### `app/api/public-content/`

واجهة API عامة لقراءة آخر محتوى منشور.

---

### `app/api/public-files/`

تستخدم لتقديم الملفات المخزنة في Cloudflare R2 للزوار.

---

### `public/`

يحتوي على الملفات العامة المستخدمة في الموقع مثل:

- الصور.
- ملفات التصميم.
- الشعارات.
- ملفات PDF.
- الفيديوهات.
- السيرة الذاتية.
- خطابات التوصية.

---

### `db/`

تعريف الاتصال بقاعدة البيانات والجداول.

---

### `drizzle/`

يحتوي على Database Migrations الخاصة بـDrizzle ORM.

عند تعديل Schema يمكن إنشاء Migration جديد عبر:

```bash
pnpm db:generate
```

---

### `worker/`

يحتوي على Cloudflare Worker المستخدم عند التشغيل والنشر.

---

### `build/`

يحتوي على أدوات Build خاصة بالمشروع.

> ملاحظة: هذا المجلد ليس Build Output عاديًا ولا يجب حذفه، لأن `vite.config.ts` يعتمد عليه.

---

# Cloudflare

## Cloudflare D1

يستخدم المشروع D1 لتخزين محتوى الـPortfolio المنشور.

Binding المستخدم:

```text
DB
```

يتم تعريفه في:

```text
.openai/hosting.json
```

---

## Cloudflare R2

يستخدم المشروع R2 لتخزين:

- الصور.
- ملفات PDF.
- الفيديو.
- الملفات المرفوعة من لوحة التحكم.

Binding المستخدم:

```text
CONTENT_FILES
```

---

## إعدادات Hosting

الملف:

```text
.openai/hosting.json
```

يحدد الموارد التي يعتمد عليها التطبيق، بما فيها D1 وR2.

---

# النشر على Cloudflare

المشروع مصمم ليعمل على بيئة Cloudflare باستخدام Vinext وCloudflare Vite Plugin.

## قبل النشر

تأكد من:

1. تثبيت Dependencies.

```bash
pnpm install
```

2. نجاح Build.

```bash
pnpm build
```

3. نجاح الاختبارات.

```bash
pnpm test
```

4. التأكد من إعداد:

```text
DB
CONTENT_FILES
```

في Cloudflare.

---

## Cloudflare Pages

يمكن ربط مستودع GitHub مباشرة بمشروع Cloudflare Pages.

المستودع:

```text
Mohammed-Saad-Alosaimi/mohammed-alosaimi-portfolio
```

الفرع الرئيسي:

```text
main
```

---

## الموقع العام

بيئة الموقع العامة الحالية مصممة للعمل على:

```text
https://mohammed-alosaimi.pages.dev
```

---

## لوحة إدارة المحتوى

المشروع يحتوي كذلك على طبقة إدارة محتوى مرتبطة ببيئة ChatGPT Sites / Cloudflare.

عند تغيير النطاقات يجب مراجعة:

- CORS
- Content Security Policy
- API origins
- `_headers`
- إعدادات Worker

حتى يظل الاتصال بين الموقع العام ولوحة الإدارة يعمل بصورة صحيحة.

---

# إدارة المحتوى

الموقع لا يعتمد فقط على محتوى ثابت داخل الكود.

التدفق العام هو:

```text
Admin Panel
      ↓
Admin API
      ↓
Cloudflare D1
      ↓
Public Content API
      ↓
Portfolio
```

أما الملفات:

```text
Admin Upload
      ↓
Cloudflare R2
      ↓
Public Files API
      ↓
Portfolio
```

---

# الأمان

لوحة التحكم مصممة لتكون منفصلة عن الموقع العام.

المشروع يتضمن:

- Authentication helpers.
- حماية لواجهات الإدارة.
- فصل بين Public APIs وAdmin APIs.
- HTTP Security Headers.
- Content Security Policy.
- منع رفع ملفات كبيرة جدًا من لوحة الإدارة.

لا ينبغي تخزين أي مفاتيح أو Secrets داخل المستودع.

استخدم ملفات:

```text
.env
.env.local
```

محليًا فقط.

هذه الملفات مستبعدة من Git عن طريق:

```text
.gitignore
```

---

# قواعد المستودع

لا ينبغي رفع الملفات التالية:

```text
node_modules/
.next/
.vinext/
dist/
.wrangler/
.env*
*.zip
*.tgz
*.tar.gz
```

كما يُفضّل عدم رفع Build Outputs أو Deployment Archives إلى GitHub.

---

# التحديثات

عند تعديل المشروع:

```bash
git add .
git commit -m "Describe the update"
git push origin main
```

أو يمكن استخدام **GitHub Desktop** لتنفيذ Commit وPush بدون Terminal.

---

# النسخ الاحتياطي

قبل أي تعديل كبير يُفضّل الاحتفاظ بنسخة محلية مستقلة من المشروع.

GitHub يمثل النسخة الأساسية للكود، بينما يمكن الاحتفاظ بنسخة محلية Backup عند الحاجة.

---

---

# English

## Overview

This repository contains the official professional portfolio of **Mohammed Saad Alosaimi**.

The project is a full-stack professional portfolio built with **Next.js, React, Vinext, and Cloudflare infrastructure**.

It includes two primary surfaces:

1. **Public Portfolio**
   - Professional profile.
   - Work experience.
   - Projects.
   - Design portfolio.
   - Training programs.
   - Professional relationships.
   - Downloadable documents.

2. **Admin Control Panel**
   - Edit portfolio content without modifying source code.
   - Add or update projects, experience, training, and design work.
   - Upload documents and media.
   - Publish updates to the public portfolio.

Published content is stored in **Cloudflare D1**, while media and uploaded files are stored in **Cloudflare R2**.

---

## Technology Stack

- Next.js 16
- React 19
- TypeScript
- Vinext
- Vite
- Cloudflare Workers
- Cloudflare Pages
- Cloudflare D1
- Cloudflare R2
- Drizzle ORM
- Tailwind CSS
- ESLint

---

## Requirements

The project requires:

```bash
Node.js >= 22.13.0
```

The recommended package manager is:

```bash
pnpm
```

The repository currently includes:

```text
pnpm-lock.yaml
pnpm-workspace.yaml
```

---

# Local Development

## 1. Clone the repository

```bash
git clone https://github.com/Mohammed-Saad-Alosaimi/mohammed-alosaimi-portfolio.git
```

Then:

```bash
cd mohammed-alosaimi-portfolio
```

---

## 2. Install dependencies

Using pnpm:

```bash
pnpm install
```

Alternatively:

```bash
npm install
```

---

## 3. Start development

```bash
pnpm dev
```

or:

```bash
npm run dev
```

Open the local URL displayed in the terminal.

---

# Production Build

```bash
pnpm build
```

or:

```bash
npm run build
```

---

# Tests

```bash
pnpm test
```

or:

```bash
npm test
```

The test command builds the project before running the application tests.

---

# Linting

```bash
pnpm lint
```

or:

```bash
npm run lint
```

---

# Project Structure

```text
mohammed-alosaimi-portfolio/
│
├── .openai/
│   └── hosting.json
│
├── app/
│   ├── admin/
│   ├── api/
│   │   ├── admin/
│   │   ├── public-content/
│   │   └── public-files/
│   ├── chatgpt-auth.ts
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── portfolio-content.ts
│   └── portfolio-store.ts
│
├── build/
│   └── sites-vite-plugin.ts
│
├── db/
├── drizzle/
│
├── public/
│   ├── assets/
│   ├── downloads/
│   ├── admin-content.js
│   ├── _headers
│   ├── favicon.svg
│   └── og.png
│
├── tests/
├── worker/
│
├── .gitignore
├── README.md
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── drizzle.config.ts
├── eslint.config.mjs
├── postcss.config.mjs
├── tsconfig.json
└── vite.config.ts
```

---

# Main Directories

## `app/`

Contains the main application.

Key files:

```text
app/page.tsx
```

Public portfolio page.

```text
app/portfolio-content.ts
```

Default portfolio content.

```text
app/portfolio-store.ts
```

Portfolio persistence layer.

---

## `app/admin/`

Contains the portfolio administration interface.

The admin panel manages:

- Site information.
- Experience.
- Projects.
- Training.
- Design work.
- Downloads.
- Professional relationships.

---

## `app/api/admin/`

Protected APIs used by the administration panel.

Main endpoints:

```text
/api/admin/content
```

Portfolio content management.

```text
/api/admin/upload
```

File and media uploads.

---

## `app/api/public-content/`

Read-only public endpoint that provides the latest published portfolio content.

---

## `app/api/public-files/`

Serves files stored in Cloudflare R2.

---

## `public/`

Contains publicly served assets including:

- Images.
- Design work.
- Logos.
- PDFs.
- Videos.
- CV.
- Recommendation letters.

---

## `db/`

Database connection and schema definitions.

---

## `drizzle/`

Contains database migrations and Drizzle metadata.

After changing the database schema, generate migrations using:

```bash
pnpm db:generate
```

---

## `worker/`

Cloudflare Worker entry point.

---

## `build/`

Contains project-specific build utilities.

> This directory is not disposable build output. `vite.config.ts` imports `build/sites-vite-plugin.ts`, so it must remain in the repository.

---

# Cloudflare Architecture

## Cloudflare D1

Cloudflare D1 stores published portfolio content.

Binding:

```text
DB
```

---

## Cloudflare R2

Cloudflare R2 stores uploaded assets such as:

- Images.
- PDFs.
- Videos.
- Documents.

Binding:

```text
CONTENT_FILES
```

---

## Hosting Configuration

Cloudflare/OpenAI hosting bindings are declared in:

```text
.openai/hosting.json
```

---

# Cloudflare Deployment

The project is designed for Cloudflare infrastructure using Vinext and the Cloudflare Vite Plugin.

Before deployment:

```bash
pnpm install
pnpm build
pnpm test
```

Confirm that the following Cloudflare bindings are configured:

```text
DB
CONTENT_FILES
```

---

## Cloudflare Pages

The GitHub repository can be connected directly to Cloudflare Pages.

Repository:

```text
Mohammed-Saad-Alosaimi/mohammed-alosaimi-portfolio
```

Production branch:

```text
main
```

---

## Public Portfolio

The current public deployment is designed around:

```text
https://mohammed-alosaimi.pages.dev
```

---

## Admin / Content Management Surface

The content-management layer is connected to a ChatGPT Sites / Cloudflare environment.

If deployment domains change, review:

- CORS configuration.
- Content Security Policy.
- Allowed API origins.
- `_headers`.
- Worker security headers.

This ensures that the public portfolio can continue to retrieve published content correctly.

---

# Content Architecture

Portfolio content follows this flow:

```text
Admin Panel
      ↓
Admin API
      ↓
Cloudflare D1
      ↓
Public Content API
      ↓
Public Portfolio
```

Uploaded assets follow:

```text
Admin Upload
      ↓
Cloudflare R2
      ↓
Public Files API
      ↓
Public Portfolio
```

---

# Security

The project separates public content from protected administration functionality.

Security measures include:

- Authentication helpers.
- Protected administrative APIs.
- Public/private API separation.
- Security response headers.
- Content Security Policy.
- Upload size restrictions.

Never commit secrets or credentials to GitHub.

Use local environment files such as:

```text
.env
.env.local
```

These files should remain ignored through `.gitignore`.

---

# Repository Hygiene

The following should not be committed:

```text
node_modules/
.next/
.vinext/
dist/
.wrangler/
.env*
*.zip
*.tgz
*.tar.gz
```

Generated deployment bundles and temporary build artifacts should remain outside source control.

---

# Updating the Repository

Using Git:

```bash
git add .
git commit -m "Describe the update"
git push origin main
```

Alternatively, use **GitHub Desktop** to commit and push changes without using the command line.

---

# Backup

Keep a separate local backup before major structural changes.

The GitHub repository should remain the canonical source-code repository, while local backup copies can be retained for recovery when necessary.

---

## Author

**Mohammed Saad Alosaimi**

Marketing Communication • Corporate Communication • Marketing • Creative & Visual Communication

Saudi Arabia
