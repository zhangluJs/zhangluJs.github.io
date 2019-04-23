# GIT 分布式版本管理控制系统

引用一段百度百科中的解释：Git(读音为/gɪt/。)是一个开源的分布式版本控制系统，可以有效、高速地处理从很小到非常大的项目版本管理。Git 是 Linus Torvalds 为了帮助管理 Linux 内核开发而开发的一个开放源码的版本控制软件。

接下来简单介绍一下常用到的简单的命令。

**具体操作命令：**

`git config 配置Git，通过命令行来进行设置，或者也可以修改.gitignore中的相关选项进行修改`

- `git config --global user.email xxx@xxxx.com`
- `git config --global user.name 用户名`
- `git init`：在工作目录中初始化新的仓库
- `git clone git://github.com/xxxxxx.xxxx.xxx`：从远端拉取代码到本地
- `git status`：查看当前代码库的状态，包括修改、新增、删除的文件等。
- `git add [option]`：将本次的修改全部都提交到暂存区。option有许多选项，我一版都是 add .（简单粗暴）
- `git checkout .`：放弃本次的修改
- `git clean -dfx`：放弃本次新增的文件或文件夹
- `git commit -m '这次修改了git文件'`：将已经提交到暂存区的修改提交到本地
- `git push`：将本地的修改推到远端代码库
- `git pull`：将远端代码库中其他人新增的修改拉取到本地
- `git branch `：列出分支
- `git branch -r`： 列出远端分支
- `git branch -a`： 列出本地和远程分支
- `git checkout [branchName]`： 切换分支
- `git checkout -- track origin/[branchName]`：拉取并切换分支
- `git merge develop`：合并分支，将develop分支合并到当前分支。有可能会用冲突，谨慎解决
- `git merge --no-off/branch`：将barnch合并到当前分支
- `git log`： 查看日志，提交记录
- `git reset`：将代码回滚到之前的某个版本
- `git reset --hard [版本号。log出来的那个hash]`： 回滚到指定的版本，放弃这个版本之后的修改。需要使用`git push -f`强制推到远端。之所以要强制推送，是因为我们本地的HEAD比远端的要旧。[这位博主介绍的很详细](https://blog.csdn.net/yxlshk/article/details/79944535)
- `git reset --soft [hash]`：也是一种回滚方式 
- `git diff`：查看代码的修改部分
- `git diff --cached`：查看已经add 但没有commit的改动

推荐一个git的GUi工具，很好用。SourceTree。vscode中也集成了git的功能也很好用～

`git config remote.origin.push refs/heads/*:refs/for/*`：设置这个就可以直接使用sourceTree把代码推送到远端了，当然是因为公司代码库的推送规则需要这样设置，github中的话是不需要的。


### 关于git的东西还有很多很多，甚至还有git知识的相关书籍。以上是工作中经常用到的，差不多已经覆盖全了。所以就暂时到这里了，以后有机会在补充。