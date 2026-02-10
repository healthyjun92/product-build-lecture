document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const mainNumbersContainer = document.querySelector('.main-numbers');
    const bonusNumberElement = document.querySelector('.bonus-number');

    generateBtn.addEventListener('click', generateLottoNumbers);

    function generateLottoNumbers() {
        const numbers = new Set();
        while (numbers.size < 6) {
            numbers.add(Math.floor(Math.random() * 45) + 1);
        }
        const mainNumbers = Array.from(numbers).sort((a, b) => a - b);

        let bonusNumber;
        do {
            bonusNumber = Math.floor(Math.random() * 45) + 1;
        } while (numbers.has(bonusNumber));

        displayNumbers(mainNumbers, bonusNumber);
    }

    function displayNumbers(mainNumbers, bonusNumber) {
        mainNumbersContainer.querySelectorAll('.number').forEach((span, index) => {
            span.textContent = mainNumbers[index];
        });
        bonusNumberElement.textContent = bonusNumber;
    }

    // Generate numbers on initial load
    generateLottoNumbers();
});