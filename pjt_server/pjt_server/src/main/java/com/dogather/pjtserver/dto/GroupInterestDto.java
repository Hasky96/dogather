package com.dogather.pjtserver.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;


import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Getter
@Setter
public class GroupInterestDto {
    private int userNo;
    private int groupNo;

}
