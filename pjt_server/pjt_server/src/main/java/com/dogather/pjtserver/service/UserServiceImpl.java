package com.dogather.pjtserver.service;

import com.dogather.pjtserver.dao.UserDao;
import com.dogather.pjtserver.dto.BoardDto;
import com.dogather.pjtserver.dto.UserDto;
import com.dogather.pjtserver.dto.UserRegisterDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserServiceImpl implements UserService{

	@Autowired
	UserDao userDao;

	@Override
	public int userRegister(UserRegisterDto userDto) {
		int created = userDao.userRegister(userDto);
			return created;
	}

	@Override
	public UserDto userLogin(UserDto userDto) { // 로그인
		UserDto user = userDao.userFindById(userDto.getUserId()); // 유저의 아이디를 통해 정보 얻어옴
		if(user != null){// 있는 아이디
			//PW check
			if(user.getUserPw().equals(userDto.getUserPw())) {
				//로그인 성공
				return user;
			}else {
				//로그인 실패
				return userDto; // => pk : 0
			}
		}else {
			// 없는 아이디
			return null;
		}
	}

	@Override
	public UserDto userFind(String userId) {
		return userDao.userFindById(userId); // 유저의 아이디를 통해 유저정보 얻어옴
	}

    @Override
    public UserDto userFind(int userNo) {
		return userDao.userFindByNo(userNo);
    }

    @Override
	public int userUpdate(UserRegisterDto userDto){
		userDao.deleteCategory(userDto.getUserNo());
		int created = userDao.userUpdate(userDto);
		return created;
	}

	@Override
	public void userDelete(String userId){
		UserDto dto = userDao.userFindById(userId);
		userDao.deleteCategory(dto.getUserNo());
		userDao.userDelete(userId);
	}

	@Override
	public void addCategory(int userNo, int categoryNo) {
		Map map = new HashMap();
		map.put("userNo", userNo);
		map.put("categoryNo", categoryNo);
		userDao.addCategory(map);
	}

	@Override
	public boolean userIdCheck(String id){
		boolean result = true;
		int count= userDao.userIdCheck(id);
		if(count > 0){
			result = false;
		}
		return result;
	}

	@Override
	public boolean userNickCheck(String nick) {
		boolean result = true;
		int count= userDao.userNickCheck(nick);
		if(count > 0) {
			result = false;
		}
		return result;
	}

	@Override
	public List getUserCategory(int userNo) {
		List<Integer> categories = userDao.getUserCategory(userNo);
		return categories;
	}

}
