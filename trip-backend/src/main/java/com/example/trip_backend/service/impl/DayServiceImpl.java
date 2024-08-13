package com.example.trip_backend.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.trip_backend.dto.DayRequestDto;
import com.example.trip_backend.model.Day;
import com.example.trip_backend.model.Timeframe;
import com.example.trip_backend.model.Tour;
import com.example.trip_backend.repository.DayRepository;
import com.example.trip_backend.repository.TimeframeRepository;
import com.example.trip_backend.repository.TourRepository;
import com.example.trip_backend.service.DayService;
import com.example.trip_backend.service.TourService;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class DayServiceImpl implements DayService{

    @Autowired
    private TourService tourService;

    @Autowired
    private TourRepository tourRepository;

    @Autowired
    private TimeframeRepository timeframeRepository;

    @Autowired
    private DayRepository dayRepository;

    public Day modifyDay(Day old, DayRequestDto now){

        old.setDescription(now.getDescription());
        old.setTitle(now.getTitle());

        List<Timeframe> timeframes = new ArrayList<>();
        for(int i=0; i<now.getTimeframes().size(); i++){
            Timeframe timeframe = new Timeframe();

            timeframe.setStartTime(now.getTimeframes().get(i).getStartTime());
            timeframe.setEndTime(now.getTimeframes().get(i).getEndTime());
            timeframe.setTask(now.getTimeframes().get(i).getTask());

            timeframe.setDay(old);

            timeframes.add(timeframe);
        }

        old.setTimeframes(timeframes);

        return old;
    }

    @Override
    public Tour updateDay(long tourId, DayRequestDto dayRequest) {
        Day exDay = this.getDay(tourId, dayRequest.getDayNo());

        //delete existing timeframes
        this.timeframeRepository.deleteAll(exDay.getTimeframes());
        exDay.getTimeframes().clear();
        this.dayRepository.save(exDay);

        modifyDay(exDay, dayRequest);

        this.dayRepository.save(exDay);

        return this.tourRepository.findById(tourId).get();
    }

    @Override
    public List<Timeframe> getTimeframesByDayNo(long tourId, int dayNo) {
        Tour tour = this.tourService.getTourById(tourId);

        return tour.getDayWisePlan().get(dayNo-1).getTimeframes();
    }

    @Override
    public Day getDay(long tourId, int dayNo) {
        Tour tour = this.tourService.getTourById(tourId);

        return tour.getDayWisePlan().get(dayNo-1);
    }
    
}
