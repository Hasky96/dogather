package com.dogather.pjtserver.controller;

import com.dogather.pjtserver.dto.BoardDto;
import com.dogather.pjtserver.dto.UserDto;
import com.dogather.pjtserver.dto.UserRegisterDto;
import com.dogather.pjtserver.dto.UserResponseDto;
import com.dogather.pjtserver.dto.*;
import com.dogather.pjtserver.jwt.JwtProvider;
import com.dogather.pjtserver.jwt.JwtRet;
import com.dogather.pjtserver.jwt.SecureHash;
import com.dogather.pjtserver.service.BoardService;
import com.dogather.pjtserver.service.GroupService;
import com.dogather.pjtserver.service.UserService;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
import java.util.List;

@RestController
@RequestMapping("/user")
@Slf4j
public class UserController {

	@Autowired
	UserService userService;

	@Autowired
	BoardService boardService;

	@Autowired
	GroupService groupService;


	//회원가입
	@PostMapping("/register")
	public ResponseEntity<UserRegisterDto> register(@RequestBody UserRegisterDto dto){
 		try{
			 // SHA256을 이용한 PW, Email hashing
			dto.setUserPw(SecureHash.hashing256(dto.getUserPw()));
//			dto.setUserEmail(SecureHash.hashing256(dto.getUserEmail()));
			int created = userService.userRegister(dto);
			List<Integer> list = dto.getUserCategory();
			if( list != null && created > 0) {
				for (int i : list) {
					userService.addCategory(dto.getUserNo(), i);
				}
			}
			if (created > 0) {
				dto.setMsg("가입완료");
				return new ResponseEntity<UserRegisterDto>(dto, HttpStatus.OK);
			}else {
				return new ResponseEntity<UserRegisterDto>(dto, HttpStatus.BAD_REQUEST);
			}
		}catch (Exception e){
			 return new ResponseEntity<UserRegisterDto>((UserRegisterDto) null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	//로그인
	@PostMapping("/login")
	public ResponseEntity<JwtRet> login(@RequestBody UserDto userDto){
		JwtRet ret =  new JwtRet(); //return value for client by JSON
		try{
			userDto.setUserPw(SecureHash.hashing256(userDto.getUserPw()));
		} catch (NoSuchAlgorithmException e) {
			ret.setMsg(e.toString());
			return new ResponseEntity<JwtRet>(ret,HttpStatus.BAD_REQUEST);
		} catch (Exception e){
			ret.setMsg(e.toString());
			return new ResponseEntity<JwtRet>(ret,HttpStatus.BAD_REQUEST);
		}
		// 로그인
		UserDto loginResult = userService.userLogin(userDto); // userService에 로그인 요청
		if (loginResult != null) {
			// 있는 아이디
			if (loginResult.getUserNo() == 0) {
				// 비밀번호 틀림
				System.err.println("로그인 요청 : 비밀번호 틀림!!!");
				ret.setMsg("wrongPw");
				return new ResponseEntity<JwtRet>(ret, HttpStatus.NOT_FOUND);
			}else {
				// 로그인 성공
				String jwt = JwtProvider.getToken(loginResult.getUserId());
				loginResult.setUserPw(null);
				ret.setJwt(jwt);
				ret.setMsg("success");
				ret.setUserInfo(loginResult);
				return new ResponseEntity<JwtRet>(ret, HttpStatus.OK);
			}
		}else {
			//없는 아이디
			System.err.println("로그인 요청 : 비밀번호 틀림!!!");
			ret.setMsg("wrongid");
			return new ResponseEntity<JwtRet>(ret, HttpStatus.NOT_FOUND);
		}

	}
	@PutMapping("/{userId}")
	public ResponseEntity<Integer> update(@PathVariable String userId, @RequestHeader String jwt, @RequestBody UserRegisterDto userDto){
		int created = 0;
		try {
			userDto.setUserId(userId);
			int userNo = userService.userFind(userId).getUserNo();
			userDto.setUserNo(userNo);
			created = userService.userUpdate(userDto);
			List<Integer> list = userDto.getUserCategory();
			if( list != null && created > 0) {
				for (int i : list) {
					userService.addCategory(userNo, i);
				}
			}
		}catch(Exception e){
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		}
			return ResponseEntity.status(HttpStatus.OK).body(created);

	}

	@DeleteMapping("/{userId}")
	public ResponseEntity<String> delete(@PathVariable String userId, @RequestHeader String jwt){
		userService.userDelete(userId);
		return ResponseEntity.status(HttpStatus.OK).body(userId + " deleted completely!");
	}

	@GetMapping("/{userNo}/info")
	public ResponseEntity<UserRegisterDto> getUserInfo(@PathVariable int userNo){
		UserRegisterDto user= new UserRegisterDto();
		user.setUserInfo(userService.userFind(userNo));
		user.setUserCategory(userService.getUserCategory(userNo));
		user.setUserPw("*******");
		return new ResponseEntity<UserRegisterDto>(user, HttpStatus.OK);
	}

	@GetMapping("/{userId}")
	public ResponseEntity<UserResponseDto> find(@PathVariable String userId, @RequestHeader String jwt){
		UserResponseDto userResponseDto = new UserResponseDto();
		UserDto userInfo = userService.userFind(userId);
		userInfo.setUserPw(null);
		List<BoardDto> likeBoards = boardService.findUserLikeBoard(userInfo.getUserNo());
		List<GroupReturnDto> likeGroups = groupService.findUserLikeGroup(userInfo.getUserNo());
		List<GroupSummaryDto> paymentGroup = groupService.findPaymentGroup(userInfo.getUserNo());
		List<GroupReturnDto> saleGroup = groupService.findSaleGroup(userInfo.getUserNo());
		userResponseDto.setUserId(userId);
		userResponseDto.setUserInfo(userInfo);
		userResponseDto.setLikeBoards(likeBoards);
		userResponseDto.setLikeGroups(likeGroups);
		userResponseDto.setPaymentGroup(paymentGroup);
		userResponseDto.setSaleGroup(saleGroup);
		return ResponseEntity.status(HttpStatus.OK).body(userResponseDto);//ResponseEntity<UserDto>(userDto, HttpStatus.OK);
	}

	@GetMapping("/idcheck")
	public ResponseEntity<Boolean> idCheck(@RequestParam String id){
		boolean result = userService.userIdCheck(id);
		return ResponseEntity.status(HttpStatus.OK).body(result);//ResponseEntity<UserDto>(userDto, HttpStatus.OK);
	}

	@GetMapping("/nickcheck")
	public ResponseEntity<Boolean> nickCheck(@RequestParam String nick){
		boolean result = userService.userNickCheck(nick);
		return new ResponseEntity<Boolean>(result, HttpStatus.OK);
	}

}
