let score = 0;
let timeLeft = 30;
let timerId;
let bonusTimerId;

const scoreElement = document.getElementById('score');
const timeLeftElement = document.getElementById('timeLeft');
const clickButton = document.getElementById('clickButton');
const bonusButton = document.getElementById('bonusButton');
const restartButton = document.getElementById('restartButton');

clickButton.addEventListener('click', () => {
    score++;
    scoreElement.textContent = score;
    moveButton(clickButton);
});

bonusButton.addEventListener('click', () => {
    score += 5;
    scoreElement.textContent = score;
    bonusButton.classList.add('hidden');
});

restartButton.addEventListener('click', () => {
    score = 0;
    timeLeft = 30;
    scoreElement.textContent = score;
    timeLeftElement.textContent = timeLeft;
    clickButton.disabled = false;
    restartButton.classList.add('hidden');
    startTimer();
    startBonusTimer();
});

function moveButton(button) {
    const gameArea = document.getElementById('gameArea');
    const gameAreaRect = gameArea.getBoundingClientRect();
    const buttonWidth = button.offsetWidth;
    const buttonHeight = button.offsetHeight;

    const maxX = gameAreaRect.width - buttonWidth;
    const maxY = gameAreaRect.height - buttonHeight;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    button.style.position = 'absolute';
    button.style.left = `${randomX}px`;
    button.style.top = `${randomY}px`;
}

function startTimer() {
    timerId = setInterval(() => {
        timeLeft--;
        timeLeftElement.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerId);
            clickButton.disabled = true;
            bonusButton.classList.add('hidden');
            restartButton.classList.remove('hidden');
            alert('ゲーム終了！スコア: ' + score);
        }
    }, 1000);
}

function startBonusTimer() {
    bonusTimerId = setInterval(() => {
        if (Math.random() < 0.3) { // 30%の確率でボーナスボタンが出現
            moveButton(bonusButton);
            bonusButton.classList.remove('hidden');
            setTimeout(() => {
                bonusButton.classList.add('hidden');
            }, 2000); // ボーナスボタンは2秒間表示
        }
    }, 3000); // 3秒ごとにチャンスがある
}

startTimer();
startBonusTimer();
