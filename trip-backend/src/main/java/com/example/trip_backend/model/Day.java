package com.example.trip_backend.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "day")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Day {
    
    @Id
    @Column(name = "day_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long dayId;

    @Column(name = "day_no")
    private int dayNo;
    
    private String title;
    private String description;

    @OneToMany(mappedBy = "day", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<Timeframe> timeframes;

    @ManyToOne
    @JoinColumn(name = "tour_id")
    @JsonBackReference
    private Tour tour;

    @Override
    public String toString(){
        return "Id : "+dayId+"\nDay no : "+dayNo+"\nTitle : "+title+"\nDescription : "+description+".";
    }
}
