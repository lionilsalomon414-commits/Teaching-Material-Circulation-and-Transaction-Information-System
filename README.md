🇮🇩 [Bahasa Indonesia](README.id.md)

# 📚 SITTA UT — Teaching Materials Inventory & Transaction System

A static web application for monitoring teaching-material stock and tracking package deliveries at Universitas Terbuka (Indonesia's Open University). Built with **plain HTML, CSS, and JavaScript**, with no frameworks and no backend, as a course project for *Web Programming*. The user interface is in Indonesian.

> ⚠️ All data (users, materials, and shipments) is **sample data** stored in `data.js`. This project is for learning purposes and does not use real server-side authentication.

## ✨ Features

### 🔐 Login and Accounts
- Email and password login with validation for empty fields and an error message for wrong credentials.
- **Forgot password**: validates the email format and checks whether the email is registered.
- **Sign up**: requires all fields, a valid email, a password of at least 6 characters, and a unique email. New accounts are stored in `localStorage`.
- Sessions are kept in `sessionStorage`. Every page except login is protected and redirects to the login page when no one is signed in.
- **Logout** button with a confirmation prompt.

### 🏠 Dashboard
- Time-based greeting (morning, afternoon, evening, night) plus the user's role and location.
- A live clock and date that update every second.
- Summary cards: total titles, total stock, and the number of items with low stock (below 200).

### 📦 Teaching Materials
- Card grid with cover, location code, item code, name, type, edition, and stock.
- **Live search** by name or item code.
- Stock below 200 is flagged as **(menipis)**, meaning low.
- **Add new stock** with validation: all fields required, edition at least 1, stock 0 or more, and no duplicate item codes. The cover image is optional.
- If a cover image fails to load, a text placeholder is shown.

### 🚚 Delivery Tracking
- Search by **Delivery Order (DO) number**.
- Shows the recipient, status, courier, shipping date, package type, and total payment.
- Progress bar and stages: *Diproses (Processing) → Dikirim (Shipped) → Dalam Perjalanan (In Transit) → Diterima (Delivered)*.
- Package journey history, sorted newest first.

### 🧭 Navigation Bar
- Links to Dashboard, Teaching Materials, Delivery Tracking, a Reports dropdown, and Transaction History.
- Reports and Transaction History are placeholders that show a "not available yet" message.

## 🧪 Demo Accounts and Data

| Email | Password | Role |
|---|---|---|
| `rina@ut.ac.id` | `rina123` | Regional office (Jakarta) |
| `agus@ut.ac.id` | `agus123` | Regional office (Makassar) |
| `siti@ut.ac.id` | `siti123` | Central lab |
| `doni@ut.ac.id` | `doni123` | Faculty |
| `admin@ut.ac.id` | `admin123` | Administrator |

**DO numbers for testing tracking:** `2023001234` (In Transit, JNE) and `2023005678` (Shipped, Pos Indonesia).

## 📁 Project Structure

```
.
├── src/
│   ├── index.html        # Login page
│   ├── dashboard.html    # Dashboard
│   ├── stok.html         # Teaching materials
│   ├── tracking.html     # Delivery tracking
│   ├── css/style.css     # Styles
│   ├── js/
│   │   ├── data.js       # Sample data (users, materials, tracking)
│   │   └── script.js     # Logic for all pages
│   └── img/              # Material cover images
└── README.md
```

`script.js` is shared by every page. Each page is identified by the `data-page` attribute on its `<body>` tag, and the matching initialization function runs.

## 🚀 Getting Started

No installation or build step is needed.

```bash
# 1. Clone the repository
git clone https://github.com/<username>/<repository-name>.git
cd <repository-name>/src

# 2. Open index.html in your browser,
#    or use the Live Server extension in VS Code
```

The logo on the login page is optional. Add `src/assets/logo-ut.png` to display it; if the file is missing, the logo is hidden automatically.

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| HTML5 | Semantic page structure (`header`, `nav`, `main`, `section`, `article`) |
| CSS3 | Responsive layout, cards, modals, progress bar, and timeline |
| JavaScript (ES6) | DOM manipulation, form validation, search, and simple page routing |
| Web Storage | `sessionStorage` for sessions, `localStorage` for new accounts |

## ⚠️ Notes and Limitations

- Passwords are stored as plain text on the client side. This is for learning only and **must not be used in a real application**.
- Newly added stock is kept in memory only and is lost when the page reloads.
- Uploaded cover images only last while the page stays open.

## 👤 Author

**[Your Name]** — [Student ID] — Information Systems, Universitas Terbuka

## 📄 License

Created for learning purposes. Feel free to use and extend it.
