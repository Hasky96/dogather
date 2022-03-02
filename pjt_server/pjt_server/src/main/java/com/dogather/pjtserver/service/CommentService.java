package com.dogather.pjtserver.service;

import com.dogather.pjtserver.dto.CommentDto;

import java.util.List;

public interface CommentService {


    public int createComment(CommentDto commentDto);


    public int updateComment(int commentNo, CommentDto commentDto);

    public int deleteComment(int commentNo);

    public CommentDto findComment(int commentNo);


    public List<CommentDto> findAllComment(int postNo);
}
