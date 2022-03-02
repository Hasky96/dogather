package com.dogather.pjtserver.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ProductOptionDto {
    private int productNo;
    private int optionNo;
    private String optionName;
    private int optionPrice;
}
