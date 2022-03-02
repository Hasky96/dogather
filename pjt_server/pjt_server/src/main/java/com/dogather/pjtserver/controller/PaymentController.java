package com.dogather.pjtserver.controller;

import com.dogather.pjtserver.dto.PaymentDto;
import com.dogather.pjtserver.dto.PaymentListDto;
import com.dogather.pjtserver.service.PaymentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/payment")
@Slf4j
public class PaymentController {

    @Autowired
    PaymentService service;

    @PostMapping
    public int payment(@RequestBody PaymentListDto payments){
//        PaymentListDto paymentListDto = new PaymentListDto();
//        paymentListDto.setPayments(Arrays.asList(payments));
//        paymentListDto.setPayments((List<PaymentDto>)map.get("payments"));
        log.info(payments.toString());
        return service.payment(payments);
    }

}
