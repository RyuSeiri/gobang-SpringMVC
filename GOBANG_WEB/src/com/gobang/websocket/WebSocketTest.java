package com.gobang.websocket;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;


@ServerEndpoint(value = "/websocketTest")
public class WebSocketTest{

	// 线程安全的静态变量，表示在线连接数
	private static volatile int onlineCount = 0;
	// 用来存放单个客户端对应的WebSocketTest对象，适用于同事与多个客户端通信
	private static Map<Session, WebSocketTest> webSocketMap = new ConcurrentHashMap<Session, WebSocketTest>();
	// 与某个客户端的连接绘画，通过他实现定向推送（只推送给某个用户）
	private Session session;

	@OnOpen
	public void onOpen(Session session) {
		this.session = session;
		webSocketMap.put(session, this);
		addOnlineCount();
		System.out.println("有新连接加入当前在线人数为" + getOnlineCount());
	}

	@OnClose
	public void onClose(Session closeSession) {
		webSocketMap.remove(closeSession);
		subOnlineCount();
		System.out.println("有一中断连接,当前连接人数：" + getOnlineCount());
	}

	@OnMessage
	public void onMessage(String message, Session mySession) throws IOException {
		for (Session key : webSocketMap.keySet()) {
			webSocketMap.get(key).sendAllMessage(message);
		}
	}

	private void sendAllMessage(String message) throws IOException {
		this.session.getBasicRemote().sendText(message);
	}


	@OnError
	public void onError(Session session, Throwable error) {
		error.printStackTrace();
	}

	private static synchronized int getOnlineCount() {
		return onlineCount;
	}

	private static synchronized void addOnlineCount() {
		onlineCount++;
	}

	private static synchronized void subOnlineCount() {
		onlineCount--;
	}
}
