package com.dogather.pjtserver.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@ToString
public class GroupSummaryDto {
    private int groupNo;
    private LocalDateTime updated;
    private LocalDateTime created;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime deadline;
    private int maxPeople;
    private int view;
    private String status;
    private String product;
    private String detail;
    private String link;
    private int originPrice;
    private int price;
    private String mainImage;
    private int categoryNo;
    private String categoryName;
    private int groupLeader;
    private String leaderName;
    private int count;

    private List<ResultPaymentDto> resultPaymentDtos;
}
