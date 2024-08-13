package com.example.trip_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TourRequestDto {

    private String title;
    private String destination;
    private String date;
    private int duration;
    private String places;
    private String foods;
    private String note;
    private double expense;
}
