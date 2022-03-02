package com.dogather.pjtserver.service;

import com.dogather.pjtserver.dao.LikeDao;
import com.dogather.pjtserver.dto.LikeDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LikeServiceImpl implements LikeService{
    @Autowired
    LikeDao likeDao;


    @Override
    public int like(LikeDto likeDto) {
        return likeDao.like(likeDto);
    }

    @Override
    public int unlike(LikeDto likeDto) {
        return likeDao.unlike(likeDto);
    }

    @Override
    public List<Integer> findLikeAtBoard(int postNo) {
        return likeDao.findLikeAtBoard(postNo);
    }

    @Override
    public List<Integer> findLikeBoardByUser(int userNo) {
        List<Integer> likeBoardNoList = likeDao.findLikeBoardByUser(userNo);
        return likeBoardNoList;
    }
}
