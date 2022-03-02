package com.dogather.pjtserver.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class GroupEnterDto {
    private int userNo;
    private int groupNo;
    private int groupLeader;
}
