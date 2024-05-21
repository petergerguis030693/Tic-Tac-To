let fields = [null, null, null, null, null, null, null, null, null];
let currentPlayer = "O"; // Startet mit 'O'

function render() {
  const table = document.getElementById("ticTacToeTable");
  let html = "";

  for (let i = 0; i < 3; i++) {
    html += "<tr>";
    for (let j = 0; j < 3; j++) {
      const index = i * 3 + j;
      const content = fields[index] ? fields[index] : "";
      const className =
        fields[index] === "O" ? "circle" : fields[index] === "X" ? "cross" : "";
      html += `<td class="${className}" onclick="handleClick(${index})">${content}</td>`;
    }
    html += "</tr>";
  }

  table.innerHTML = html;
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
    currentPlayer = currentPlayer === "O" ? "X" : "O";
    render();
  }
}

function init() {
  render();
}
