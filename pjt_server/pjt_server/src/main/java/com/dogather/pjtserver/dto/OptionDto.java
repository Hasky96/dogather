package com.dogather.pjtserver.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class OptionDto {
    private int optionNo;
    private String optionName;
    private int optionPrice;
}
