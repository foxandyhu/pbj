package com.lw.iot.pbj.common.ipseek;

/**
 * IP解析异常
 * @author 胡礼波
 * 2012-6-1 下午12:23:27
 */
@SuppressWarnings("serial")
public class IPParseException extends RuntimeException {
	public IPParseException(String msg) {
		super(msg);
	}

	public IPParseException(String msg, Throwable cause) {
		super(msg, cause);
	}
}
