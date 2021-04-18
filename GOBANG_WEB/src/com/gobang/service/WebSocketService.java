package com.gobang.service;

import org.springframework.stereotype.Service;

import com.gobang.websocket.gobangWebSocket;;

@Service("webSocketService")
public class WebSocketService {

	private gobangWebSocket ws = new gobangWebSocket();

	public boolean sendToAllTerminal(String userId, String message) {
		return true;
		//return ws.sendMessageToUser(userId, message);
	}	
	
}
