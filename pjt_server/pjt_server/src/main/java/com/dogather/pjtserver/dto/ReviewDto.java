package com.dogather.pjtserver.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class ReviewDto {
    private int userFrom;
    private int userTo;
    private int star;
    private String content;
}
