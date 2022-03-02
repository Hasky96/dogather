package com.dogather.pjtserver.controller;

import com.dogather.pjtserver.dto.AlarmDto;
import com.dogather.pjtserver.dto.AlarmListDto;
import com.dogather.pjtserver.service.AlarmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/alarm")
public class AlarmController {

    @Autowired
    AlarmService alarmService;

    @GetMapping("/{userNick}")
    public List<AlarmDto> getAlarm(@PathVariable String userNick){
        List<AlarmDto> list = alarmService.getAlarm(userNick);
        return list;
    }

    @PostMapping
    public void insertAlarm(@RequestBody AlarmListDto list){
        alarmService.insertAlarm(list.getList());
    }

    @PutMapping
    public void readAlarm(@RequestParam("msgNo") int msgNo){
        alarmService.readAlarm(msgNo);
    }

}
