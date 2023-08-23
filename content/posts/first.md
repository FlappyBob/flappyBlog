---
title: "Notes on how to build up this site using hugo"
date: 2023-08-22T23:51:11-04:00
draft: false
cover:
    image: first/hello.png
    caption: 'game -- ff14 of my avatar on behalf of getting through 5.x '
tags: ["html", "css"]
categories: ["tech"]
---
*preword*: I built this static web site for compiling notes of knowledge. I dont want to focus too much on "deeper magic" on website building technology but just write notes. (/smile)

## Resource
[Getting Started With Hugo | FREE COURSE](https://www.youtube.com/watch?v=hjD9jTi_DQ4&t=1455s)

[paperMod theme](https://themes.gohugo.io/themes/hugo-papermod/)


## preknowledge recap 
**quick github intro**
```md
git remote add <github remote repo name> <repo url (better ssh since it caused several error using http)>  
git remote remove <github remote repo name>
```

## buildup this website
Netlify is a service that builds up webpage with functions automatically renews as you push contents to your github repo. 
**netlify service setup**
![netlify](../pic/first/netlify.png)


### structure of contents.

**content structure.**
![content structure](../pic/first/content.png)
1. mother folder that contains all real data that shows up in one blog.
2. pic (sub folder) that holds picture references in one blog. The directories' names are named as the blog name. 
3. categories' names. 

### setup of configuration file. (config.yml)
``` yml 
baseURL: "https://flappyhimself.netlify.app/"
languageCode: en-us
title: FlappyHimself
theme: PaperMod

params: 
  homeInfoParams:
    Title: "hi, here's my notes repo ( ｡ớ ₃ờ) " 

  socialIcons:
    - name: github
      url: "https://github.com/FlappyBob"
    - name: twitter
      url: "https://twitter.com/FlappyHimself"

  cover:
    linkFullImages: true 

  ShowBreadCrumbs: true 

  ShowReadingTime: true

  ShowShareButtons: true   
menu: 
  main:
      - identifier: categories
        name: Categories
        tag: /categories/
        weight:  10
      - identifier: tags
        name: Tags
        tag: /tags/
        weight: 20
      - identifier: archives
        name: Archives
        tag: /archives/
        weight: 30 
```

### workflow
1. create markdown flie and find a comfortable text editor  ```hugo new posts/<file name.md>```
2. write a script that upload your recent change, mostly I don't care about the commit message when writing my own blog. (I am windows, so create a .bat file)
``` bat 
git add ./
git commit -m "finish setting"  
git push blog main
```
3. run the script and see changes on your website (usually take a few seconds)
