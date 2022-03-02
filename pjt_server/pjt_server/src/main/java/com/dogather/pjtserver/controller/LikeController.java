package com.dogather.pjtserver.controller;

import com.dogather.pjtserver.dto.LikeDto;
import com.dogather.pjtserver.service.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/like")
public class LikeController {

    @Autowired
    LikeService likeService;

    @PostMapping
    public int like(@RequestBody LikeDto likeDto) {

        return likeService.like(likeDto);

    }

    @DeleteMapping
    public int unlike(@RequestBody LikeDto likeDto) {

        return likeService.unlike(likeDto);
    }

}
