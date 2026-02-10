document.addEventListener('DOMContentLoaded', () => {
    const lottoNumbersDiv = document.getElementById('lotto-numbers');
    const generateBtn = document.getElementById('generate-btn');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Theme logic
    const currentTheme = localStorage.getItem('theme') || 'light';
    setTheme(currentTheme);

    themeToggleBtn.addEventListener('click', () => {
        let newTheme = htmlElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });

    function setTheme(theme) {
        htmlElement.setAttribute('data-theme', theme);
        themeToggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
    }

    generateBtn.addEventListener('click', () => {
        lottoNumbersDiv.innerHTML = '';
        const numbers = generateUniqueNumbers();
        numbers.forEach((number, index) => {
            const ball = document.createElement('div');
            ball.className = 'number-ball';
            ball.style.backgroundColor = getNumberColor(number);
            ball.style.animationDelay = `${index * 0.1}s`;
            ball.textContent = number;
            lottoNumbersDiv.appendChild(ball);
        });
    });

    function generateUniqueNumbers() {
        const numbers = new Set();
        while (numbers.size < 6) {
            const randomNumber = Math.floor(Math.random() * 45) + 1;
            numbers.add(randomNumber);
        }
        return Array.from(numbers).sort((a, b) => a - b);
    }

    function getNumberColor(number) {
        if (number <= 10) return '#f44336'; // Red
        if (number <= 20) return '#ff9800'; // Orange
        if (number <= 30) return '#ffc107'; // Amber
        if (number <= 40) return '#4caf50'; // Green
        return '#2196f3'; // Blue
    }
});
