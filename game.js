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

var getCurrentColumn = function(cellId) {
  var column = cellId[1],
      currentColumn = [],
      columnOfCells = $( "input[data-cell$= '" +  column + "']" );
  for (var i = 0; i < columnOfCells.length; i++) {
    if (columnOfCells[i].hasAttribute("value")) {
      currentColumn.push(columnOfCells[i]["value"]);
    }
  }
  return currentColumn;
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

var isColumnValid = function(cellInput, currentColumn) {
  if (currentColumn.indexOf(cellInput) !== -1) {
    return false;
  }
  return true;
}

var gameJS = function() {
  $("input").on('keyup', function() {
    var cellId = $(this).attr("data-cell");
    var cellValue = $(this).val();
    if (!isInputValid(cellValue) ||
      !isRowValid(cellValue, getCurrentRow(cellId)) ||
      !isColumnValid(cellValue, getCurrentColumn(cellId))) {
      return false;
    }
  });
}

$(gameJS);
