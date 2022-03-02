package com.dogather.pjtserver.dao;

import com.dogather.pjtserver.dto.CommentDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CommentDao {
    public int createComment(CommentDto commentDto);

    public int updateComment(CommentDto commentDto);

    public int deleteComment(int commentNo);

    public CommentDto findComment(int commentNo);

    public List<CommentDto> findAllComment(int postNo);
}
