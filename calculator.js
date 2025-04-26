// Calculator logic for Klaviyo Reporting Automation ROI Calculator
document.addEventListener('DOMContentLoaded', function() {
    // Get input elements
    const clientsInput = document.getElementById('clients');
    const hoursPerClientInput = document.getElementById('hours-per-client');
    const hourlyRateInput = document.getElementById('hourly-rate');
    const clientValueInput = document.getElementById('client-value');

    // Get result elements - Current Manual Process
    const weeklyHoursEl = document.getElementById('weekly-hours');
    const monthlyHoursEl = document.getElementById('monthly-hours');
    const annualHoursEl = document.getElementById('annual-hours');
    const annualCostEl = document.getElementById('annual-cost');

    // Get result elements - With Automation
    const newWeeklyHoursEl = document.getElementById('new-weekly-hours');
    const newMonthlyHoursEl = document.getElementById('new-monthly-hours');
    const newAnnualHoursEl = document.getElementById('new-annual-hours');
    const newAnnualCostEl = document.getElementById('new-annual-cost');

    // Get result elements - Savings & Opportunities
    const annualHoursSavedEl = document.getElementById('annual-hours-saved');
    const annualCostSavedEl = document.getElementById('annual-cost-saved');
    const additionalCapacityEl = document.getElementById('additional-capacity');
    const additionalRevenueEl = document.getElementById('additional-revenue');

    // Get summary elements
    const summaryCostSavedEl = document.getElementById('summary-cost-saved');
    const summaryAdditionalRevenueEl = document.getElementById('summary-additional-revenue');
    const summaryTotalImpactEl = document.getElementById('summary-total-impact');

    // Get action buttons
    const pdfExportBtn = document.getElementById('pdf-export');
    const emailResultsBtn = document.getElementById('email-results');

    // Constants
    const TIME_REDUCTION_PERCENTAGE = 0.85; // 85% time reduction
    const WEEKS_PER_MONTH = 4.3;
    const MONTHS_PER_YEAR = 12;
    const MAX_ADDITIONAL_CLIENTS = 2; // Cap at 2 clients for realism

    // Format currency
    function formatCurrency(value) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    }

    // Format number with 1 decimal place
    function formatNumber(value) {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1
        }).format(value);
    }

    // Format integer
    function formatInteger(value) {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    }

    // Calculate and update results
    function calculateResults() {
        // Get input values
        const clients = parseFloat(clientsInput.value) || 0;
        const hoursPerClient = parseFloat(hoursPerClientInput.value) || 0;
        const hourlyRate = parseFloat(hourlyRateInput.value) || 0;
        const clientValue = parseFloat(clientValueInput.value) || 0;

        // Calculate current manual process metrics
        const weeklyHours = clients * hoursPerClient;
        const monthlyHours = weeklyHours * WEEKS_PER_MONTH;
        const annualHours = monthlyHours * MONTHS_PER_YEAR;
        const annualCost = annualHours * hourlyRate;

        // Calculate with automation metrics (85% time reduction)
        const newWeeklyHours = weeklyHours * (1 - TIME_REDUCTION_PERCENTAGE);
        const newMonthlyHours = newWeeklyHours * WEEKS_PER_MONTH;
        const newAnnualHours = newMonthlyHours * MONTHS_PER_YEAR;
        const newAnnualCost = newAnnualHours * hourlyRate;

        // Calculate savings & opportunities
        const annualHoursSaved = annualHours - newAnnualHours;
        const annualCostSaved = annualCost - newAnnualCost;
        
        // Calculate additional client capacity gained
        // Formula: Annual hours saved ÷ (Hours per week per client × 52)
        let additionalCapacity = 0;
        if (hoursPerClient > 0) {
            additionalCapacity = annualHoursSaved / (hoursPerClient * 52);
            // Cap at MAX_ADDITIONAL_CLIENTS for realism
            additionalCapacity = Math.min(additionalCapacity, MAX_ADDITIONAL_CLIENTS);
        }
        
        // Calculate potential additional annual revenue
        const additionalRevenue = additionalCapacity * clientValue;

        // Update current manual process elements
        weeklyHoursEl.textContent = formatNumber(weeklyHours);
        monthlyHoursEl.textContent = formatNumber(monthlyHours);
        annualHoursEl.textContent = formatInteger(annualHours);
        annualCostEl.textContent = formatCurrency(annualCost);

        // Update with automation elements
        newWeeklyHoursEl.textContent = formatNumber(newWeeklyHours);
        newMonthlyHoursEl.textContent = formatNumber(newMonthlyHours);
        newAnnualHoursEl.textContent = formatInteger(newAnnualHours);
        newAnnualCostEl.textContent = formatCurrency(newAnnualCost);

        // Update savings & opportunities elements
        annualHoursSavedEl.textContent = formatInteger(annualHoursSaved);
        annualCostSavedEl.textContent = formatCurrency(annualCostSaved);
        additionalCapacityEl.textContent = formatNumber(additionalCapacity);
        additionalRevenueEl.textContent = formatCurrency(additionalRevenue);

        // Update summary elements
        summaryCostSavedEl.textContent = formatCurrency(annualCostSaved);
        summaryAdditionalRevenueEl.textContent = formatCurrency(additionalRevenue);
        summaryTotalImpactEl.textContent = formatCurrency(annualCostSaved + additionalRevenue);
    }

    // Add event listeners to input fields
    clientsInput.addEventListener('input', calculateResults);
    hoursPerClientInput.addEventListener('input', calculateResults);
    hourlyRateInput.addEventListener('input', calculateResults);
    clientValueInput.addEventListener('input', calculateResults);

    // PDF Export functionality
    pdfExportBtn.addEventListener('click', function() {
        // Check if jsPDF is loaded
        if (typeof window.jspdf === 'undefined') {
            alert('PDF export library not loaded. Please try again later.');
            return;
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Add title
        doc.setFontSize(20);
        doc.setTextColor(59, 90, 219); // Primary blue
        doc.text('Klaviyo Reporting Automation ROI Calculator', 105, 20, { align: 'center' });
        
        // Add subtitle
        doc.setFontSize(12);
        doc.setTextColor(30, 44, 96); // Text navy
        doc.text('Financial Benefits Summary', 105, 30, { align: 'center' });
        
        // Add date
        const today = new Date();
        doc.setFontSize(10);
        doc.text(`Generated on: ${today.toLocaleDateString()}`, 105, 40, { align: 'center' });
        
        // Add input values
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text('Input Data:', 20, 55);
        doc.setFontSize(10);
        doc.text(`Number of Klaviyo clients: ${clientsInput.value}`, 25, 65);
        doc.text(`Hours spent weekly per client: ${hoursPerClientInput.value}`, 25, 72);
        doc.text(`Team's average hourly rate: $${hourlyRateInput.value}`, 25, 79);
        doc.text(`Average client LTV/annual value: $${clientValueInput.value}`, 25, 86);
        
        // Add results
        doc.setFontSize(12);
        doc.text('Current Manual Process:', 20, 100);
        doc.setFontSize(10);
        doc.text(`Weekly hours: ${weeklyHoursEl.textContent}`, 25, 110);
        doc.text(`Monthly hours: ${monthlyHoursEl.textContent}`, 25, 117);
        doc.text(`Annual hours: ${annualHoursEl.textContent}`, 25, 124);
        doc.text(`Annual cost: ${annualCostEl.textContent}`, 25, 131);
        
        doc.setFontSize(12);
        doc.text('With Automation (85% Time Reduction):', 20, 145);
        doc.setFontSize(10);
        doc.text(`New weekly hours: ${newWeeklyHoursEl.textContent}`, 25, 155);
        doc.text(`New monthly hours: ${newMonthlyHoursEl.textContent}`, 25, 162);
        doc.text(`New annual hours: ${newAnnualHoursEl.textContent}`, 25, 169);
        doc.text(`New annual cost: ${newAnnualCostEl.textContent}`, 25, 176);
        
        doc.setFontSize(12);
        doc.text('Savings & Opportunities:', 20, 190);
        doc.setFontSize(10);
        doc.text(`Annual hours saved: ${annualHoursSavedEl.textContent}`, 25, 200);
        doc.text(`Annual cost saved: ${annualCostSavedEl.textContent}`, 25, 207);
        doc.text(`Additional client capacity: ${additionalCapacityEl.textContent}`, 25, 214);
        doc.text(`Potential additional revenue: ${additionalRevenueEl.textContent}`, 25, 221);
        
        // Add summary
        doc.setFontSize(14);
        doc.setTextColor(0, 200, 117); // Primary green
        doc.text('Total Financial Impact:', 105, 240, { align: 'center' });
        doc.setFontSize(16);
        doc.text(`${summaryTotalImpactEl.textContent}`, 105, 250, { align: 'center' });
        
        // Add footer
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.text('© 2025 Visualytics Agency. All rights reserved.', 105, 280, { align: 'center' });
        
        // Save the PDF
        doc.save('Klaviyo-ROI-Calculator-Results.pdf');
    });

    // Email Results functionality
    emailResultsBtn.addEventListener('click', function() {
        // Get input values and results
        const clients = clientsInput.value;
        const hoursPerClient = hoursPerClientInput.value;
        const hourlyRate = hourlyRateInput.value;
        const clientValue = clientValueInput.value;
        
        // Create email body
        const subject = 'Klaviyo Reporting Automation ROI Calculator Results';
        const body = `
Hello,

Here are your Klaviyo Reporting Automation ROI Calculator results:

Input Data:
- Number of Klaviyo clients: ${clients}
- Hours spent weekly per client: ${hoursPerClient}
- Team's average hourly rate: $${hourlyRate}
- Average client LTV/annual value: $${clientValue}

Current Manual Process:
- Weekly hours: ${weeklyHoursEl.textContent}
- Monthly hours: ${monthlyHoursEl.textContent}
- Annual hours: ${annualHoursEl.textContent}
- Annual cost: ${annualCostEl.textContent}

With Automation (85% Time Reduction):
- New weekly hours: ${newWeeklyHoursEl.textContent}
- New monthly hours: ${newMonthlyHoursEl.textContent}
- New annual hours: ${newAnnualHoursEl.textContent}
- New annual cost: ${newAnnualCostEl.textContent}

Savings & Opportunities:
- Annual hours saved: ${annualHoursSavedEl.textContent}
- Annual cost saved: ${annualCostSavedEl.textContent}
- Additional client capacity: ${additionalCapacityEl.textContent}
- Potential additional revenue: ${additionalRevenueEl.textContent}

Total Financial Impact: ${summaryTotalImpactEl.textContent}

To learn more about our Klaviyo reporting automation services, please visit our website or book a call.

Thank you,
Visualytics Agency
`;

        // Create mailto link
        const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // Open email client
        window.open(mailtoLink);
    });

    // Run initial calculation
    calculateResults();
});
