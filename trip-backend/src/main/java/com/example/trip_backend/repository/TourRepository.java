package com.example.trip_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.trip_backend.model.Tour;
import java.util.List;


@Repository
public interface TourRepository extends JpaRepository<Tour, Long>{
    List<Tour> findByTitle(String title);
}
