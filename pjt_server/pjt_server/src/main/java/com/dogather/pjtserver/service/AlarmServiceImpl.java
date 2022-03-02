package com.dogather.pjtserver.service;

import com.dogather.pjtserver.dao.AlarmDao;
import com.dogather.pjtserver.dto.AlarmDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlarmServiceImpl implements AlarmService{

    @Autowired
    AlarmDao alarmDao;

    @Override
    public List<AlarmDto> getAlarm(String userNick) {
        List<AlarmDto> list = alarmDao.getAlarm(userNick);
        return list;
    }

    @Override
    public void insertAlarm(List<AlarmDto> list) {
        alarmDao.insertAlarm(list);
    }

    @Override
    public void readAlarm(int msgNo) {
        alarmDao.readAlarm(msgNo);
    }


}
