package com.dogather.pjtserver.service;

import com.dogather.pjtserver.dto.FollowDto;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface FollowService{
    public int follow(FollowDto dto);
    public int unfollow(FollowDto dto);
    public List<FollowDto> followList(int userNo);
}
