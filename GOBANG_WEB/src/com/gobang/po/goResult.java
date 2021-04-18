package com.gobang.po;

/**
 * 
 * @author Lishilong
 *
 */
public class goResult {
	/**
	 * 落子坐标
	 */
	private String xy;
	/**
	 * 发送消息
	 */
	private String message;
	/**
	 * 是否允许落子
	 */
	private boolean bout;

	/**
	 * 是否允许落子
	 */
	private boolean backFlg;

	/**
	 * 落子颜色
	 */
	private String color;

	/**
	 * 判斷輸贏flg
	 */
	private boolean winFlg;

	/**
	 * 棋盘的棋子状态
	 */
	private String[][] chessBord;

	public String getXy() {
		return xy;
	}

	public void setXy(String xy) {
		this.xy = xy;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public boolean getBout() {
		return bout;
	}

	public void setBout(boolean bout) {
		this.bout = bout;
	}

	public boolean getBackFlg() {
		return backFlg;
	}

	public void setBackFlg(boolean backFlg) {
		this.backFlg = backFlg;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public boolean getWinFlg() {
		return winFlg;
	}

	public void setWinFlg(boolean winFlg) {
		this.winFlg = winFlg;
	}

	public String[][] getChessBord() {
		return chessBord;
	}

	public void setChessBord(String[][] chessbord) {
		this.chessBord = chessbord;
	}
}