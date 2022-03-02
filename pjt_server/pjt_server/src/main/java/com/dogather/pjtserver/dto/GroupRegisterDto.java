package com.dogather.pjtserver.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
@Getter
@Setter
public class GroupRegisterDto {
    private GroupDto group;
    private List<OptionDto> options;
    private List<FAQRequsetDto> requestfaq;
}
