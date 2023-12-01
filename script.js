document.addEventListener('DOMContentLoaded', function () {
    const spinButton = document.getElementById('spinButton');
    const attemptsText = document.getElementById('attempts');
    let attempts = 3;
    const fruits = ['seven', 'cherry', 'banana', 'watermelon', 'orange', 'grape'];
    const cells = document.querySelectorAll('.cell');

    cells.forEach(cell => updateCellImage(cell));

    function resetGame() {
        attempts = 3;
		attemptsText.textContent = `${attempts}`;
		cells.forEach(cell => {
        cell.innerHTML = '';
    });
    centralLineLuckyFruit = ''; // Скидання щасливого фрукта
    }
	let centralLineLuckyFruit = '';
	
    function getRandomFruit(isCentralLine = false) {
    let fruitArray = fruits;
    if (isCentralLine) {
        if (!centralLineLuckyFruit) {
            centralLineLuckyFruit = fruits[Math.floor(Math.random() * fruits.length)];
        }
        fruitArray = [...fruits, ...Array(1).fill(centralLineLuckyFruit)];
    }
    const index = Math.floor(Math.random() * fruitArray.length);
    return `${fruitArray[index]}.png`;
}
    function updateCellImage(cell, isCentralLine = false) {
		const img = document.createElement('img');
    img.src = getRandomFruit(isCentralLine);
    cell.innerHTML = '';
    cell.appendChild(img);
	}

    function checkWin() {
    const lines = [
        [cells[3], cells[4], cells[5]],
    ];
    return lines.some(line => {
        const srcs = line.map(cell => {
            // Отримання лише назви файлу зображення
            return cell.firstChild.src.split('/').pop();
        });
        return new Set(srcs).size == 1;
    });
}

    function spinCells() {
    centralLineLuckyFruit = ''; // Встановлення нового щасливого фрукта перед кожним спіном
    const interval = setInterval(() => {
        cells.forEach((cell, index) => {
            const isCentralLine = index >= 3 && index <= 5;
            updateCellImage(cell, isCentralLine);
        });
    }, 100);

    setTimeout(() => {
        clearInterval(interval);
		}, 2000);
        if (checkWin()) {
            alert('You won!');
            resetGame();
        } else if (attempts === 0) {
            alert('Game over! Try again');
            resetGame();
        } else {
            attemptsText.textContent = `${attempts}`; // Оновлення кількості спроб
        }
    
}
    spinButton.addEventListener('click', function() {
    if (attempts > 0) {
        attempts--;
        spinCells(); // Функція spinCells тепер також скидає centralLineLuckyFruit
    }
});
});
