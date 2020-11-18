# NVM

在开发中，有时候对node的版本有要求，有时候需要切换到指定的node版本来重现问题等。遇到这种需求的时候，我们需要能够灵活的切换node版本。
这里我们使用nvm工具来管理多版本node。

**安装**

curl方式

```shell
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash
```

wget方式（我使用的是这种方式）

```shell
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash
```

1. 下载完毕后查看nvm版本号。如果显示版本号则代表成功，否则失败。我这里很顺利，没有遇到官网上说的一些问题。
> ```nvm --version```


2. 开始安装node
>使用命令下载需要的版本```nvm install <version> ```

3. 使用```nvm use  <version> ```来进行版本切换，我在切换的时候不记得都下载了哪些版本，于是use后尝试按了tab键，果然给出了已经安装过的版本号。后来发现也有现成的```nvm ls```命令来专门查看已有node的版本。

**其他的更多知识需要参考[https://github.com/creationix/nvm/blob/master/README.md](https://github.com/creationix/nvm/blob/master/README.md)**