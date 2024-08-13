package com.example.trip_backend.service;

import java.util.List;

import com.example.trip_backend.dto.TourRequestDto;
import com.example.trip_backend.model.Tour;

public interface TourService {
    
    Tour createTour(TourRequestDto newTour);
    Tour editTour(long id, TourRequestDto editRequest);
    List<Tour> getTours();
    Tour getTourById(long id);
}
