package com.dogather.pjtserver.dao;

import com.dogather.pjtserver.dto.BoardMediaDto;
import com.dogather.pjtserver.dto.GroupMediaDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BoardMediaDao {

    public int insertMedia(List<BoardMediaDto> fileList);

    public List<BoardMediaDto> findAllMedia(int postNo);

    public BoardMediaDto findMedia(int mediaNo);

    void deleteMedia(int mediaNo);

    public GroupMediaDto findGroupMedia(int mediaNo);
}
