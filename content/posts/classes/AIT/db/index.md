---
title: "async programming and db"
date: 2024-02-23T22:10:11-04:00
showToc: true # 显示目录
TocOpen: true # 自动展开目录
draft: false
cover:
  image:
tags:
  - "AIT"
---

## Promise centered async programing

众所周知，async function都是async的（说了句废话）。但是当我们想要处理async的dependency的时候怎么办呢？

比较以下的两个实现：

```js
function delayedShout(s) {
  // ~1.5 to ~3.5 seconds
  const delay = 1000 + Math.random() * 2000;
  setTimeout(() => {
    const shout = `${s.toUpperCase()}!!!`;
    console.log(shout);
  }, delay);
}
cb();
```

```js
function delayedShout(s, cb) {
  // ~1.5 to ~3.5 seconds
  const delay = 1000 + Math.random() * 2000;
  setTimeout(() => {
    const shout = `${s.toUpperCase()}!!!`;
    console.log(shout);
    cb();
  }, delay);
}

console.log("before");
delayedShout("foo", () => console.log("after"));
```

二是： `cb()`一定会在shout之后出手。所以output必定是： `before FOO!!! after`.

一是：`cb()`就不清楚了。因为是async。

对于trycatch block，how does it manage?

```c
console.log('before');
try {
  delayedShout('', () => console.log('after'));
} catch(e) {
  console.log(e);
}
```

ans: try catch executes first，如果有error，首先打印的是error，然后是delayedShout后面的内容。

但是如果我们再加一个callback来确保顺序的话，这个function就太大了。

我们引入Promise的机制：

### A promise is:

因为我们想要处理async function的时候总是会引入callback的机制，但是promise的出现，可以让我们对callback进行一个模板的创造，之后我们只要把callback pass 进去就行了。

感性思考的话: 就是一个async function。

理性思考的话：一个promise有以下几种状态

- pending - the task hasn't been completed yet (still getting a url, reading a file, etc.)
- fulfilled - the task has completed successfully
- rejected - the task did not complete successfully (error state)

Promise **constructor**:

- it has one parameter, a function called the executor （用来立即执行的function）
- the executor has two parameters:
- a function to call if the task succeeded (fulfill)
- a function to call if the task failed (reject)
- both of these functions have a single argument

```js
const p = new Promise(function (fulfill, reject) {
  // do something async
  if (asyncTaskCompletedSuccessfully) {
    fulfill("Success!");
  } else {
    reject("Failure!");
  }
});
```

fulfill只会在contructor被返回的时候再运行，因此begin和end先被打印。

```js
const p1 = new Promise(function (fulfill, reject) {
  console.log("begin");
  fulfill("succeeded");
  console.log("end");
});
p1.then(console.log);
```

这里执行`p2.then(console.log)`的顺序是这样的：

1. p1的promise先执行，print1.
2. p2的promise再执行，这个fulfill相当于是console.log()， 所以print2.

如果second argument（then的）被pass in。那么他变成promise中的reject。

```js
const p = new Promise(function (fulfill, reject) {
  reject("did not work!");
});

p.then(console.log, function (val) {
  console.log("ERROR", val);
});

// 和上面的一样的作用。
// p.catch(function(val) {
//     console.log('ERROR', val);
// });
```

then的机制：

- if the fulfill function returns a Promise, then will return that Promise
- if the fulfill function returns a value, then will return a Promise that immediately fulfills with the return value

question：怎么执行？

```js
const p1 = new Promise(function (fulfill, reject) {
  fulfill(1);
});

const p2 = p1.then(function (val) {
  // 在p2被declare的同时，这个then里的fulfill 就开始执行了，output 1。然后这个里面的promise给了p2
  console.log(val);
  return new Promise(function (fulfill, reject) {
    fulfill(val + 1);
  });
});

// 这里的function和上面是一样的，因为如果then的fulfill return的是一个val的话，那么他就会被包成一个promise执行。
// const p2 = p1.then(function(val) {
//     console.log(val);
//     return val + 1;
// });

// p2 在这里执行fulfill（console.log）输出 2.
p2.then(console.log);
```

### Using async and await

await will wait for the Promise on the right to resolve… and the await expression will be evaluated to the value that the Promise is resolved with

- await can only be used at the top level of your code outside of a function
- … or within a function declared as async
- it allows async operations to run sequentially
  async declared functions are functions that are explicitly marked as asynchronous
- they return a promise
- they allow await to be used

```js
fetch("http://foo.bar.baz/qux.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(JSON.stringify(data));
  });

const response = await fetch("http://foo.bar.baz/qux.json");
const data = await response.json();
console.log(data);
```

## Database

我们学的是文件数据 -- Mongo db.

- key - a field name - analogous to a column in a relational database
- value - obvs, a value
- document - a single object or record in our database,
  - consists of key value pairs
  - similar to a single row in a relational database
- collection - a group of documents
  analogous to tables in relational databases


### Using MongoDB 
文件类型：

- string - an empty string or an ordered sequence characters
- numeric types - such as integer, double (float)
- boolean - true / false
- array - a list of values
- timpestamp - 64 bit value where first 32 bits are seconds since the Unix epoch
- Object ID every MongoDB object or document must have an Object ID which is unique

典中典之：
**CRUD**!?
(C)reate, (R)ead, (U)pdate, and (D)elete operations: →

```mongodb
db.[collection].insert(obj)
db.Person.insert({'first':'bob', 'last':'bob'})
db.[collection].find(queryObj)
db.Person.find({'last':'bob'})
db.Person.find() // finds all!
db.[collection].update(queryObj, queryObj)
db.Person.update({'first':'foo'}, {$set: {'last':'bar'}})
db.[collection].remove(queryObj)
db.Person.remove({'last':'bob'})

<!-- 也可以用比较符。 -->
db.Cat.find({lives: {$gt: 4}})
```

### Using MongoDB in Express
* schema - analogous to a collection
* model - the actual constructors that we use to create objects
* object - a single document

