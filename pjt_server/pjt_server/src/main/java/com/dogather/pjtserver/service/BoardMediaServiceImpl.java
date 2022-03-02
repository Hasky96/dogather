package com.dogather.pjtserver.service;

import com.dogather.pjtserver.dao.BoardMediaDao;
import com.dogather.pjtserver.dto.BoardMediaDto;
import com.dogather.pjtserver.dto.GroupMediaDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BoardMediaServiceImpl implements BoardMediaService{

    @Autowired
    public BoardMediaDao mediaDao;

    @Override
    public List<BoardMediaDto> findAllMedia(int postNo) {
        List<BoardMediaDto> mediaDtoList = mediaDao.findAllMedia(postNo);
        return mediaDtoList;
    }

    @Override
    public BoardMediaDto findMedia(int mediaNo) {
        BoardMediaDto mediadto = mediaDao.findMedia(mediaNo);
        return mediadto;
    }

    @Override
    public void deleteMedia(int mediaNo) {
        mediaDao.deleteMedia(mediaNo);
    }

}
