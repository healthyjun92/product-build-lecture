document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const mainNumbersContainer = document.querySelector('.main-numbers');
    const bonusNumberContainer = document.querySelector('.bonus-number .number');

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
        const mainNumberSpans = mainNumbersContainer.querySelectorAll('.number');
        mainNumberSpans.forEach((span, index) => {
            span.textContent = mainNumbers[index];
            span.classList.remove('animate');
            void span.offsetWidth; // Trigger reflow
            span.classList.add('animate');
        });
        
        bonusNumberContainer.textContent = bonusNumber;
        bonusNumberContainer.classList.remove('animate');
        void bonusNumberContainer.offsetWidth; // Trigger reflow
        bonusNumberContainer.classList.add('animate');
    }

    // Initial generation
    generateLottoNumbers();
});
