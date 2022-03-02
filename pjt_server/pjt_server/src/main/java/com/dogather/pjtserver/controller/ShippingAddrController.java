package com.dogather.pjtserver.controller;

import com.dogather.pjtserver.dto.ShippingAddrDto;
import com.dogather.pjtserver.dto.ShippingAddrListDto;
import com.dogather.pjtserver.service.ShippingAddrService;
import com.dogather.pjtserver.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/addr")
public class ShippingAddrController {

    @Autowired
    UserService userService;

    @Autowired
    ShippingAddrService shippingAddrService;

    @GetMapping("/list")
    public ResponseEntity<ShippingAddrListDto> addrList(@RequestHeader String userId){
        int userNo = userService.userFind(userId).getUserNo();
        ShippingAddrListDto dto = new ShippingAddrListDto();
        dto.setShipping_addresses(shippingAddrService.addrList(userNo));
        return new ResponseEntity<ShippingAddrListDto>(dto, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Integer> addShippingAddr(@RequestBody ShippingAddrDto dto){
        int ret = shippingAddrService.addShippingAddr(dto);
        return new ResponseEntity<Integer>(ret, HttpStatus.CREATED);
    }

    @PutMapping("/{addrNo}")
    public ResponseEntity<Integer> editShippingAddr(@PathVariable int addrNo, @RequestBody ShippingAddrDto dto){
        dto.setAddrNo(addrNo);
        int ret = shippingAddrService.editShippingAddr(dto);
        return new ResponseEntity<Integer>(ret, HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{addrNo}")
    public ResponseEntity<Integer> deleteShippingAddr(@PathVariable int addrNo, @RequestHeader String userId){
        int addrUserNo = shippingAddrService.getShippingAddr(addrNo).getUserNo();
        int userNo = userService.userFind(userId).getUserNo();
        if(addrUserNo==userNo){
            shippingAddrService.deleteShippingAddr(addrNo);
        }
        return new ResponseEntity<Integer>(1,HttpStatus.OK);
    }
}
