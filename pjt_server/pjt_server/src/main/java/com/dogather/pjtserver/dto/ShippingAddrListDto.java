package com.dogather.pjtserver.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
@Getter
@Setter
public class ShippingAddrListDto {
    private List<ShippingAddrDto> shipping_addresses;
}
