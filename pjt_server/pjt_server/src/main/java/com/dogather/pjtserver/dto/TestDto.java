package com.dogather.pjtserver.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class TestDto {

    private int postNo;

    private int writerNo;

    private String boardTitle;

    private String boardContent;

    private LocalDateTime created;

    private LocalDateTime updated;

    private String boardType;

    private int boardView;

    private List<BoardMediaDto> mediaList;

    private List<CommentDto> commentList;

    private List<LikeDto> likeList;

}
