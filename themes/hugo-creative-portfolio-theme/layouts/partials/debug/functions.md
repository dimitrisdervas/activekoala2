[Functions Quick Reference](https://gohugo.io/functions/)
---------------------------------------------------------

[Array vs Slice vs Map](http://donofden.com/blog/2019/09/20/golang-array-slice-map) ARRAYS Arrays hold collections of values that all share the same type. Index start with 0 SLICE A slice is like an array which is a container to hold elements of the same data type but slice can vary in size. slice is a composite data type and because it is composed of primitive data type. slice is a reference to an array. (slice when needed to store more data, creates a new array of appropriate length behind the scene to accommodate more data.) MAP We can use any type in map index, Whereas arrays and slices can only use integers as indexes, a map can use any type for a keys (As long as values of that type can be compared using ==). The values & Keys all have to be of same type. But keys and values dont have to be the same type.

Strings
-------

[.RenderString](https://gohugo.io/functions/renderstring/)Renders markup to HTML.

[strings.Repeat](https://gohugo.io/functions/strings.repeat/)Returns INPUT repeated COUNT times.

[anchorize](https://gohugo.io/functions/anchorize/)Takes a string and sanitizes it the same way as Blackfriday does for markdown headers.

REPLACE
-------

[replace](https://gohugo.io/functions/replace/)Replaces all occurrences of the search string with the replacement string.
        {{ replace .Title "a" "w" }}

SPLIT
-----

[split](https://gohugo.io/functions/split/)splits a string into substrings separated by a delimiter

Slice
-----

[slicestr](https://gohugo.io/functions/slice/)Creates a slice of a half-open range, including start and end indices.

Shuffle
-------

[shuffle](https://gohugo.io/functions/shuffle/)Returns a random permutation of a given array or slice.

HTML
----

[plainify](https://gohugo.io/functions/plainify/)Strips any HTML and returns the plain text version of the provided string.

Check
-----

[hasPrefix](https://gohugo.io/functions/hasprefix/)Tests whether a string begins with prefix.

COUNT
-----

[countwords](https://gohugo.io/functions/countwords/)Counts the number of words in a string.

Strings
-------

[string](https://gohugo.io/functions/string/) Creates a string from the argument passed to the function

[strings.Count](https://gohugo.io/functions/strings.count/) Returns the number of non-overlapping instances of a substring within a string.

[strings.HasSuffix](https://gohugo.io/functions/strings.hassuffix/) Determine whether or not a given string ends with the provided trailing suffix string.

[strings.Repeat](https://gohugo.io/functions/strings.repeat/) Returns INPUT repeated COUNT times.

TRIM
----

[trim](https://gohugo.io/functions/trim/) Returns a slice of a passed string with all leading and trailing characters from cutset removed.

[strings.TrimLeft](https://gohugo.io/functions/strings.trimleft/) Returns a slice of a given string with all leading characters contained in the cutset removed.

[strings.TrimPrefix](https://gohugo.io/functions/strings.trimprefix/) Returns a given string s without the provided leading prefix string. If s doesn’t start with prefix, s is returned unchanged.

[strings.TrimRight](https://gohugo.io/functions/strings.trimright/) Returns a slice of a given string with all trailing characters contained in the cutset removed.

[strings.TrimSuffix](https://gohugo.io/functions/strings.trimsuffix/) Returns a given string s without the provided trailing suffix string. If s doesn’t end with suffix, s is returned unchanged.

[substr](https://gohugo.io/functions/substr/)Extracts parts of a string from a specified character’s position and returns the specified number of characters.

Text
----

[truncate](https://gohugo.io/functions/truncate/) Truncates a text to a max length without cutting words or leaving unclosed HTML tags. 

{{ .Title | truncate 5 }}



Apperance uppercase
-------------------

[upper](https://gohugo.io/functions/upper/) Converts all characters in a string to uppercase

[lower](https://gohugo.io/functions/lower/) Converts all characters in the provided string to lowercase.

[pluralize](https://gohugo.io/functions/pluralize/)Pluralizes the given word according to a set of common English pluralization rules

[singularize](https://gohugo.io/functions/singularize/)Converts a word according to a set of common English singularization rules.

[title](https://gohugo.io/functions/title/)Converts all characters in the provided string to title case.

[chomp](https://gohugo.io/functions/chomp/)Removes any trailing newline characters.

RUNES
-----

[strings.RuneCount](https://gohugo.io/functions/strings.runecount/) Determines the number of runes in a string. Runes = runic alphabets before latin alphabet

[countrunes](https://gohugo.io/functions/countrunes/)Determines the number of runes in a string excluding any whitespace.

strings to NUMBERS
------------------

[int - Integer](https://gohugo.io/functions/int/) Creates an int from the argument passed into the function.Useful for turning strings into numbers.

[float - FLOAT NUMBER](https://gohugo.io/functions/float/)Creates a float from the argument passed into the function. [Float numbers](https://floating-point-gui.de/formats/fp/)

[lang.NumFmt](https://gohugo.io/functions/numfmt/)Formats a number with a given precision using the requested , , and options. The parameter is a string consisting of .

Create - Print Strings
----------------------

[print](https://gohugo.io/functions/print/)Prints the default representation of the given arguments using the standard function.

[printf](https://gohugo.io/functions/printf/)Formats a string using the standard function.

[println](https://gohugo.io/functions/println/)Prints the default representation of the given argument using the standard function and enforces a linebreak.

String for URl
--------------

[querify](https://gohugo.io/functions/querify/)Takes a set of key-value pairs and returns a query string to be appended to URLs.

MAP
---

Sort
----

[sort](https://gohugo.io/functions/sort/)

Group
-----

[group](https://gohugo.io/functions/group/)groups a list of pages.

TWO ARRAYS
----------

[symdiff - Differences](https://gohugo.io/functions/symdiff/)(alias ) returns the symmetric difference of two collections.

[complement - Values are not in any](https://gohugo.io/functions/complement/)(alias ) gives the elements of a collection that are not in any of the others.

[merge - Merge all values](https://gohugo.io/functions/merge/)deep merges two maps and returns the resulting map.

[union - Unite common](https://gohugo.io/functions/union/)Given two arrays or slices, returns a new array that contains the elements or objects that belong to either or both arrays/slices.

[uniq - UNIQUE](https://gohugo.io/functions/uniq/)Takes in a slice or array and returns a slice with subsequent duplicate elements removed.

[intersect - Common Elements](https://gohugo.io/functions/intersect/)Returns the common elements of two arrays or slices.

Apply fuction
-------------

[apply](https://gohugo.io/functions/apply/)Given a map, array, or slice, returns a new slice with a function applied over it.

Manipulate
----------

[after](https://gohugo.io/functions/after/)slices an array to only the items after the Nth item.

[append](https://gohugo.io/functions/append/)appends one or more values to a slice and returns the resulting slice.

Slice
-----

[first](https://gohugo.io/functions/first/)Slices an array to only the first elements.

[last](https://gohugo.io/functions/last/)slices an array to only the last Nth elements.

[slice](https://gohugo.io/functions/slice/)Creates a slice (array) of all passed arguments.

Iterate
-------

[range](https://gohugo.io/functions/range/)Iterates over a map, array, or slice.

[with](https://gohugo.io/functions/with/)Rebinds the context (.) within its scope and skips the block if the variable is absent or empty.

[delimit - to String](https://gohugo.io/functions/delimit/)Loops through any array, slice, or map and returns a string of all the values separated by a delimiter.

Filters
-------

[where](https://gohugo.io/functions/where/)Filters an array to only the elements containing a matching value for a given field.

[index - Index the keys](https://gohugo.io/functions/index-function/)Looks up the index(es) or key(s) of the data structure passed into it.

Create MAP ARRAY
----------------

[seq](https://gohugo.io/functions/seq/) Creates a sequence of integers.

[transform.Unmarshal](https://gohugo.io/functions/transform.unmarshal/)(alias ) parses the input and converts it into a map or an array. Supported formats are JSON, TOML, YAML and CSV.

[dict - Dictionary](https://gohugo.io/functions/dict/)Creates a dictionary from a list of key and value pairs.

Check Values
------------

[reflect.IsMap](https://gohugo.io/functions/reflect.ismap/)Reports if a value is a map.

[reflect.IsSlice](https://gohugo.io/functions/reflect.isslice/)Reports if a value is a slice.

Path
----

[path.Base](https://gohugo.io/functions/path.base/)Base returns the last element of a path.

[path.Dir](https://gohugo.io/functions/path.dir/)Dir returns all but the last element of a path.

[path.Ext](https://gohugo.io/functions/path.ext/)Ext returns the file name extension of a path.

[path.Join](https://gohugo.io/functions/path.join/)Join path elements into a single path.

[path.Split](https://gohugo.io/functions/path.split/)Split path immediately following the final slash.

Get Params or Pages
-------------------

[.Get](https://gohugo.io/functions/get/)Accesses positional and ordered parameters in shortcode declaration.

[.GetPage](https://gohugo.io/functions/getpage/)Gets a of a given .

Conditionals
------------

[ge - great or equal](https://gohugo.io/functions/ge/)Returns the boolean truth of arg1 >= arg2.

[gt - greater](https://gohugo.io/functions/gt/) Returns the boolean truth of arg1 > arg2.

[le - lower or equal](https://gohugo.io/functions/le/) Returns the boolean truth of arg1 <= arg2.

[lt - lower](https://gohugo.io/functions/lt/)Returns the boolean truth of arg1 < arg2.

[ne - negative](https://gohugo.io/functions/ne/)Returns the boolean truth of arg1 != arg2.

[eq](https://gohugo.io/functions/eq/)Returns the boolean truth of arg1 == arg2.

[in](https://gohugo.io/functions/in/)Checks if an element is in an array or slice–or a substring in a string—and returns a boolean.

[isset](https://gohugo.io/functions/isset/)Returns true if the parameter is set.

Variables
---------

[.Param](https://gohugo.io/functions/param/)Calls page or site variables into your template.

[.Render](https://gohugo.io/functions/render/)Takes a view to apply when rendering content.

[.Scratch](https://gohugo.io/functions/scratch/)Acts as a “scratchpad” to allow for writable page- or shortcode-scoped variables.

[echoParam](https://gohugo.io/functions/echoparam/)Prints a parameter if it is set.

[len](https://gohugo.io/functions/len/)Returns the length of a variable according to its type.

Time
----

[.Unix](https://gohugo.io/functions/unix/).Unix returns the local Time corresponding to the given Unix time, sec seconds and nsec nanoseconds since January 1, 1970 UTC.

[dateFormat](https://gohugo.io/functions/dateformat/)Converts the textual representation of the into the specified format.

[.AddDate](https://gohugo.io/functions/adddate/)Returns the time corresponding to adding the given number of years, months, and days passed to the function.

[.Format](https://gohugo.io/functions/format/)Formats built-in Hugo dates—, , and —according to Go’s layout string.

[time](https://gohugo.io/functions/time/)

URL
---

[absLangURL](https://gohugo.io/functions/abslangurl/)Adds the absolute URL with correct language prefix according to site configuration for multilingual.

[absURL](https://gohugo.io/functions/absurl/)Creates an absolute URL based on the configured baseURL.

[urls.Parse](https://gohugo.io/functions/urls.parse/)Parse parses a given url, which may be relative or absolute, into a URL structure.

[relLangURL](https://gohugo.io/functions/rellangurl/) [relref](https://gohugo.io/functions/relref/) [relURL](https://gohugo.io/functions/relurl/) urlize [](https://gohugo.io/functions/urlize/)urls.Parse [](https://gohugo.io/functions/urls.parse/)absLangURL [](https://gohugo.io/functions/abslangurl/)absURL [](https://gohugo.io/functions/absurl/)querify[](https://gohugo.io/functions/querify/)

IF
--

[findRE](https://gohugo.io/functions/findre/)Returns a list of strings that match the regular expression.

Translation
-----------

[i18n](https://gohugo.io/functions/i18n/)Translates a piece of content based on your i18n configuration files.

[lang.Merge](https://gohugo.io/functions/lang.merge/)Merge missing translations from other languages.

Images
------

[Image Functions](https://gohugo.io/functions/images/)The images namespace provides a list of filters and other image related functions.

Text
----

[lower](https://gohugo.io/functions/lower/)Converts all characters in the provided string to lowercase.

[markdownify](https://gohugo.io/functions/markdownify/)Runs the provided string through the Markdown processor.

Math
----

[Math](https://gohugo.io/functions/math/)Hugo provides nine mathematical operators in templates.

Time
----

[now](https://gohugo.io/functions/now/)Returns the current local time

[partialCached](https://gohugo.io/functions/partialcached/)Allows for caching of partials that do not need to be re-rendered on every invocation.

[plainify](https://gohugo.io/functions/plainify/)Strips any HTML and returns the plain text version of the provided string.

[pluralize](https://gohugo.io/functions/pluralize/)Pluralizes the given word according to a set of common English pluralization rules

Directories - FILES
-------------------

[readDir](https://gohugo.io/functions/readdir/)Gets a directory listing from a directory relative to the current working directory.

[readFile](https://gohugo.io/functions/readfile/)Reads a file from disk relative to the current project working directory and returns a string.

[os.Stat](https://gohugo.io/functions/os.stat/)Gets a file information of a given path.

[fileExists](https://gohugo.io/functions/fileexists/)Checks whether a file exists under the given path.

findRE[](https://gohugo.io/functions/findre/)

Links
-----

[ref](https://gohugo.io/functions/ref/)Returns the absolute permalink to a page.

[relLangURL](https://gohugo.io/functions/rellangurl/)Adds the relative URL with correct language prefix according to site configuration for multilingual.

[relref](https://gohugo.io/functions/relref/)Returns the relative permalink to a page.

[relURL](https://gohugo.io/functions/relurl/)Creates a baseURL-relative URL.

Replace
-------

[replace](https://gohugo.io/functions/replace/)Replaces all occurrences of the search string with the replacement string.

[replaceRE](https://gohugo.io/functions/replacere/)Replaces all occurrences of a regular expression with the replacement pattern.

HTML,CSS, JS, JSON
------------------

[highlight](https://gohugo.io/functions/highlight/)Takes a string of code and language declaration and uses Chroma to return syntax-highlighted HTML.

[htmlEscape](https://gohugo.io/functions/htmlescape/)Returns the given string with the reserved HTML codes escaped.

[htmlUnescape](https://gohugo.io/functions/htmlunescape/)Returns the given string with HTML escape codes un-escaped.

[humanize](https://gohugo.io/functions/humanize/)Returns the humanized version of an argument with the first letter capitalized.

[jsonify](https://gohugo.io/functions/jsonify/)Encodes a given object to JSON.

safeCSS [](https://gohugo.io/functions/safecss/)safeHTML [](https://gohugo.io/functions/safehtml/)safeHTMLAttr [](https://gohugo.io/functions/safehtmlattr/)safeJS [](https://gohugo.io/functions/safejs/)safeURL[](https://gohugo.io/functions/safeurl/)

Menu
----

[.HasMenuCurrent](https://gohugo.io/functions/hasmenucurrent/).HasMenuCurrent is a method in Page object returning a boolean value. It returns true if the PAGE is the same object as the .Page in one of the children menu entries under MENUENTRY in a given MENU. You can find its example use in menu templates.

[.IsMenuCurrent](https://gohugo.io/functions/ismenucurrent/).IsMenuCurrent is a method in Page object returning a boolean value. It returns true if the PAGE is the same object as the .Page in MENUENTRY in a given MENU. You can find its example use in menu templates.

Partial
-------

partialCached[](https://gohugo.io/functions/partialcached/)

HUGO, SITE
----------

[getenv](https://gohugo.io/functions/getenv/)Returns the value of an environment variable.

[hugo](https://gohugo.io/functions/hugo/)The function provides easy access to Hugo-related data.

[site](https://gohugo.io/functions/site/)The function provides global access the same data as page method

[.AddDate](https://gohugo.io/functions/adddate/) [.Format](https://gohugo.io/functions/format/) [.Render](https://gohugo.io/functions/render/) [.RenderString](https://gohugo.io/functions/renderstring/) [.Scratch](https://gohugo.io/functions/scratch/) [.Unix](https://gohugo.io/functions/unix/)

SECURITY \_ HASH
----------------

[sha - Secure Hash Algorithm](https://gohugo.io/functions/sha/) Hashes the given input and returns either an SHA1 or SHA256 checksum.

[md5](https://gohugo.io/functions/md5/)hashes the given input and returns its MD5 checksum.

To CONSIDER
-----------

[templates.Exists](https://gohugo.io/functions/templates.exists/)Checks whether a template file exists under the given path relative to the directory.

[errorf and warnf](https://gohugo.io/functions/errorf/)Log ERROR or WARNING from the templates.

[cond](https://gohugo.io/functions/cond/)Return one of two arguments, depending on the value of a third argument.

[hmac](https://gohugo.io/functions/hmac/)Compute the cryptographic checksum of a message.

[base64](https://gohugo.io/functions/base64/)and let you easily decode content with a base64 encoding and vice versa through pipes.

[chomp](https://gohugo.io/functions/chomp/)Removes any trailing newline characters.

[default](https://gohugo.io/functions/default/)Allows setting a default value that can be returned if a first value is not set.

[emojify](https://gohugo.io/functions/emojify/)Runs a string through the Emoji emoticons processor.

[echoParam](https://gohugo.io/functions/echoparam/)