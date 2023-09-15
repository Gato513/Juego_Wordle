const INPUT_TEXT = document.getElementById("word-entry");

INPUT_TEXT.focus();

INPUT_TEXT.addEventListener("blur", function() {
  INPUT_TEXT.focus();
});
