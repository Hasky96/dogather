package com.dogather.pjtserver.dto;

import lombok.Data;

@Data
public class LikeDto {

    private int userNo;

    private int postNo;

    private int likeCount;

    private String boardTitle;

}
