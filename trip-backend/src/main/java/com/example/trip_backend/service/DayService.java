package com.example.trip_backend.service;

import java.util.List;

import com.example.trip_backend.dto.DayRequestDto;
import com.example.trip_backend.model.Day;
import com.example.trip_backend.model.Timeframe;
import com.example.trip_backend.model.Tour;

public interface DayService {
    Tour updateDay(long tourId, DayRequestDto dayRequest);
    List<Timeframe> getTimeframesByDayNo(long tourId, int dayNo);
    Day getDay(long tourId, int dayNo);
}
