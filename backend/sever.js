const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// In-memory storage (replace with database in production)
let applications = [
  {
    id: "SHS001",
    name: "Ramesh Kumar",
    repaymentScore: 420,
    needScore: 380,
    compositeScore: 800,
    status: "approved",
    amount: 50000,
    date: "2025-01-15",
    category: "Repeat Borrower",
    electricityBill: 1200,
    mobileRecharge: 200,
    previousLoans: 3,
    classification: "High Need + Good Repayment"
  },
  {
    id: "SHS002",
    name: "Savita Devi",
    repaymentScore: 280,
    needScore: 420,
    compositeScore: 700,
    status: "pending",
    amount: 30000,
    date: "2025-01-14",
    category: "New Borrower",
    electricityBill: 800,
    mobileRecharge: 150,
    previousLoans: 0,
    classification: "High Need + Risky Repayment - Manual Review"
  },
  {
    id: "SHS003",
    name: "Amit Singh",
    repaymentScore: 180,
    needScore: 150,
    compositeScore: 330,
    status: "rejected",
    amount: 75000,
    date: "2025-01-13",
    category: "Repeat Borrower",
    electricityBill: 3500,
    mobileRecharge: 800,
    previousLoans: 5,
    classification: "Low Need + Poor Repayment"
  },
  {
    id: "SHS004",
    name: "Priya Sharma",
    repaymentScore: 380,
    needScore: 250,
    compositeScore: 630,
    status: "pending",
    amount: 40000,
    date: "2025-01-12",
    category: "Repeat Borrower",
    electricityBill: 2000,
    mobileRecharge: 400,
    previousLoans: 2,
    classification: "Good Repayment + Lower Need - Manual Review"
  }
];

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('SahayScore Backend API is running 🚀');
});

// Get all applications
app.get('/api/applications', (req, res) => {
  try {
    res.json({ success: true, data: applications });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get single application by ID
app.get('/api/applications/:id', (req, res) => {
  try {
    const app = applications.find(a => a.id === req.params.id);
    if (!app) {
      return res.status(404).json({ success: false, error: 'Application not found' });
    }
    res.json({ success: true, data: app });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create new application
app.post('/api/applications', (req, res) => {
  try {
    const newApp = {
      id: `SHS${(applications.length + 1).toString().padStart(3, '0')}`,
      ...req.body,
      date: new Date().toISOString().split('T')[0]
    };
    applications = [newApp, ...applications];
    res.status(201).json({ success: true, data: newApp });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update application status
app.patch('/api/applications/:id', (req, res) => {
  try {
    const index = applications.findIndex(a => a.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ success: false, error: 'Application not found' });
    }
    applications[index] = { ...applications[index], ...req.body };
    res.json({ success: true, data: applications[index] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get statistics
app.get('/api/stats', (req, res) => {
  try {
    const stats = {
      total: applications.length,
      approved: applications.filter(a => a.status === 'approved').length,
      pending: applications.filter(a => a.status === 'pending').length,
      rejected: applications.filter(a => a.status === 'rejected').length,
      avgComposite: applications.length 
        ? Math.round(applications.reduce((sum, a) => sum + a.compositeScore, 0) / applications.length)
        : 0,
      totalApproved: applications
        .filter(a => a.status === 'approved')
        .reduce((sum, a) => sum + a.amount, 0)
    };
    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ SahayScore Server running on http://localhost:${PORT}`);
  console.log(`📊 API available at http://localhost:${PORT}/api`);
});
