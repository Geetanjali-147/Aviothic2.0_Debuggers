# 🎯 SahayScore - AI-Powered Dual Credit Scoring System

<div align="center">

![SahayScore Banner](https://img.shields.io/badge/SahayScore-NBCFDC-orange?style=for-the-badge)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.20-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4.17-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat&logo=node.js)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**Empowering financial inclusion through AI-powered dual credit scoring for backward classes**

[Live Demo](#) • [Documentation](#-documentation) • [Quick Start](#-quick-start) • [Features](#-features)

</div>

---

## 📖 Overview

**SahayScore** is an innovative loan assessment platform developed for the **National Backward Classes Finance & Development Corporation (NBCFDC)**. It revolutionizes the lending process by implementing a **dual credit scoring system** that evaluates both **repayment capability** and **genuine financial need**.

### 🎯 Mission
Transform the loan approval process from **7 days to just a few hours** while maintaining fairness and reducing defaults through AI-powered scoring.

### 🌟 Key Innovation
Unlike traditional credit scoring systems that only assess repayment ability, SahayScore introduces a **2D scoring matrix** that simultaneously evaluates:

1. **Repayment Score (0-500)**: Based on credit history, previous loans, and business income
2. **Need Score (0-500)**: Based on consumption proxies (electricity bills, mobile recharges, utility payments)

---

## ✨ Features

### 🚀 For Applicants

- **📝 Smart Application Form**
  - Real-time validation for Aadhar, phone, and loan amounts
  - Multi-step form with consumption-based need assessment
  - Document upload support (PDF, JPG, PNG up to 5MB)
  - Instant feedback and error handling

- **📊 Instant Score Results**
  - Composite score out of 1000
  - Dual score breakdown with visual indicators
  - Clear classification (Auto-Approve/Manual Review/Reject)
  - Next steps and loan terms for approved applications

- **🔍 Application Dashboard**
  - View all submitted applications
  - Search by name or application ID
  - Filter by status (Approved, Pending, Rejected)
  - Track application progress

### 🛡️ For Administrators

- **⚙️ Admin Panel**
  - Comprehensive application management
  - Advanced search and filtering
  - Approve/reject applications
  - Detailed scoring breakdown and classification

- **📈 Analytics & Insights**
  - Application statistics
  - Approval rate tracking
  - Score distribution analysis
  - Performance metrics

### 🎨 Design & UX

- **Modern Gradient UI** with orange-green NBCFDC branding
- **Framer Motion animations** for smooth interactions
- **Fully responsive** design for mobile, tablet, and desktop
- **Accessibility compliant** (ARIA labels, keyboard navigation, screen reader support)
- **Dark mode support** (optional)

---

## 🏗️ Architecture

### Tech Stack

#### Frontend
- **React 18.3.1** - UI library
- **Vite 5.4.20** - Build tool and dev server
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Framer Motion 12.23.22** - Animation library
- **Lucide React 0.545.0** - Icon library

#### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **In-memory storage** - Application data (upgradeable to MongoDB/PostgreSQL)
- **RESTful API** - Backend communication

#### Development Tools
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing
- **Concurrently** - Run multiple commands

### Project Structure

```
SahayScore/
├── backend/
│   ├── server.js              # Express API server
│   └── package.json           # Backend dependencies
├── src/
│   ├── app.jsx                # Main React component (1566 lines)
│   ├── constants.js           # Scoring weights & thresholds
│   ├── utils.js               # Validation & API utilities
│   ├── index.css              # Global styles
│   └── main.jsx               # React entry point
├── index.html                 # HTML template
├── package.json               # Frontend dependencies
├── vite.config.js             # Vite configuration
├── tailwind.config.js         # Tailwind configuration
├── postcss.config.js          # PostCSS configuration
├── CLASSIFICATION_MATRIX.md   # Detailed scoring logic
├── QUICK_START.md             # Setup guide
├── IMPROVEMENTS_SUMMARY.md    # Changelog
└── README.md                  # This file
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/SahayScore.git
   cd SahayScore
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

### Running the Application

#### Option 1: Run Both Servers Together (Recommended)
```bash
npm run dev
```
This starts both frontend (port 5173) and backend (port 5000) concurrently.

#### Option 2: Run Separately

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```
✅ Backend running at: `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
npm run dev
```
✅ Frontend running at: `http://localhost:5173`

### Access the Application

Open your browser and navigate to:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api

---

## 📚 Documentation

### Scoring System

#### Repayment Score (0-500)

Calculated based on:
- **Previous Loans**: +40 points per loan (max 200)
- **Business Income**: Higher income = higher score (max 150)
- **Base Score**: 150 points

**Formula:**
```javascript
repaymentScore = 150 + (previousLoans × 40) + (businessIncome / 1000) × 5
```

#### Need Score (0-500)

Calculated based on consumption proxies (**lower consumption = higher need**):
- **Electricity Bill**: Lower bills indicate higher need
- **Mobile Recharge**: Lower recharges indicate higher need
- **Utility Payments**: Lower payments indicate higher need

**Formula:**
```javascript
needScore = (200 - electricityBill/10) + (150 - mobileRecharge/5) + (150 - utilityPayments/10)
```

#### Composite Score (0-1000)
```javascript
compositeScore = repaymentScore + needScore
```

### Classification Matrix

The system uses a **2x2 decision matrix**:

```
                HIGH NEED (≥300)         LOW NEED (<300)
                ┌────────────────┬──────────────────────┐
HIGH REPAYMENT  │  ✅ AUTO-APPROVE│  ⏳ MANUAL REVIEW    │
(≥350)          │                │                      │
                ├────────────────┼──────────────────────┤
LOW REPAYMENT   │  ⏳ MANUAL REVIEW│  ❌ REJECT          │
(<250)          │                │                      │
                └────────────────┴──────────────────────┘
```

**Classification Rules:**
- ✅ **Auto-Approve**: High repayment (≥350) + High need (≥300)
- ⏳ **Manual Review**: Medium scores or mixed high/low scores
- ❌ **Reject**: Low repayment (<250) + Low need (<200)

For detailed explanation, see [CLASSIFICATION_MATRIX.md](CLASSIFICATION_MATRIX.md)

---

## 🧪 Testing

### Test Cases

#### 1. Auto-Approve Scenario ✅
```
Name: Test User 1
Phone: 9876543210
Aadhar: 1234 5678 9012
Category: Repeat Borrower
Loan Amount: ₹50,000
Previous Loans: 5
Electricity Bill: ₹500
Mobile Recharge: ₹100
Utility Payments: ₹300
Business Income: ₹30,000

Expected: Composite Score ~850, Auto-Approved
```

#### 2. Reject Scenario ❌
```
Name: Test User 2
Phone: 8765432109
Aadhar: 9876 5432 1098
Category: New Borrower
Loan Amount: ₹100,000
Previous Loans: 0
Electricity Bill: ₹5,000
Mobile Recharge: ₹1,000
Utility Payments: ₹2,000
Business Income: ₹5,000

Expected: Composite Score ~300, Rejected
```

#### 3. Manual Review Scenario ⏳
```
Name: Test User 3
Phone: 7654321098
Aadhar: 5432 1098 7654
Category: New Borrower
Loan Amount: ₹30,000
Previous Loans: 1
Electricity Bill: ₹1,200
Mobile Recharge: ₹300
Utility Payments: ₹800
Business Income: ₹15,000

Expected: Composite Score ~550, Manual Review
```

---

## 🔧 Configuration

### Customizing Scoring Weights

Edit `src/constants.js` to adjust scoring parameters:

```javascript
export const SCORING_WEIGHTS = {
  // Repayment Score Weights (0-500)
  BASE_REPAYMENT_SCORE: 150,
  PREVIOUS_LOAN_MULTIPLIER: 40,
  PREVIOUS_LOAN_MAX: 200,
  BUSINESS_INCOME_DIVISOR: 1000,
  BUSINESS_INCOME_MULTIPLIER: 5,
  BUSINESS_INCOME_MAX: 150,
  MAX_REPAYMENT_SCORE: 500,

  // Need Score Weights (0-500)
  ELECTRICITY_BASE: 200,
  ELECTRICITY_DIVISOR: 10,
  MOBILE_BASE: 150,
  MOBILE_DIVISOR: 5,
  UTILITY_BASE: 150,
  UTILITY_DIVISOR: 10,
  MAX_NEED_SCORE: 500
};
```

### Loan Configuration

```javascript
export const LOAN_CONFIG = {
  MIN_LOAN_AMOUNT: 1000,
  MAX_LOAN_AMOUNT: 500000,
  INTEREST_RATE: "4% APR",
  PROCESSING_TIME: "Same Day for Auto-Approved",
  REPAYMENT_PERIOD: "12-60 months"
};
```

---

## 🌐 API Endpoints

### Applications

- **GET** `/api/applications` - Fetch all applications
- **POST** `/api/applications` - Create new application
- **GET** `/api/applications/:id` - Get application by ID
- **PUT** `/api/applications/:id` - Update application
- **DELETE** `/api/applications/:id` - Delete application

### Example Request

```javascript
POST /api/applications
Content-Type: application/json

{
  "name": "Ramesh Kumar",
  "repaymentScore": 420,
  "needScore": 380,
  "compositeScore": 800,
  "status": "approved",
  "amount": 50000,
  "category": "Repeat Borrower",
  "classification": "High Need + Good Repayment"
}
```

---

## 🎨 UI Screenshots

*Add screenshots of your application here:*
- Landing Page
- Application Form
- Score Result
- Dashboard
- Admin Panel

---

## 🔒 Security & Validation

### Input Validation

- **Aadhar**: 12-digit numeric validation
- **Phone**: 10-digit mobile number (starts with 6-9)
- **Loan Amount**: Between ₹1,000 and ₹5,00,000
- **File Upload**: PDF, JPG, PNG only, max 5MB per file

### Data Security

- Client-side input sanitization
- Server-side validation
- localStorage backup for offline capability
- API error handling and retry logic

---

## ♿ Accessibility

SahayScore is built with accessibility in mind:

- ✅ ARIA labels on all interactive elements
- ✅ Keyboard navigation support
- ✅ Screen reader friendly
- ✅ Focus indicators for keyboard users
- ✅ Error announcements with `role="alert"`
- ✅ Semantic HTML structure
- ✅ Color contrast compliance (WCAG AA)

---

## 🚧 Roadmap

### Phase 1 (Completed ✅)
- [x] Dual credit scoring system
- [x] 2x2 classification matrix
- [x] Application form with validation
- [x] Dashboard and admin panel
- [x] Backend API integration

### Phase 2 (In Progress 🔄)
- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] User authentication & authorization
- [ ] Email/SMS notifications
- [ ] PDF report generation
- [ ] Advanced analytics dashboard

### Phase 3 (Planned 📋)
- [ ] Machine learning model training
- [ ] Predictive default analysis
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Blockchain-based credit history

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style and conventions
- Add comments for complex logic
- Update documentation for new features
- Test thoroughly before submitting PR
- Keep commits atomic and meaningful

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

**Project**: SahayScore - NBCFDC Loan Assessment Platform  
**Hackathon**: Aviothic 2.0 - Debuggers Team  
**Organization**: National Backward Classes Finance & Development Corporation  

---

## 🙏 Acknowledgments

- **NBCFDC** for the opportunity to innovate in financial inclusion
- **React** and **Vite** communities for excellent tooling
- **Tailwind CSS** for rapid UI development
- **Framer Motion** for smooth animations
- All open-source contributors

---

## 📞 Support

For questions, issues, or feedback:

- 📧 Email: support@sahayscore.gov.in
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/SahayScore/issues)
- 📖 Docs: [QUICK_START.md](QUICK_START.md) | [CLASSIFICATION_MATRIX.md](CLASSIFICATION_MATRIX.md)

---

<div align="center">

**Made with ❤️ for Financial Inclusion**

⭐ Star this repo if you find it helpful! ⭐

</div>
