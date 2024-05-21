let fields = [null, null, null, null, null, null, null, null, null];
let currentPlayer = "O"; // Startet mit 'O'
let winningCombination = null;

function render() {
  const table = document.getElementById("ticTacToeTable");
  let html = "";

  for (let i = 0; i < 3; i++) {
      html += "<tr>";
      for (let j = 0; j < 3; j++) {
          const index = i * 3 + j;
          const content = fields[index] ? getSvg(fields[index]) : "";
          const className = fields[index] === "O" ? "circle" : (fields[index] === "X" ? "cross" : "");
          html += `<td class="${className}" onclick="handleClick(${index})" data-index="${index}">${content}</td>`;
      }
      html += "</tr>";
  }

  table.innerHTML = html;

  if (winningCombination) {
      drawWinningLine(winningCombination);
  }
}

function getSvg(symbol) {
  if (symbol === "O") {
    return `
            <svg viewBox="0 0 64 64" width="64" height="64">
                <circle cx="32" cy="32" r="25" />
            </svg>
        `;
  } else if (symbol === "X") {
    return `
            <svg viewBox="0 0 64 64" width="64" height="64">
                <line x1="15" y1="15" x2="49" y2="49" />
                <line x1="49" y1="15" x2="15" y2="49" />
            </svg>
        `;
  }
  return "";
}

function handleClick(index) {
  if (!fields[index]) {
    fields[index] = currentPlayer;
    winningCombination = checkWinner(fields);
    if (winningCombination) {
      render(); // Zeichne das Spielfeld neu
      drawWinningLine(winningCombination); // Zeichne die Gewinnlinie
      setTimeout(() => {
        if (confirm(`${currentPlayer} wins! Möchtest du nochmal spielen?`)) {
          resetGame();
        }
      }, 100);
    } else if (checkDraw(fields)) {
      setTimeout(() => {
        if (confirm("Unentschieden! Möchtest du nochmal spielen?")) {
          resetGame();
        }
      }, 100);
    } else {
      currentPlayer = currentPlayer === "O" ? "X" : "O";
      render();
    }
  }
}

function checkWinner(fields) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
      return combination;
    }
  }
  return null;
}

function checkDraw(fields) {
  return fields.every((field) => field !== null);
}

function resetGame() {
  fields.fill(null);
  currentPlayer = "O";
  winningCombination = null;
  document.querySelectorAll(".winning-line").forEach((line) => line.remove()); // Entferne die Gewinnlinie
  render();
}

function init() {
  render();
}

let winner = checkWinner(fields);
if (winner) {
  console.log(`Der Gewinner ist: ${winner}`);
} else if (checkDraw(fields)) {
  console.log("Das Spiel ist unentschieden");
} else {
  console.log("Kein Gewinner und kein Unentschieden");
}

function drawWinningLine(combination) {
  const table = document.getElementById("ticTacToeTable");
  const cells = table.getElementsByTagName("td");
  const [a, b, c] = combination;

  const cellA = cells[a].getBoundingClientRect();
  const cellC = cells[c].getBoundingClientRect();

  const centerX1 = (cellA.left + cellA.right) / 2;
  const centerY1 = (cellA.top + cellA.bottom) / 2;
  const centerX2 = (cellC.left + cellC.right) / 2;
  const centerY2 = (cellC.top + cellC.bottom) / 2;

  const lineHtml = `
      <div class="winning-line" style="
          position: absolute;
          background-color: red;
          height: 5px;
          width: ${Math.sqrt(
            Math.pow(centerX2 - centerX1, 2) + Math.pow(centerY2 - centerY1, 2)
          )}px;
          transform-origin: 0 0;
          transform: rotate(${
            (Math.atan2(centerY2 - centerY1, centerX2 - centerX1) * 180) /
            Math.PI
          }deg);
          left: ${centerX1}px;
          top: ${centerY1}px;">
      </div>
  `;

  document.body.insertAdjacentHTML("beforeend", lineHtml);
}
