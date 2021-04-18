package com.gobang.websocket;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import com.gobang.po.goResult;
import com.gobang.util.Util;

import net.sf.json.JSONObject;

//该注解用来指定一个URI，客户端可以通过这个URI来连接到WebSocket。类似Servlet的注解mapping。无需在web.xml中配置。
@ServerEndpoint(value = "/gobangWebsocket")
public class gobangWebSocket {

	// concurrent包的线程安全Set，用来存放每个客户端对应的MyWebSocket对象。若要实现服务端与单一客户端通信的话，可以使用Map来存放，其中Key可以为用户标识
	private static Map<String, gobangWebSocket> webSocketMap = new HashMap<String, gobangWebSocket>();
	// 与某个客户端的连接会话，需要通过它来给客户端发送数据
	private Session session;
	// 连上来的页面序号，用来配对对战，1与2一组，3与4一组，依次类推，奇数为黑先走，偶数为白，后走
	private static int index = 0;
	// 同上，用来从hashMap中获取websocket，（我也忘记当时为啥要另外用一个mykey了，而不是直接用index来获取）
	private int mykey = 0;

	/**
	 * 连接建立成功调用的方法
	 * 
	 * @param session
	 *            可选的参数。session为与某个客户端的连接会话，需要通过它来给客户端发送数据
	 * @throws IOException
	 */
	@OnOpen
	public void onOpen(Session session) {
		this.session = session;
		index++;
		try {
			goResult result = new goResult();
			if (index % 2 == 0) {
				gobangWebSocket socket = webSocketMap.get((index - 1) + "");
				if (socket != null) {
					result.setBout(true);
					result.setMessage("系统：游戏开始，请您先落子！");
					result.setColor("black");
					socket.sendMessage(JSONObject.fromObject(result).toString());
					result.setMessage("系统：游戏开始，请等待对手落子！");
					result.setBout(false);
					result.setColor("white");
					this.sendMessage(JSONObject.fromObject(result).toString());
					// 对后出手的发送消息结束
				} else {// 偶数时没有查询到与之对应的对手，则其变为奇数，成为等待匹配的人
					index--;
					result.setMessage("系统：等待玩家匹配！");
					this.sendMessage(JSONObject.fromObject(result).toString());
				}
			} else {
				result.setMessage("系统：等待玩家匹配！");
				this.sendMessage(JSONObject.fromObject(result).toString());
			}
			this.mykey = index;
			webSocketMap.put(mykey + "", this); // 加入map中
			// System.out.println(webSocketMap.size());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 连接关闭调用的方法
	 * 
	 * @throws IOException
	 */
	@OnClose
	public void onClose() {
		webSocketMap.remove(mykey + ""); // 从set中删除
		try {
			gobangWebSocket socket = null;
			if (mykey % 2 == 0) {
				socket = webSocketMap.get((mykey - 1) + "");
			} else {
				socket = webSocketMap.get((mykey + 1) + "");
			}
			if (socket != null) {
				goResult result = new goResult();
				result.setMessage("系统：你的对手已离开！");
				socket.sendMessage(JSONObject.fromObject(result).toString());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 收到客户端消息后调用的方法
	 * 
	 * @param message
	 *            客户端发送过来的消息
	 * @param session
	 *            可选的参数
	 */
	@OnMessage
	public void onMessage(String message) {
		// System.out.println(message);
		JSONObject json = JSONObject.fromObject(message);
		goResult result = (goResult) JSONObject.toBean(json, goResult.class);
		try {
			gobangWebSocket socket = null;
			if (mykey % 2 == 0)
				socket = webSocketMap.get((mykey - 1) + "");
			else
				socket = webSocketMap.get((mykey + 1) + "");

			if (socket != null) {
				if (result.getXy() != null && !"".equals(result.getXy())) {// 有坐标表示为落子，反之则为发送信息
					this.sendMessage(message);
					if (result.getWinFlg()) {// 获得赢棋flg
						result.setMessage("系统：游戲結束，你輸了！");
					} else if (result.getBackFlg()) {// 判断是否悔棋
						// 获得棋子的个数
						int chessItemCount = Util.getChessItemCount(result
								.getChessBord());
						if (chessItemCount % 2 == 0) {// 判断当前棋盘棋子的个数是奇数还是偶数
							// 判断悔棋方为白棋方还是黑棋方，并对应设置下棋flg和message
							if ("white".equals(result.getColor())) {
								result.setBout(false);
								result.setMessage("系统：已悔棋，请等待对手落子！");
								this.sendMessage(JSONObject.fromObject(result).toString());
								result.setBout(true);
								result.setMessage("系统：已悔棋，正在等待您落子！");
							} else {
								result.setBout(true);
								result.setMessage("系统：已悔棋，正在等待您落子！");
								this.sendMessage(JSONObject.fromObject(result).toString());
								result.setBout(false);
								result.setMessage("系统：已悔棋，请等待对手落子！");
							}
						} else {
							if ("white".equals(result.getColor())) {
								result.setBout(true);
								result.setMessage("系统：已悔棋，正在等待您落子！");
								this.sendMessage(JSONObject.fromObject(result)
										.toString());
								result.setBout(false);
								result.setMessage("系统：已悔棋，请等待对手落子！");
							} else {
								result.setBout(false);
								result.setMessage("系统：已悔棋，请等待对手落子！");
								this.sendMessage(JSONObject.fromObject(result)
										.toString());
								result.setBout(true);
								result.setMessage("系统：已悔棋，正在等待您落子！");
							}
						}
					} else {
						result.setBout(true);// 对手的bout改为true，表示接下来可以落子
						result.setMessage("系统：对方已落子，正在等待您落子！");
					}
					socket.sendMessage(JSONObject.fromObject(result).toString());// 把设置好的信息传给对手
				}

				/*
				 * else {// 没有坐标表示为单纯的聊天 goResult newResult = new goResult();
				 * newResult.setMessage("自己：" + result.getMessage());
				 * this.sendMessage(JSONObject.fromObject(newResult)
				 * .toString()); newResult.setMessage("对方：" +
				 * result.getMessage());
				 * socket.sendMessage(JSONObject.fromObject(newResult)
				 * .toString()); }
				 */
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 发生错误时调用
	 * 
	 * @param session
	 * @param error
	 */
	@OnError
	public void onError(Session session, Throwable error) {
		System.out.println("系统：连接断开");
		error.printStackTrace();
	}

	/**
	 * 这个方法与上面几个方法不一样。没有用注解，是根据自己需要添加的方法。
	 * 
	 * @param message
	 * @throws IOException
	 */
	public void sendMessage(String message) throws IOException {
		this.session.getBasicRemote().sendText(message);
		// this.session.getAsyncRemote().sendText(message);
	}

}