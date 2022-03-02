package com.dogather.pjtserver.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class GroupListDto {
    private List<GroupReturnDto> list;
}
