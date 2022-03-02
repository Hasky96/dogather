package com.dogather.pjtserver.service;

import com.dogather.pjtserver.dto.PaymentDto;
import com.dogather.pjtserver.dto.PaymentListDto;

import java.util.List;

public interface PaymentService {
    public int payment(PaymentListDto payments);
}
