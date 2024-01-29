---
title: "Missing Semster"
date: 2024-01-23T22:10:11-04:00
showToc: true # 显示目录
TocOpen: true # 自动展开目录
draft: false 
cover:
    image: classes/2.webp
tags: 
- "dev tools"
---

## Shell
``` sh
# Environment variables
echo $PATH

which echo 
/usr/bin/echo # where echo is found. 

# current directory
flappy@Flappy:~$ pwd
/home/flappy

cd ~ # home directories. 

cd - # get back to previous path. 

-- help # 

ls -l 

# move file from 1 to 2 and rename it. 
mv <path1> <path2>

# copy file  
cp 

# remember that shell is a language, using string as u wanna create name with spaces 
mkdir "hello world directories"

# >> means appending
cat < hello.txt >> hello2.txt 

# Combination of linux cmd
ls -l / | tail -n1 > ls.txt 

# enter as a superuser: Then modifying root files are available. 
sudo su

# pipe output stream as input stream into "sudo tee brightness" 
echo 1600 | sudo tee brightness  
 ```

## Scripting 

shell scripting mcd.sh 

```sh 
mcd () {
    # access the first argument 
    mkdir -p "$1"

    # cd into the first argument. 
    cd "$1"
}
 ```

**several useful shortcut of scripting**

$0 - Name of the script

$1 to $9 - Arguments to the script. $1 is the first argument and so on.

$@ - All the arguments

$# - Number of arguments

$? - Return error code of the previous command
$$ - Process identification number (PID) for the current script
!! - Entire last command, including arguments. A common pattern is to execute a command only for it to fail due to missing permissions; you can quickly re-execute the command with sudo by doing sudo !!

``` sh 
# $(CMD) will executes CMD and replaces $(CMD) by results of the output. 
foo=$(pwd) 
echo $foo\
/home/flappy

# This expands the string. 
echo "We are in $(pwd)"
We are in /home/flappy

# show differences between files in dirs foo and bar 
# <(CMD)  substitute the <() with that file (that files is result of CMD )
diff <(ls foo) <(ls bar)
 ```


