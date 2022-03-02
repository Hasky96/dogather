package com.dogather.pjtserver.controller;

import com.dogather.pjtserver.dto.FAQDto;
import com.dogather.pjtserver.service.FAQService;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.awt.desktop.SystemEventListener;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@RequestMapping("/faq")
public class FAQController {

    @Autowired
    FAQService faqService;

    @RequestMapping(value = {"/{groupNo}", "/{groupNo}/{faqNo}"}, method = {RequestMethod.POST, RequestMethod.PUT})
    public ResponseEntity<String> registerFaq (@PathVariable(value = "faqNo", required = false) Long faqNo,
                                               @PathVariable(value = "groupNo") int groupNo,
                                               @RequestBody FAQDto faqDto){
        JSONObject jsonObj = new JSONObject();
        faqDto.setGroupNo(groupNo);
        try {
            if (faqNo != null) {
                faqDto.setFaqNo(faqNo.intValue());
            }
            boolean isRegistered = faqService.registerFaq(faqDto);
            jsonObj.put("Register result" , isRegistered);
        } catch (Exception e) {
            jsonObj.put("result", "데이터베이스 처리과정 중 문제가 발생하였습니다. 입력값을 다시 확인해주세요.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(jsonObj.toString());
        }
        return ResponseEntity.status(HttpStatus.OK).body(jsonObj.toString());
    }

    @GetMapping(value={"/{groupNo}", "/{groupNo}/{categoryNo}"})
    public ResponseEntity<Map<String, Object>> readFaq(@PathVariable(value = "categoryNo", required = false) Long categoryNo,
                                                @PathVariable(value = "groupNo") int groupNo
                                                ){
        Map<String, Object> result = new HashMap<>();

        if (categoryNo != null) {
            List<FAQDto> readList = faqService.readFaq(groupNo, categoryNo.intValue());
            result.put("data amount", readList.size());
            result.put("data", readList);
            return ResponseEntity.status(HttpStatus.OK).body(result);
        } else {
            List<FAQDto> readList = faqService.readFaqAll(groupNo);
            result.put("data amount", readList.size());
            result.put("data", readList);
            return ResponseEntity.status(HttpStatus.OK).body(result);
        }
    }

    @DeleteMapping("/{groupNo}/{faqNo}")
    public ResponseEntity<String> deleteFaq(@PathVariable("groupNo") int groupNo,
                                            @PathVariable("faqNo") int faqNo) {
        JSONObject jsonObj = new JSONObject();
        try {
            boolean isDeleted = faqService.deleteFaq(groupNo, faqNo);
            jsonObj.put("Delete result", isDeleted);
        } catch (Exception e) {
            jsonObj.put("message", "데이터베이스 처리과정 중 문제가 발생하였습니다. 다시 확인해주세요.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(jsonObj.toString());
        }
        return ResponseEntity.status(HttpStatus.OK).body(jsonObj.toString());
    }
}
