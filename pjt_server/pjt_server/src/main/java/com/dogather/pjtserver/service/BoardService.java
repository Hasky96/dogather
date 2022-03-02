package com.dogather.pjtserver.service;

import com.dogather.pjtserver.dto.BoardDto;
import com.dogather.pjtserver.dto.BoardResponseDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface BoardService {

    public int createBoard(BoardDto boardDto);

    public int createBoard(BoardDto boardDto, List<MultipartFile> mediaList) throws IOException;

    public BoardResponseDto findBoard(int postNo);

    public int updateBoard(int postNo, BoardDto updateBoardDto, List<MultipartFile> addMediaList) throws IOException;

    public List<BoardResponseDto> getAllboard();

    public List<BoardDto> findUserLikeBoard(int userNo);

    public void boardViews(int userNo, int postNo);
}
