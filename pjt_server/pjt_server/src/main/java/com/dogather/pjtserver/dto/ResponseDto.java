package com.dogather.pjtserver.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class ResponseDto {

    private int postNo;

    private int writerNo;

    private String boardTitle;

    private String boardContent;

    private LocalDateTime created;

    private LocalDateTime updated;

    private String boardType;

    private int boardView;

    private byte[] mediaNo;

    private List<CommentDto> commentList;

    private List<Integer> likeUsers;
}
