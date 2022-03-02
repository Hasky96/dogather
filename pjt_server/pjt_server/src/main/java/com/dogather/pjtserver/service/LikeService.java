package com.dogather.pjtserver.service;

import com.dogather.pjtserver.dto.LikeDto;

import java.util.List;

public interface LikeService {

    public int like(LikeDto likeDto);

    public int unlike(LikeDto likeDto);

    public List<Integer> findLikeAtBoard(int postNo);

    public List<Integer> findLikeBoardByUser(int userNo);
}
