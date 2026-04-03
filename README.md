# SEWA Expo 2026 - Website

Official static website for SEWA Expo 2026 — India's Pioneering Exhibition for 50+ Enrichment & Wellness.

---

## 🚀 Deployment Checklist (cPanel)

When deploying to a new server, **these files must be uploaded manually** and are NOT included in this repository:

### 1. `config.php` (Secrets)
- **Location:** Place **one level above** the web root (e.g., `/home/username/config.php`) for security.
- **Contains:** SMTP App Password, Cloudflare Turnstile Secret Key.
- **Template:** See `config.php.example` in this repo.

### 2. `PHPMailer-master/` (Email Library)
- **Location:** Upload to the same folder as `send-mail.php` (e.g., `public_html/sewaexpo/PHPMailer-master/`).
- **Download:** https://github.com/PHPMailer/PHPMailer/archive/refs/heads/master.zip
- **Structure:**
  ```
  PHPMailer-master/
    └── src/
        ├── Exception.php
        ├── PHPMailer.php
        └── SMTP.php
  ```

### 3. `send-mail.php` (Form Handler)
- **Location:** Web root (e.g., `public_html/sewaexpo/send-mail.php`).
- **Note:** This file is in `.gitignore` to protect credentials. Update it manually if needed.

---

## 📁 Project Structure

```
sewaexpo/
├── index.html                  # Homepage
├── about/                      # About page
├── contact/                    # Contact page + form
├── registration/               # Registration page + form
├── visitor/                    # Visitor information
├── exhibition/                 # Exhibitor profiles
├── static/
│   ├── site.js                 # Mobile menu, form handling, smooth scroll
│   └── site.css                # Custom styles
├── send-mail.php               # PHP form handler (uses PHPMailer + SMTP)
├── config.php                  # Secrets (DO NOT COMMIT)
├── .htaccess                   # Apache config (clean URLs, caching, security)
├── 404.html                    # Custom 404 page
└── _next/                      # Next.js static chunks (from original build)
```

---

## ⚙️ cPanel Setup

1. **Upload all files** to `public_html/sewaexpo/` (or your desired folder).
2. **Upload `PHPMailer-master/`** to the same folder.
3. **Upload `config.php`** one level above the web root (e.g., `/home/username/config.php`).
4. **Update `send-mail.php`** to point to your config:
   ```php
   require __DIR__ . '/../config.php'; // Adjust path as needed
   ```
5. **Ensure `.htaccess`** is uploaded to enable clean URLs and caching.

---

## 🔑 Updating Secrets

Edit `config.php` on the server:

```php
<?php
define('TURNSTILE_SECRET', 'your-turnstile-secret-key');
define('SMTP_APP_PASSWORD', 'your-gmail-app-password');
```

**Get Gmail App Password:**
1. Go to https://myaccount.google.com/apppasswords
2. Create an app password for "SEWA Expo"
3. Use the 16-character code (no spaces)

**Get Cloudflare Turnstile Secret:**
1. Go to Cloudflare Dashboard → Turnstile
2. Copy the Secret Key for your site

---

## 🛠️ Local Development

This is a **static Next.js export**. To make changes:
- Edit HTML files directly for quick fixes.
- For major changes, use the original Next.js source code (not included in this repo).

**Preview locally:**
```bash
npx serve .
# or
python -m http.server 8000
```

---

## 📧 Form Configuration

- **Recipient:** `anubhav.diinfotech@gmail.com`
- **CC:** `karan.kumar@diinfotech.com`
- **Sender:** `connect@sewaexpo.com` (via Gmail SMTP)
- **CAPTCHA:** Cloudflare Turnstile

---

## 🔒 Security Notes

- Never commit `config.php` or `send-mail.php` with real credentials.
- Keep `config.php` outside `public_html` if possible.
- Regularly rotate Gmail App Passwords.
- Monitor form submissions for spam.

---

© 2026 SEWA Expo. All rights reserved.
