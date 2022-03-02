package com.dogather.pjtserver.service;

import com.dogather.pjtserver.dao.*;
import com.dogather.pjtserver.dto.*;
import com.dogather.pjtserver.handler.FileHandler;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
@Slf4j
public class GroupServiceImpl implements GroupService {

    @Autowired
    GroupDao groupDao;

    @Autowired
    FAQDao faqDao;

    @Autowired
    FileHandler fileHandler;

    @Autowired
    GroupMediaDao mediaDao;

    @Autowired
    PaymentDao paymentDao;


    @Override
    public int groupRegister(GroupDto groupDto) {
        return groupDao.groupRegister(groupDto);
    }

    @Override
    public int groupRegister(GroupDto groupDto, List<MultipartFile> files, MultipartFile mainImage) throws IOException {
        int queryResult;
        List<GroupMediaDto> mediaList = new ArrayList<>();
        if (groupRegister(groupDto) == 0)
            return 0;
        if (files != null) {
            mediaList = fileHandler.uploadGroupFiles(files, groupDto.getGroupNo());
        }
        if (mainImage != null) {
            GroupMediaDto mainImageDto = fileHandler.uploadMainImage(mainImage, groupDto.getGroupNo());
            mediaList.add(mainImageDto);
        }
        log.info(String.valueOf(mediaList.size()));
        if (CollectionUtils.isEmpty(mediaList) == false) {
            mediaDao.insertMedia(mediaList);
        }
        queryResult = groupDto.getGroupNo();
        return queryResult;
    }


//    @Override
//    public int groupUpdate(int groupNo, GroupDto updategroupDto, List<MultipartFile> addMediaList) throws IOException {
//        int queryResult = 1;
//        groupDao.groupUpdate(updategroupDto);
//        List<GroupMediaDto> mediaList = fileHandler.uploadGroupFiles(addMediaList, groupNo);
//        if (CollectionUtils.isEmpty(mediaList) == false) {
//            queryResult = mediaDao.insertMedia(mediaList);
//            if (queryResult < 1) {
//                queryResult = 0;
//            }
//        }
//        return queryResult;
//    }

    @Override
    public int groupUpdate(int groupNo, GroupDto updategroupDto) throws IOException {
        updategroupDto.setGroupNo(groupNo);
        int queryResult = groupDao.groupUpdate(updategroupDto);
//        if (queryResult == 1) {
//            List<OptionDto> options = groupDao.getOptions(groupNo);
//            List<FAQDto> faqs = faqDao.readFaqAll(groupNo);
//            if (options != null)
//                groupDao.deleteOptions(groupNo);
//            if (faqs != null)
//                faqDao.deleteFaqs(groupNo);
//        }
        return queryResult;
    }

    @Override
    public int groupDelete(int groupNo) {
        int deleted = groupDao.groupDelete(groupNo);
        if (deleted == 1) {
            return 1;
        } else {
            return 0;
        }
    }

    @Override
    public GroupReturnDto group(int groupNo) {
        log.info("'======그룹 시작;");
        log.info(String.valueOf(groupNo));
        GroupReturnDto groupReturnDto = groupDao.group(groupNo);
        log.info(groupReturnDto.toString());
        return groupReturnDto;
    }

    @Override
    public int groupEnter(GroupEnterDto dto) {
        int entered = groupDao.groupEnter(dto);
        if (entered == 1) {
            return 1;
        } else {
            return 0;
        }
    }

    @Override
    public int groupOut(GroupEnterDto dto) {
        int out = groupDao.groupOut(dto);
        if (out == 1) {
            return 1;
        } else {
            return 0;
        }
    }

    @Override
    public List<GroupReturnDto> getList() {
        List<GroupReturnDto> groupList = groupDao.getList();
        for (GroupReturnDto group : groupList) {
//            if (!groupDao.getMainImage(group.getGroupNo()).toString().equals("no")){
            Integer mainImage = groupDao.getMainImage(group.getGroupNo());
            if (mainImage != null) {
                GroupMediaDto mediaDto = mediaDao.findMedia(mainImage);
                String uploadPath = mediaDto.getInsertDate().toString().replace("-", "").substring(2) + "/" + "s_" + mediaDto.getMediaSavename();
                group.setMainImage(uploadPath);
            } else
                group.setMainImage("");
        }
        return groupList;
    }

    @Override
    public List<GroupReturnDto> getCategoryList(int categoryNo, int page) {
        Map map = new HashMap();
        map.put("categoryNo", categoryNo);
        map.put("page", 24*(page-1));
        List<GroupReturnDto> list = groupDao.getCategoryList(map);
        for (GroupReturnDto group : list) {
//            if (!groupDao.getMainImage(group.getGroupNo()).toString().equals("no")){
            Integer mainImage = groupDao.getMainImage(group.getGroupNo());
            if (mainImage != null) {
                GroupMediaDto mediaDto = mediaDao.findMedia(mainImage);
                String uploadPath = mediaDto.getInsertDate().toString().replace("-", "").substring(2) + "/" + "s_" + mediaDto.getMediaSavename();
                group.setMainImage(uploadPath);
            } else
                group.setMainImage("");
        }
        return list;
    }

    @Override
    public List<GroupReturnDto> getHotList() {
        List<GroupReturnDto> groupList = groupDao.getHotList();
        for (GroupReturnDto group : groupList) {
//            if (!groupDao.getMainImage(group.getGroupNo()).toString().equals("no")){
            Integer mainImage = groupDao.getMainImage(group.getGroupNo());
            if (mainImage != null) {
                GroupMediaDto mediaDto = mediaDao.findMedia(mainImage);
                String uploadPath = mediaDto.getInsertDate().toString().replace("-", "").substring(2) + "/" + "s_" + mediaDto.getMediaSavename();
                group.setMainImage(uploadPath);
            } else
                group.setMainImage("");
        }
        return groupList;
    }

    @Override
    public List<GroupReturnDto> getNewList() {
        List<GroupReturnDto> groupList = groupDao.getNewList();
        for (GroupReturnDto group : groupList) {
//            if (!groupDao.getMainImage(group.getGroupNo()).toString().equals("no")){
            Integer mainImage = groupDao.getMainImage(group.getGroupNo());
            if (mainImage != null) {
                GroupMediaDto mediaDto = mediaDao.findMedia(mainImage);
                String uploadPath = mediaDto.getInsertDate().toString().replace("-", "").substring(2) + "/" + "s_" + mediaDto.getMediaSavename();
                group.setMainImage(uploadPath);
            } else
                group.setMainImage("");
        }
        return groupList;
    }

    @Override
    public List<GroupReturnDto> getEndSoonList() {
        List<GroupReturnDto> groupList = groupDao.getEndSoonList();
        for (GroupReturnDto group : groupList) {
//            if (!groupDao.getMainImage(group.getGroupNo()).toString().equals("no")){
            Integer mainImage = groupDao.getMainImage(group.getGroupNo());
            if (mainImage != null) {
                GroupMediaDto mediaDto = mediaDao.findMedia(mainImage);
                String uploadPath = mediaDto.getInsertDate().toString().replace("-", "").substring(2) + "/" + "s_" + mediaDto.getMediaSavename();
                group.setMainImage(uploadPath);
            } else
                group.setMainImage("");
        }
        return groupList;
    }

    @Override
    public List<GroupReturnDto> getRecommendList(List<Integer> categories) {
        List<GroupReturnDto> list = groupDao.getRecommendList(categories);
        Collections.shuffle(list);
        list = list.subList(0,4);
        for (GroupReturnDto group : list) {
//            if (!groupDao.getMainImage(group.getGroupNo()).toString().equals("no")){
            Integer mainImage = groupDao.getMainImage(group.getGroupNo());
            if (mainImage != null) {
                GroupMediaDto mediaDto = mediaDao.findMedia(mainImage);
                String uploadPath = mediaDto.getInsertDate().toString().replace("-", "").substring(2) + "/" + "s_" + mediaDto.getMediaSavename();
                group.setMainImage(uploadPath);
            } else
                group.setMainImage("");
        }
        return list;
    }

    @Override
    public List<GroupReturnDto> search(String query, String nickname,int page) {
        Map map = new HashMap<>();
        List<String> words;
        if(" ".equals(query)){
            words = null;
        }else{
            words = Arrays.asList(query.split(" "));
        }
        if(" ".equals(nickname)){nickname = null;}
        map.put("words", words);
        map.put("nickname", nickname);
        map.put("page",24*(page-1));
        List<GroupReturnDto> list = groupDao.search(map);
        for (GroupReturnDto group : list) {
//            if (!groupDao.getMainImage(group.getGroupNo()).toString().equals("no")){
            Integer mainImage = groupDao.getMainImage(group.getGroupNo());
            if (mainImage != null) {
                GroupMediaDto mediaDto = mediaDao.findMedia(mainImage);
                String uploadPath = mediaDto.getInsertDate().toString().replace("-", "").substring(2) + "/" + "s_" + mediaDto.getMediaSavename();
                group.setMainImage(uploadPath);
            } else
                group.setMainImage("");
        }
        return list;

    }

    @Override
    public int addInterest(GroupInterestDto dto) {
        int result = groupDao.addInterest(dto);
        if (result == 1) {
            return 1;
        } else {
            return 0;
        }
    }

    @Override
    public List<OptionDto> getOptions(int groupNo) {
        List<OptionDto> options = groupDao.getOptions(groupNo);
        return options;
    }

    @Override
    public void addOptions(int groupNo, List<OptionDto> options) {
        for (OptionDto option : options) {
            Map<String, Object> map = new HashMap<String, Object>();
            map.put("groupNo", groupNo);
            map.put("optionName", option.getOptionName());
            map.put("optionPrice", option.getOptionPrice());
            groupDao.addOption(map);
        }
    }

    @Override
    public void addFaq(int groupNo, List<FAQRequsetDto> requestFaq) {
        for (FAQRequsetDto Faq : requestFaq) {
            FAQDto dbFaq = new FAQDto();
            dbFaq.setGroupNo(groupNo);
            dbFaq.setCategoryNo(Faq.getCategoryNo());
            dbFaq.setFaqAnswer(Faq.getFaqAnswer());
            dbFaq.setFaqQuestion(Faq.getFaqQuestion());
            faqDao.createFaq(dbFaq);
        }
    }



    @Override
    public List<GroupReturnDto> wordSearch(List<String> wordList) {
        List<GroupReturnDto> wordSearchList = groupDao.wordSearch(wordList);
        for (GroupReturnDto wordSearchDto : wordSearchList) {
            Integer mainImage = groupDao.getMainImage(wordSearchDto.getGroupNo());
            if (mainImage != null) {
                GroupMediaDto mediaDto = mediaDao.findMedia(mainImage);
                String uploadPath = mediaDto.getInsertDate().toString().replace("-", "").substring(2) + "/" + "s_" + mediaDto.getMediaSavename();
                wordSearchDto.setMainImage(uploadPath);
            } else {
                wordSearchDto.setMainImage("");
            }
        }
        return wordSearchList;
    }

    @Override
    public List<GroupReturnDto> personSearch(String person) {
        return groupDao.personSearch(person);
    }

    @Override
    public int review(ReviewDto dto) {
        return groupDao.review(dto);
    }

    @Override
    public double reviewAvg(int userNo) {
        return groupDao.reviewAvg(userNo);
    }

    @Override
    public List<GroupReturnDto> findUserLikeGroup(int userNo) {
        List<Integer> likeGroupNoList = groupDao.findLikeGroupByUser(userNo);
        List<GroupReturnDto> groupListDto = new ArrayList<>();

        for (int likeGroupNo : likeGroupNoList) {
            GroupReturnDto groupReturnDto = groupDao.group(likeGroupNo);
            Integer mainImage = groupDao.getMainImage(likeGroupNo);
            if (mainImage != null) {
                GroupMediaDto mediaDto = mediaDao.findMedia(mainImage);
                String uploadPath = mediaDto.getInsertDate().toString().replace("-", "").substring(2) + "/" + "s_" + mediaDto.getMediaSavename();
                groupReturnDto.setMainImage(uploadPath);
            }
            groupListDto.add(groupReturnDto);
        }
        return groupListDto;
    }

    @Override
    public List<GroupSummaryDto> findPaymentGroup(int userNo) {
        List<GroupSummaryDto> paymentGroupList = groupDao.findPaymentGroup(userNo);
        for (GroupSummaryDto paymentGroupDto : paymentGroupList) {
            Integer mainImage = groupDao.getMainImage(paymentGroupDto.getGroupNo());
            if (mainImage != null) {
                GroupMediaDto mediaDto = mediaDao.findMedia(mainImage);
                String uploadPath = mediaDto.getInsertDate().toString().replace("-", "").substring(2) + "/" + "s_" + mediaDto.getMediaSavename();
                paymentGroupDto.setMainImage(uploadPath);
            } else {
                paymentGroupDto.setMainImage("");
            }
        }
        return paymentGroupList;
    }

    @Override
    public List<GroupReturnDto> findSaleGroup(int userNo) {
        List<GroupReturnDto> saleGroupList = groupDao.findSaleGroup(userNo);
        for (GroupReturnDto saleGroupDto : saleGroupList) {
            Integer mainImage = groupDao.getMainImage(saleGroupDto.getGroupNo());
            if (mainImage != null) {
                GroupMediaDto mediaDto = mediaDao.findMedia(mainImage);
                String uploadPath = mediaDto.getInsertDate().toString().replace("-", "").substring(2) + "/" + "s_" + mediaDto.getMediaSavename();
                saleGroupDto.setMainImage(uploadPath);
            } else {
                saleGroupDto.setMainImage("");
            }
        }
        return saleGroupList;
    }


    @Override
    public List<ReviewDto> reviewList(int userNo) {
        return groupDao.reviewList(userNo);
    }

    @Override
    public void groupViews(int userNo, int groupNo) {
        int check = groupDao.groupViewsCheck(userNo, groupNo);
        if(check == 0) {
            groupDao.groupViewsInsert(userNo, groupNo);
            groupDao.groupViewsPlus(groupNo);
        }
    }

    @Override
    public void updateOptions(int groupNo, List<OptionDto> options) {
        for (OptionDto option : options) {
            Map<String, Object> map = new HashMap<String, Object>();
            map.put("optionNo", option.getOptionNo());
            map.put("groupNo", groupNo);
            map.put("optionName", option.getOptionName());
            map.put("optionPrice", option.getOptionPrice());
            log.info(map.toString());
            groupDao.updateOption(map);
        }

    }

    @Override
    public void updateFaq(int groupNo, List<FAQRequsetDto> requestfaq) {
        for (FAQRequsetDto Faq : requestfaq) {
            FAQDto dbFaq = new FAQDto();
            dbFaq.setGroupNo(groupNo);
            dbFaq.setCategoryNo(Faq.getCategoryNo());
            dbFaq.setFaqAnswer(Faq.getFaqAnswer());
            dbFaq.setFaqQuestion(Faq.getFaqQuestion());
            log.info(dbFaq.toString());
            faqDao.updateFaq(dbFaq);
        }
    }

    @Override
    public int isliked(int userNo, int groupNo) {
        Integer queryResult = groupDao.isliked(userNo, groupNo);
        if (queryResult != null)
            queryResult = 1;
        else
            queryResult = (int)0;
        return queryResult;
    }


}


