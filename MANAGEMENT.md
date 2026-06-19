# CAS Capitals Digital Management System

## Overview
Management of:
- **Website**: cascapitals.com (hosted on Netlify)
- **GitHub**: Repository for website code & version control
- **LinkedIn**: Company page for CAS Capitals

---

## Website Management

### Current Setup
- **Domain**: cascapitals.com
- **Hosting**: Netlify (harmonious-baklava-ce936f.netlify.app)
- **DNS**: GoDaddy (A record → 75.2.60.5)
- **Technology**: Static HTML/CSS/JS (light theme, institutional design)
- **SSL**: Let's Encrypt (auto-provisioned)
- **Forms**: Netlify Forms (contact + job application)

### Architecture
- 5 HTML pages
- 2 CSS files (shared design system + apply page styles)
- 1 JavaScript file (shared scripts)
- Google Fonts (Inter + Space Grotesk)

### Pages

| Page | File | Purpose |
|------|------|---------|
| Homepage | index.html | Hero, marquee, features, technology, process, CTA |
| About | about.html | Mission, values, team profiles |
| Careers | careers.html | Why join, open positions, hiring process |
| Contact | contact.html | Contact form, firm information |
| Apply | apply.html | Job application form with file upload |

### Design System

**Colors:**
- Background: #ffffff (white)
- Background Alt: #f5f7fa (light gray)
- Text: #0f172a (dark)
- Text Secondary: #475569 (medium gray)
- Text Muted: #64748b (light gray)
- Accent: #2563eb (blue)
- Accent Hover: #1d4ed8 (darker blue)
- Border: #e2e8f0 (light border)

**Typography:**
- Body: Inter
- Display: Space Grotesk

**Design Tokens:**
- All spacing uses `--space-*` tokens (0.25rem to 8rem)
- All shadows use `--shadow-*` tokens
- All transitions use `--transition-*` tokens (fast/base/slow)

### Website Sections (Homepage)

1. **Navbar** - Fixed, scroll-aware, mobile hamburger menu
2. **Hero** - Badge, title, subtitle, CTAs, stats, visual card with research process
3. **Marquee** - Infinite scroll strip with research areas
4. **About** - Mission text + capability cards
5. **Features** - 6 core capability cards (3-column grid)
6. **Technology** - Data pipeline visualization + process pills
7. **Process** - 4-step research-to-deployment flow
8. **CTA** - Call-to-action with radial depth
9. **Footer** - Brand, links, disclaimer

---

## Repository Structure

```
CAS-CAPITALS/
├── index.html              # Homepage
├── about.html              # About page
├── careers.html            # Careers page
├── contact.html            # Contact page
├── apply.html              # Job application page
├── css/
│   ├── main.css            # Shared design system (~1985 lines)
│   └── apply.css           # Apply page styles (~275 lines)
├── js/
│   └── main.js             # Shared scripts (~248 lines)
├── references/
│   ├── old_homepage.html   # Previous dark-themed homepage (archive)
│   └── motion-reference.md # Animation reference
├── PROJECT_CONTEXT.md      # Project documentation
├── MANAGEMENT.md           # This file
└── README.md               # (if exists)
```

---

## Deployment

### Netlify Configuration
- **Account**: arnavchawla2609
- **Project**: harmonious-baklava-ce936f
- **Build Command**: None (static HTML)
- **Publish Directory**: Root (`/`)
- **Auto-deploy**: Enabled on push to main branch

### Form Handling
Two Netlify Forms are configured:

| Form | Name Attribute | Purpose |
|------|----------------|---------|
| Contact | `contact` | General inquiries |
| Application | `job-application` | Job submissions with file upload |

Both forms use:
- `netlify` attribute for Netlify detection
- `netlify-honeypot="bot-field"` for spam protection
- Hidden `form-name` input for form identification

### Deployment Process
1. Edit files locally
2. Test in browser
3. Commit changes (`git add . && git commit -m "description"`)
4. Push to GitHub (`git push`)
5. Netlify auto-deploys within seconds
6. Verify at cascapitals.com

---

## JavaScript Features

### Functions

| Function | Purpose |
|----------|---------|
| `initNavbar()` | Scroll-aware navbar styling (adds `.scrolled` class at 20px) |
| `initMobileNav()` | Hamburger menu toggle with Escape key and resize handling |
| `initRevealAnimations()` | IntersectionObserver for scroll-triggered fade-ins |
| `initContactForm()` | Contact form Netlify submission with success/error states |
| `initApplyForm()` | Application form with role prefill, file upload, drag/drop |

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- IntersectionObserver fallback for older browsers
- DataTransfer API for file drag/drop

---

## Accessibility

- All form fields have associated `<label>` elements
- Mobile menu button has `aria-label` and `aria-expanded`
- Active nav links have `aria-current="page"`
- Focus-visible outlines (2px solid accent)
- `prefers-reduced-motion` disables all animations
- Color contrast meets WCAG AA (5:1+ ratios)

---

## Maintenance

### Regular Checks
- Verify forms are receiving submissions (Netlify dashboard)
- Check for broken links
- Review SSL certificate validity
- Monitor Netlify analytics

### Content Updates

**To update contact email:**
1. Edit `contact.html` and `apply.html`
2. Search for `cascapitals26@gmail.com`
3. Replace with new email
4. Also update `js/main.js` (error message fallback text)
5. Commit and push

**To add a new job position:**
1. Edit `careers.html`
2. Duplicate an existing `.card` block in the positions section
3. Update title, experience, responsibilities, requirements
4. Update the `apply.html?role=` link with new role parameter
5. Commit and push

**To update team members:**
1. Edit `about.html`
2. Modify the team section cards
3. Update names, roles, bios
4. Commit and push

### File Editing Rules
- Never edit only `index.html` — changes may affect multiple pages
- Always test all 5 pages after CSS changes
- Form changes require testing both contact and apply forms
- Mobile menu changes should be tested at 320px, 768px, and 1024px

---

## Contact Information

**Company Email**: cascapitals26@gmail.com
**Website**: cascapitals.com
**Current Status**: Live & operational

---

## Known Issues

| Issue | Severity | Notes |
|-------|----------|-------|
| Marquee animation may appear static | Medium | CSS animation exists but may not trigger visual movement in all browsers |
| Contact form fails on localhost | Low | Expected — Netlify Forms only work on Netlify deployment |

---

## Next Steps

1. **Verify Netlify deployment** - Ensure forms work in production
2. **Test marquee animation** - Confirm movement in browser devtools
3. **LinkedIn company page** - Create and configure
4. **Analytics setup** - Configure Netlify analytics or external tool
5. **Performance audit** - Run Lighthouse for final optimization pass

---

**Last Updated**: June 19, 2026
**Managed By**: opencode
