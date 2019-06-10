<a href="https://luehangs.site"><img src="https://luehangs.site/images/lh-blog-strip.jpg" alt="LueHsoft"/></a>
<br/>
<br/>

<h1 align="center">
    Node Delete Partial
</h1>

An easy and simple to use Node module to efficiently remove the first X number of lines from an inputstream. It uses streams, which means it doesn't need to load whole files in memory, so it is way more efficient and fast, as well can work on very large files without filling memory on the hardware.

<br/>
<br/>
<br/>

---
<br/>
<br/>
<br/>

# :open_file_folder: Index

### 1.  [Install](#gem-install)
### 2.  [Large File Usage Example](#tada-large-file-usage-example)
### 3.  [Small File Usage Example](#tada-small-file-usage-example)
### 4.  [API](#nut_and_bolt-api)
### 5.  [Author](#santa-author)
### 6.  [Contribute](#clap-contribute)
### 7.  [License](#page_facing_up-license)

<br/>
<br/>
<br/>

---
<br/>
<br/>
<br/>

## :gem: Install

Type in the following to the command line to install the dependency.

```bash
$ npm install --save node-delete-partial
```

or

```bash
$ yarn add node-delete-partial
```

<br/>
<br/>
<a href="https://luehangs.site"><img src="https://luehangs.site/images/lh-blog-strip.jpg" alt="LueHsoft"/></a>
<br/>
<br/>

## :tada: Large File Usage Example

```javascript
"use strict";

var { deletePartialStream } = require('node-delete-partial');

var fs = require('fs');

var input = fs.createReadStream(__dirname + '/input.txt');
var output = fs.createWriteStream(__dirname + '/output.txt');

input
    // delete 5 lines from beginning of file
    .pipe(deletePartialStream(5))
    .pipe(output);
```

<br/>
<br/>
<br/>

---
<br/>
<br/>
<br/>

## :tada: Small File Usage Example

```javascript
"use strict";

var { deletePartial } = require('node-delete-partial');

var filePath = __dirname + '/file.txt';

deletePartial(filePath, { lines: 5 });
```

<br/>
<br/>
<br/>

---
<br/>
<br/>
<br/>

## :nut_and_bolt: API

<br/>

### :large_blue_diamond: ``deletePartialStream(options)``

<br/>

#### Parameters:

Name | Type | Required | Description
------ | ------ | ------ | ------
options | number | NO | See below.

Valid options keys are:

- "lines" (number) - From beginning of file, the number of lines to delete. Default is `1`.

<br/>

### :large_blue_diamond: ``deletePartial(filePath, options)``

<br/>

#### Parameters:

Name | Type | Required | Description
------ | ------ | ------ | ------
filePath | number | YES | File to delete from and update.
options | number | NO | See below.

Valid options keys are:

- "lines" (number) - From beginning of file, the number of lines to delete. Default is `1`.

<br/>
<br/>
<br/>

---
<br/>
<br/>
<br/>

## :santa: Author

<a href="https://www.facebook.com/lue.hang">
<img src="https://www.luehangs.site/images/lue-hang2018-circle-150px.png"/>
</a>

Free and made possible along with costly maintenance and updates by [Lue Hang](https://www.facebook.com/lue.hang) (the author).

<br/>
<br/>
<br/>

---
<br/>
<br/>
<br/>

## :clap: Contribute

[Pull requests](https://github.com/Luehang/node-delete-partial/pulls) are welcomed.

<br/>

### :tophat: Contributors

Contributors will be posted here.

<br/>

### :baby: Beginners

Not sure where to start, or a beginner? Take a look at the [issues page](https://github.com/Luehang/node-delete-partial/issues).

<br/>
<br/>
<a href="https://luehangs.site"><img src="https://luehangs.site/images/lh-blog-strip.jpg" alt="LueHsoft"/></a>
<br/>
<br/>

## :page_facing_up: License

MIT © [Lue Hang](https://luehangs.site), as found in the LICENSE file.
