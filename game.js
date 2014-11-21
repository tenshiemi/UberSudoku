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
      rowOfCells = $( "input[data-cell^= '" +  row + "']" );
  return getValuesOfCells(stripUndefinedValues(rowOfCells));
}

var getCurrentColumn = function(cellId) {
  var column = cellId[1],
      columnOfCells = $( "input[data-cell$= '" +  column + "']" );
  return getValuesOfCells(stripUndefinedValues(columnOfCells));
}

var getCurrentGroup = function(cellId) {
  var currentGroup = cellId.closest('table');
  var groupCells = $("[data-group=" + currentGroup.data("group") + "] input");
  return getValuesOfCells(stripUndefinedValues(groupCells));
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

var isRowValid = function(cellInput, currentRow) {
  if (findInstances(cellInput, currentRow) > 1) {
    return false;
  }
  return true;
}

var isColumnValid = function(cellInput, currentColumn) {
  if (findInstances(cellInput, currentColumn) > 1) {
    return false;
  }
  return true;
}

var isGroupValid = function(cellInput, currentGroup) {
  if (findInstances(cellInput, currentGroup) > 1) {
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
      !isColumnValid(cellValue, getCurrentColumn(cellId)) ||
      !isGroupValid(cellValue, getCurrentGroup($(this)))) {
      $(this).addClass("invalid");
    } else {
      $(this).val(cellValue);
      $(this).removeClass("invalid");
    }
  });
}

$(gameJS);
