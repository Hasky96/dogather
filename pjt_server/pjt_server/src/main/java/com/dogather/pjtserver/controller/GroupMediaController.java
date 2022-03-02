package com.dogather.pjtserver.controller;

import com.dogather.pjtserver.dto.BoardMediaDto;
import com.dogather.pjtserver.dto.GroupMediaDto;
import com.dogather.pjtserver.dto.ResponseDto;
import com.dogather.pjtserver.handler.FileHandler;
import com.dogather.pjtserver.service.BoardMediaService;
import com.dogather.pjtserver.service.GroupMediaService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/group/image")
@Slf4j
public class GroupMediaController {

    @Autowired
    public GroupMediaService mediaService;

    @Autowired
    public FileHandler fileHandler;


    @GetMapping(value = "/{mediaNo}",
            produces = {MediaType.IMAGE_PNG_VALUE, MediaType.IMAGE_JPEG_VALUE})
    public ResponseEntity<byte[]> getMedia(@PathVariable int mediaNo) throws IOException {
        GroupMediaDto mediaDto = mediaService.findGroupMedia(mediaNo);


        String DateTime = mediaDto.getInsertDate().toString().replace("-", "");
        String insertDateTime = DateTime.substring(2);
        String uploadPath = fileHandler.uploadPath + File.separator + insertDateTime;
//        String absolutePath = Paths.get("/Users", "jamiehong", "Documents", "UPLOAD", insertDateTime).toString();
        InputStream imageStream = new FileInputStream(uploadPath + "/" + mediaDto.getMediaSavename());
        byte[] imageByteArray = IOUtils.toByteArray(imageStream);
        imageStream.close();

        return new ResponseEntity<>(imageByteArray, HttpStatus.OK);
    }

//    @GetMapping(value = "/list",
//            produces = {MediaType.IMAGE_PNG_VALUE, MediaType.IMAGE_JPEG_VALUE})
//    public ResponseEntity<List<byte[]>> getMedia(@RequestParam(value="mediaNoList") List<Integer> mediaNolist) throws IOException {
//        List<byte[]> mediaDtoList = new ArrayList<>();
//        for (int mediaNo : mediaNolist) {
//            GroupMediaDto mediaDto =  mediaService.findGroupMedia(mediaNo);
//            String DateTime = mediaDto.getInsertDate().toString().replace("-", "");
//            String insertDateTime = DateTime.substring(2);
//            String uploadPath = fileHandler.uploadPath + File.separator + insertDateTime;
////        String absolutePath = Paths.get("/Users", "jamiehong", "Documents", "UPLOAD", insertDateTime).toString();
//            InputStream imageStream = new FileInputStream(uploadPath + "/" + mediaDto.getMediaSavename());
//            byte[] imageByteArray = IOUtils.toByteArray(imageStream);
//            imageStream.close();
//            mediaDtoList.add(imageByteArray);
//        }
//
//        return new ResponseEntity<>(mediaDtoList, HttpStatus.OK);
//    }


}
