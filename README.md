balmung-optimizer-cli
=====================

### install

```
npm install -g balmung-optimizer-cli
```

### How to use
```
$ Usage: balmung-cli <src> [options]

  Options:

    -h, --help                 output usage information
    -V, --version              output the version number
    -d, --dst <dst>            output directory path default is 'dst'
    -s, --settings <settings>  setting json path
```
###example

### basic
```
$ cd example
$ balmung-cli images -d dest
```
### load [config json](http://hakashun.github.io/balmung-optimizer-cli/sample/config.json)
```
$ cd example
$ balmung-cli images -s http://hakashun.github.io/balmung-optimizer-cli/sample/config.json
```
