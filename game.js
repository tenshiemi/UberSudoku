var getCurrentRow = function(cellInput) {

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
