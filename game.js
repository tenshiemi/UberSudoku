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

var getCurrentRow = function(cellId) {
  var row = cellId[0],
      $rowOfCells = $( "input[data-cell^= '" +  row + "']" );
  return getValuesOfCells(stripUndefinedValues($rowOfCells));
}

var getCurrentColumn = function(cellId) {
  var column = cellId[1],
      $columnOfCells = $( "input[data-cell$= '" +  column + "']" );
  return getValuesOfCells(stripUndefinedValues($columnOfCells));
}

var getCurrentSquare = function(cellId) {
  var $currentSquare = cellId.closest('table');
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
  var board = getCurrentRow("0");
  for (var i=1; i<9; i++) {
    board += "," + getCurrentRow(i.toString());
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

var gameJS = function() {
  $("input").on('keyup', function() {
    var cellId = $(this).attr("data-cell");
    var cellValue = $(this).val();
    if (!isInputValid(cellValue) ||
      !isCellGroupValid(cellValue, getCurrentRow(cellId)) ||
      !isCellGroupValid(cellValue, getCurrentColumn(cellId)) ||
      !isCellGroupValid(cellValue, getCurrentSquare($(this)))) {
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
