package com.dogather.pjtserver.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class UserDto {
    private String msg;
    private int userNo;
    private String userId;
    private String userPw;
    private String userName;
    private String userNickname;
    private String userAddr;
    private String userAddrDetail;
    private int userZip;
    private String userTel;
	private String userEmail;
	
	
//	public int getUserNo() {
//		return userNo;
//	}
//	public void setUserNo(int userNo) {
//		this.userNo = userNo;
//	}
//	public String getUserId() {
//		return userId;
//	}
//	public void setUserId(String userId) {
//		this.userId = userId;
//	}
//	public String getUserPw() {
//		return userPw;
//	}
//	public void setUserPw(String userPw) {
//		this.userPw = userPw;
//	}
//	public String getUserName() {
//		return userName;
//	}
//	public void setUserName(String userName) {
//		this.userName = userName;
//	}
//	public String getUserNickname() {
//		return userNickname;
//	}
//	public void setUserNickname(String userNickname) {
//		this.userNickname = userNickname;
//	}
//	public String getUserAddr() {
//		return userAddr;
//	}
//	public void setUserAddr(String userAddr) {
//		this.userAddr = userAddr;
//	}
//	public String getUserAddrDetail() {
//		return userAddrDetail;
//	}
//	public void setUserAddrDetail(String userAddrDetail) {
//		this.userAddrDetail = userAddrDetail;
//	}
//	public int getUserZip() {
//		return userZip;
//	}
//	public void setUserZip(int userZip) {
//		this.userZip = userZip;
//	}
//	public String getUserTel() {
//		return userTel;
//	}
//	public void setUserTel(String userTel) {
//		this.userTel = userTel;
//	}
//	public String getUserEmail() {
//		return userEmail;
//	}
//	public void setUserEmail(String userEmail) {
//		this.userEmail = userEmail;
//	}
//	@Override
//	public String toString() {
//			return "UserDto [userNo=" + userNo + ", userId=" + userId + ", userPw=" + userPw + ", userName=" + userName
//					+ ", userNickname=" + userNickname + ", userAddr=" + userAddr + ", userAddrDetail=" + userAddrDetail
//					+ ", userZip=" + userZip + ", userTel=" + userTel + ", userEmail=" + userEmail + "]";
//		}
//    
}
