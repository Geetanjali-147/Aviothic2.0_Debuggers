import React, { useEffect, useState } from "react";
import {
  TrendingUp,
  Shield,
  FileText,
  CheckCircle,
  ArrowRight,
  BarChart3,
  Users,
  Clock,
  DollarSign,
  Upload,
  Search,
  Filter,
  Download,
  Edit,
  Eye,
  X,
  Zap,
  Target,
  Award,
  AlertCircle,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";

// Single-file React component: SahayScoreApp
// Tailwind classes assumed available in the project.

export default function SahayScoreApp() {
  // Navigation
  const [currentPage, setCurrentPage] = useState("landing");
  const [currentAppId, setCurrentAppId] = useState(null);

  // Load sample/default apps from localStorage or fallback
  const defaultApps = [
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
      repaymentScore: 350,
      needScore: 450,
      compositeScore: 800,
      status: "pending",
      amount: 30000,
      date: "2025-01-14",
      category: "New Borrower",
      electricityBill: 800,
      mobileRecharge: 150,
      previousLoans: 0,
      classification: "Manual Review Required"
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
    }
  ];

  const [applications, setApplications] = useState(() => {
    try {
      const raw = localStorage.getItem("sahay_apps_v1");
      if (!raw) return defaultApps;
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) && parsed.length ? parsed : defaultApps;
    } catch (e) {
      return defaultApps;
    }
  });

  // Persist applications to localStorage automatically
  useEffect(() => {
    try {
      localStorage.setItem("sahay_apps_v1", JSON.stringify(applications));
    } catch (e) {
      // ignore
    }
  }, [applications]);

  // Form data
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    aadhar: "",
    category: "",
    loanAmount: "",
    purpose: "",
    previousLoans: "0",
    electricityBill: "",
    mobileRecharge: "",
    utilityPayments: "",
    businessIncome: "",
    documents: []
  });

  useEffect(() => {
    // restore last viewed app id if exists
    const last = localStorage.getItem("sahay_last_view");
    if (last) setCurrentAppId(last);
  }, []);

  useEffect(() => {
    if (currentAppId) localStorage.setItem("sahay_last_view", currentAppId);
  }, [currentAppId]);

  const navigate = (page, appId = null) => {
    setCurrentPage(page);
    if (appId) setCurrentAppId(appId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Utility: safe number parse
  const n = (v) => {
    const x = parseFloat(v);
    return Number.isFinite(x) ? x : 0;
  };

  // Small helpers for class mappings (avoid dynamic tailwind strings)
  const featureBg = (colorKey) =>
    ({
      orange: "bg-orange-100",
      green: "bg-green-100",
      blue: "bg-blue-100",
      purple: "bg-purple-100"
    }[colorKey] || "bg-gray-100");

  const featureIconBg = (colorKey) =>
    ({
      orange: "bg-orange-500 text-white",
      green: "bg-green-500 text-white",
      blue: "bg-blue-500 text-white",
      purple: "bg-purple-500 text-white"
    }[colorKey] || "bg-gray-500 text-white");

  // ---------- Pages ---------- //

  const LandingPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      <nav className="bg-white/90 backdrop-blur-lg shadow sticky top-0 z-40 border-b border-orange-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-green-600 rounded-lg flex items-center justify-center shadow">
              <Shield className="text-white" size={22} />
            </div>
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">SahayScore</div>
              <div className="text-xs text-gray-600">Powered by NBCFDC</div>
            </div>
          </div>

          <div className="flex gap-3 items-center">
            <button onClick={() => navigate("dashboard")} className="px-3 py-2 text-gray-700 hover:text-orange-600">Dashboard</button>
            <button onClick={() => navigate("admin")} className="px-3 py-2 text-gray-700 hover:text-orange-600">Admin</button>
            <button onClick={() => navigate("apply")} className="px-5 py-2 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-lg shadow">Apply Now</button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold mb-6">
                <Zap size={16} /> AI-Powered Dual Credit Scoring
              </div>

              <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Credit Scoring for <span className="bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">Inclusive Lending</span>
              </h1>

              <p className="text-lg text-gray-600 mb-6">Empowering backward classes with faster, fairer access to concessional loans through NBCFDC.</p>

              <div className="flex gap-4">
                <button onClick={() => navigate("apply")} className="px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-lg shadow flex items-center gap-2">Start Application <ArrowRight size={18} /></button>
                <button className="px-6 py-3 border-2 border-gray-200 rounded-lg">Learn More</button>
              </div>
            </motion.div>
          </div>

          <div>
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-orange-200">
              <div className="text-center mb-6">
                <div className="text-sm text-gray-600 mb-2">Composite Score</div>
                <div className="text-6xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">800</div>
                <div className="text-gray-600 text-sm mt-1">out of 1000</div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-orange-50 p-4 rounded-xl">
                  <div className="text-sm text-gray-600 mb-1">Repayment Score</div>
                  <div className="text-2xl font-bold text-orange-600">420</div>
                  <div className="text-xs text-gray-500">/ 500</div>
                </div>
                <div className="bg-green-50 p-4 rounded-xl">
                  <div className="text-sm text-gray-600 mb-1">Need Score</div>
                  <div className="text-2xl font-bold text-green-600">380</div>
                  <div className="text-xs text-gray-500">/ 500</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <span className="text-gray-700 font-medium">Classification</span>
                  <span className="text-green-600 font-bold text-sm">Auto-Approve</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Processing Time</span>
                  <span className="text-blue-600 font-bold">Same Day</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Interest Rate</span>
                  <span className="text-purple-600 font-bold">4% APR</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* How it works */}
        <section className="mt-16 grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Upload,
              title: "Data Collection",
              desc: "Channel partners provide loan history and beneficiaries upload consumption data like electricity bills.",
              items: ["Loan history", "Payment patterns", "Utility bills", "Mobile recharges"],
              color: "orange"
            },
            {
              icon: BarChart3,
              title: "AI Scoring",
              desc: "Two ML models generate dual scores that paint a complete picture of the applicant.",
              items: ["Repayment score", "Need score"],
              color: "green"
            },
            {
              icon: Target,
              title: "Classification",
              desc: "2D matrix places applicants into clear categories for instant decisions.",
              items: ["Auto-approve", "Manual review", "Reject"],
              color: "blue"
            }
          ].map((f, i) => (
            <motion.div key={i} whileHover={{ y: -6 }} className={`bg-white p-6 rounded-xl shadow-lg border ${i === 0 ? "border-orange-100" : i === 1 ? "border-green-100" : "border-blue-100"}`}>
              <div className={`w-12 h-12 ${featureBg(f.color)} rounded-lg flex items-center justify-center mb-4`}>
                <f.icon className={`text-${f.color}-600`} size={20} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{f.desc}</p>
              <div className="text-xs text-gray-500 space-y-1">
                {f.items.map((it, j) => (
                  <div key={j}>• {it}</div>
                ))}
              </div>
            </motion.div>
          ))}
        </section>

        {/* Impact */}
        <section className="mt-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl p-10 text-white">
          <h2 className="text-3xl font-bold text-center mb-8">Real Impact</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <StatCard title={"7→1"} subtitle={"Days to Hours"} />
            <StatCard title={"95%"} subtitle={"Accuracy Rate"} />
            <StatCard title={"50K+"} subtitle={"Beneficiaries"} />
            <StatCard title={"100%"} subtitle={"Financial Inclusion"} />
          </div>
        </section>
      </main>
    </div>
  );

  function StatCard({ title, subtitle }) {
    return (
      <div className="text-center">
        <div className="text-4xl md:text-5xl font-bold mb-2">{title}</div>
        <div className="text-orange-100">{subtitle}</div>
      </div>
    );
  }

  // ---------- Application Form ---------- //
  // Replace the ENTIRE ApplicationForm function in your app.jsx
// Find it around line 370 and replace everything until the closing };

// Replace the ENTIRE ApplicationForm function in your app.jsx
// Find it around line 370 and replace everything until the closing };

const ApplicationForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    // Calculate Repayment Score (0-500)
    const previousLoanScore = Math.min(n(formData.previousLoans) * 80, 200);
    const businessScore = Math.min((n(formData.businessIncome) / 1000) * 3, 150);
    const baseRepayment = 150;
    const repaymentScore = Math.min(baseRepayment + previousLoanScore + businessScore, 500);

    // Need Score (lower consumption => higher need)
    const electricityScore = Math.max(200 - n(formData.electricityBill) / 20, 0);
    const mobileScore = Math.max(150 - n(formData.mobileRecharge) / 5, 0);
    const utilityScore = Math.max(150 - n(formData.utilityPayments) / 10, 0);
    const needScore = Math.min(electricityScore + mobileScore + utilityScore, 500);

    const compositeScore = Math.round(repaymentScore + needScore);

    // Classification
    let classification = "Manual Review Required";
    let status = "pending";
    if (repaymentScore >= 350 && needScore >= 300) {
      classification = "High Need + Good Repayment";
      status = "approved";
    } else if (repaymentScore < 250 && needScore < 200) {
      classification = "Low Need + Poor Repayment";
      status = "rejected";
    }

    const newApp = {
      id: `SHS${(applications.length + 1).toString().padStart(3, "0")}`,
      name: formData.name || "--",
      repaymentScore: Math.round(repaymentScore),
      needScore: Math.round(needScore),
      compositeScore,
      status,
      amount: n(formData.loanAmount),
      date: new Date().toISOString().split("T")[0],
      category: formData.category || "Unspecified",
      electricityBill: n(formData.electricityBill),
      mobileRecharge: n(formData.mobileRecharge),
      previousLoans: Math.round(n(formData.previousLoans)),
      classification
    };

    setApplications((prev) => [newApp, ...prev]);
    
    // reset form
    setFormData({
      name: "",
      phone: "",
      aadhar: "",
      category: "",
      loanAmount: "",
      purpose: "",
      previousLoans: "0",
      electricityBill: "",
      mobileRecharge: "",
      utilityPayments: "",
      businessIncome: "",
      documents: []
    });

    navigate("score", newApp.id);
  };

  // small file handler - store filenames
  const handleFiles = (files) => {
    if (!files || files.length === 0) return;
    const arr = Array.from(files).slice(0, 6).map((f) => ({ name: f.name, size: f.size }));
    setFormData((prev) => ({ ...prev, documents: arr }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <button onClick={() => navigate("landing")} className="mb-6 text-orange-600 hover:text-orange-700 flex items-center gap-2 font-medium">← Back to Home</button>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-orange-200">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">SahayScore Loan Application</h1>
            <p className="text-gray-600">Complete the form to get your dual credit score instantly</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <section className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input 
                  type="text"
                  required 
                  value={formData.name} 
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} 
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" 
                  placeholder="Ramesh Kumar" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number *</label>
                <input 
                  type="tel"
                  required 
                  value={formData.phone} 
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))} 
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" 
                  placeholder="+91 98765 43210" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Aadhar Number *</label>
                <input 
                  type="text"
                  required 
                  value={formData.aadhar} 
                  onChange={(e) => setFormData(prev => ({ ...prev, aadhar: e.target.value }))} 
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" 
                  placeholder="1234 5678 9012" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Borrower Category *</label>
                <select 
                  required 
                  value={formData.category} 
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))} 
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="">Select...</option>
                  <option value="New Borrower">New Borrower</option>
                  <option value="Repeat Borrower">Repeat Borrower</option>
                </select>
              </div>
            </section>

            {/* Loan Details */}
            <section className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Loan Amount (₹) *</label>
                <input 
                  type="number" 
                  required 
                  min="1000"
                  value={formData.loanAmount} 
                  onChange={(e) => setFormData({ ...formData, loanAmount: e.target.value })} 
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" 
                  placeholder="50000" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Loan Purpose *</label>
                <select 
                  required 
                  value={formData.purpose} 
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })} 
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="">Select...</option>
                  <option value="Business Expansion">Business Expansion</option>
                  <option value="Working Capital">Working Capital</option>
                  <option value="Equipment Purchase">Equipment Purchase</option>
                  <option value="Education">Education</option>
                  <option value="Medical Emergency">Medical Emergency</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Number of Previous Loans</label>
                <input 
                  type="number" 
                  min="0" 
                  value={formData.previousLoans} 
                  onChange={(e) => setFormData({ ...formData, previousLoans: e.target.value })} 
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" 
                  placeholder="0"
                />
                <div className="text-xs text-gray-500 mt-1">Enter 0 if you're a new borrower</div>
              </div>
            </section>

            {/* Consumption Proxies */}
            <section className="bg-green-50 p-6 rounded-lg border border-green-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <BarChart3 className="text-green-600" size={20} />
                  <div className="font-semibold text-gray-900">Consumption Proxies</div>
                </div>
                <div className="text-xs text-gray-500">Used to assess need without salary slips</div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Monthly Electricity Bill (₹) *</label>
                  <input 
                    required 
                    type="number" 
                    min="0"
                    value={formData.electricityBill} 
                    onChange={(e) => setFormData({ ...formData, electricityBill: e.target.value })} 
                    className="w-full px-3 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white" 
                    placeholder="800" 
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">Monthly Mobile Recharge (₹) *</label>
                  <input 
                    required 
                    type="number" 
                    min="0"
                    value={formData.mobileRecharge} 
                    onChange={(e) => setFormData({ ...formData, mobileRecharge: e.target.value })} 
                    className="w-full px-3 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white" 
                    placeholder="200" 
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">Other Utility Payments (₹) *</label>
                  <input 
                    required 
                    type="number" 
                    min="0"
                    value={formData.utilityPayments} 
                    onChange={(e) => setFormData({ ...formData, utilityPayments: e.target.value })} 
                    className="w-full px-3 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white" 
                    placeholder="500" 
                  />
                </div>
              </div>
            </section>

            {/* Business Activity */}
            <section>
              <div className="font-semibold mb-2 flex items-center gap-2">
                <TrendingUp size={18} className="text-orange-600" /> 
                Business Activity (Optional)
              </div>
              <input 
                type="number" 
                min="0"
                value={formData.businessIncome} 
                onChange={(e) => setFormData({ ...formData, businessIncome: e.target.value })} 
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" 
                placeholder="Estimated monthly business income" 
              />
            </section>

            {/* File Upload */}
            <section>
              <div className="font-semibold mb-3 flex items-center gap-2">
                <FileText size={18} className="text-blue-600" /> 
                Supporting Documents
              </div>
              
              <label className="block border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition-colors">
                <Upload size={40} className="mx-auto text-gray-400 mb-3" />
                <div className="text-sm text-gray-600 mb-2">
                  Click to upload or drag and drop
                </div>
                <div className="text-xs text-gray-500 mb-4">
                  PDF, JPG, PNG up to 5MB (Aadhar, electricity bills, etc.)
                </div>
                
                <input 
                  type="file" 
                  multiple 
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFiles(e.target.files)} 
                  className="hidden" 
                />

                {formData.documents && formData.documents.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="font-medium text-sm text-gray-700 mb-2">📎 Uploaded Files:</div>
                    <div className="space-y-1">
                      {formData.documents.map((d, idx) => (
                        <div key={idx} className="text-xs text-gray-600 bg-white px-3 py-2 rounded border border-gray-200">
                          📄 {d.name} ({(d.size / 1024).toFixed(1)} KB)
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </label>
            </section>

            {/* Submit Button */}
            <div className="pt-4">
              <button 
                type="submit" 
                className="w-full py-4 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl hover:from-orange-700 hover:to-orange-600 transition-all"
              >
                Calculate My SahayScore
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};
  // ---------- Score Result ---------- //
  const ScoreResult = () => {
    const app = applications.find((a) => a.id === currentAppId) || applications[0];
    if (!app) return <div className="p-8">Application not found</div>;

    const getScoreColor = (score, max) => {
      const pct = (score / max) * 100;
      if (pct >= 70) return "text-green-600";
      if (pct >= 50) return "text-yellow-600";
      return "text-red-600";
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 py-8">
        <div className="max-w-5xl mx-auto px-6">
          <button onClick={() => navigate("dashboard")} className="mb-6 text-orange-600 hover:text-orange-700">← Back to Dashboard</button>

          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-2xl p-6 border border-orange-200">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 rounded-full text-sm">Application ID: {app.id}</div>
              <h2 className="text-2xl font-bold mt-3">{app.name}</h2>
              <div className="text-sm text-gray-600">SahayScore Result</div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1 text-center">
                <div className="relative inline-block">
                  <svg width="200" height="200" className="transform -rotate-90">
                    <circle cx="100" cy="100" r="80" stroke="#e5e7eb" strokeWidth="18" fill="none" />
                    <circle cx="100" cy="100" r="80" stroke={app.compositeScore >= 700 ? "#10b981" : app.compositeScore >= 500 ? "#f59e0b" : "#ef4444"} strokeWidth="18" fill="none" strokeDasharray={`${(app.compositeScore / 1000) * 502} 502`} strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className={`text-4xl font-bold ${getScoreColor(app.compositeScore, 1000)}`}>{app.compositeScore}</div>
                    <div className="text-xs text-gray-500">Composite Score</div>
                  </div>
                </div>
              </div>

              <div className="flex-1 w-full">
                <div className="grid grid-cols-1 gap-4">
                  <ScoreTile title="Repayment Score" score={app.repaymentScore} max={500} accent="orange" />
                  <ScoreTile title="Income Need Score" score={app.needScore} max={500} accent="green" />
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-lg mt-6 ${app.status === "approved" ? "bg-green-50 border border-green-200" : app.status === "pending" ? "bg-yellow-50 border border-yellow-200" : "bg-red-50 border border-red-200"}`}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600">Classification</div>
                  <div className="text-lg font-semibold">{app.classification}</div>
                </div>
                <div className={`px-4 py-2 rounded-full font-semibold ${app.status === "approved" ? "bg-green-200 text-green-800" : app.status === "pending" ? "bg-yellow-200 text-yellow-800" : "bg-red-200 text-red-800"}`}>
                  {app.status === "approved" ? "✓ Auto-Approved" : app.status === "pending" ? "⏳ Manual Review" : "✗ Not Approved"}
                </div>
              </div>

              {app.status === "approved" && (
                <div className="mt-3 bg-white rounded-md p-3">
                  <div className="flex justify-between text-sm text-gray-700"><span>Approved Amount:</span><strong>₹{app.amount.toLocaleString()}</strong></div>
                  <div className="flex justify-between text-sm text-gray-700"><span>Interest Rate:</span><strong>4% APR</strong></div>
                  <div className="flex justify-between text-sm text-gray-700"><span>Processing Time:</span><strong>Same Day</strong></div>
                </div>
              )}
            </div>

            <div className="mt-6">
              <h3 className="font-semibold">Score Components Breakdown</h3>
              <div className="grid md:grid-cols-2 gap-4 mt-3 text-sm text-gray-700">
                <div>
                  <div className="font-medium">Repayment Factors</div>
                  <div className="mt-2">Previous Loans: <strong>{app.previousLoans}</strong></div>
                  <div>Payment History: <strong className="text-green-600">Good</strong></div>
                </div>
                <div>
                  <div className="font-medium">Need Indicators</div>
                  <div className="mt-2">Electricity Bill: <strong>₹{app.electricityBill}/month</strong></div>
                  <div>Mobile Recharge: <strong>₹{app.mobileRecharge}/month</strong></div>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t pt-4">
              <h3 className="font-semibold mb-2">Next Steps</h3>
              {app.status === "approved" ? (
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                  <li>Complete KYC verification</li>
                  <li>Sign loan agreement (Aadhar OTP)</li>
                  <li>Receive funds via bank transfer</li>
                </ol>
              ) : (
                <div className="text-sm text-gray-700">Application under review. Our team may contact you within 2-3 business days.</div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    );
  };

  function ScoreTile({ title, score, max, accent = "orange" }) {
    return (
      <div className={`p-4 rounded-lg border ${accent === "green" ? "border-green-100" : "border-orange-100"} bg-white`}>
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm text-gray-700">{title}</div>
          <div className={`font-bold ${accent === "green" ? "text-green-600" : "text-orange-600"}`}>{score}</div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div style={{ width: `${(score / max) * 100}%` }} className={`h-2 rounded-full ${accent === "green" ? "bg-green-600" : "bg-orange-600"}`} />
        </div>
      </div>
    );
  }

  // ---------- Dashboard ---------- //
  const Dashboard = () => {
    const stats = {
      approved: applications.filter((a) => a.status === "approved").length,
      pending: applications.filter((a) => a.status === "pending").length,
      rejected: applications.filter((a) => a.status === "rejected").length,
      total: applications.length
    };

    const avgComposite = applications.length ? Math.round(applications.reduce((s, a) => s + a.compositeScore, 0) / applications.length) : 0;

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
              <div className="text-sm text-gray-600">Overview of all SahayScore applications</div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => navigate("landing")} className="px-3 py-2 text-orange-600">← Home</button>
              <button onClick={() => navigate("apply")} className="px-3 py-2 bg-orange-600 text-white rounded">New Application</button>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-xs text-gray-500">Total Applications</div>
              <div className="text-xl font-bold">{stats.total}</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-xs text-gray-500">Auto-Approved</div>
              <div className="text-xl font-bold text-green-600">{stats.approved}</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-xs text-gray-500">Under Review</div>
              <div className="text-xl font-bold text-yellow-600">{stats.pending}</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-xs text-gray-500">Rejected</div>
              <div className="text-xl font-bold text-red-600">{stats.rejected}</div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-4 rounded-lg text-white">
              <div className="text-2xl font-bold">{avgComposite}</div>
              <div className="text-sm">Average Composite Score</div>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-lg text-white">
              <div className="text-2xl font-bold">{stats.total ? ((stats.approved / stats.total) * 100).toFixed(0) : 0}%</div>
              <div className="text-sm">Auto-Approval Rate</div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-lg text-white">
              <div className="text-2xl font-bold">₹{(applications.filter((a) => a.status === "approved").reduce((s, a) => s + a.amount, 0) / 100000).toFixed(1)}L</div>
              <div className="text-sm">Total Approved Amount</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Recent Applications</h3>
                </div>
                <div className="flex gap-2">
                  <input placeholder="Search name or ID" className="px-3 py-2 border rounded" onChange={(e) => setSearchFilter(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left">ID</th>
                    <th className="px-4 py-3 text-left">Applicant</th>
                    <th className="px-4 py-3 text-left">Composite</th>
                    <th className="px-4 py-3 text-left">Repayment</th>
                    <th className="px-4 py-3 text-left">Need</th>
                    <th className="px-4 py-3 text-left">Amount</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr key={app.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">{app.id}</td>
                      <td className="px-4 py-3">
                        <div className="font-medium">{app.name}</div>
                        <div className="text-xs text-gray-500">{app.date}</div>
                      </td>
                      <td className="px-4 py-3 font-bold">{app.compositeScore}</td>
                      <td className="px-4 py-3 text-orange-600">{app.repaymentScore}</td>
                      <td className="px-4 py-3 text-green-600">{app.needScore}</td>
                      <td className="px-4 py-3">₹{app.amount.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <span className={`px-3 py-1 rounded-full text-xs ${app.status === "approved" ? "bg-green-100 text-green-800" : app.status === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button onClick={() => navigate("score", app.id)} className="text-orange-600 hover:underline flex items-center gap-2"><Eye size={14} /> View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // small search filter state used only by Dashboard table
  const [searchFilter, setSearchFilter] = useState("");

  // ---------- Admin Panel ---------- //
  const AdminPanel = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");

    const filteredApps = applications.filter((app) => {
      const search = (searchTerm || "").toLowerCase();
      const matchesSearch = !search || app.name.toLowerCase().includes(search) || app.id.toLowerCase().includes(search);
      const matchesStatus = filterStatus === "all" || app.status === filterStatus;
      return matchesSearch && matchesStatus;
    });

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">Admin Panel</h2>
              <div className="text-sm text-gray-600">Manage applications</div>
            </div>
            <div>
              <button onClick={() => navigate("landing")} className="px-3 py-2 text-orange-600">← Home</button>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <div className="grid md:grid-cols-3 gap-3">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search by name or ID" className="w-full pl-10 pr-3 py-2 border rounded" />
              </div>

              <div>
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="w-full px-3 py-2 border rounded">
                  <option value="all">All Status</option>
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {filteredApps.map((app) => (
              <motion.div key={app.id} whileHover={{ y: -4 }} className="bg-white p-4 rounded-lg shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-semibold">{app.name}</h3>
                      <div className="text-xs text-gray-500">{app.id}</div>
                      <div className={`px-2 py-0.5 rounded-full text-xs ${app.status === "approved" ? "bg-green-100 text-green-800" : app.status === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}>{app.status}</div>
                    </div>
                    <div className="text-sm text-gray-600">{app.category} • Applied on {app.date} • ₹{app.amount.toLocaleString()}</div>

                    <div className="grid md:grid-cols-4 gap-2 mt-3 text-sm text-gray-700">
                      <div className="p-2 bg-gray-50 rounded">Composite: <strong>{app.compositeScore}</strong></div>
                      <div className="p-2 bg-gray-50 rounded">Repayment: <strong>{app.repaymentScore}</strong></div>
                      <div className="p-2 bg-gray-50 rounded">Need: <strong>{app.needScore}</strong></div>
                      <div className="p-2 bg-gray-50 rounded">Prev loans: <strong>{app.previousLoans}</strong></div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button onClick={() => navigate("score", app.id)} className="px-3 py-2 bg-orange-600 text-white rounded shadow flex items-center gap-2"><Eye size={14}/> View</button>
                    <button onClick={() => handleAdminChangeStatus(app.id, 'approved')} className="px-3 py-2 border rounded">Approve</button>
                  </div>
                </div>
              </motion.div>
            ))}

            {filteredApps.length === 0 && <div className="text-center text-gray-500 py-8">No applications found</div>}
          </div>
        </div>
      </div>
    );
  };

  // Admin helper to change status
  const handleAdminChangeStatus = (id, status) => {
    setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
  };

  // ---------- Router-like render ---------- //
  return (
    <div className="font-sans text-gray-900">
      {currentPage === "landing" && <LandingPage />}
      {currentPage === "apply" && <ApplicationForm />}
      {currentPage === "score" && <ScoreResult />}
      {currentPage === "dashboard" && <Dashboard />}
      {currentPage === "admin" && <AdminPanel />}

      {/* small floating quick actions */}
      <div className="fixed right-6 bottom-6 flex flex-col gap-3">
        <button onClick={() => navigate('apply')} title="New application" className="bg-orange-600 p-3 rounded-full shadow text-white"><Zap size={18} /></button>
        <button onClick={() => navigate('dashboard')} title="Dashboard" className="bg-white p-3 rounded-full shadow"><BarChart3 size={18} /></button>
      </div>
    </div>
  );
}
