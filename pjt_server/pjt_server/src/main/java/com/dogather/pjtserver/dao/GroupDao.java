package com.dogather.pjtserver.dao;

import com.dogather.pjtserver.dto.*;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface GroupDao {
    public int groupRegister(GroupDto groupDto);
    public int groupUpdate(GroupDto groupDto);
    public int groupDelete(int groupNo);
    public GroupReturnDto group(int groupNo);
    public int groupEnter(GroupEnterDto dto);
    public int groupOut(GroupEnterDto dto);
    public List<GroupReturnDto> getList();
    public List<GroupReturnDto> getCategoryList(Map map);
    public List<GroupReturnDto> search(Map map);
    public List<GroupReturnDto> getHotList();
    public List<GroupReturnDto> getNewList();
    public List<GroupReturnDto> getEndSoonList();
    public List<GroupReturnDto> getRecommendList(List categories);


    public int addInterest(GroupInterestDto dto);
    public List<GroupInterestDto> interestlist(int userNo);
    public List<OptionDto> getOptions(int groupNo);
    public void addOption(Map<String, Object> param);

    public List<GroupReturnDto> categoryList(int categoryNo);
    public List<GroupReturnDto> wordSearch(List<String> wordList);
    public Integer getMainImage(int groupNo);

    public List<GroupReturnDto> personSearch(String person);

    public int review(ReviewDto dto);

    public double reviewAvg(int userNo);

    public List<Integer> findLikeGroupByUser(int userNo);

    public List<GroupSummaryDto> findPaymentGroup(int userNo);

    public List<GroupReturnDto> findSaleGroup(int userNo);

    public List<ReviewDto> reviewList(int userNo);

    public void groupViewsInsert(@Param("userNo")int userNo, @Param("groupNo") int groupNo);

    public int groupViewsCheck(@Param("userNo") int userNo, @Param("groupNo") int groupNo);

    public void groupViewsPlus(int groupNo);

    public void updateOption(Map<String, Object> map);

    public void deleteOptions(int groupNo);

    public Integer isliked(int userNo, int groupNo);
}
