// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e) {
  // Hide Results
  document.getElementById('results').style.display = 'none';

  // Show loader
  document.getElementById("loading").style.display = "block";

  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

// Calculate Results Function
function calculateResults() {
  // UI Variables
  const UIamount = document.getElementById('amount');
  const UIinterest = document.getElementById("interest");
  const UIyears = document.getElementById("years");

  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  // Calculations
  const principal = parseFloat(UIamount.value);
  const calculatedInterest = parseFloat(UIinterest.value) / 100 / 12;
  const calculatedPayments = parseFloat(UIyears.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);

    // Show Results
    document.getElementById("results").style.display = "block";

    // hide loader
    document.getElementById("loading").style.display = "none";
  } else {
    showError('Please check your numbers');
  }
}

// Show Error
function showError(error) {
  // hide Results
  document.getElementById("results").style.display = "none";

  // hide loader
  document.getElementById("loading").style.display = "none";

  // Create a div
  const errorDiv = document.createElement("div");

  // Get Element
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  // Assign Classes
  errorDiv.className = "alert alert-danger";

  // Create a Text node and append it to div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading
  card.insertBefore(errorDiv, heading);

  // Clear Error after 3 Sec
  setTimeout(clearError, 3000);
}

// Clear Error
function clearError() {
  document.querySelector('.alert').remove();
}