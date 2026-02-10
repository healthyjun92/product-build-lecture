document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const mainNumbersContainer = document.querySelector('.main-numbers');
    const bonusNumberElement = document.querySelector('.bonus-number');
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    generateBtn.addEventListener('click', generateLottoNumbers);
    themeToggle.addEventListener('click', toggleTheme);

    // Load theme preference from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    }

    function toggleTheme() {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.textContent = 'Light Mode';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.textContent = 'Dark Mode';
        }
    }

    // Set initial toggle button text
    if (body.classList.contains('dark-mode')) {
        themeToggle.textContent = 'Light Mode';
    } else {
        themeToggle.textContent = 'Dark Mode';
    }

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