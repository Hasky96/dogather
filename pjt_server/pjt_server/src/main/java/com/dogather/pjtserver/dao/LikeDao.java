package com.dogather.pjtserver.dao;

import com.dogather.pjtserver.dto.LikeDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface LikeDao {

    public int like(LikeDto likeDto);

    public int unlike(LikeDto likeDto);

    public List<Integer> findLikeAtBoard(int postNo);

    public List<Integer> findLikeBoardByUser(int userNo);
}
