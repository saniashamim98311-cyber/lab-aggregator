// "Database": mock lab data from the assignment
const DATA = [
  { id: "101", provider_name: "Apollo Diagnostics", item_type: "test", item_name: "Lipid Profile", included_tests: ["Lipid Profile"], available_pincodes: ["110001", "110002", "110011"], pricing: { mrp: 1000, offer_price: 800 }, logistics: { home_collection: true, home_collection_fee: 100, report_tat_hours: 24 }, nabl_accredited: true },
  { id: "102", provider_name: "Local City Lab", item_type: "test", item_name: "Lipid Profile", included_tests: ["Lipid Profile"], available_pincodes: ["110001"], pricing: { mrp: 600, offer_price: 450 }, logistics: { home_collection: false, home_collection_fee: 0, report_tat_hours: 12 }, nabl_accredited: false },
  { id: "103", provider_name: "Tata 1mg", item_type: "package", item_name: "Comprehensive Cardiac Care Package", included_tests: ["Lipid Profile", "ECG", "Fasting Blood Sugar", "HbA1c"], available_pincodes: ["110001", "110002", "560034", "560035"], pricing: { mrp: 3500, offer_price: 1999 }, logistics: { home_collection: true, home_collection_fee: 0, report_tat_hours: 48 }, nabl_accredited: true },
  { id: "104", provider_name: "Lal PathLabs", item_type: "package", item_name: "Basic Diabetic Package", included_tests: ["Fasting Blood Sugar", "HbA1c", "Lipid Profile"], available_pincodes: ["110001", "560034"], pricing: { mrp: 2200, offer_price: 1500 }, logistics: { home_collection: true, home_collection_fee: 150, report_tat_hours: 24 }, nabl_accredited: true },
  { id: "105", provider_name: "Local Scan Centre", item_type: "test", item_name: "MRI Brain", included_tests: ["MRI Brain"], available_pincodes: ["560034"], pricing: { mrp: 8000, offer_price: 4200 }, logistics: { home_collection: false, home_collection_fee: 0, report_tat_hours: 4 }, nabl_accredited: true }
];

module.exports = (req, res) => {
  const q = (req.query.search_query || "").trim().toLowerCase();
  const pin = (req.query.pincode || "").trim();

  if (!q || !pin) {
    return res.status(400).json({ error: "search_query and pincode are required" });
  }

  const results = DATA
    // 1. Pincode filter: only providers serving this pincode
    .filter(d => d.available_pincodes.includes(pin))
    // 2. Search logic: match the test name OR any test inside a package
    .filter(d =>
      d.item_name.toLowerCase().includes(q) ||
      d.included_tests.some(t => t.toLowerCase().includes(q))
    )
    // 3. Total final price = offer price + home collection fee
    .map(d => ({ ...d, total_price: d.pricing.offer_price + d.logistics.home_collection_fee }))
    // 4. Sort lowest total price first
    .sort((a, b) => a.total_price - b.total_price);

  res.status(200).json(results);
};
