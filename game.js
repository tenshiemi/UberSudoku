var resumeGame = function() {
  if (!window.localStorage) {
    return false;
  }

  if (localStorage["game_in_progress"] === 'true') {
    setBoardFromSave();
  } else {
    localStorage.setItem("game_in_progress", true);
  }
}

var setBoardFromSave = function() {
  var currentCellIndex, $currentCell;
  var activeCells = $('input:enabled');
  for (var i = 0; i < activeCells.length; i++) {
    currentCellIndex = activeCells[i].getAttribute('data-cell');
    if (localStorage[currentCellIndex]) {
      $currentCell = $("input[data-cell='" +  currentCellIndex + "']" );
      $currentCell.val(localStorage.getItem(currentCellIndex));
      if (!isCellValid($currentCell)) {
        $currentCell.addClass("invalid");
      }
    }
  }
}

var saveCell = function(cell) {
  localStorage.setItem(cell.attr('data-cell'), cell.val());
}

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

var validateNewInput = function(that) {
  if (!isInputValid(that.val()) || !isCellValid(that)) {
    that.addClass("invalid");
  } else {
    that.removeClass("invalid");
  }
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

var resetSaveGame = function() {
  localStorage.clear();
  localStorage.setItem("game_in_progress", true);
}

var refreshGame = function() {
  if ($("#modal--winning").css("display") !== "none") {
    toggleWinningModal();
  }
  clearGameBoard();
  if (localStorage["game_in_progress"] === 'true') {
    resetSaveGame();
  }
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
  resumeGame();

  $("input").on('keyup', function() {
    var $that = $(this);
    validateNewInput($that);

    if (window.localStorage) {
      saveCell($that);
    }

    if (checkCompleteBoard()) {
      toggleWinningModal();
    }
  });

  $('.blue-button').on('click', refreshGame);
}

$(gameJS);
