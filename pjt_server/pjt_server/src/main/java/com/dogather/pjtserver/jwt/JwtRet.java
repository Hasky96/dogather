package com.dogather.pjtserver.jwt;

import com.dogather.pjtserver.dto.UserDto;

import lombok.Data;

@Data
public class JwtRet {
	private String msg; // message
	private String jwt; // jwt token
	private UserDto userInfo; //
}
