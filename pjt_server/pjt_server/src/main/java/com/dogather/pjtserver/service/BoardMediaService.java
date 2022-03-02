package com.dogather.pjtserver.service;

import com.dogather.pjtserver.dto.BoardMediaDto;
import com.dogather.pjtserver.dto.GroupMediaDto;

import java.util.List;

public interface BoardMediaService {
    public List<BoardMediaDto> findAllMedia(int postNo);

    public BoardMediaDto findMedia(int mediaNo);

    void deleteMedia(int mediaNo);

}
