package com.dogather.pjtserver.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import java.util.Date;

public class JwtProvider {

	// Secret for key
	private static String secret = "DoGatherJwtTokenSecretStringDoGatherJwtTokenSecretString";
	// Key for JWT Token
	private static SecretKey key = Keys.hmacShaKeyFor(secret.getBytes());

	// userdto를 이용하여 Token 제작 및 반환
	public static String getToken(String userId) {
		String Subject = "Dogather";
		String payload = userId;
		int duration = 60 * 60 * 1000;
		Date expiration = new Date(System.currentTimeMillis() + duration); // 30m
//		Date expiration = new Date(System.currentTimeMillis() + 0); // 30m

		String token = Jwts.builder()
				.setSubject(Subject)
				.setExpiration(expiration)
				.claim("payload", payload)
				.signWith(key)
				.compact();

		return token;
	}

	public static String validateToken(String token, String userId) {
		String ret = "잘못된 토큰";
		try {
			Claims claims = Jwts.parserBuilder()
					.setSigningKey(key)
					.requireSubject("Dogather")
					.build()
					.parseClaimsJws(token)
					.getBody();

			String tmp = (String) claims.get("payload"); // userId
			if(tmp.equals(userId)){
				ret = tmp;
				return ret;
			}else{
				ret = "유효한 토큰";
				return ret;
			}
		} catch( ExpiredJwtException e) {
			System.err.println("기간이 만료된 토큰입니다.");
			ret = "잘못된 토큰";

		} catch (Exception e) {
			System.err.println("잘못된 토큰입니다.");
		}

		return ret;
	}

}
