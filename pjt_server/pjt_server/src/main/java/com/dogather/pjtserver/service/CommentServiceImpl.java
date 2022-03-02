package com.dogather.pjtserver.service;

import com.dogather.pjtserver.dao.CommentDao;
import com.dogather.pjtserver.dto.CommentDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentServiceImpl implements CommentService{

    @Autowired
    CommentDao commentDao;

    @Override
    public int createComment(CommentDto commentDto) {
        return commentDao.createComment(commentDto);
    }

    @Override
    public int updateComment(int commentNo, CommentDto commentDto) {
        CommentDto updated = commentDao.findComment(commentNo);
        if (updated != null) {
            updated.setCommentContent(commentDto.getCommentContent());
            return commentDao.updateComment(updated);
        } else {
            return 0;
        }
    }

    @Override
    public int deleteComment(int commentNo) {
        CommentDto deleted = commentDao.findComment(commentNo);
        if(deleted != null) {
            return commentDao.deleteComment(commentNo);
        } else {
            return 0;
        }
    }

    @Override
    public CommentDto findComment(int commentNo) {
        return commentDao.findComment(commentNo);
    }

    @Override
    public List<CommentDto> findAllComment(int postNo) {
        return commentDao.findAllComment(postNo);
    }

}
