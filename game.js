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
      $columnOfCells = $( "input[data-cell" + dataIndex + "='" +  column + "']" );
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

var toggleWinningModal = function() {
  $("#overlay").toggle();
  $("#modal--winning").toggle();
}

var clearGameBoard = function() {
  activeCells = $('input:enabled');
  for (var i = 0; i < activeCells.length; i++) {
    activeCells[i].value = "";
  }
}

var refreshGame = function() {
  toggleWinningModal();
  clearGameBoard();
}

var isCellValid = function(currentCell) {
  var cellValue = currentCell.val();
  var cellId = currentCell.attr("data-cell");
  return (isCellGroupValid(cellValue, getCurrentLine(cellId, 0, "^")) &&
      isCellGroupValid(cellValue, getCurrentLine(cellId, 1, "$")) &&
      isCellGroupValid(cellValue, getCurrentSquare(currentCell)));
}

var checkCompleteBoard = function() {
  var currentCell;
  for (var i=0; i<=8; i++) {
    for (var j=0; j<=8; j++) {
      $currentCell = $("input[data-cell='" +  i + j + "']" );
      if ($currentCell.val() === "") {
        return false
      } else if (!isCellValid($currentCell)) {
        return false;
      }
    }
  }
  return true
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

  $('.close-modal').on('click', refreshGame);
}

$(gameJS);
