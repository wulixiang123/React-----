# 项目 Git 管理

我们需要对项目进行 Git 管理

Git 管理需要做的事情大致为两个步骤：

1. 本地仓库版本控制
2. 本地仓库与远程仓库的交互

**要进行 Git 管理永远是先进行本地仓库版本控制，在考虑本地仓库与远程仓库的交互**

## 本地仓库版本控制

1. `git init`

将当前目录初始化成 git 仓库。（仅需要做一次即可）

2. `git add .`  或者  `git add -A`

将工作区代码添加到暂存区 

3. `git commit -m xxx`

将暂存区代码添加到版本区，进行本地版本控制

4. 分支操作
   1. git branch  name  创建分支
   2. git checkout name  切换分支
   3. git merge name  合并分支

## 本地仓库与远程仓库的交互

### 1. 预备

要和远程仓库进行交互，需要相关负责人提供：

- 仓库地址
- 账号密码

### 2. 远程有仓库，本地没有

场景：入职新员工拉取代码

需求：需要将远程仓库拉取到本地进行开发。

- `git clone 仓库地址`

将远程仓库克隆到本地来。

注意：克隆会将整个仓库所有的分支全部下载回来

- `cd 仓库名称`

进入仓库内  `dev` 开发分支

- `git checkout -b dev origin/dev`   旧版 Git 
- `git checkout dev`  新版 Git 

此时再创建新分支进行自己的功能开发.

* `git checkout -b cart`

根据远程的 xxx 分支, 创建本地的xxx分支, 功能开发完毕之后, 需要合并分支

```sh
# 切换到 dev 分支
git checkout dev
# 合并 cart
git merge cart 
```

第一次推送 dev 分支, 加 -u 选项, 后续就可以在 dev 分支, 直接 `git push `推送了

```shell
# 更新 dev 分支内容
git pull origin dev
# 推送 dev 分支内容
git push -u origin dev 
```

### 3. 本地有仓库，远程没有

场景：自己开发代码

需求：需要将本地仓库提交到远程仓库进行代码管理，方便其他人查看。

- 先进行本地仓库的版本控制

- 新建远程仓库
- `git remote add origin 仓库地址`

将本地仓库与远程仓库关联起来。（只能做一次，第二次无效）

- `git push -u origin dev`    # dev 是个分支名

将本地仓库 xxx 分支代码提交到远程仓库 xxx 分支保管

### 4. 本地仓库、远程仓库都有，并且已经关联好了

当前面操作做完后，本地仓库、远程仓库都有，并且已经关联好了。

当我们需要查看其他人代码时，可以使用这个指令：

- `git pull`

当我们需要推送自己代码时，可以使用这个指令：

- `git push`
