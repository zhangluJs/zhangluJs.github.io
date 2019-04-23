# 简单的linux命令

`cd`: 切换目录。这里有个我遇到的小坑，在开始操作服务器的时候，因为自己的操作的疏忽，在切换到根目录的时候没有分清cd ～与cd/ 以至于安装的一些东西找不到。
这里仔细区分一下

- `cd ..`: 返回上一级目录
- `cd `: 进入用户主目录
- `cd ~`: 进入用户主目录
- `cd /`: 进入根目录
- `cd ../..`: 返回上两级目录

`ll`: 列出当前目录下的文件，展示文件的一些详细信息，包括文件大小、读写权限、日期等

`ls`: 列出当前目录下的文件

`vi [filename]`: 进入编辑模式，编辑当前文件。i开启编辑，esc退出编辑，:wq保存并退出（想起了第一次用vim编辑器时被支配的恐惧...）

`whereis [filename]`: 查找文件，可以查看文件在哪个文件夹下

`scp`: 进行文件的远程拷贝。该命令可以在linux服务器之间复制文件和目录

- 复制文件: `scp local_file remote_username@remote_ip:remote_folder `或者 `scp local_file remote_username@remote_ip:remote_file `

- 复制目录: `scp -r local_folder remote_username@remote_ip:remote_folder `

- 从远处复制文件到本地目录: `scp root@xxx.xxx.xxx.xxx:/opt/soft/nginx-0.5.38.tar.gz /opt/soft/`

- 将本地文件复制到远端: `scp /learn/demo/app.js root@xx.x.xx.99:./workspace/demo/`

`ln -s`: 创建软连接。具体用法是：ln -s 源文件 目标文件。它的功能是为某一个文件在另外一个位置建立一个同不的链接，这个命令最常用的参数是-s。

- `ln -s /mongodb/mongodb-linux-x86_64-ubuntu1404-3.4.4/bin/mongo /usr/local/bin/mongo `这个例子是我在服务器上配置mongodb的软连接，其他的诸如node、npm也是如此

`rm -rf`: 删除软连接，拿上面的例子来删除就是`rm -rf /usr/local/bin/mongo `

`mkdir`: 创建目录`mkdir 桌面/demo`

`rm`: 删除目录。`-r `删除目录`-f `强制

`ssh root@xxx.xxx.xx.xx`: 链接服务器

`curl`: http命令行工具，它支持文件的上传和下载。（我这里使用curl 拉取了一段音悦台的资源，使用node生成了一个json文件）

### 这里只是简单的记录了一些linex命令，关于linux的命令以及其他相关知识还有很多。慢慢积累吧～