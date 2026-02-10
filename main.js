document.addEventListener('DOMContentLoaded', () => {
    const lottoNumbersDiv = document.getElementById('lotto-numbers');
    const generateBtn = document.getElementById('generate-btn');

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
