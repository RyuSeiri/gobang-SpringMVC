package com.gobang.controller;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gobang.po.User;
import com.gobang.service.UserService;

@Controller
@RequestMapping("/Login.do")
public class UserLoginController {

	@Resource
	private UserService service;

	@RequestMapping(params = "method=login", method = RequestMethod.POST)
	public @ResponseBody Object  handleRequest(
			HttpServletRequest req, String userId, String passWord)
			throws Exception {
		Map<String, Object> result=new HashMap<String, Object>();
		User user = null;
		int status = 0;
		if (!StringUtils.isEmpty(userId) && !StringUtils.isEmpty(passWord))
			user = service.getUser(userId, passWord);
		if (user != null) {
			status = 1;
			req.setAttribute("user", user);
		}
		result.put("status", status);

		return result;
	}
}
