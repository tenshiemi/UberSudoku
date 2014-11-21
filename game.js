var getCurrentRow = function(cellId) {
  var row = cellId[0],
      currentRow = [],
      rowOfCells = $( "input[data-cell^= '" +  row + "']" );
  for (var i = 0; i < rowOfCells.length; i++) {
    if (rowOfCells[i].hasAttribute("value")) {
      currentRow.push(rowOfCells[i]["value"]);
    }
  }
  return currentRow;
}

var isInputValid = function(cellInput) {
  return !isNaN(cellInput);
}

var isRowValid = function(cellInput, currentRow) {
  if (currentRow.indexOf(cellInput) !== -1) {
    return false;
  }
  return true;
}

var gameJS = function() {
  $("input").on('keyup', function() {
    var cellId = $(this).attr("data-cell");
    var cellValue = $(this).val();
  });
}

$(gameJS);
