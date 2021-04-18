package com.gobang.service;


import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.gobang.dao.impl.UserDao;
import com.gobang.po.User;

@Component
public class UserService {

	@Resource
	UserDao dao;

	public UserDao getDao() {
		return dao;
	}

	/**
	 * 保存或者更新用户实体
	 * @param user 用户实体
	 * @throws Exception
	 */
	public void saveOrUpdateUser(User user) throws Exception {
		 dao.saveOrUpdate(user);
	}

	/**
	 * 保存用户
	 * @param user 用户的实体
	 * @throws Exception
	 */
	public void saveUser(User  user)throws Exception {
		 dao.save(user);
	}
	
	/**
	 * 通过ID取得用户实体
	 * @param userId 用户的ID
	 * @return
	 * @throws Exception
	 */
	public User getUser(String userId,String passWord)throws Exception {
		return dao.getUser(userId,passWord);
	}
	
	/**
	 * 获得所有的用户
	 * @return 用户的List集合
	 * @throws Exception
	 */
	public List<User> getAllUser()throws Exception{
		return dao.getAllUser();
	}
	
	/**
	 * 通过ID删除用户
	 * @param userId 用户的ID
	 * @throws Exception
	 */
	public void deleteUser(String userId) throws Exception {
		dao.deleteUser(userId);
	}
	
	/**
	 * 删除用户
	 * @param user 用户实体
	 * @throws Exception
	 */
	public void deleteUser(User user) throws Exception {
		dao.delete(user);
	}
	
	/**
	 * 更新User
	 * @param user 用户实体
	 * @throws Exception
	 */
	public void updateUser(User user) throws Exception {
		dao.updateEntity(user);
	}
	
}
