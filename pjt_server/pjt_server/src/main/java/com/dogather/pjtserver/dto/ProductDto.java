package com.dogather.pjtserver.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ProductDto {
    private int productNo;
    private int groupNo;
    private String productName;
    private String productDetail;
    private String productLink;
    private String productOriginalPrice;
    private String productPrice;

}
