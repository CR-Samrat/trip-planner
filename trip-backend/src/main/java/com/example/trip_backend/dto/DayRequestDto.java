package com.example.trip_backend.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DayRequestDto {
    private int dayNo;
    private String title;
    private String description;
    private List<TimeRequestDto> timeframes;
}
