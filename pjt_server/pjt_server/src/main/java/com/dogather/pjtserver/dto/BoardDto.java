package com.dogather.pjtserver.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BoardDto {

    private int postNo;

    private int writerNo;

    private String boardTitle;

    private String boardContent;

    private LocalDateTime created;

    private LocalDateTime updated;

    private String boardType;

    private int boardView;

}
