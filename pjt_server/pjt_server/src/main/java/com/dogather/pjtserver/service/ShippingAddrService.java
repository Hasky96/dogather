package com.dogather.pjtserver.service;

import com.dogather.pjtserver.dto.ShippingAddrDto;

import java.util.List;

public interface ShippingAddrService {

    public int addShippingAddr(ShippingAddrDto dto);
    public int editShippingAddr(ShippingAddrDto dto);
    public void deleteShippingAddr(int addrNo);
    public ShippingAddrDto getShippingAddr(int addrNo);
    public List<ShippingAddrDto> addrList(int userNo);

}
