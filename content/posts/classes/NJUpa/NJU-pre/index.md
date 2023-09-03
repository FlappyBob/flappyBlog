---
title: "NJU PA Mindset"
date: 2023-08-24T23:51:11-04:00
showToc: true # 显示目录
TocOpen: true # 自动展开目录
draft: true
cover:
    image: classes/NJUpa/NJU-chap1.png
tags: 
- "NJU programming assignment"
---

## Introduction (FAQ)
Recently I found an amazing course that introduces computer system, NJU PA. 

PA focus more on the abstraction of computer system, but it is **not a typical system class** that focues too much on hardware. It focus more on a symplified version of OS. And it is very tough. It also includes friendly words from those skilled system programmer. 

**Why is this course so amazing?** (why should I take this course? )
1. It is **hard**. 
2. After grinding, **solving a hard problem on my own is gained.** Since every serious engineering problem starts with a blank piece of paper. 

> A handout? The framework code? It doesn't exist. If we don't provide handouts and framework code for you to write a NEMU that can run a sword, it will be very similar to the task you will face after graduation.
> So we design PA to beat you now, let you suffer, suffer, in the final analysis is to make you more competitive in the future job hunting, to withstand the beating of society.
> 我将来不从事系统相关的工作, 就不会那么痛苦了? ans: 就算是应用程序, 几千个模块之间通过几万个API交互的场景都是家常便饭, 复杂性是社会毒打你的第二招必杀技.

3. Building up your own knowledge system. Everything will only work when you fully understand. 

> If you don't know what you are talking about, your understanding of the knowledge is not clear enough, then you should read a book/manual

> Do not know what to do/how to do, indicating that your system view is fragmentary, can not understand the relationship between various modules in the system, at this time you should RTFSC, try your best to sort out and understand all the details of the system

> If you don't find bugs, you don't know the correct expected behavior of the program. You need RTFSC to understand how the program should work. It also shows that you don't pay attention to the use of tools and methods, and you need to take the time to experience and summarize them

*btw pa is designed for upper goals, it does not intend to welcome students finishing this in a term.*

## What knowledge is included other than solid debugging skills and engineering skills? 
确实, 对于大部分计算机本科专业学生来说, 硬件设计能力不如电子工程专业学生, 行业软件开发和应用能力不如其他相关专业学生, 算法设计和分析基础又不如数学系学生. 那么, 计算机专业学生的特长在哪里? 我们认为计算机专业学生的优势之一在于计算机系统能力, 即具备计算机系统层面的认知与设计能力, 能从计算机系统的高度考虑和解决问题.

随着大规模数据中心(WSC)的建立和个人移动设备(PMD)的大量普及使用, 计算机发展进入了后PC时代, 呈现出"人与信息世界及物理世界融合"的趋势和网络化, 服务化, 普适化和智能化的鲜明特征. 后PC时代WSC, PMD和PC等共存, 使得原先基于PC而建立起来的专业教学内容, 已经远远不能反映现代社会对计算机专业人才的培养要求, 原先计算机专业人才培养强调"程序"设计也变为更强调"系统"设计.

后PC时代, 并行成为重要主题, 培养具有系统观的, 能够进行软, 硬件协同设计的软硬件贯通人才是关键. 而且, 后PC时代对于大量从事应用开发的应用程序员的要求也变得更高. 首先, 后PC时代的应用问题更复杂, 应用领域更广泛. 其次, 要能够编写出各类不同平台所适合的高效程序, 应用开发人员必需对计算机系统具有全面的认识, 必需了解不同系统平台的底层结构, 并掌握并行程序设计技术和工具.

Abilities:
1. 能够对软, 硬件功能进行合理划分
2. 能够对系统不同层次进行抽象和封装
3. 能够对系统的整体性能进行分析和调优
4. 能够对系统各层面的错误进行调试和修正
5. 能够根据系统实现机理对用户程序进行准确的性能评估和优化
6. 能够根据不同的应用要求合理构建系统框架等

So we should learn: 
1. 对计算机系统整机概念的认识。
2. 对计算机系统层次结构的深刻理解。
3. 对高级语言程序, ISA, OS, 编译器, 链接器等之间关系的深入掌握。
4. 对指令在硬件上执行过程的理解和认识。
5. 对构成计算机硬件的基本电路特性和设计方法等的基本了解等。从而能够更深刻地理解时空开销和权衡, 抽象和建模, 分而治之, 缓存和局部性, 吞吐率和时延, 并发和并行, 远程过程调用(RPC), 权限
6. 和保护等重要的核心概念, 掌握现代计算机系统中最核心的技术和实现方法.

**Always remember, there are only 3 fundamental question in cs education:**
1. (theory, 理论计算机科学) What is computing?
2. (system, 计算机系统) What is a computer?
3. (application, 计算机应用) What can a computer do?

**Learning how to practice will enhance your understanding, bringing up new ideas, and bringing up more practices.**

> 学汽车制造专业是要学发动机怎么设计, 学开车怎么开得过司机呢?
## Chicken soup

**少抱怨, 多吃苦吧。当你遇到了问题，那么就是你没有掌握好。**
**程序设计实验对菜鸡友好, 但为什么你做完之后还是菜鸡? 做一个对菜鸡友好的实验, 能力并不会得到提升.**

**appropriate mindset.** (from the FAQ section of PA.)
1. Read the fucking manual.
2. Understand every detail about the code you write. 
3. Understand the relationship between modules of computer systems.
4. Undetstand the typical tools for solving typical questions. 

> 这种"只要不影响我现在survive, 就不要紧"的想法其实非常的利己和短视: 你在专业上的技不如人, 迟早有一天会找上来, 会影响到你个人职业生涯的长远的发展; 更严重的是, 这些以得过且过的态度来对待自己专业的学生, 他们的survive其实是以透支南大教育的信誉为代价的 -- 如果我们一定比例的毕业生都是这种情况, 那么过不了多久, 不但那些混到毕业的学生也没那么容易survive了, 而且那些真正自己刻苦努力的学生, 他们的前途也会受到影响. -- etone

So 
## Preparation
