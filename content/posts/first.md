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


## Notes
**quick github intro**
```md
git remote add <github remote repo name> <repo url (better ssh since it turned to several error using http proxy)>
git remote remove <github remote repo name>
```

**link to netlify service**
![netlify](../pic/first/netlify.png)

### structure of contents.
Netlify is a service that builds up webpage with functions automatically renews as you push contents to your github repo. 

**content structure.**
![content structure](../pic/first/content.png)
1. mother folder that contains all real data that shows up in one blog.
2. pic (sub folder) that holds picture references in one blog. The directories' names are named as the blog name. 
3. categories' names. 

### workflow
1. create markdown flie and find a comfortable text editor  ```hugo new posts/<file name.md>```
2. write a script that upload your recent change, mostly I don't care about the commit message when writing my own blog. (I am windows, so create a .bat file)
``` bat 
git add ./
git commit -m "finish setting"  
git push blog main
```
3. run the script and see changes on your website (usually take a few seconds)