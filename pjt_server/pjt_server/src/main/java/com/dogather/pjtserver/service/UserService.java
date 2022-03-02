package com.dogather.pjtserver.service;

import com.dogather.pjtserver.dto.BoardDto;
import com.dogather.pjtserver.dto.UserDto;
import com.dogather.pjtserver.dto.UserRegisterDto;

import java.util.List;

public interface UserService {
    public int userRegister(UserRegisterDto userDto);
    public UserDto userLogin(UserDto userDto);
    public UserDto userFind(String userId);
    public UserDto userFind(int userNo);
    public int userUpdate(UserRegisterDto userDto);
    public void userDelete(String userId);
    public void addCategory(int userNo, int categoryNo);
    public boolean userIdCheck(String id);
    public boolean userNickCheck(String nick);
    public List getUserCategory(int userNo);
}
