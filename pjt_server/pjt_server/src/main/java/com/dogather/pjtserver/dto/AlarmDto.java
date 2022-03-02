package com.dogather.pjtserver.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class AlarmDto {
    private int msgNo;
    private String userNick;
    private String msg;
    private int read;
}
