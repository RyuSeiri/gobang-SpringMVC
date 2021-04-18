package com.gobang.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.gobang.po.User;
import com.gobang.service.UserService;

@Controller
@RequestMapping("/Action.do")
public class GoBangController {
	
	@Resource
	private UserService service;
	
	@RequestMapping(params="method=start",method=RequestMethod.GET)
	public String handleRequest(HttpServletRequest req,
			HttpServletResponse resp) throws Exception {
		

		return "jsp/hello";
	}
}
