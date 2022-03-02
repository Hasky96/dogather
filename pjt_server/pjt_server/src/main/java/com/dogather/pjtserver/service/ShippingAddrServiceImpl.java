package com.dogather.pjtserver.service;

import com.dogather.pjtserver.dao.ShippingAddrDao;
import com.dogather.pjtserver.dto.ShippingAddrDto;
import com.dogather.pjtserver.dto.ShippingAddrListDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShippingAddrServiceImpl implements ShippingAddrService{

    @Autowired
    ShippingAddrDao shippingAddrDao;

    @Override
    public int addShippingAddr(ShippingAddrDto dto) {
        int ret = 0;
        try {
            shippingAddrDao.addShippingAddr(dto);
            ret = 1;
        }catch(Exception e){
            System.err.println(e);
        }
        return ret;
    }

    @Override
    public int editShippingAddr(ShippingAddrDto dto) {
        int ret = 0;
        try {
            shippingAddrDao.editShippingAddr(dto);
            ret = 1;
        }catch(Exception e){
            System.err.println(e);
        }
        return ret;
    }

    @Override
    public void deleteShippingAddr(int addrNo) {
        shippingAddrDao.deleteShippingAddr(addrNo);
    }

    @Override
    public ShippingAddrDto getShippingAddr(int addrNo) {
        ShippingAddrDto dto = shippingAddrDao.getShippingAddr(addrNo);
        return dto;
    }

    @Override
    public List<ShippingAddrDto> addrList(int userNo) {
        List<ShippingAddrDto> list = shippingAddrDao.addrList(userNo);
        return list;
    }
}
