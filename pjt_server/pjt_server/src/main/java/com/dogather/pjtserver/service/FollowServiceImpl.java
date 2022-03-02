package com.dogather.pjtserver.service;

import com.dogather.pjtserver.dao.FollowDao;
import com.dogather.pjtserver.dto.FollowDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FollowServiceImpl implements FollowService{

    @Autowired
    FollowDao followDao;

    @Override
    public int follow(FollowDto dto) {
        return followDao.follow(dto);
    }

    @Override
    public int unfollow(FollowDto dto) {
        return followDao.unfollow(dto);
    }

    @Override
    public List<FollowDto> followList(int userNo) {
        return followDao.followList(userNo);
    }
}
