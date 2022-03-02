package com.dogather.pjtserver.controller;

import com.dogather.pjtserver.dto.BoardMediaDto;
import com.dogather.pjtserver.dto.BoardResponseDto;
import com.dogather.pjtserver.dto.ResponseDto;
import com.dogather.pjtserver.handler.FileHandler;
import com.dogather.pjtserver.service.BoardMediaService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Paths;

@RestController
@RequestMapping("/image")
@Slf4j
public class BoardMediaController {

    @Autowired
    public BoardMediaService mediaService;

    @Autowired
    public FileHandler fileHandler;


//    @GetMapping(value = "/{mediaNo}",
//            produces = {MediaType.IMAGE_PNG_VALUE, MediaType.IMAGE_JPEG_VALUE})
//    public ResponseEntity<byte[]> getMedia(@PathVariable int mediaNo) throws IOException {
//        BoardMediaDto mediaDto = mediaService.findMedia(mediaNo);
//
//
//        String DateTime = mediaDto.getInsertDate().toString().replace("-", "");
//        String insertDateTime = DateTime.substring(2);
//        String uploadPath = fileHandler.uploadPath + File.separator + insertDateTime;
////        String absolutePath = Paths.get("/Users", "jamiehong", "Documents", "UPLOAD", insertDateTime).toString();
//        InputStream imageStream = new FileInputStream(uploadPath + "/" + mediaDto.getMediaSavename());
//        byte[] imageByteArray = IOUtils.toByteArray(imageStream);
//        imageStream.close();
//
//        return new ResponseEntity<>(imageByteArray, HttpStatus.OK);
//    }

    @GetMapping(value = "/{mediaNo}",
            produces = {MediaType.IMAGE_PNG_VALUE, MediaType.IMAGE_JPEG_VALUE, MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<ResponseDto> getMedia(@PathVariable int mediaNo) throws IOException {
        BoardMediaDto mediaDto = mediaService.findMedia(mediaNo);


        String DateTime = mediaDto.getInsertDate().toString().replace("-", "");
        String insertDateTime = DateTime.substring(2);
        String uploadPath = fileHandler.uploadPath + File.separator + insertDateTime;
//        String absolutePath = Paths.get("/Users", "jamiehong", "Documents", "UPLOAD", insertDateTime).toString();
        InputStream imageStream = new FileInputStream(uploadPath + "/" + mediaDto.getMediaSavename());
        byte[] imageByteArray = IOUtils.toByteArray(imageStream);
        imageStream.close();
        ResponseDto dto = new ResponseDto();
        dto.setMediaNo(imageByteArray);
        dto.setBoardContent("test");

        return new ResponseEntity<>(dto, HttpStatus.OK);
    }
}
