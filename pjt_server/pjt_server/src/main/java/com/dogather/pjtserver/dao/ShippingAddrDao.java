package com.dogather.pjtserver.dao;

import com.dogather.pjtserver.dto.ShippingAddrDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ShippingAddrDao {

    public void addShippingAddr(ShippingAddrDto dto);
    public void editShippingAddr(ShippingAddrDto dto);
    public ShippingAddrDto getShippingAddr(int addrNo);
    public void deleteShippingAddr(int addrNo);
    public List<ShippingAddrDto> addrList(int userNo);

}
