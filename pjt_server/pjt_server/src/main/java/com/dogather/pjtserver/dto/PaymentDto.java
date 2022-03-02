package com.dogather.pjtserver.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
@Getter
@Setter
public class PaymentDto {
    private int userNo;
    private int groupNo;
    private String optionName;
    private int optionNo;
    private int amount;
    private int price;

    private List<PaymentDto> payments;




}
