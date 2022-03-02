package com.dogather.pjtserver.dao;

import com.dogather.pjtserver.dto.UserDto;
import com.dogather.pjtserver.dto.UserRegisterDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface UserDao {
    public int userRegister(UserRegisterDto userDto);
    public UserDto userFindById(String userId);
    public UserDto userFindByNo(int userNo);
    public int userUpdate(UserRegisterDto userDto);
    public void userDelete(String userId);
    public void addCategory(Map map);
    public void deleteCategory(int userNo);
    public int userIdCheck(String userId);
    public int userNickCheck(String userNickname);
    public List getUserCategory(int UserNo);
}
