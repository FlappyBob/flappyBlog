---
title: "HTTP"
date: 2024-01-23T22:10:11-04:00
showToc: true # 显示目录
TocOpen: true # 自动展开目录
draft: false 
cover:
    image: 
tags: 
- "AIT"
---

## HTTP

**ip address** - number given to a computer / device on a network

**port** - a number given to a communication end point that usually represents some specific service… **allowing multiple services to be run on the same device**

**socket** - an endpoint to a connection… so there are two sockets per connection, but in network programming apis, a socket object is typically the object that mediates communication (reads/writes) to a connected client or server

**localhost** - 127.0.0.1 when used as the domain name in nc, your browser, etc. … the connection is made from your computer to a service running on itself.

**URL**. URL is representation form of **domain**.

`http://pizzaforyou.com:80/search?type=vegan#top_result`

**DNS**. domain -----DNS------> IP address.

### **http**。

本质是一个协议（text-based），user 通过 application（要记住，这些本质到最后都是电脑上的二进制码，最后是和 iodevice 相接的）通过协议的标准传输需求（request），通过 http 的规则/协议，服务器（也是二进制码，只不过是另外一个程序）发送 response 回到 user 端，也就是 application。

细节：

1. the browser attempts to connect to the address of the server

2. if the server is listening and reachable, a TCP connection is made between the server and the client on port 80 (the default port for HTTP traffic)

3. the browser sends a request message

4. on the same connection, the web server gives back a response message

Request 结构：
**a request line： a request method and a path**- `GET /teaching HTTP/1.1`

Request Methods: GET/ POST 这种。

**request headers** `Host: jvers.com`, `User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:12.0) Gecko/20100101`

**an empty line**

**an optional body**

[note] that a new line is represented by a carriage return, line feed: `\r\n`

Response 结构：
1. **status-line： status code and reason** - `HTTP/1.1 200 OK`
* 1xx - Informational, request received

* 2xx - Success, request was received, understood and accepted

* 3xx - Redirection, additional action must be taken to complete request

* 4xx - Client Error

* 5xx - Server Error

2. **response header fields** - **Content-Type: **text/html\***\*

3. **an empty line\*\*

4. **an optional message body** - usually an HTML document!

[note] that a new line is represented by a carriage return, line feed: `\r\n`

```sh
# request
GET /teaching/ HTTP/1.1
Host: jvers.com
Connection: keep-alive
Cache-Control: max-age=0
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36
Accept-Language: en-US,en;q=0.8

# response
HTTP/1.1 200 OK
Date: Thu, 18 Feb 2016 15:23:39 GMT
Server: Apache/2.2.15 (Red Hat)
Accept-Ranges: bytes
Content-Length: 163
Content-Type: text/html; charset=UTF-8
Set-Cookie: STATICSERVERID=s3; path=/
Cache-control: private

<h2>Check out my fancy header!</h2>
```

### tools

**Note that the above examples all use GET as the http method**

```sh
nc cs.nyu.edu 80
# then type
GET / HTTP/1.1
Host: cs.nyu.edu

# get the response headers for google.com only
curl -I google.com

# get the response headers for www.google.com only
curl -I www.google.com

# get the body only
curl www.google.com

# get the entire response (headers and body)
curl -i www.google.com
```

**交互小栗子**：

```js
import net from "net";
const HOST = "127.0.0.1";
const PORT = 8080;

const server = net.createServer((sock) => {
  console.log(`got connection from ${sock.remoteAddress}:${sock.remotePort}`);
});

server.listen(PORT, HOST);
```

run node myFile.js in one window. (这是 server)

然后你再用 nc 或者是 google 这种 browser 来发送 connnection（具体的背后的 implementation 细节我们不用管）然后你就会发现自己的服务器有响应了。

背后：

nc (application) ---whatever request---> server

nc (application) <---whatever response--- server

现在我们正要写的是：**server 端代码**（有人帮我们搭好了框架（js 里面的库，甚至 js 的库都被再次包装了已一遍成了 express 这种），然后 js compiler 编译成和 iodevice 交互的机器码，而我们只需要知道业务逻辑就行了）例如：如何接受 request？怎么处理 request 中的 header？发送什么 data 包装成 response 搞回去？

好的，让我们来了解怎么使用 js 的框架。

```js
import net from "net";
const HOST = "127.0.0.1";
const PORT = 8080;

// server object can be bound to a port and address
const server = net.createServer((sock) => {
  console.log(`got connection from ${sock.remoteAddress}:${sock.remotePort}`);
});

// start listening for client connections
// this tells the server to start accepting connections on the supplied port and hostname
server.listen(PORT, HOST);
```

```js
// setup above
const server = net.createServer((sock) => {
  // 这是库里定义的，当'data' event 被唤醒，这个event怎么handle。
  sock.on("data", (binaryData) => {
    console.log(`got data\n=====\n${binaryData}`);
    // 这是echo
    sock.write("binaryData");
  });

  sock.on("close", (data) => {
    console.log(`closed - ${sock.remoteAddress}:${sock.remotePort}`);
    sock.end("goodbye");
  });
});
```

我们可以使用一个简单的 class 来 parse 用户的 method。

```js
class Request {
  constructor(s) {
    const requestParts = s.split(" ");
    const path = requestParts[1];
    this.path = path;
  }
}

// inside socket
const server = net.createServer((sock) => {
  // 这是库里定义的，当'data' event 被唤醒，这个event怎么handle。

  console.log("connected", sock.remoteAddress, sock.remotePort);
  sock.write("connected ... write data plz\r\n");
  sock.on("data", (binaryData) => {
    const reqString = "" + binaryData;
    const req = new Request(reqString);
    if (req.path === "/about") {
      sock.write(
        "HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\n<h2>hello</h2>"
      );
    } else if (req.path === "/test") {
      sock.write(
        "HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\n<h2>test</h2>"
      );
    }
    sock.end("goodbye.. disconnecting...");
  });
});
```

js，包括其他非js库封装好的函数都会有handle error的功能，比如说再sock.end()之后写就会报错等等，这些都是要慢慢阅读menual积累经验的，而不像c一样裸露在外。

还有nc这个软件，写入的规则就必须是<arg1> <arg2> <arg3>，缺一个少一个都是无效的，背后帮你handle error好了，但是表面上是什么都不显示的。

这就是一个简单的intro。