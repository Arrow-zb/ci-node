#!/bin/bash

#--------------------------------------------
#--------------创建变量----------------------
# tag 版本号
tagId=$1
# 项目名称
projectName=$2
# gitlab 对应的地址 用于第一次拉取
gitLabUrl=$3
# 
user_name=$4
# 基础路径
basePath=/arrow

#--------------自动构建----------------------
if [ tagId != 'undefined' ]
then
  projectPath=$basePath/$projectName
  # 检查 projectPath 是否是目录 也就是检查 projectName 这个文件夹是否存在
  if [ ! -d $projectPath ]
  then
    cd $basePath
    echo "0-----create this project from gitlab"
    git clone $gitLabUrl
  fi
  cd $projectPath
  echo "1-----git stash and clean all changes"
  git stash
  git clean -xdf
  echo "2-----change branch to test"
  git checkout test
  echo "3-----pull ${projectName} code from gitlab on test"
  git pull origin test
  echo "4-----start build ${projectName}"
  npm run build
  echo "5-----build finished"
#-------------检查 dui-static 项目-------------
  duiStaticPath="${basePath}/dui-static"
  if [ ! -d $duiStaticPath ]
  then
    duiStaticGitUrl="https://git.aispeech.com.cn/aife/dui-static.git"
    cd $basePath
    echo "0.1-----create dui-static from gitlab"
    git clone -b release $duiStaticGitUrl
  fi
    cd $duiStaticPath
    git stash
    git checkout release
    git pull origin release
    # 这里还需要我考虑一下，直接上传 lib 吗？
    rm -rf "${duiStaticPath}/lib"
#-------------拷贝dui-ui 的lib 到 dui-static------------
    echo "6-----copy lib/* to dui-static"
    cp -r "${projectPath}/lib"  $duiStaticPath
#-------------重命名 dui-static lib中dui-ui.js 添加版本号-
    mv "${duiStaticPath}/lib/dui-ui/dui-ui.js" "${duiStaticPath}/lib/dui-ui/dui-ui-${tagId}.js"
#-------------push dui-static 到gitlab-----------------
    git add .
    git commit -m "feat: ${user_name} update dui-ui-${tagId}.js"
    git push origin release
    git tag -a "v-${tagId}" -m "${user_name} update dui-ui-${tagId}.js"
    git push origin "v-${tagId}"
fi
