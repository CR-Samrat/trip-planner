package com.example.trip_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.trip_backend.dto.DayRequestDto;
import com.example.trip_backend.dto.TourRequestDto;
import com.example.trip_backend.model.Day;
import com.example.trip_backend.model.Timeframe;
import com.example.trip_backend.model.Tour;
import com.example.trip_backend.service.DayService;
import com.example.trip_backend.service.TourService;

@RestController
@RequestMapping("/tours")
@CrossOrigin
public class TourController {
    
    @Autowired
    private TourService tourService;

    @Autowired
    private DayService dayService;

    @PostMapping("/create")
    public Tour createTour(@RequestBody TourRequestDto newTour){
        return this.tourService.createTour(newTour);
    }

    @PostMapping("/edit/tour/{id}")
    public Tour createTour(@PathVariable("id") long id ,@RequestBody TourRequestDto newTour){
        return this.tourService.editTour(id, newTour);
    }

    @GetMapping
    public List<Tour> getAllTours(){
        return this.tourService.getTours();
    }

    @GetMapping("/{id}")
    public Tour getTourById(@PathVariable("id") long id){
        return this.tourService.getTourById(id);
    }

    @PostMapping("/day/update/{id}")
    public Tour modifyDay(@PathVariable("id") long tourId, @RequestBody DayRequestDto day){
        return this.dayService.updateDay(tourId, day);
    }

    @GetMapping("/day/{dayNo}/time/{id}")
    public List<Timeframe> getTimeframesByDay(@PathVariable("id") long tourId, @PathVariable("dayNo") int dayNo){
        return this.dayService.getTimeframesByDayNo(tourId, dayNo);
    }

    @GetMapping("/{id}/day/{day}")
    public Day getDayByTourId(@PathVariable("id") long tourId, @PathVariable("day") int dayNo){
        return this.dayService.getDay(tourId, dayNo);
    }
}
