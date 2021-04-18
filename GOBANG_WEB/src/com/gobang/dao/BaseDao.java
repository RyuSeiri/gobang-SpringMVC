package com.gobang.dao;


import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate4.HibernateTemplate;
import org.springframework.stereotype.Component;

@Component
public class BaseDao {

	@Autowired
	private HibernateTemplate hibernateTemplate;

	@Autowired
	private SessionFactory sessionFactory;

	@Deprecated
	protected HibernateTemplate getHibernateTemplate() {
	   /* getSession().setFlushMode(FlushMode.AUTO);
		hibernateTemplate.setSessionFactory(sessionFactory);*/
		return hibernateTemplate;
	}

	/**
	 * 获得事物
	 * 
	 * @return
	 */
	protected Transaction getTansaction() {
		return getSession().beginTransaction();
	}

	/**
	 * 得到Session对象
	 * 
	 * @return Session对象
	 */
	protected Session getSession() {
		return sessionFactory.getCurrentSession();
	}

	/**
	 * 更新多个实体
	 * 
	 * @param objects
	 *            多个实体类
	 * @return
	 * @throws Exception
	 */
	public void updateEntitys(Object... objects) throws Exception {
		if (objects == null || objects.length <= 0)
			return;
		Transaction transaction = getTansaction();
		try {
			for (Object object : objects) {
				getSession().update(object);
			}
		} catch (Exception e) {
			transaction.rollback();
			throw e;
		}
		getSession().flush();
		transaction.commit();
	}

	/**
	 * 更新实体类
	 * 
	 * @param object
	 *            任意实体
	 * @throws Exception
	 */
	public void updateEntity(Object object) throws Exception {
		try {
			getSession().update(object);
		} catch (Exception e) {
			throw e;
		}
		getSession().flush();
	}

	/**
	 * 保存实体
	 * @param object 任意实体
	 * @throws Exception
	 */
	public void save(Object object) throws Exception {
		try {
			getSession().save(object);
		} catch (Exception e) {
			throw e;
		}
		getSession().flush();
	}

	/**
	 * 删除实体
	 * @param object 任意实体
	 * @throws Exception
	 */
	public void delete(Object object) throws Exception {
		try {
			getSession().delete(object);
		} catch (Exception e) {
			throw e;
		}
		getSession().flush();
	}

	/**
	 * 保存或更新多个实体类
	 * @param objects 多个任意实体
	 * @throws Exception
	 */
	public void saveOrUpdates(Object... objects) throws Exception {
		if (objects == null || objects.length <= 0)
			return;
		try {
			for (Object object : objects) {
				getSession().saveOrUpdate(object);
			}
		} catch (Exception e) {
			throw e;
		}
		getSession().flush();
	}

	/**
	 *保存或更新实体类
	 * @param object 任意实体
	 * @throws Exception
	 */
	public void saveOrUpdate(Object object) throws Exception {
		try {
			getSession().save(object);
		} catch (Exception e) {
			throw e;
		}
		getSession().flush();
	}

	/**
	 * 获得SQLQuery对象
	 * @param sql SQL语句
	 * @return SQLQuery
	 */
	protected SQLQuery SqlQuery(String sql) {
		return getSession().createSQLQuery(sql);
	}

	/**
	 * 关闭Session对象
	 * @param session
	 */
	protected void closeSession(Session session) {
		if (session != null)
			session.close();
	}

}
