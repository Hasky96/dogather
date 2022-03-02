package com.dogather.pjtserver.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class ResultPaymentDto {
    private String optionName;
    private int amount;
    private int amountOfPrice;
}
