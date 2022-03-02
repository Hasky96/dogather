package com.dogather.pjtserver.service;

import com.dogather.pjtserver.dto.GroupMediaDto;

import java.util.List;

public interface GroupMediaService {
    public List<GroupMediaDto> fineAllMedia(int groupNo);

    public void deleteMedia(int mediaNo);


    public GroupMediaDto findGroupMedia(int mediaNo);
}
