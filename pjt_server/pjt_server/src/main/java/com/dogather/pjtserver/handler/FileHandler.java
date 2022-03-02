package com.dogather.pjtserver.handler;

import com.dogather.pjtserver.dto.BoardMediaDto;
import com.dogather.pjtserver.dto.GroupMediaDto;
import lombok.extern.slf4j.Slf4j;
import org.imgscalr.Scalr;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import javax.servlet.ServletContext;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Component
@Slf4j
public class FileHandler {

    private final LocalDate today = LocalDate.now();
//    private final String today = LocalDate.now().format(DateTimeFormatter.ofPattern("yyMMdd"));

    public final String uploadPath = Paths.get("/doimage").toString();
//    public String uploadPath = new File("").getAbsolutePath() + File.separator + "src" + File.separator + "main" + File.separator + "resources" + File.separator + "static" + File.separator + "upload" + File.separator;



    private final String getRandomString() {
        return UUID.randomUUID().toString().replace("-", "");
    }


    public List<BoardMediaDto> uploadFiles(List<MultipartFile> files, int postNo) throws IOException {
        if(CollectionUtils.isEmpty(files) == true) {
            return Collections.emptyList();
        }
        List<BoardMediaDto> fileList = new ArrayList<>();

        File dir = new File(uploadPath + "/" + today.format(DateTimeFormatter.ofPattern("yyMMdd")));
        if(!dir.exists()) {
            dir.mkdirs();
        }

        for(MultipartFile file : files) {

            String originalFileExtension;
            String contentType = file.getContentType();

            if(ObjectUtils.isEmpty(contentType)) {
                break;
            } else {
                if(contentType.contains("image/jpeg"))
                    originalFileExtension = ".jpg";
                else if (contentType.contains("image/png"))
                    originalFileExtension = ".png";
                else
                    break;
            }
            String saveName = getRandomString() + originalFileExtension;
            // 파일 객체 생성
            File target = new File(uploadPath + "/" +today.format(DateTimeFormatter.ofPattern("yyMMdd")), saveName);
            // 파일 업로드
            file.transferTo(target);

            BoardMediaDto fileDto = new BoardMediaDto();
            fileDto.setPostNo(postNo);
            fileDto.setMediaTitile(file.getOriginalFilename());
            fileDto.setMediaSavename(saveName);
            fileDto.setMediaFilesize(String.valueOf(file.getSize()));
            fileDto.setInsertDate(today);

            fileList.add(fileDto);

        }
        return fileList;
    }

    public GroupMediaDto uploadMainImage(MultipartFile mainImage, int groupNo) throws IOException {
        log.info("==========메인 이미지 생성!");

        File dir = new File(uploadPath + "/" +today.format(DateTimeFormatter.ofPattern("yyMMdd")));
        if(!dir.exists()) {
            dir.mkdirs();
        }
        String originalFileExtension = null;
        String contentType = mainImage.getContentType();


        if(contentType.contains("image/jpeg"))
            originalFileExtension = "jpg";
        else if (contentType.contains("image/png"))
            originalFileExtension = "png";

        String saveName = getRandomString() + "." + originalFileExtension;

        File target = new File(uploadPath + "/" +today.format(DateTimeFormatter.ofPattern("yyMMdd")), saveName);
        // 파일 업로드

        mainImage.transferTo(target);

        File mainImageFile = new File(uploadPath + "/" +today.format(DateTimeFormatter.ofPattern("yyMMdd")), "s_"+saveName);
        BufferedImage bufferOriginalImage = ImageIO.read(target);

        int dw = 500;
        int dh = 500; // 추후 썸네일 이미지 사이즈에 맞춰서 변경

        int ow = bufferOriginalImage.getWidth();
        int oh = bufferOriginalImage.getHeight();

        int nw = ow;
        int nh = (ow * dh) / dw;

        if(nh > oh) {
            nw = (oh * dw) / dh;
            nh = oh;
        }

        BufferedImage bufferTransformImage = Scalr.crop(bufferOriginalImage, (ow - nw)/2, (oh - nh)/2, nw, nh);
//        double ratio = 3;
//        int width = (int) (bufferOriginalImage.getWidth() / ratio);
//        int height = (int) (bufferOriginalImage.getHeight() / ratio);
//        BufferedImage bufferTransformImage = new BufferedImage(width, height, BufferedImage.TYPE_3BYTE_BGR);
//        Graphics2D graphic = bufferTransformImage.createGraphics();
//        graphic.drawImage(bufferOriginalImage, 0, 0,width,height, null);
        ImageIO.write(bufferTransformImage, originalFileExtension, mainImageFile);



        GroupMediaDto mainImageDto = new GroupMediaDto();
        mainImageDto.setGroupNo(groupNo);
        mainImageDto.setMediaTitle(mainImage.getOriginalFilename());
        mainImageDto.setMediaSavename(saveName);
        mainImageDto.setMediaFilesize(String.valueOf(mainImage.getSize()));
        mainImageDto.setInsertDate(today);
        mainImageDto.setMainImageYn("Y");
        log.info(mainImageDto.toString());
        return mainImageDto;
    }

    public List<GroupMediaDto> uploadGroupFiles(List<MultipartFile> files, int groupNo) throws IOException {
        if(CollectionUtils.isEmpty(files) == true) {
            return Collections.emptyList();
        }
        List<GroupMediaDto> fileList = new ArrayList<>();

        File dir = new File(uploadPath + "/" +today.format(DateTimeFormatter.ofPattern("yyMMdd")));
        if(!dir.exists()) {
            dir.mkdirs();
        }

        for(MultipartFile file : files) {

            String originalFileExtension;
            String contentType = file.getContentType();

            if(ObjectUtils.isEmpty(contentType)) {
                break;
            } else {
                if(contentType.contains("image/jpeg"))
                    originalFileExtension = ".jpg";
                else if (contentType.contains("image/png"))
                    originalFileExtension = ".png";
                else
                    break;
            }
            String saveName = getRandomString() + originalFileExtension;
            // 파일 객체 생성
            File target = new File(uploadPath + "/" +today.format(DateTimeFormatter.ofPattern("yyMMdd")), saveName);
            // 파일 업로드
            file.transferTo(target);

            GroupMediaDto fileDto = new GroupMediaDto();
            fileDto.setGroupNo(groupNo);
            fileDto.setMediaTitle(file.getOriginalFilename());
            fileDto.setMediaSavename(saveName);
            fileDto.setMediaFilesize(String.valueOf(file.getSize()));
            fileDto.setInsertDate(today);
            fileDto.setMainImageYn("N");

            fileList.add(fileDto);

        }
        return fileList;
    }

    public void deleteMediaFile(BoardMediaDto mediaDto) {
        String DateTime = mediaDto.getInsertDate().toString().replace("-", "");
        String insertDateTime = DateTime.substring(2);
        String path = uploadPath + File.separator + insertDateTime;
        File file = new File(path + File.separator + mediaDto.getMediaSavename());
        log.info("===============파일 삭제 실제 경로");
        log.info(path + File.separator + mediaDto.getMediaSavename());
        if(file.exists()) {
            file.delete();
        }
    }

    public void deleteGroupMediaFile(GroupMediaDto mediaDto) {
        String DateTime = mediaDto.getInsertDate().toString().replace("-", "");
        String insertDateTime = DateTime.substring(2);
        String path = uploadPath + File.separator + insertDateTime;
        File file = new File(path + File.separator + mediaDto.getMediaSavename());
        log.info("===============파일 삭제 실제 경로");
        log.info(path + File.separator + mediaDto.getMediaSavename());
        if(file.exists()) {
            file.delete();
        }
    }
}
