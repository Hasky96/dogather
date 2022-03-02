package com.dogather.pjtserver.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class FAQDto {

    private int faqNo;

    private int groupNo;

    private int categoryNo;

    private String faqQuestion;

    private String faqAnswer;
}
