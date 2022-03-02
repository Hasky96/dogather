package com.dogather.pjtserver.dao;

import com.dogather.pjtserver.dto.BoardMediaDto;
import com.dogather.pjtserver.dto.GroupMediaDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface GroupMediaDao {
    public int insertMedia(List<GroupMediaDto> fileList);

    public List<GroupMediaDto> findAllMedia(int groupNo);

    public void deleteMedia(int mediaNo);

    public GroupMediaDto findMedia(int mediaNo);
}
