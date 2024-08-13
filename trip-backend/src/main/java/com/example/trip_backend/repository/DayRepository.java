package com.example.trip_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.trip_backend.model.Day;
import com.example.trip_backend.model.Tour;

import java.util.List;


@Repository
public interface DayRepository extends JpaRepository<Day, Long>{
    List<Day> findByTour(Tour tour);
}
