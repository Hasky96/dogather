package com.dogather.pjtserver.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CommentDto {

    private int commentNo;

    private int postNo;

    private int writerNo;

    private String commentContent;

    private LocalDateTime created;
}
