/*
 * @Description: 发送构建信息到钉钉群
 * @Author: arrow
 * @Date: 2020-08-12 17:51:37
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-08-14 09:30:01
 */
const ChatBot = require('dingtalk-robot-sender');

// 使用 webhook
const robot = new ChatBot({
  baseUrl: 'https://oapi.dingtalk.com/robot/send',
  accessToken: '0f0756ffd63c085499fe982c500072cecaa11cbc1441ac647b01903914097fc1',
});

const sendMessage = ( username, projectname, version, what, code ) => {
  let isSuccess = code === 0 ? '成功了！' : '失败了！'
  let messageContent = {
    "msgtype": "text", 
    "text": {
      "content": `Time: ${ new Date().toLocaleString() }\nWho: ${username}\nProject: ${projectname}\nVersion: ${version}\nMessage: ${what}--${isSuccess}`
    }
  }
  robot.send(messageContent)
  .then((res) => {
    // TODO
  });
};

module.exports = sendMessage;

