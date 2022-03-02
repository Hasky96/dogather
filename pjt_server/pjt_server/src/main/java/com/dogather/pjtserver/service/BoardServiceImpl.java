package com.dogather.pjtserver.service;

import com.dogather.pjtserver.dao.BoardDao;
import com.dogather.pjtserver.dao.BoardMediaDao;
import com.dogather.pjtserver.dao.LikeDao;
import com.dogather.pjtserver.dto.BoardDto;
import com.dogather.pjtserver.dto.BoardMediaDto;
import com.dogather.pjtserver.dto.BoardResponseDto;
import com.dogather.pjtserver.handler.FileHandler;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class BoardServiceImpl implements BoardService {

    @Autowired
    public BoardDao boardDao;

    @Autowired
    public BoardMediaDao mediaDao;

    @Autowired
    public FileHandler fileHandler;

    @Autowired
    public BoardMediaService mediaService;

    @Autowired
    public CommentService commentService;

    @Autowired
    public LikeService likeService;


    @Override
    public int createBoard(BoardDto boardDto) {
        boardDto.setCreated(LocalDateTime.now());
        return boardDao.createBoard(boardDto);
    }

    @Override
    public int createBoard(BoardDto boardDto, List<MultipartFile> files) throws IOException {
        int queryResult = 1;

        if (createBoard(boardDto) == 0)
            return 0;
        List<BoardMediaDto> mediaList = fileHandler.uploadFiles(files, boardDto.getPostNo());
        if(CollectionUtils.isEmpty(mediaList) == false) {
            queryResult = mediaDao.insertMedia(mediaList);
            if (queryResult < 1) {
                queryResult = 0;
            }
        }
        return queryResult;
    }

    @Override
    public BoardResponseDto findBoard(int postNo) {
        BoardResponseDto boardResponseDto = boardDao.findBoard(postNo);

        return boardResponseDto;
    }

    @Override
    public int updateBoard(int postNo, BoardDto updateBoardDto, List<MultipartFile> addMediaList) throws IOException {
        int queryResult = 1;

        BoardResponseDto modifiedBoardDto = boardDao.findBoard(postNo);
        modifiedBoardDto.setBoardTitle(updateBoardDto.getBoardTitle());
        modifiedBoardDto.setBoardContent(updateBoardDto.getBoardContent());
        modifiedBoardDto.setUpdated(LocalDateTime.now());

        boardDao.updateBoard(modifiedBoardDto);
        List<BoardMediaDto> mediaList = fileHandler.uploadFiles(addMediaList, postNo);
        if(CollectionUtils.isEmpty(mediaList)== false) {
            queryResult = mediaDao.insertMedia(mediaList);
            if (queryResult < 1) {
                queryResult = 0;
            }
        }
        return queryResult;
    }

    @Override
    public List<BoardResponseDto> getAllboard() {
        List<BoardResponseDto> BoardListAll =  boardDao.getAllboard();
        for(BoardResponseDto board :BoardListAll) {
            List<BoardMediaDto> mediaDtoList = mediaService.findAllMedia(board.getPostNo());
            List<Integer> mediaList = new ArrayList<Integer>();
            for (BoardMediaDto mediaDto : mediaDtoList) {
                mediaList.add(mediaDto.getMediaNo());
            }
            board.setMediaNo(mediaList);
            board.setCommentList(commentService.findAllComment(board.getPostNo()));
            board.setLikeUsers(likeService.findLikeAtBoard(board.getPostNo()));
        }
        return BoardListAll;
    }

    @Override
    public List<BoardDto> findUserLikeBoard(int userNo) {
        log.info("====작동");
        List<Integer> likeBoardNoList = likeService.findLikeBoardByUser(userNo);
        log.info(likeBoardNoList.toString());
        List<BoardDto> likeBoards = new ArrayList<>();
        for (int likeBoardNo : likeBoardNoList ) {
            likeBoards.add(boardDao.findUserLikeBoard(likeBoardNo));
        }
        return likeBoards;
    }

    @Override
    public void boardViews(int userNo, int postNo) {
        int check = boardDao.boardViewsCheck(userNo, postNo);
        if(check == 0){
            boardDao.boardViewsInsert(userNo, postNo);
            boardDao.boardViewsPlus(postNo);
        }
    }

//    @Override
//    public List<BoardResponseDto> getAllboard() {
//        return boardDao.getAllboard();
//    }
}
