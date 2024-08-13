package com.example.trip_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.trip_backend.model.Timeframe;

@Repository
public interface TimeframeRepository extends JpaRepository<Timeframe, Long>{
    
}
