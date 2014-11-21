var isInputValid = function() {

}

var gameJS = function() {
  $("input").on('keyup', function() {
    var cellId = $(this).attr("data-cell");
    var cellValue = $(this).val();
    isInputValid(cellValue);
  });
}

$(gameJS);
