
// A long sample HTML document to simulate "bgTextHtml"
const SAMPLE_HTML = `
<h1 style="text-align: center;">MASTER SERVICE AGREEMENT</h1>
<p><strong>THIS AGREEMENT</strong> is made on <strong>2023-10-27</strong> between <strong>Acme Corporation</strong> ("Company") and <strong>Global Solutions Ltd</strong> ("Provider").</p>

<h3>1. DEFINITIONS</h3>
<p>1.1. "Services" means the software development services described in Schedule A.</p>
<p>1.2. "Confidential Information" means all non-public information disclosed by one party to the other.</p>

<h3>2. TERM AND TERMINATION</h3>
<p>2.1. This Agreement shall commence on the Effective Date and continue for a period of 24 months.</p>
<p>2.2. <span id="cl-2-2">The Company may terminate this Agreement for convenience upon providing 30 days' written notice to the Provider.</span></p>
<p>2.3. Either party may terminate immediately upon material breach by the other party.</p>

<h3>3. PAYMENT TERMS</h3>
<p>3.1. The total contract value is <strong>$50,000</strong> payable in installments.</p>
<p>3.2. Invoices shall be paid within 60 days of receipt. Late payments shall incur interest at 1.5% per month.</p>

<h3>4. LIABILITY AND INDEMNITY</h3>
<p>4.1. The Provider shall indemnify the Company against all claims arising from the Provider's negligence.</p>
<p>4.2. <span id="cl-4-2">The Provider's total liability under this Agreement shall be unlimited for any and all claims, including indirect or consequential damages.</span></p>

<h3>5. INTELLECTUAL PROPERTY</h3>
<p>5.1. All Intellectual Property Rights created during the course of the Services shall vest immediately in the Company.</p>

<h3>6. MISCELLANEOUS</h3>
<p>6.1. This Agreement is governed by the laws of New York.</p>
<p>6.2. <span id="cl-6-2">Any dispute arising out of this agreement shall be settled by arbitration in a location chosen solely by the Company.</span></p>
<br/>
<p>IN WITNESS WHEREOF, the parties have executed this Agreement.</p>
`;

export const simulateDocProcessing = async (files) => {
  return new Promise((resolve) => {
    // Simulating network delay
    setTimeout(() => {
      resolve({
        processResult: {
          "Agreement Date": "2023-10-27",
          "Company Name": "Acme Corporation",
          "Provider Name": "Global Solutions Ltd",
          "Total Value": "$50,000",
          "Payment Term": "60 days",
          "Governing Law": "New York"
        },
        bgTextHtml: SAMPLE_HTML,
        Onerous: [
          "The Company may terminate this Agreement for convenience upon providing 30 days' written notice",
          "The Provider's total liability under this Agreement shall be unlimited",
          "Any dispute arising out of this agreement shall be settled by arbitration in a location chosen solely by the Company"
        ]
      });
    }, 1500);
  });
};
