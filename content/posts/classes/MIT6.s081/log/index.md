---
title: "6.s081 log"
date: 2024-01-09T22:10:11-04:00
showToc: true # 显示目录
TocOpen: true # 自动展开目录
draft: false 
cover:
    image: classes/6.s081/1.png
tags: 
- "6.s081"
---

### *2024/01/10 凌晨1点 -- 旅途的开始~*

从寒假一开始一直在照顾朋友和玩，一直没心思干些正事，不过想了想从暑假开始好像就一直在给自己上压力，还是好好休整一段时间（半个月大概）吧。不过最近突然又想做做有关操作系统的学习了。一是感觉没有新知识的输入感觉就很不爽，二是下个学期就要开始学了，walfish的os课还是相当heavy的。

前段日子一直在肝星铁，真的是做的不错的游戏，直接给爷干沉迷了。明日就要出发去爬雪山了，在上学期就兜兜转转想要把这门课的实验写了但是还是都花时间在体系结构上了，虽然我的61c还是没有跟完，但是自己也跟着nyu的课造了些最基础的轮子，之后有空再把61c的lab给刷了吧。我想寒假后半段（1.13 - 1.22）是一个绝好的时机开始学习6.s081。稍微有点担心的是debug的事情，cs61c的很多课因为没有合理的debug方式我都是头铁一步一步看过去的，没有用gdb这种软件，不过据说很多blog都写了一些debug的手法和思路。我觉得自己经历过了思考之后不要头铁，尤其是在这种没有助教的情况下，自己能看懂并且自己手写一遍就可以变强，但是不要懒。**懒**才是最傻逼的，而不是看别人的代码。

我的学法大概是：

**目的**：把所有11个lab写完。

**方法**：第一次自己写，跑不动自己先想，然后debug，前三步不停轮回几遍，实在不行就看题解。看完题解后自己还是白纸状态写一遍，写完跑不动再看题解。

**心态**：快速实践，快速失败，踏实的思考。

想的是目前先用6.s081的知识来拓宽自己的眼界，之后掌握正确的debug手法之后就可以自己在下学期独立0学好os和cs162了，数据库的事情之后再说吧，不急。现在先火速开始6.s081吧，事不宜迟。

## 1/15 
今日发生了一些小冲突，就看了lec1
一些感悟：

* 重要的是内心得有这个清晰的想法 -- 自己写的所有c代码也都是instruction被存在了内存里。很多魔法操作（比如fork就是把一模一样的instruction load进新的physical mm space里）。

* shell也不过是一串instruction，深刻理解到了shell也不过是一个user app的事实 -- 我们若是直接在其中调用exec那会直接覆盖了内存空间，于是shell就会消失， 所以我们才先fork再exec。

* shell中的redirect很神奇是吧。也只不过是把原本（fd = 1）的stdout换成了要输入的文件，然后echo程序做的事情也就是把fd0 不断地写东西

echo.c 
``` c
int
main(int argc, char *argv[])
{
  int i;

  for(i = 1; i < argc; i++){
    write(1, argv[i], strlen(argv[i]));
    if(i + 1 < argc){
      write(1, " ", 1);
    } else {
      write(1, "\n", 1);
    }
  }
  exit(0);
}

 ```
这里就是不断地从cmdline 除了echo之外的字符串开始写入到fd为1的bytestream中。

明日打算把lab0写了。

## 1/16 
pipe syscall的作用是创建两个fd，一个头用来读一个用来写。

```c 


#include "kernel/types.h"
#include "user/user.h"

// pipe2.c: communication between two processes

int
main()
{
  int n, pid;
  int fds[2];
  char buf[100];
  
  // create a pipe, with two FDs in fds[0], fds[1].
  pipe(fds);

  pid = fork();
  if (pid == 0) {
    write(fds[1] , "this is pipe2\n", 14);
  } else {
    n = read(fds[0], buf, sizeof(buf));
    write(1, buf, n);
  }

  exit(0);
}
 ```

我们常识的认知是读与写是分开的，但实际上是一个fifo的循环队列，若是父子进程同时读写，先后次序便不是固定的。

因此在写pingpong的时候，最好的方法是创建两个管道。

父 write --------> pipe1 -------> read 子
子 write --------> pipe2 -------> read 父

子进程通过复制父进程的fd table来得到已经在父进程实现的管道。
![Alt text](image-1.png)

我一开始粗浅的认识以为pipe如果一方先读了另一方后写怎么办？难道不会写入一些奇怪的数据吗？答案是：linux中循环队列的实现确保了读指针永远不会超过写指针。如果“read 1 byte”先在进程A中发生了，那么他会等待另一端的write进入，这样永远可以保证每一个byte都是一个一个传进去的。