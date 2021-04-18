package com.gobang.dao;

import java.util.List;

import com.gobang.po.User;

public interface IUserDao {
	
	public User getUser(String userId, String passWord) throws Exception;

	public List<User> getAllUser() throws Exception;

	public void addUser(User user) throws Exception;

	public void deleteUser(User user) throws Exception;

	public void updateUser(User user) throws Exception;

	public void deleteUser(String userId) throws Exception;

}
