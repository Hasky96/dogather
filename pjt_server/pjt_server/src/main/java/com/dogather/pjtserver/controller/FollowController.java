package com.dogather.pjtserver.controller;

import com.dogather.pjtserver.dto.FollowDto;
import com.dogather.pjtserver.service.FollowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/follow")
public class FollowController {

    @Autowired
    FollowService followService;

    @PostMapping
    public int follow(@RequestBody FollowDto dto){
        return followService.follow(dto);
    }

    @DeleteMapping
    public int unfollow(@RequestBody FollowDto dto){
        return followService.unfollow(dto);
    }

    @GetMapping("/{userNo}")
    public List<FollowDto> followList(@PathVariable int userNo){
        List<FollowDto> dto = followService.followList(userNo);
        return dto;
    }
}
