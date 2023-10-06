import Vue from 'vue'
import { Message } from 'element-ui'
let v = new Vue()
v.$message = Message;
var webSocket = null;
var isConnect = false; //连接状态
var globalCallback = function (e) { console.log(e) };//定义外部接收数据的回调函数
var reConnectNum = 0;//重连次数


let token = '';
let websocketUrl = ''
const ws = process.env.VUE_APP_WS_API;

//心跳设置
var heartCheck = {
  heartbeatData: {
    type: 'ping',
    data: '',
  },//心跳包
  timeout: 10 * 1000, //每段时间发送一次心跳包
  heartbeat: null, //延时发送消息对象(启动心跳新建这个对象，收到消息后重置对象)
  start: function () {
    this.heartbeat = setInterval(() => {
      if (isConnect) {
        webSocketSend(this.heartbeatData);
      } else {
        this.clear();
      }
    }, this.timeout);
  },
  reset: function () {
    clearInterval(this.heartbeat);
    this.start();
  },
  clear: function () {
    clearInterval(this.heartbeat);
  }
}

//初始化websocket
function initWebSocket(callback) {
  token = sessionStorage.getItem('token')
  websocketUrl = `${ws}/api/v3/ws_kefu?token=${token}`

  webSocket && webSocket.close();
  webSocket = null
  heartCheck.clear();
  isConnect = false;
  //此callback为在其他地方调用时定义的接收socket数据的函数
  if (callback) {
    if (typeof callback == 'function') {
      globalCallback = callback
    } else {
      throw new Error("callback is not a function")
    }
  }
  if ("WebSocket" in window) {
    webSocket = new WebSocket(websocketUrl);//创建socket对象
  } else {
    Message({
      message: '该浏览器不支持websocket!',
      type: 'warning'
    });
    return
  }
  //打开
  webSocket.onopen = function () {
    console.log('webSocket--连接成功');
    webSocketOpen();
  };
  //收信
  webSocket.onmessage = function (e) {
    webSocketOnMessage(e);
  };
  //关闭
  webSocket.onclose = function (e) {
    webSocketOnClose(e);
  };
  //连接发生错误的回调方法
  webSocket.onerror = function (e) {
    webSocketonError(e);
  };
}

//连接socket建立时触发
function webSocketOpen() {
  let firstHeatData = {}
  let userInfo = sessionStorage.getItem("userInfo");
  if (userInfo) {
    userInfo = JSON.parse(userInfo);
    firstHeatData = {
      "type": "kfOnline",
      "data": {
        "id": userInfo.token,
        "name": userInfo.name,
        "avator": userInfo.avatar,
        "to_id": ""
      }
    }
  } else {
    v.$router.push("/login");
  }
  //首次握手
  webSocketSend(firstHeatData);

  // webSocketSend(heartCheck.heartbeatData);
  isConnect = true;
  heartCheck.start();
  reConnectNum = 0;
}

//客户端接收服务端数据时触发,e为接受的数据对象
function webSocketOnMessage(e) {
  const data = JSON.parse(e.data);//根据自己的需要对接收到的数据进行格式化
  globalCallback(data);//将data传给在外定义的接收数据的函数，至关重要。
}

//socket关闭时触发
function webSocketOnClose(e) {
  heartCheck.clear();
  isConnect = false; //断开后修改标识
  //被动断开，重新连接
  // do {
  //   setTimeout(() => {
  //     globalCallback && initWebSocket(globalCallback);
  //   }, 1000)
  // } while (isConnect);
  console.log('-----错误------', e, e.code);
  if (e.code == 1006) {
    if (reConnectNum < 1) {
      ++reConnectNum;
      setTimeout(()=>{
        console.log('initWebSocket(globalCallback);');
        initWebSocket(globalCallback);
      }, 2000)
      console.log('reConnectNum < 1');
    } else {
      const isAddress = location.href.indexOf('/admin/addressBook') > -1 
      const isChat = location.href.indexOf('/admin/chat') > -1 
      if(isAddress || isChat){
        v.$message({
          message: 'websocket断开，自动刷新中!',
          type: 'warning'
        });
        setTimeout(()=>{
          window.location.reload()
        },2000)
      }
    }
  }
}

//连接发生错误的回调方法
function webSocketonError(e) {
  heartCheck.clear();
  isConnect = false; //断开后修改标识
  console.log("WebSocket连接发生错误:");
  console.log(e);
}


//发送数据
function webSocketSend(data) {
  webSocket.send(JSON.stringify(data));//在这里根据自己的需要转换数据格式
}
//在其他需要socket地方主动关闭socket
function closeWebSocket(e) {
  webSocket && webSocket.close();
  webSocket = null
  heartCheck.clear();
  isConnect = false;
  reConnectNum = 0;
}
//在其他需要socket地方接受数据
function getSock(callback) {
  globalCallback = callback
}
//在其他需要socket地方调用的函数，用来发送数据及接受数据
function sendSock(agentData) {
  //下面的判断主要是考虑到socket连接可能中断或者其他的因素，可以重新发送此条消息。
  switch (webSocket.readyState) {
    //CONNECTING：值为0，表示正在连接。
    case webSocket.CONNECTING:
      setTimeout(function () {
        sendSock(agentData, callback);
      }, 1000);
      break;
    //OPEN：值为1，表示连接成功，可以通信了。
    case webSocket.OPEN:
      webSocketSend(agentData);
      break;
    //CLOSING：值为2，表示连接正在关闭。
    case webSocket.CLOSING:
      setTimeout(function () {
        sendSock(agentData, callback);
      }, 1000);
      break;
    //CLOSED：值为3，表示连接已经关闭，或者打开连接失败。
    case webSocket.CLOSED:
      initWebSocket(globalCallback)
      setTimeout(function () {
        sendSock(agentData, callback);
      }, 1000);
      break;
    default:
      // this never happens
      break;
  }
}

const getSocketStatus = () => {
  return isConnect
}

export {
  initWebSocket,
  closeWebSocket,
  sendSock,
  getSock,
  getSocketStatus,
};



// 使用
// export default {
//   mounted() {
//     // 建立socket连接， 并设置socket信息返回接受函数   
//     initWebSocket(this.getsocketResult);
//   },
//   beforeDestroy() {
//     closeWebSocket();
//   },
//   methods: {
//     // socket信息返回接受函数
//     getsocketResult(data) {
//       console.log(data);
//     },
//     //发送socket信息
//     websocketSend(data) {
//       sendSock(data);
//     }
//   }
// }
