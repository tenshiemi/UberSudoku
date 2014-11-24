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

var checkCompleteBoard = function() {
  var solution =  "5,3,4,6,7,8,9,1,2," +
                  "6,7,2,1,9,5,3,4,8," +
                  "1,9,8,3,4,2,5,6,7," +
                  "8,5,9,7,6,1,4,2,3," +
                  "4,2,6,8,5,3,7,9,1," +
                  "7,1,3,9,2,4,8,5,6," +
                  "9,6,1,5,3,7,2,8,4," +
                  "2,8,7,4,1,9,6,3,5," +
                  "3,4,5,2,8,6,1,7,9"
  currentBoard = getCurrentBoard();
  return (solution === currentBoard);
}

var toggleWinningModal = function() {
  $("#overlay").toggle();
  $("#modal--winning").toggle();
}

var isCellValid = function(currentCell) {
  var cellValue = currentCell.val();
  var cellId = currentCell.attr("data-cell");
  return (isCellGroupValid(cellValue, getCurrentLine(cellId, 0, "^")) &&
      isCellGroupValid(cellValue, getCurrentLine(cellId, 1, "$")) &&
      isCellGroupValid(cellValue, getCurrentSquare(currentCell)));
}

var gameJS = function() {
  $("input").on('keyup', function() {
    var $that = $(this);
    if (!isInputValid($(this).val()) || !isCellValid($that)) {
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
