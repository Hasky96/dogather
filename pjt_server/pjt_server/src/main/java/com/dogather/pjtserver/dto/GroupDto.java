package com.dogather.pjtserver.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Data
@Getter
@Setter
public class GroupDto {
    private int groupNo;
    private int groupLeader;
    private int categoryNo;
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
    private String tmpDeadLine;
}
