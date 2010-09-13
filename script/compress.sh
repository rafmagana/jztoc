rm -fr ../build/jztoc.js
rm -fr ../build/jstoc.tmp.js
rm -fr ../build/jstoc.min.js
cat ../source/list.js ../source/grid.js  > ../build/jstoc.tmp.js
java -jar ../libraries/yuicompressor-2.4.2.jar ../build/jstoc.tmp.js -o ../build/jstoc.min.js
cat ../MIT-LICENSE.header.txt ../build/jstoc.min.js  > ../build/jstoc.js
rm -fr ../build/jstoc.tmp.js
rm -fr ../build/jstoc.min.js

  