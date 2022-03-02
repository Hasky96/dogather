package com.dogather.pjtserver.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Data
public class GroupOptionDto {
    private int groupNo;
    private int groupLeader;
    private String leaderName;
    private int categoryNo;
    private String categoryName;
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
    private List<OptionDto> options;
    private List<String> mediaList;
    private List<FAQDto> FaqList;
    private String mainImage;
    private int count;
    private int isliked;


    public void setGroupDto(GroupReturnDto groupReturnDto){
        this.groupNo = groupReturnDto.getGroupNo();
        this.groupLeader = groupReturnDto.getGroupLeader();
        this.leaderName = groupReturnDto.getLeaderName();
        this.categoryNo = groupReturnDto.getCategoryNo();
        this.categoryName = groupReturnDto.getCategoryName();
        this.updated = groupReturnDto.getUpdated();
        this.created = groupReturnDto.getCreated();
        this.deadline = groupReturnDto.getDeadline();
        this.maxPeople = groupReturnDto.getMaxPeople();
        this.view = groupReturnDto.getView();
        this.status = groupReturnDto.getStatus();
        this.product = groupReturnDto.getProduct();
        this.detail = groupReturnDto.getDetail();
        this.link = groupReturnDto.getLink();
        this.originPrice = groupReturnDto.getOriginPrice();
        this.price = groupReturnDto.getPrice();
        this.count = groupReturnDto.getCount();
        this.isliked = groupReturnDto.getIsLiked();

    }

}
