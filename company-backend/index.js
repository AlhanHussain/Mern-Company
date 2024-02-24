const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');



const app = express();
const PORT = process.env.PORT || 3000;



// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all origins




// Middleware
app.use(bodyParser.json());

// Sample data
let companies = [
  { id: 1, name: "graphbud", location: "Pollachi" },
  { id: 2, name: "Infosys", location: "	Bangalore" },
  { id: 3, name: "Wipro", location:"Bangalore" },
  { id: 4, name: "HCL Technologies", location: "Noida" },
  { id: 5, name: "Tech Mahindra", location: "Pune" },
  { id: 6, name: "L&T Technology Services", location: "Vadodara" },
  { id: 7, name: "Oracle Financial Services Software", location: "Mumbai" },
  { id: 8, name: "LTIMindtree", location: "	Mumbai" },
  { id: 9, name: "Mphasis", location: "	Bangalore" },
  { id: 10, name: "3i Infotech", location: "Mumbai" },
  { id: 11, name: "Tata Consultancy Services", location: "Mumbai" },
  { id: 12, name: "Accenture", location: "Dublin" },
  { id: 13, name: "Capgemini", location: "Paris" }
];







// Routes
app.get("/companies", (req, res) => {  //http://localhost:3000/companies
  res.json(companies);
});

app.get("/company/:id", (req, res) => { //http://localhost:3000/company/5
  const id = parseInt(req.params.id);
  const company = companies.find((company) => company.id === id);
  if (company) {
    res.json(company);
  } else {
    res.status(404).json({ message: "Company not found" });
  }
});

app.post("/company", (req, res) => {   //http://localhost:3000/company
  const newCompany = req.body;          //{"name":"Company C","location":"Location d"}
  companies.push(newCompany);
  const responseMessage = `Company successfully added`;
  res.status(201).json({ message: responseMessage });
});

app.put("/company/:id", (req, res) => {  //http://localhost:3000/company/:5
  const id = parseInt(req.params.id);     //{"name":"Google","location":"Mumbai}
  const updatedCompany = req.body;
  companies = companies.map((company) => {
    if (company.id === id) {
      return { ...company, ...updatedCompany };
    }
    return company;
  });
  const responseMessage = `Company with ID ${id} successfully updated.`;
  
  res.json(
    {message:responseMessage}
  );
});

app.delete("/company/:id", (req, res) => {   //http://localhost:3000/company/:5
  const id = parseInt(req.params.id);
  companies = companies.filter((company) => company.id !== id);
  res.status(204).end();
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
