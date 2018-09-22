summaryInclude=60;
var fuseOptions = {
  shouldSort: true,
  includeMatches: true,
  threshold: 0.0,
  tokenize:true,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    {name:"title",weight:0.8},
    {name:"contents",weight:0.5},
    {name:"categoryNoSlug",weight:0.3},   
    {name:"subcategories",weight:0.3},
    {name:"subcategoriesNoSLug",weight:0.3}
  ]
};


var searchQuery = param("s");

if(searchQuery){
  $("#search-query").val(searchQuery);
  executeSearch(searchQuery);
}else {
  $('#search-results').append("<p>Please enter a word or phrase above</p>");
}

// AUTOCOMPLETE JQUERY
var options = {
    url: "/index.json",

    getValue: "title",

    template: {
        type: "custom",
        method: function(value, item) {
          return "<a href='" + item.permalink + " '> " +  item.title + "</a>" + " - " + item.categoryNoSLug ;
        }
    },

    list: {
        match: {
            enabled: true
        }
    },
    placeholder: "Αναζήτηση"
    theme: "square"
};

$("#search-query").easyAutocomplete(options);




function executeSearch(searchQuery){
  $.getJSON( "/index.json", function( data ) {
    var pages = data;
    var fuse = new Fuse(pages, fuseOptions);
    var result = fuse.search(searchQuery);
    console.log({"matches":result});
    if(result.length > 0){
      populateResults(result);
    }else{
      $('#search-results').append("<p>No matches found</p>");
    }
  });
}

function populateResults(result){
  $.each(result,function(key,value){
    var contents= value.item.contents;
    var snippet = "";
    var snippetHighlights=[];
    var categoryNoSlug =[];
    var cities =[];

    if( fuseOptions.tokenize ){
      snippetHighlights.push(searchQuery);
    }else{
      $.each(value.matches,function(matchKey,mvalue){
        if(mvalue.key == "subcategoriesNoSLug" || mvalue.key == "categoryNoSlug" ){
          snippetHighlights.push(mvalue.value);
        }
      });
    }

    //pull template from hugo templarte definition
    var templateDefinition = $('#search-result-template').html();

    //replace values
    var output = render(templateDefinition,{
      key:key,
      title:value.item.title,
      link:value.item.permalink,
      categories:value.item.categories,
      subcategories:value.item.subcategories,
      subcategoriesNoSLug:value.item.subcategoriesNoSLug,
      categoryNoSlug:value.item.categoryNoSLug,
      cities:value.item.city,
      slug:value.item.slug,
      UID:value.item.UID,
      snippet:snippet
    });

    $('#search-results').append(output);

    $.each(snippetHighlights,function(snipkey,snipvalue){
      $("#summary-"+key).mark(snipvalue);
    });

  });
}

function param(name) {
    return decodeURIComponent((location.search.split(name + '=')[1] || '').split('&')[0]).replace(/\+/g, ' ');
}

function render(templateString, data) {
  var conditionalMatches,conditionalPattern,copy;
  conditionalPattern = /\$\{\s*isset ([a-zA-Z]*) \s*\}(.*)\$\{\s*end\s*}/g;
  //since loop below depends on re.lastInxdex, we use a copy to capture any manipulations whilst inside the loop
  copy = templateString;
  while ((conditionalMatches = conditionalPattern.exec(templateString)) !== null) {
    if(data[conditionalMatches[1]]){
      //valid key, remove conditionals, leave contents.
      copy = copy.replace(conditionalMatches[0],conditionalMatches[2]);
    }else{
      //not valid, remove entire section
      copy = copy.replace(conditionalMatches[0],'');
    }
  }
  templateString = copy;
  //now any conditionals removed we can do simple substitution
  var key, find, re;
  for (key in data) {
    find = '\\$\\{\\s*' + key + '\\s*\\}';
    re = new RegExp(find, 'g');
    templateString = templateString.replace(re, data[key]);
  }
  return templateString;
}
