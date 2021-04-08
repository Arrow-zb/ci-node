const path = require('path');
const shelljs = require('shelljs');

const sendMessage = require('./messageToDingDing.js');

const CI = (req, res) => {
  console.log(`\nreq.body: ${ req.body }`);
  
  const { event_name, ref, user_name, project } = req.body;
  const projectName = project.name;
  const gitLabUrl = project.http_url;
  
  // 监控 tag 事件
  if( event_name != 'tag_push') {
    res.sendStatus(204);
    return false;
  }
  
  // 通过 tag push 来的请求中会带有 "ref": "refs/tags/0.0.1" 字段
  // tagId 将作为 构建静态资源的版本号
  const tagId = (ref || '').replace('refs/tags/', '');
  if( !tagId ) {
    console.log('未捕获到 tag!');
    res.sendStatus(204);
    return false;
  }

  // 接收到后执行 shell 脚本
  // const shellRes = shelljs.exec(`sh ${path.resolve(__dirname, '../ci.sh')} ${tagId} ${projectName} ${gitLabUrl} ${user_name}`);
  const shellRes = shelljs.exec(`sh ${path.resolve(__dirname, '../ci.sh')} ${tagId} ${projectName} ${gitLabUrl} ${user_name}`);

  // sendMessage(user_name, projectName, tagId, '项目构建', shellRes.code );

  if(shellRes.code === 0) {
    res.sendStatus(200);
  }else{
    res.sendStatus(204)
  }
};

module.exports =  CI;