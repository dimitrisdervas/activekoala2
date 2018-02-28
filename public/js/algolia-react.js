const search = instantsearch({
  appId: '3KQ06K58YX',
  apiKey: '80d218319a48ee3c622fd10bcebad2e1',
  indexName: 'ActiveCoala-Schools',
  urlSync: true
});

search.addWidget(
    instantsearch.widgets.hits({
      container: '#hits',
      templates: {
        empty: 'No results',
        item: '<em>Hit {{"{{objectID}}" }}</em>: {{{_highlightResult.name.value}}}'
      }
    })
  );

search.start();