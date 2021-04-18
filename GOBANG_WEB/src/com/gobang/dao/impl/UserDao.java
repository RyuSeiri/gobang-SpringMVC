package com.gobang.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.gobang.dao.BaseDao;
import com.gobang.dao.IUserDao;
import com.gobang.po.User;

@Repository
@SuppressWarnings("unchecked")
public class UserDao extends BaseDao implements IUserDao {

	@Override
	public List<User> getAllUser() throws Exception {
		String sql = "select * from tb_user";
		return SqlQuery(sql).addEntity(User.class).list();

	}

	@Override
	public User getUser(String userId, String passWord) throws Exception {
		String sql = "select * from tb_user where userid=? and password =?";
		return (User) SqlQuery(sql).addEntity(User.class).setString(0, userId).setString(1, passWord)
				.uniqueResult();
	}

	@Override
	public void addUser(User user) throws Exception {
		super.save(user);
	}

	@Override
	public void deleteUser(User user) throws Exception {
		super.delete(user);

	}

	@Override
	public void deleteUser(String userId) throws Exception {
		String sql = "delete from tb_user where userid=?";
		getSession().createSQLQuery(sql).setString(0, userId).executeUpdate();

	}

	@Override
	public void updateUser(User user) throws Exception {
		super.updateEntity(user);
	}


}
