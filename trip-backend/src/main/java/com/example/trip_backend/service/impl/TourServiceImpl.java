package com.example.trip_backend.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.trip_backend.dto.TourRequestDto;
import com.example.trip_backend.model.Day;
import com.example.trip_backend.model.Tour;
import com.example.trip_backend.repository.TourRepository;
import com.example.trip_backend.service.TourService;

@Service
public class TourServiceImpl implements TourService{

    @Autowired
    private TourRepository tourRepository;

    @Override
    public Tour createTour(TourRequestDto tourRequest) {
        Tour tour = new Tour();

        tour.setTitle(tourRequest.getTitle());
        tour.setDate(tourRequest.getDate());
        tour.setDuration(tourRequest.getDuration());
        tour.setDestination(tourRequest.getDestination());
        tour.setExpense(tourRequest.getExpense());
        tour.setFoods(tourRequest.getFoods());
        tour.setPlaces(tourRequest.getPlaces());
        tour.setNote(tourRequest.getNote());
        
        List<Day> days = new ArrayList<>();
        for(int i=1; i<=tourRequest.getDuration(); i++){
            Day day = new Day();
            day.setDayNo(i);
            day.setDescription("");
            day.setTitle("Day"+i);
            day.setTimeframes(new ArrayList<>());
            day.setTour(tour);

            days.add(day);
        }
        tour.setDayWisePlan(days);

        return this.tourRepository.save(tour);
    }

    @Override
    public List<Tour> getTours() {
        return this.tourRepository.findAll();
    }

    @Override
    public Tour getTourById(long id) {
        return this.tourRepository.findById(id).orElseThrow(()-> new RuntimeException("Invalid id"));
    }

    @Override
    public Tour editTour(long id, TourRequestDto editRequest) {
        Tour exTour = this.getTourById(id);

        exTour.setTitle(editRequest.getTitle());
        exTour.setDate(editRequest.getDate());
        exTour.setDestination(editRequest.getDestination());
        exTour.setExpense(editRequest.getExpense());
        exTour.setFoods(editRequest.getFoods());
        exTour.setPlaces(editRequest.getPlaces());
        exTour.setNote(editRequest.getNote());
        exTour.setDuration(editRequest.getDuration());

        return this.tourRepository.save(exTour);
    }
    
}
