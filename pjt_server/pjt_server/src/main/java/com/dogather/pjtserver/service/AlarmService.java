package com.dogather.pjtserver.service;

import com.dogather.pjtserver.dto.AlarmDto;

import java.util.List;

public interface AlarmService {
    public List<AlarmDto> getAlarm(String userNick);

    public void insertAlarm(List<AlarmDto> list);

    public void readAlarm(int msgNo);
}
