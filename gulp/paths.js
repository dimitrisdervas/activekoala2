'use strict';
var schools = {};

schools.collection: 'content/schools/nunjuckrenser';
schools.csv       : 'data/schools';
schools.template  : '_gulp-templates/nunjucks/schools.html';

module.exports = schools;

var categories = {};

categories.collection: 'content/categories';
categories.csv       : '_data/categories';
categories.template  : '_gulp-templates/nunjucks/categories.hbs';

module.exports = schools;

