var isInputValid = function(cellInput) {
  return !isNaN(cellInput);
}

var gameJS = function() {
  $("input").on('keyup', function() {
    var cellId = $(this).attr("data-cell");
    var cellValue = $(this).val();
  });
}

$(gameJS);
