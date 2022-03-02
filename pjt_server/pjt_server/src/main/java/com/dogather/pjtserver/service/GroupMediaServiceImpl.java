package com.dogather.pjtserver.service;

import com.dogather.pjtserver.dao.GroupMediaDao;
import com.dogather.pjtserver.dto.GroupMediaDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GroupMediaServiceImpl implements GroupMediaService{

    @Autowired
    public GroupMediaDao mediaDao;

    @Override
    public List<GroupMediaDto> fineAllMedia(int groupNo) {
        List<GroupMediaDto> mediaDtoList = mediaDao.findAllMedia(groupNo);
        return mediaDtoList;
    }

    @Override
    public void deleteMedia(int mediaNo) {
        mediaDao.deleteMedia(mediaNo);
    }

    @Override
    public GroupMediaDto findGroupMedia(int mediaNo) {
        GroupMediaDto mediaDto = mediaDao.findMedia(mediaNo);
        return mediaDto;
    }


}
