package com.dogather.pjtserver.controller;

import com.dogather.pjtserver.dto.CommentDto;
import com.dogather.pjtserver.service.CommentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@Slf4j
@RequestMapping("/comment")
public class CommentController {

    @Autowired
    CommentService commentService;

    @PostMapping
    public int createComment(@RequestBody CommentDto commentDto) {
        commentDto.setCreated(LocalDateTime.now());
        log.info(commentDto.toString());
       return commentService.createComment(commentDto);
    }

    @PutMapping("/{commentNo}")
    public int updateComment(@PathVariable int commentNo, @RequestBody CommentDto commentDto) {
        return commentService.updateComment(commentNo, commentDto);
    }

    @DeleteMapping("/{commentNo}")
    public int deleteComment(@PathVariable int commentNo) {
        return commentService.deleteComment(commentNo);
    }
}
