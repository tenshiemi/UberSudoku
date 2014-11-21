var stripUndefinedValues = function(array) {
  return $.grep(array, function(item) {
    return item.hasAttribute("value");
  });
}

var getValuesOfCells = function(array) {
  return $.map(array, function(item) {
    return item["value"];
  });
}

var getCurrentRow = function(cellId) {
  var row = cellId[0],
      rowOfCells = $( "input[data-cell^= '" +  row + "']" );
  return getValuesOfCells(stripUndefinedValues(rowOfCells));
}

var getCurrentColumn = function(cellId) {
  var column = cellId[1],
      columnOfCells = $( "input[data-cell$= '" +  column + "']" );
  return getValuesOfCells(stripUndefinedValues(columnOfCells));
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
