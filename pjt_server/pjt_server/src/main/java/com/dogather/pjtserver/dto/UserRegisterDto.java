package com.dogather.pjtserver.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
@Getter
@Setter
public class UserRegisterDto {
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
    private List<Integer> userCategory;

    public void setUserInfo(UserDto userDto){
        this.userId = userDto.getUserId();
        this.msg = userDto.getMsg();
        this.userNo = userDto.getUserNo();
        this.userPw = userDto.getUserPw();
        this.userName = userDto.getUserName();
        this.userNickname = userDto.getUserNickname();
        this.userAddr = userDto.getUserAddr();
        this.userAddrDetail = userDto.getUserAddrDetail();
        this.userZip = userDto.getUserZip();
        this.userTel = userDto.getUserTel();
        this.userEmail = userDto.getUserEmail();
    }

}
