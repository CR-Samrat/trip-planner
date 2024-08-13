package com.example.trip_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TimeRequestDto {
    private String startTime;
    private String endTime;
    private String task;
}
