package com.dogather.pjtserver.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDate;

@Data
public class BoardMediaDto {

    private int mediaNo;

    private int postNo;

    private String mediaTitile;

    private String mediaSavename;

    private LocalDate insertDate;

    private String mediaFilesize;

}
