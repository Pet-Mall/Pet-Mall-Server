# Pet-Mall

### 安装

```shell
npm run install # yarn
```

### 运行

```shell
npm run dev
```

### 打包

```shell
npm run start:prod
```

### 环境

- 使用 [Node.js 14.17.0](http://nodejs.cn/download/current/) 官网LTS版本

### 项目地址

后台地址：

h5地址：

小程序：

### 分支规范

多分支开发遵从 [GITFLOW](https://gitee.com/link?target=https%3A%2F%2Fdatasift.github.io%2Fgitflow%2FIntroducingGitFlow.html%23%3A~%3Atext%3DGitFlow%20is%20a%20branching%20model%2Cand%20scaling%20the%20development%20team.) 规范

## 1.模块

- [ ] 权限模块
- [ ] 用户模块
- [ ] 登录模块
- [ ] 宠物店加盟
- [ ] 宠物用品
- [ ] 首页轮播（轮播跳转详情（宠物店，宠物粮食））

## 2.前端UI

- 技术栈:
- 后台：`vue3`+`ts`+`Ant Design of Vue`
- h5+小程序：`uniapp`+`vue3` +`ts`+`NutUI`

## 3.后端接口

- 技术栈
- `nestjs`+`mongodb`+`typeorm`+`swagger`

## GIT提交规范

- 使用`commitizen`来执行规范,安装`validate-commit-msg`校验

```bash
feat：新功能（feature）
fix：修补bug
docs：文档（documentation）
style： 格式（不影响代码运行的变动）
refactor：重构（即不是新增功能，也不是修改bug的代码变动）
test：增加测试
chore：构建过程或辅助工具的变动
```

```
git add .
git cz
git push
```

- git Husky和eslint

  虽然我们已经要求项目使用eslint了，但是不能保证组员提交代码之前都将eslint中的问题解决掉了：

  * 也就是我们希望保证代码仓库中的代码都是符合eslint规范的；

  * 那么我们需要在组员执行 `git commit ` 命令的时候对其进行校验，如果不符合eslint规范，那么自动通过规范进行修复；

  那么如何做到这一点呢？可以通过Husky工具：

  * husky是一个git hook工具，可以帮助我们触发git提交的各个阶段：pre-commit、commit-msg、pre-push

  如何使用husky呢？

  这里我们可以使用自动配置命令：

  ```shell
  npx husky-init && npm install
  ```

  这里会做三件事：

  1.安装husky相关的依赖：

  ![image-20210723112648927](https://tva1.sinaimg.cn/large/008i3skNgy1gsqq0o5jxmj30bb04qwen.jpg)

  2.在项目目录下创建 `.husky` 文件夹：

  ```
  npx huksy install
  ```

  

  ![image-20210723112719634](https://tva1.sinaimg.cn/large/008i3skNgy1gsqq16zo75j307703mt8m.jpg)

  3.在package.json中添加一个脚本：

  ![image-20210723112817691](https://tva1.sinaimg.cn/large/008i3skNgy1gsqq26phpxj30dj06fgm3.jpg)

  接下来，我们需要去完成一个操作：在进行commit时，执行lint脚本：

  ![image-20210723112932943](https://tva1.sinaimg.cn/large/008i3skNgy1gsqq3hn229j30nf04z74q.jpg)

  

  

  这个时候我们执行git commit的时候会自动对代码进行lint校验。


## 代码规范

1. style样式超过两种时，使用class，尽量使用继承，少些多余属性

2. 合并margin、padding、border的-top/-right/-bottom/-left的设置，尽量使用短名称

3. 组件命名统一采用文件夹+/index,组件名开头必须为大写

4. 0后面不需要单独，比如0px可以省略成0，0.8px可以省略成.8px

5. 颜色统一管理，使用`scss`/`less`时 使用`$color`代替颜色

6. vue3统一采用`Volar`拓展插件，禁用vue2的`Vuter`

7. **复杂**方法必须写顶部注释，如果是工具函数方法必须写顶部注释

   ```
   /*
   * @description: 方法说明
   * @method 方法名
   * @params: name(string) 参数说明及类型
   * @return 返回类型/参数
   */
   ```

8. `css`命名使用破折号`-`不能使用`_`下划线,class名尽量语义化，**禁止**使用id选择器编写`css`样式

9. 判断是否相等尽量使用 `===`

10. 配置项统一写成`xxConfig.js`配置文件,`dic静态字典`统一写成`xxDic.js`配置文件

11. 除了三目运算，if,else等禁止简写,遇到多重判断可以使用switch，尽量和[阿里前端规范](https://www.cnblogs.com/suwanbin/p/13200530.html)靠拢

    ```
    // 正确的书写
     if (true) {
         alert(name);
     }
     console.log(name);
     
     // 不推荐的书写
     if (true) alert(name);
     console.log(name);
     
     // 不推荐的书写
     if (true)
     alert(name);
     console.log(name)
    ```

