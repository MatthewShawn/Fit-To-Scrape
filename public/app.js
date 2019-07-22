



// We'll be rewriting the table's data frequently, so let's make our code more DRY
// by writing a function that takes in 'articles' (JSON) and creates a table body

var theIds = [];
theHeads = [];
var theActive = null;

function displayArticles(articles) {
  // First, empty the table
  $(".the-articles").empty();

  // Then, for each entry of that json...
  articles.forEach(function(article) {
    // Keep reference arrays, so that I can get the notes for a given
    // article.
    theIds.push(article._id);
    theHeads.push(article.headline);

    // Append each of the animal's properties to the table
    var tr = $("<tr>").append(
      $("<td>").text(article.headline),
      $("<td>").text(article.link),
      $("<td>").text(article.summary),
    );

    $(".the-articles").append(tr);
  });
}

function displayNotes(notes) {
  // First, empty the table
  $(".the-notes").empty();

  // Then, for each entry of that json...
  notes.forEach(function(note) {

    // Append each of the animal's properties to the table
    var tr = $("<tr>").append(
      $("<td>").text(note.title),
      $("<td>").text(note.body)
    );

    $(".the-notes").append(tr);
  });
}


// Bonus function to change "active" row
function setActive(theHeadline) {
  for (var idx = 0; idx < theIds.length; idx++ ){
    if (theHeadline === theHeads[idx]){
      theActive = idx;
    }
  }
}

// 1: On Load
// ==========

// First thing: ask the back end for json with all articles
$.getJSON("/articles", function(data) {
  // Call our function to generate a table body
  displayArticles(data);
});

// 2: Button Interactions
// ======================

// user clicks to select article to write a note for
$("tr").on("click", function() {
  // Set new row as currently-selected (active)
  setActive($(this).find("td:first"));

  // Do an api call to the back end for json with all animals sorted by weight
  $.getJSON("/notes/:" + theIds[theActive], function(data) {
    // Call our function to generate a table body
    displayNotes(data);
  });
});

