document.addEventListener("DOMContentLoaded", () => {
    const howzatOutcomes = ["No Ball", "Wide Ball", "Caught Out", "Wicket Out", "LBW", "Run Out"];
    let totalRuns = 0;
    let ballsLeft = 6; // Changed variable name
    let ballNumber = 0;
    let targetRuns = 0;

    const statusElement = document.getElementById('status');
    const startButton = document.getElementById('start-button');
    const rollButton = document.getElementById('roll-button');
    const ballResultsElement = document.getElementById('ball-results');
    const targetRunsElement = document.getElementById('target-runs');
    const winLoseMessageButton = document.getElementById('win-lose-message');
    const ballsLeftBox = document.getElementById('balls-left-box'); // Updated ID
    const ballNumberBox = document.getElementById('ball-number-box');
    const runsScoreBox = document.getElementById('runs-score-box');

    function getRandomDiceRoll() {
        return Math.floor(Math.random() * 6) + 1;
    }

    function getRandomTarget() {
        return Math.floor(Math.random() * 36) + 1;
    }

    function handleHowzat() {
        const howzatRoll = getRandomDiceRoll();
        const howzatEvent = howzatOutcomes[howzatRoll - 1];
        if (howzatEvent === "Wide Ball") {
            totalRuns += 1;
            ballsLeft += 1; // Updated variable name
            addBallResult(`Wide Ball! Adding 1 extra run and allowing an additional ball.`);
        } else if (howzatEvent === "No Ball") {
            const extraRuns = getRandomDiceRoll();
            totalRuns += extraRuns;
            ballsLeft += 1; // Updated variable name
            addBallResult(`No Ball! Adding ${extraRuns} extra runs and allowing an additional ball.`);
        } else {
            addBallResult(`Howzat event: ${howzatEvent}`);
        }
    }

    function addBallResult(message) {
        const resultBox = document.createElement('div');
        resultBox.className = 'bg-gray-300 text-gray-800 border border-gray-400 px-2 py-1 rounded-lg mb-1 text-xs';
        resultBox.innerText = message;
        ballResultsElement.appendChild(resultBox);
    }

    function playBall() {
        if (ballsLeft <= 0 || totalRuns >= targetRuns) return; // Updated variable name
        ballNumber++;
        const diceRoll = getRandomDiceRoll();
        if (diceRoll === 5) {
            handleHowzat();
            return 0;
        } else {
            addBallResult(`Ball ${ballNumber}: ${diceRoll} runs`);
            return diceRoll;
        }
    }

    function updateUI() {
        targetRunsElement.innerText = `Target Runs: ${targetRuns}`;
        ballsLeftBox.innerText = `Balls Left: ${ballsLeft}`; // Updated text
        ballNumberBox.innerText = `Ball Number: ${ballNumber}`;
        runsScoreBox.innerText = `Runs Score: ${totalRuns}`;

        if (totalRuns >= targetRuns) {
            rollButton.disabled = true;
            winLoseMessageButton.innerText = `You win!`;
            winLoseMessageButton.classList.remove('hidden');
        } else if (ballsLeft <= 0) { // Updated variable name
            rollButton.disabled = true;
            winLoseMessageButton.innerText = `You lose.`;
            winLoseMessageButton.classList.remove('hidden');
        }
    }

    function startGame() {
        targetRuns = getRandomTarget();
        totalRuns = 0;
        ballsLeft = 6; // Updated variable name
        ballNumber = 0;
        ballResultsElement.innerHTML = '';
        targetRunsElement.innerText = `Target Runs: ${targetRuns}`;
        winLoseMessageButton.innerText = '';
        winLoseMessageButton.classList.add('hidden');
        ballsLeftBox.innerText = `Balls Left: ${ballsLeft}`; // Updated text
        ballNumberBox.innerText = `Ball Number: ${ballNumber}`;
        runsScoreBox.innerText = `Runs Score: ${totalRuns}`;
        rollButton.disabled = false;
        statusElement.innerText = 'Game in progress...';
    }

    startButton.addEventListener('click', startGame);
    rollButton.addEventListener('click', () => {
        if (ballsLeft > 0 && totalRuns < targetRuns) { // Updated variable name
            const runs = playBall();
            totalRuns += runs;
            ballsLeft--; // Updated variable name
            updateUI();
        }
    });
});
