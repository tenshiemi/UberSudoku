var stripUndefinedValues = function(array) {
  return $.grep(array, function(item) {
    return item.value !== "";
  });
}

var getValuesOfCells = function(array) {
  return $.map(array, function(item) {
    return item.value;
  });
}

var getCurrentLine = function(cellId, cellIndex, dataIndex) {
  var column = cellId[cellIndex],
      $columnOfCells = $( "input[data-cell" + dataIndex + "= '" +  column + "']" );
  return getValuesOfCells(stripUndefinedValues($columnOfCells));
}

var getCurrentSquare = function(currentCell) {
  var $currentSquare = currentCell.closest('table');
  var $squareCells = $("[data-group=" + $currentSquare.data("group") + "] input");
  return getValuesOfCells(stripUndefinedValues($squareCells));
}

var isInputValid = function(cellInput) {
  return !isNaN(cellInput);
}

var findInstances = function(cellInput, line) {
  var numberOccurences = $.grep(line, function(cell) {
    return cell === cellInput;
  }).length
  return numberOccurences;
}

var isCellGroupValid = function(cellInput, currentGroup) {
  if (findInstances(cellInput, currentGroup) > 1) {
    return false;
  }
  return true;
}

var getCurrentBoard = function() {
  var board = getCurrentLine("0", 0, "^");
  for (var i=1; i<9; i++) {
    board += "," + getCurrentLine(i.toString(), 0, "^");
  }
  return board;
}

var checkAllRows = function() {

}

var checkAllColumns = function() {

}

var checkAllCellSquares = function() {

}

var checkCompleteBoard = function() {
  if (checkAllRows() && checkAllColumns() && checkAllCellSquares()) {
    return true;
  }
  return false
}

var toggleWinningModal = function() {
  $("#overlay").toggle();
  $("#modal--winning").toggle();
}

var isCellValid = function(cellValue, cellId, currentCell) {
  return (isCellGroupValid(cellValue, getCurrentLine(cellId, 0, "^")) &&
      isCellGroupValid(cellValue, getCurrentLine(cellId, 1, "$")) &&
      isCellGroupValid(cellValue, getCurrentSquare(currentCell)));
}

var gameJS = function() {
  $("input").on('keyup', function() {
    var cellId = $(this).attr("data-cell");
    var cellValue = $(this).val();
    var $that = $(this);
    if (!isInputValid(cellValue) || !isCellValid(cellValue, cellId, $that)) {
      $(this).addClass("invalid");
    } else {
      $(this).removeClass("invalid");
    }

    if (checkCompleteBoard()) {
      toggleWinningModal();
    }
  });

  $('.close-modal').on('click', toggleWinningModal);
}

$(gameJS);
