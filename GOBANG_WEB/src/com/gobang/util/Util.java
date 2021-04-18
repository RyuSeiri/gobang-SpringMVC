package com.gobang.util;

public class Util {

	/**
	 * 
	 * @param chessBord 棋盘
	 * @return 获得棋盘棋子的个数
	 */
	public static int getChessItemCount(String[][] chessBord){
		int count = 0;
		for (String[] row : chessBord){
			for(String col: row){
				if(col != null)
					count++;
			}
		}
		return count;
	}
	
	
}
