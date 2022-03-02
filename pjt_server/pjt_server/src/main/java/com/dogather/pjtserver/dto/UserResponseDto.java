package com.dogather.pjtserver.dto;

import lombok.Data;

import java.util.List;

@Data
public class UserResponseDto {
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
    private List<BoardDto> likeBoards;
    private List<GroupReturnDto> likeGroups;
    private List<GroupSummaryDto> paymentGroup;
    private List<GroupReturnDto> saleGroup;


    public void setUserInfo(UserDto userDto){
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
