=== The album carousel widget solution

The solutuion has been implemented as requested.

There are 2 index files:
1.   index_hardcoded.html - this one has the input data harcoded into the js, BUT the JS script parses it and converts it to HTML markup, this has an issue, the first time the file is loaded the JS that parses it comes a little late and breaks the gallery so a refresh is needed.
2.   index_with_markup.html - this one is the file that has the parsed input data already so all code comes from HTML so no reload needed.

The script is coded as a Plug-In:

*   $('#my-gallery').fresh_gallery();

There is a lot that can be improved but I think it works nice, I was trying to make it work with multiple galleries in one page (a little complicated) but I decided to go back to the single gallery so there are some traces of this approach.

I left a js file:
	
*   carousel-old-implementation.js

so you can see the first approach on the solution.

A lot of nice and fancy effects :D

== Issues
ie9 bug is fixed now :D
