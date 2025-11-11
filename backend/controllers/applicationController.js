// Sample data
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
    businessIncome: 75000,
    familySize: 4,
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
    businessIncome: 40000,
    familySize: 6,
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
    businessIncome: 120000,
    familySize: 3,
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
    businessIncome: 60000,
    familySize: 5,
    classification: "Good Repayment + Lower Need - Manual Review"
  }
];

// Helper function to generate application ID
const generateApplicationId = () => {
  const maxId = applications.length > 0 
    ? Math.max(...applications.map(app => parseInt(app.id.replace('SHS', '')))) 
    : 0;
  return `SHS${(maxId + 1).toString().padStart(3, '0')}`;
};

// Helper function to calculate scores
const calculateScores = (applicationData) => {
  // Repayment Score Calculation (0-500)
  let repaymentScore = 0;
  
  // Previous loans factor (0-200 points)
  if (applicationData.previousLoans === 0) {
    repaymentScore += 200; // First-time borrower gets full points
  } else if (applicationData.previousLoans <= 2) {
    repaymentScore += 150;
  } else if (applicationData.previousLoans <= 5) {
    repaymentScore += 100;
  } else {
    repaymentScore += 50;
  }
  
  // Business income factor (0-300 points)
  if (applicationData.businessIncome > 100000) {
    repaymentScore += 300;
  } else if (applicationData.businessIncome > 50000) {
    repaymentScore += 200;
  } else if (applicationData.businessIncome > 25000) {
    repaymentScore += 100;
  } else {
    repaymentScore += 50;
  }
  
  // Need Score Calculation (0-500)
  let needScore = 0;
  
  // Electricity bill factor (0-150 points)
  if (applicationData.electricityBill < 500) {
    needScore += 150;
  } else if (applicationData.electricityBill < 1000) {
    needScore += 100;
  } else if (applicationData.electricityBill < 2000) {
    needScore += 50;
  }
  
  // Mobile recharge factor (0-150 points)
  if (applicationData.mobileRecharge < 200) {
    needScore += 150;
  } else if (applicationData.mobileRecharge < 500) {
    needScore += 100;
  } else if (applicationData.mobileRecharge < 1000) {
    needScore += 50;
  }
  
  // Family size factor (0-200 points)
  if (applicationData.familySize > 6) {
    needScore += 200;
  } else if (applicationData.familySize > 4) {
    needScore += 150;
  } else if (applicationData.familySize > 2) {
    needScore += 100;
  } else {
    needScore += 50;
  }
  
  const compositeScore = repaymentScore + needScore;
  
  // Determine classification based on scores
  let classification = "";
  if (repaymentScore >= 300 && needScore >= 300) {
    classification = "High Need + Good Repayment";
  } else if (repaymentScore >= 300 && needScore < 300) {
    classification = "Good Repayment + Lower Need";
  } else if (repaymentScore < 300 && needScore >= 300) {
    classification = "High Need + Risky Repayment";
  } else {
    classification = "Low Need + Poor Repayment";
  }
  
  return {
    repaymentScore,
    needScore,
    compositeScore,
    classification
  };
};

// Get all applications
const getAllApplications = (req, res) => {
  try {
    const { status, search } = req.query;
    let filteredApps = [...applications];
    
    // Filter by status if provided
    if (status) {
      filteredApps = filteredApps.filter(app => app.status === status);
    }
    
    // Search by name if provided
    if (search) {
      filteredApps = filteredApps.filter(app => 
        app.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    res.json({ success: true, data: filteredApps });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get single application by ID
const getApplicationById = (req, res) => {
  try {
    const app = applications.find(a => a.id === req.params.id);
    if (!app) {
      return res.status(404).json({ success: false, error: 'Application not found' });
    }
    res.json({ success: true, data: app });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Create new application
const createApplication = (req, res) => {
  try {
    const applicationData = req.body;
    
    // Calculate scores
    const scores = calculateScores(applicationData);
    
    const newApp = {
      id: generateApplicationId(),
      ...applicationData,
      ...scores,
      status: "pending",
      date: new Date().toISOString().split('T')[0]
    };
    
    applications.unshift(newApp);
    res.status(201).json({ success: true, data: newApp });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update application status
const updateApplicationStatus = (req, res) => {
  try {
    const index = applications.findIndex(a => a.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ success: false, error: 'Application not found' });
    }
    
    // Only allow status updates
    const { status } = req.body;
    if (status && ['approved', 'rejected', 'pending'].includes(status)) {
      applications[index] = { ...applications[index], status };
      res.json({ success: true, data: applications[index] });
    } else {
      res.status(400).json({ success: false, error: 'Invalid status value' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete application
const deleteApplication = (req, res) => {
  try {
    const index = applications.findIndex(a => a.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ success: false, error: 'Application not found' });
    }
    
    const deletedApp = applications.splice(index, 1);
    res.json({ success: true, data: deletedApp[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get statistics
const getStats = (req, res) => {
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
};

// Get score distribution
const getScoreDistribution = (req, res) => {
  try {
    const distribution = {
      repayment: {
        excellent: applications.filter(a => a.repaymentScore >= 400).length,
        good: applications.filter(a => a.repaymentScore >= 300 && a.repaymentScore < 400).length,
        average: applications.filter(a => a.repaymentScore >= 200 && a.repaymentScore < 300).length,
        poor: applications.filter(a => a.repaymentScore < 200).length
      },
      need: {
        high: applications.filter(a => a.needScore >= 400).length,
        moderate: applications.filter(a => a.needScore >= 300 && a.needScore < 400).length,
        low: applications.filter(a => a.needScore >= 200 && a.needScore < 300).length,
        veryLow: applications.filter(a => a.needScore < 200).length
      }
    };
    res.json({ success: true, data: distribution });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export {
  getAllApplications,
  getApplicationById,
  createApplication,
  updateApplicationStatus,
  deleteApplication,
  getStats,
  getScoreDistribution
};