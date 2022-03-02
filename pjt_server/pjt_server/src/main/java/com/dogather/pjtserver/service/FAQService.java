package com.dogather.pjtserver.service;

import com.dogather.pjtserver.dto.FAQDto;

import java.util.List;

public interface FAQService {

    boolean registerFaq(FAQDto faqDto);

    List<FAQDto> readFaqAll(int groupNo);

    List<FAQDto> readFaq(int groupNo, int categoryNo);

    boolean deleteFaq(int groupNo, int faqNo);
}
