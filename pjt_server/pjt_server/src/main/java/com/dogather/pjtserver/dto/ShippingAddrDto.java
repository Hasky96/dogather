package com.dogather.pjtserver.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class ShippingAddrDto {

    private int addrNo;
    private int userNo;
    private String title;
    private String receiver;
    private String address1;
    private String address2;
    private int zip;
    private String tel;

}
