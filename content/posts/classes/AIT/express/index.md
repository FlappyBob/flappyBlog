---
title: "Express Intro"
date: 2024-02-23T22:10:11-04:00
showToc: true # 显示目录
TocOpen: true # 自动展开目录
draft: false 
cover:
    image: 
tags:   
- "AIT"
---

# Intro to Create Server in http module

_Why are we interested in framework?_

`function handleRequest(req, res) { ... }`

- res: what we gonna sent back
- req: incoming message

## Response

```js
writeHead(status, headers);
end(body);
```

## Request

`if(req.url == '/') ..`

```js
import http from 'http';

http.createServer(handleRequest).listen(3000);
console.log('starting server on port 3000';

function handleRequest(req, res) {
	if(req.url == '/') {
		res.writehead(200, {'content-type':'text/plain'});
		res.end('hello');
	} else {
		res.writeHead(404, {'Content-Type':'text/plain'});
		res.end('Not Found');
	}
}
```

Serve Static, it is the "meat" of the server,.

```js
function serveStatic(res, path, contentType, resCode) {
  fs.readFile(path, function (err, data) {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("500 - Internal Error");
    } else {
      res.writeHead(resCode, { "Content-Type": contentType });
      res.end(data);
    }
  });
}
```

And finally we modifyt the handle Request with static files, it is the "direction" to the server. (we save the meat in the public files. )

```js
function handleRequest(req, res) {
  if (req.url === "/") {
    serveStatic(res, "./public/index.html", "text/html", 200);
  } else if (req.url === "/about") {
    serveStatic(res, "./public/about.html", "text/html", 200);
  }
  // remainder of function definition omitted for brevity
}
```

_Why are we interested in framework?_:
ans:

- the URLs are pretty brittle; they don't handle trailing slashes, query strings, etc. … without a lot of work
- we have to set the status code
- as well as the content-type headers
- the files are read from the disk every time (no caching)

Manual work is too much.

# Express

拿作业里的 miniserver 举例子。

```js
sendFile(absPath) {
    fs.readFile(absPath, (err, data) => {
      if (err) {
        console.log(`Cannot find the file requested \n`);
        this.status(404);
        this.send();
        return;
      }
      // check if it is markdown.
      if (getExtension(absPath) === "md") {
        // console.log("markdown invoked!\n");
        this.setHeader("Content-Type", MIME_TYPES.html);
        const markdownData = "" + data;
        const markdown = MarkdownIt({ html: true });
        const rendered = markdown.render(markdownData);
        this.send(rendered);
      } else {
        // save data's type into header
        this.setHeader("Content-Type", getMIMEType(absPath));
        this.send(data);
      }
    });
  }
```

我们如果要显示 server 中的文件得手动 mount（也就是从自己写的 root dir 里面读文件），写的时候要自己 markup err，如果成功也要自己 specifies 文件类型做映射，set header 让 browser 知道。但是 express 直接一个 static 就完事了，public 中的所有文件都直接可以 path 来得到。

文件都会被自动 route 好，如果我们要在自己写的 html 中查找直接接 specifies 文件目录也就行了。比如`res.send('<h1>dipper</h1><img src="/img/dipper.gif">');`

```js
http://localhost:3000/images/kitten.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/app.js
http://localhost:3000/images/bg.png
http://localhost:3000/hello.html
```

express 中的 send 本质就是`socket 不断地 write write .... end()`.

Function:

- templating - to keep logic out of your presentation
- routing - for mapping urls to pages/functionality
- middleware - a pipeline of functions to manipulate and work with the request and response
- database access - an abstraction layer for dealing with databases
- general project structure - a standard way for organizing your project

总之抽象了很多方便的东西，整体拉低了上层程序员的智商。

但是因为抽象，很多细节被隐藏了。
http://localhost:3000/
http://localhost:3000/faq
http://localhost:3000/faq?question=1
http://localhost:3000/faq/
http://localhost:3000/faQ
http://localhost:3000/nope
What are some differences with our previous implementation using only node's http module?

比如说 express.get()，就非常的“宽厚大度”，一些对 user 的防御措施都是 built-in。

- trailing slashes and query strings work
- case insensitive
- content type is set implicitly to text/html
- 404's built in

## Creating app

`express()` - creates a new express application

- allows for configuration
- takes on functionality of Server object in http module only example
- note that you can call some methods on it based on http verbs (request methods)

`app.VERB(path, [callback]…, callback)` - defines routes

- verb is an HTTP request method (such as get)
- maps a url to a callback (or multiple callback functions)
- path is case insensitive, can have trailing slash and query string

`res.send([body])` - send a response with body.
remark: 其实就是一个带 header 自动处理的 http send。

- if the body is a string, content type is set to text/html
- if the body is an object or an array, content type is set to application/json

`res.set()` - set a response header

remark：这是直接读了 public path 的文件目录，static files 可以直接让所有 public 中的文件 to be served.

```js
import path from "path";
import url from "url";

const basePath = path.dirname(url.fileURLToPath(import.meta.url));
const publicPath = path.resolve(basePath, "public");
app.use(express.static(publicPath));
```

## Templating

定义：
A templating engine is software/an application/a library that:

- merges one or more templates (a document with placeholders) with data to create a single complete document
- templating engines are usually built so that they are decoupled from the rest of the application that is using it

templating library called **handlebars：** which is based off of a basic templating language called mustache

- it's basically just html
- with some special tokens for inserting data

### handlebars

我们用 hbs 这个库。

hbs directory structure:
views/layout.hbs
views/index.hbs

## Middleware

定义：
A middleware is a function with access to the request object (req), the response object (res), and the next middleware in line in the request-response cycle of an Express application.

- invoked before your final request handler is
- (between the raw request and the final intended route)
- called in order that they are added

用法：
it's a function that has three parameters:

- a request object (usually req)
- a response object (usually res)
- and the next middleware function to be executed (conveniently called next)

### Express apps are just a bunch of middleware chained together and called sequentially, so **order** that middleware is included is significant

一些 middleware 规则：

- 永远记得 call next()
- order matters。

trick：

1. logging middleware:

```js
app.use(function (req, res, next) {
  console.log(req.method, req.path);
  next();
});
```

useful middleware:
`res.set(headerName, headerValue).`'

## 温故而知新 URL 是什么组成的？

- scheme/protocol - http
- domain or actual ip address - pizzaforyou.com （domain (or the ip address) is the **server** that your browser is connecting to！！）
- port (optional) - 80 (default if http)
- path - /search
- query_string (optional) - ?type=vegan
- fragment_id (optional) - #topresult

我们开发的过程最后并不是直接在我们的 server（也就是我们的电脑）上运行的，而是把自己的源码发送到一个远程的机器上，让大公司的服务器编译运行，承载流量的义务。

user -> domain -> DNS tranlate into IP -> 大公司的服务器。

## form

form 既可以用来输入查询，也可以用来 update value。

An HTML form element has the following **attributes**:

- method - the method of the request… GET or POST
  generally use **POST** for creating new (or even modifying) resources/pages/content (add, modify or delete data, for example)
  generally use **GET** for retrieving resources/pages/content (search or filter, for example)
- action - the URL that your browser will send data to

Your form's fields have the following attributes:

name - the name of the specific value you're sending over
value - (optionally) set the default value of this field

### In Your Application

To handle data in the request body, you'll need to:

**use body-parser middleware**：

- you'll need an app.get to handle requesting the original form
- and a route to handle the post (the route handling the POST can use request.body.property-name)
- you may want another route for a success page, or send back to the original form

因此，对于一个正常的 web app，一个 route 支持很多 request method 是非常正常的。

ok，server side 的 handle 方式是什么呢？

- GET - data is in the query string `req.query`
- POST - data is in the request body`req.body`
  这些在 express 中都会被 parse 好。

而在前端中：

在方法中specify清楚就行了。
```html
<form method="POST" action="/">
  Enter your name: <input type="text" name="myName" />
  <input type="submit" />
</form>
```

总结：form就是html markup，which会让user输入和输出，输出的handle方式是重新唤醒一次request（取决于怎么实现），form中顺带的query string和body都会被send到指定的route中（这也取决于怎么实现）

## hw4
debugging的小技巧：
* typeerror的出现：很有可能是自己少加了一个s或者其他的傻逼命名错误，js非常有可能发生，因为没有严格的检查。
* 要保证自己加进一个arr的类型是一样的。当我们之后对这个arr做loop的时候，要有一定的invariant，否则就会出现typeerror的问题。
* push这个method不要assign给别人。
* `const { value, emotions } = kaomoji;`注意用大括号抱起来而不是方框，永远记得object destructure。

这些都记在心里，下次用就想起来了。


## Router 
 <!--TODO  -->

