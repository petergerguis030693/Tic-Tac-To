let fields = [null, 
    null, 
    null, 
    null, 
    null, 
    null, 
    null, 
    null, 
    null,
];


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

function handleClick(index) {
  console.log(`Cell ${index} clicked`);
  // Hier könnte später Logik zum Setzen eines Symbols hinzugefügt werden
}

function init(){
    render();
}
