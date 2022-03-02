package com.dogather.pjtserver.controller;

import com.dogather.pjtserver.dto.BoardDto;
import com.dogather.pjtserver.dto.BoardMediaDto;
import com.dogather.pjtserver.dto.BoardResponseDto;
import com.dogather.pjtserver.handler.FileHandler;
import com.dogather.pjtserver.service.BoardMediaService;
import com.dogather.pjtserver.service.BoardService;
import com.dogather.pjtserver.service.CommentService;
import com.dogather.pjtserver.service.LikeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/board")
@Slf4j
public class BoardController {

    @Autowired
    public BoardService boardService;

    @Autowired
    public BoardMediaService mediaService;

    @Autowired
    public CommentService commentService;

    @Autowired
    public LikeService likeService;

    @Autowired
    public FileHandler fileHandler;

    @PostMapping
    public int createBoard(
            @RequestPart(value = "BoardDto") BoardDto boardDto,
            @RequestPart(value = "file", required = false) List<MultipartFile> files
    ) throws Exception {
        return boardService.createBoard(boardDto, files);
    }

    @GetMapping("/{postNo}/{userNo}")
    public ResponseEntity<BoardResponseDto> getBoard(@PathVariable int postNo, @PathVariable int userNo) {
        if(userNo != 0) boardService.boardViews(userNo,postNo);
        List<BoardMediaDto> mediaDtoList = mediaService.findAllMedia(postNo);

        List<Integer> mediaList = new ArrayList<Integer>();

        for (BoardMediaDto mediaDto : mediaDtoList) {
            mediaList.add(mediaDto.getMediaNo());
        }
        BoardResponseDto boardResponseDto = boardService.findBoard(postNo);
        if (boardResponseDto != null) {
            boardResponseDto.setCommentList(commentService.findAllComment(postNo));
            boardResponseDto.setLikeUsers(likeService.findLikeAtBoard(postNo));
            boardResponseDto.setMediaNo(mediaList);
        }

        return ResponseEntity.status(HttpStatus.OK).body(boardResponseDto);
    }

    @GetMapping
    public List<BoardResponseDto> getBoardList() {
        return boardService.getAllboard();
    }

    @PutMapping("/{postNo}")
    public int updateBoard(@PathVariable int postNo,
                      @RequestPart(value = "BoardDto") BoardDto updateBoardDto,
                      @RequestPart(value = "file", required = false) List<MultipartFile> updateFiles) throws IOException {

        List<BoardMediaDto> dbMediaList = mediaService.findAllMedia(postNo);
        log.info(dbMediaList.toString());
        log.info(String.valueOf(CollectionUtils.isEmpty(dbMediaList)));

        log.info("==========업로드 파일 확인");
        log.info(updateFiles.toString());
        log.info(String.valueOf(updateFiles.isEmpty()));
        log.info(String.valueOf(CollectionUtils.isEmpty(updateFiles)));

        List<MultipartFile> addMediaList = new ArrayList<>();

        if (CollectionUtils.isEmpty(dbMediaList)) {
            if (!CollectionUtils.isEmpty(updateFiles)) {
                for (MultipartFile multipartFile : updateFiles)
                    addMediaList.add(multipartFile);
            }
        } else {
            if (CollectionUtils.isEmpty(updateFiles)) {
                log.info("얘 작동???");
                for (BoardMediaDto dbFile : dbMediaList) {
                    // DB를 먼저 지우고 실제 파일을 지우자 => DB를 먼저 지우면 저장된 이름을 가져오기 위해 따로 이름을 저장해주어야 함
                    log.info("========================전달된 파일 X, DB 파일 O 로직 시작");
                    fileHandler.deleteMediaFile(dbFile);
                    mediaService.deleteMedia(dbFile.getMediaNo());
                }
            } else {
                log.info("========================전달된 파일 O, DB 파일 O 로직 시작");
//                List<String> dbOrginFileNameList = new ArrayList<>();

                for (BoardMediaDto dbMedia : dbMediaList) {

//                    BoardMediaDto dbMediaDto = mediaService.findMedia(dbMedia.getMediaNo());
                    log.info(dbMedia.toString());
//                    log.info(dbMediaDto.toString());

//                    String dbOrginFileName = dbMedia.getMediaSavename();
                    fileHandler.deleteMediaFile(dbMedia);
                    mediaService.deleteMedia(dbMedia.getMediaNo());

//                    if(!updateFiles.contains(dbOrginFileName)) {
//                        mediaService.deleteMedia(dbMedia.getMediaNo());
//                    }
//                    else {
//                        dbOrginFileNameList.add(dbOrginFileName);
//                    }
                }
                for (MultipartFile multipartFile : updateFiles) {
                    addMediaList.add(multipartFile);
//                    String multipartOriginName = multipartFile.getOriginalFilename();
//                    if(!dbOrginFileNameList.contains(multipartOriginName)) {
//                        addMediaList.add(multipartFile);
//                    }
//                }
                }
            }

        }
        return boardService.updateBoard(postNo, updateBoardDto, addMediaList);
    }
}
