package com.example.trip_backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="time_frame")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Timeframe {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "time_id")
    private long timeId;

    @Column(name = "start_time")
    private String startTime;

    @Column(name = "end_time")
    private String endTime;
    
    private String task;

    @ManyToOne
    @JoinColumn(name = "day_id")
    @JsonBackReference
    private Day day;
}
