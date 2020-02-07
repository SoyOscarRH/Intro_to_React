function createHelloLogs() {
  var functions = [];
  for (var i = 0; i < 5; ++i) {
    functions.push(function() {
      console.log(i);
    });
  }

  return functions
}

window.result = createHelloLogs()




function processArray (array) {
  for(var i = 0; i < array.length; i++) {
    console.log('Element ', array[i]);
  }
  
  console.log('I can use variable i outside the loop ', i);
}




function printMatrix (matrix) {
  for (var i = 0; i < matrix.length; i++) {
    var line = matrix[i];
    for (var i = 0; i < line.length; i++) {
      var element = line[i];
      console.log(element);
    }
  }
}

var matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

printMatrix(matrix);





function printMatrix (matrix) {
  for (let i = 0; i < matrix.length; i++) {
    const line = matrix[i];
    for (let i = 0; i < line.length; i++) {
      const element = line[i];
      console.log(element);
    }
  }
}

const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

printMatrix(matrix);




let button = document.querySelector("button");
button.addEventListener("click", () => {
  console.log("Button clicked.");
});