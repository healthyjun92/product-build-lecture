document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const mainNumbersContainer = document.querySelector('.main-numbers');
    const bonusNumberContainer = document.querySelector('.bonus-number .number');
    const body = document.body;

    // Load theme preference from localStorage or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', currentTheme);

    generateBtn.addEventListener('click', generateLottoNumbers);

    themeToggleBtn.addEventListener('click', () => {
        const newTheme = body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

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

    // Initial generation after theme is loaded
    generateLottoNumbers();
});
