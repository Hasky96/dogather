package com.dogather.pjtserver.controller;

import com.dogather.pjtserver.dto.*;
import com.dogather.pjtserver.handler.FileHandler;
import com.dogather.pjtserver.service.FAQService;
import com.dogather.pjtserver.service.GroupMediaService;
import com.dogather.pjtserver.service.GroupService;
import com.dogather.pjtserver.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/group")
@Slf4j
public class GroupController {

    @Autowired
    GroupService groupService;

    @Autowired
    GroupMediaService mediaService;

    @Autowired
    FileHandler fileHandler;

    @Autowired
    FAQService faqService;

    @Autowired
    UserService userService;

    @GetMapping("/list")
    public ResponseEntity<GroupListDto> list(){
        GroupListDto list = new GroupListDto();
        list.setList(groupService.getList());
        return new ResponseEntity<GroupListDto>(list,HttpStatus.OK);
    }

    @GetMapping("/hot")
    public ResponseEntity<GroupListDto> hotList(){
        GroupListDto list = new GroupListDto();
        list.setList(groupService.getHotList());
        return new ResponseEntity<GroupListDto>(list,HttpStatus.OK);
    }

    @GetMapping("/new")
    public ResponseEntity<GroupListDto> newList(){
        GroupListDto list = new GroupListDto();
        list.setList(groupService.getNewList());
        return new ResponseEntity<GroupListDto>(list,HttpStatus.OK);
    }

    @GetMapping("/end")
    public ResponseEntity<GroupListDto> endSoonList(){
        GroupListDto list = new GroupListDto();
        list.setList(groupService.getEndSoonList());
        return new ResponseEntity<GroupListDto>(list,HttpStatus.OK);
    }

    @GetMapping("/recommend/{userNo}")
    public ResponseEntity<GroupListDto> recommendList(@PathVariable int userNo){
        List<Integer> categories = userService.getUserCategory(userNo);
        GroupListDto list = new GroupListDto();
        list.setList(groupService.getRecommendList(categories));
        return new ResponseEntity<GroupListDto>(list,HttpStatus.OK);
    }

    @GetMapping("/detail/{groupNo}/{userNo}")
    public ResponseEntity<GroupOptionDto> group(@PathVariable int groupNo, @PathVariable int userNo){
        if(userNo != 0) groupService.groupViews(userNo,groupNo);
        List<GroupMediaDto> mediaDtoList = mediaService.fineAllMedia(groupNo);
        GroupReturnDto groupReturnDto = groupService.group(groupNo);
        List<FAQDto> faqDtoList = faqService.readFaqAll(groupNo);
        if (userNo != 0 && groupReturnDto != null) {
            int isliked = groupService.isliked(userNo, groupNo);
            groupReturnDto.setIsLiked(isliked);
        }

        String mainImageName = null;
        List<String> mediaList = new ArrayList<>();
        for (GroupMediaDto mediaDto : mediaDtoList ) {
            if(mediaDto.getMainImageYn().equals("N")){
                mediaList.add(mediaDto.getInsertDate().toString().replace("-", "").substring(2) + "/" + mediaDto.getMediaSavename());
            } else {
                mainImageName = mediaDto.getInsertDate().toString().replace("-", "").substring(2) + "/s_" + mediaDto.getMediaSavename();
            }
        }

        GroupOptionDto ret = new GroupOptionDto();
        ret.setGroupDto(groupReturnDto);
        List<OptionDto> options = groupService.getOptions(groupNo);
        ret.setOptions(options);
        ret.setMediaList(mediaList);
        ret.setFaqList(faqDtoList);
        ret.setMainImage(mainImageName);
        return new ResponseEntity<GroupOptionDto>(ret, HttpStatus.OK);
    }

    @PostMapping("/register")
    public Object register(@RequestPart(value = "groupRegisterDto") GroupRegisterDto groupRegisterDto,
                           @RequestPart(value = "file", required = false) List<MultipartFile> files,
                           @RequestPart(value = "mainImage", required = false) MultipartFile mainImage) throws Exception{
        int created = groupService.groupRegister(groupRegisterDto.getGroup(), files, mainImage);
        if(created != 0){
            groupService.addOptions(groupRegisterDto.getGroup().getGroupNo() ,groupRegisterDto.getOptions());
            groupService.addFaq(groupRegisterDto.getGroup().getGroupNo(), groupRegisterDto.getRequestfaq());
            return new ResponseEntity<Integer>(created, HttpStatus.OK);
        }else{
            return new ResponseEntity<Integer>(created, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/detail/update/{groupNo}")
    public ResponseEntity<GroupOptionDto> updategroup(@PathVariable int groupNo) {
        List<GroupMediaDto> mediaDtoList = mediaService.fineAllMedia(groupNo);
        GroupReturnDto groupReturnDto = groupService.group(groupNo);
        log.info(mediaDtoList.toString());
        List<FAQDto> faqDtoList = faqService.readFaqAll(groupNo);

        String mainImageName = null;
        List<String> mediaList = new ArrayList<>();
        for (GroupMediaDto mediaDto : mediaDtoList ) {
            if(mediaDto.getMainImageYn().equals("N")){
                log.info(mediaDto.getMediaTitle());
                mediaList.add(mediaDto.getMediaTitle());
            } else {
                mainImageName = mediaDto.getMediaTitle();
            }
        }

        GroupOptionDto ret = new GroupOptionDto();
        ret.setGroupDto(groupReturnDto);
        List<OptionDto> options = groupService.getOptions(groupNo);
        ret.setOptions(options);
        ret.setMediaList(mediaList);
        ret.setFaqList(faqDtoList);
        ret.setMainImage(mainImageName);
        return new ResponseEntity<GroupOptionDto>(ret, HttpStatus.OK);
    }

//    @PutMapping("/{groupNo}/{mainYn}/{fileYn}")
//    public ResponseEntity<Integer> update(@RequestPart(value="GroupDto") GroupDto updategroupDto,
//                                          @RequestPart(value="file", required = false) List<MultipartFile> updateFiles,
//                                          @RequestPart(value = "mainImage", required = false) MultipartFile mainImage,
//                                          @PathVariable String mainYn,
//                                          @PathVariable String fileYn
//                                          ) throws IOException {
//
//        int groupNo = updategroupDto.getGroupNo();
//        List<GroupMediaDto> dbMediaList = mediaService.fineAllMedia(groupNo);
//
//        List<MultipartFile> addMediaList = new ArrayList<>();
//
//        if (CollectionUtils.isEmpty(dbMediaList)) {
//            if (!CollectionUtils.isEmpty(updateFiles)) {
//                for (MultipartFile multipartFile : updateFiles)
//                    addMediaList.add(multipartFile);
//            }
//        } else {
//            if (CollectionUtils.isEmpty(updateFiles)) {
//                for (GroupMediaDto dbFile : dbMediaList) {
//                    fileHandler.deleteGroupMediaFile(dbFile);
//                    mediaService.deleteMedia(dbFile.getMediaNo());
//                }
//            } else {
//                for (GroupMediaDto dbFile : dbMediaList) {
//                    fileHandler.deleteGroupMediaFile(dbFile);
//                    mediaService.deleteMedia(dbFile.getMediaNo());
//                }
//            for (MultipartFile multipartFile : updateFiles) {
//                    addMediaList.add(multipartFile);
//                }
//            }
//        }
//        int updated =  groupService.groupUpdate(groupNo, updategroupDto, addMediaList);
//        if (updated != 0) {
//            return ResponseEntity.status(HttpStatus.OK).body(updated);
//        } else {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(updated);
//        }
//    }

    @PutMapping("/{groupNo}")
    public ResponseEntity<Integer> update(@PathVariable int groupNo, @RequestBody GroupDto updategroupDto)throws IOException {
        log.info(updategroupDto.toString());
        String Deadline = updategroupDto.getTmpDeadLine();
        if (Deadline.length() == 22) {
            updategroupDto.setDeadline(LocalDateTime.parse(Deadline.substring(0, 19)));
        } else {
            updategroupDto.setDeadline(LocalDateTime.parse(Deadline));
        }
        int updated =  groupService.groupUpdate(groupNo, updategroupDto);
        if (updated != 0) {
            return ResponseEntity.status(HttpStatus.OK).body(updated);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(updated);
        }
    }


    @DeleteMapping("/{groupNo}")
    public ResponseEntity<Integer> delete(@PathVariable int groupNo){

        List<GroupMediaDto> dbMediaList = mediaService.fineAllMedia(groupNo);
        if (CollectionUtils.isEmpty(dbMediaList) == false) {
            for (GroupMediaDto dbFile :dbMediaList) {
                fileHandler.deleteGroupMediaFile(dbFile);
                mediaService.deleteMedia(dbFile.getMediaNo());
            }
        }
        int deleted = groupService.groupDelete(groupNo);
        if(deleted == 1){
            return new ResponseEntity<Integer>(deleted, HttpStatus.OK);
        }else{
            return new ResponseEntity<Integer>(deleted, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/enter")
    public ResponseEntity<Integer> enter(@RequestBody GroupEnterDto dto){
        int entered = groupService.groupEnter(dto);
        if(entered == 1){
            return new ResponseEntity<Integer>(entered, HttpStatus.OK);
        }else{
            return new ResponseEntity<Integer>(entered, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/out")
    public ResponseEntity<Integer> out(@RequestBody GroupEnterDto dto) {
        int out = groupService.groupOut(dto);
        if (out == 1) {
            return new ResponseEntity<Integer>(out, HttpStatus.OK);
        } else {
            return new ResponseEntity<Integer>(out, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/interest")
    public ResponseEntity<Integer> addInterest(@RequestBody GroupInterestDto dto) {
        int result = groupService.addInterest(dto);
        if (result == 1) {
            return new ResponseEntity<Integer>(result, HttpStatus.OK);
        } else {
            return new ResponseEntity<Integer>(result, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("/search")
    public ResponseEntity<GroupListDto> search(@RequestParam("page")int page, @RequestParam(value="query", required = false, defaultValue = " ")@Nullable String query, @RequestParam(value="nickname",required = false,defaultValue = " ")@Nullable String nickname){
        GroupListDto list = new GroupListDto();
        list.setList(groupService.search(query, nickname, page));
        return new ResponseEntity<GroupListDto>(list,HttpStatus.OK);
    }


//    @PostMapping("/wsearch")
//    public ResponseEntity<GroupListDto> wordSearch(@RequestBody HashMap map){
//        String word = map.get("word").toString();
//        String[] tmp = word.split(" ");
//        List<String> wordList = Arrays.asList(tmp);
//
//        System.out.println(wordList.toString());
//
//        GroupListDto list = new GroupListDto();
//        list.setList(groupService.wordSearch(wordList));
//        return new ResponseEntity<GroupListDto>(list,HttpStatus.OK);
//    }
//
//    @PostMapping("/psearch")
//    public ResponseEntity<GroupListDto> personSearch(@RequestBody HashMap map){
//        String person = map.get("person").toString();
//
//        GroupListDto list = new GroupListDto();
//        list.setList(groupService.personSearch(person));
//        return new ResponseEntity<GroupListDto>(list,HttpStatus.OK);
//    }

    @PostMapping("/review")
    public int review(@RequestBody ReviewDto dto){
        return groupService.review(dto);
    }

    @GetMapping("/review/{userNo}")
    public ResponseEntity<ReviewListDto> reviewAvg(@PathVariable int userNo){
        ReviewListDto reviewListDto = new ReviewListDto();
        double avgcheck = groupService.reviewAvg(userNo);
        reviewListDto.setAvg(avgcheck);
        if(avgcheck == -1){
            return new ResponseEntity<ReviewListDto>(reviewListDto,HttpStatus.OK);
        }else {
            reviewListDto.setReviewList(groupService.reviewList(userNo));
            return new ResponseEntity<ReviewListDto>(reviewListDto, HttpStatus.OK);
        }
    }

    @GetMapping("/category")
    public ResponseEntity<GroupListDto> categoryList(@RequestParam("category") int categoryNo,@RequestParam("page")int page){
        GroupListDto list = new GroupListDto();
        list.setList(groupService.getCategoryList(categoryNo, page));
        return new ResponseEntity<GroupListDto>(list,HttpStatus.OK);
    }


}
