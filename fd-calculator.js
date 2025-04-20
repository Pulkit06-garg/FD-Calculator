document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculate');
    const resultsDiv = document.getElementById('results');
    const totalInterestSpan = document.getElementById('total-interest');
    const maturityAmountSpan = document.getElementById('maturity-amount');

    calculateBtn.addEventListener('click', calculateFD);

    function calculateFD() {
        const principal = parseFloat(document.getElementById('principal').value);
        const rate = parseFloat(document.getElementById('rate').value);
        const tenure = parseFloat(document.getElementById('tenure').value);
        const frequency = document.getElementById('frequency').value;

        // Input validation
        if (isNaN(principal) || isNaN(rate) || isNaN(tenure)) {
            alert('Please enter valid numbers for all fields');
            return;
        }

        if (principal <= 0 || rate <= 0 || tenure <= 0) {
            alert('Please enter positive values for all fields');
            return;
        }

        // Convert tenure from months to years
        const years = tenure / 12;

        // Calculate interest based on frequency
        let totalInterest;
        switch (frequency) {
            case 'monthly':
                totalInterest = principal * Math.pow((1 + (rate/100)/12), 12 * years) - principal;
                break;
            case 'quarterly':
                totalInterest = principal * Math.pow((1 + (rate/100)/4), 4 * years) - principal;
                break;
            case 'half-yearly':
                totalInterest = principal * Math.pow((1 + (rate/100)/2), 2 * years) - principal;
                break;
            case 'annually':
                totalInterest = principal * Math.pow((1 + rate/100), years) - principal;
                break;
            case 'maturity':
                totalInterest = (principal * rate * years) / 100;
                break;
        }

        const maturityAmount = principal + totalInterest;

        // Format numbers with commas and 2 decimal places
        totalInterestSpan.textContent = '₹' + totalInterest.toLocaleString('en-IN', {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2
        });

        maturityAmountSpan.textContent = '₹' + maturityAmount.toLocaleString('en-IN', {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2
        });

        // Show results
        resultsDiv.style.display = 'block';
    }
}); 