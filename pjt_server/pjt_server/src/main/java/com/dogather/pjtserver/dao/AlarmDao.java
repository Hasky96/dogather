package com.dogather.pjtserver.dao;

import com.dogather.pjtserver.dto.AlarmDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AlarmDao {
    public List<AlarmDto> getAlarm(String userNick);

    public void insertAlarm(List<AlarmDto> list);

    public void readAlarm(int msgNo);
}
