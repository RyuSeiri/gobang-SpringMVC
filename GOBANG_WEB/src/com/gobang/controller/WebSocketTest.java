package com.gobang.controller;

import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gobang.service.WebSocketService;

@Controller
@RequestMapping("webSocketTest.do")
public class WebSocketTest {

	@Autowired
	private WebSocketService wsService;
	
	@RequestMapping(params="method=websocketTest",method=RequestMethod.GET)
	public @ResponseBody String testWs(@PathParam(value = "userId") String userId,String message){
		if(wsService.sendToAllTerminal(userId, message)){
			return"发送成功";
		}else{
			return"发送失败";
		}
	}
	
}
