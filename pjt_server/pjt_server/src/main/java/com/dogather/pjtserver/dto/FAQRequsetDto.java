package com.dogather.pjtserver.dto;

import lombok.Data;

@Data
public class FAQRequsetDto {

    private int categoryNo;

    private String faqQuestion;

    private String faqAnswer;
}
