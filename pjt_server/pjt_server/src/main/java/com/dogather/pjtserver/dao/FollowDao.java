package com.dogather.pjtserver.dao;

import com.dogather.pjtserver.dto.FollowDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface FollowDao {
    public int follow(FollowDto dto);
    public int unfollow(FollowDto dto);
    public List<FollowDto> followList(int userNo);
}
