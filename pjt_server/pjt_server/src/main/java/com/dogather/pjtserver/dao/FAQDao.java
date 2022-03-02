package com.dogather.pjtserver.dao;

import com.dogather.pjtserver.dto.FAQDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface FAQDao {
    public int createFaq(FAQDto faqDto);

    public int updateFaq(FAQDto faqDto);

    List<FAQDto> readFaq(int groupNo, int categoryNo);

    public FAQDto selectFaqDetail(int groupNo, int faqNo);

    int deleteFaq(int groupNo, int faqNo);

    public List<FAQDto> readFaqAll(int groupNo);

    public void deleteFaqs(int groupNo);
}
