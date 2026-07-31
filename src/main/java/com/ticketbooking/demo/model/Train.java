package com.ticketbooking.demo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "trains")
public class Train {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(nullable = false,name="name")
    private String name;
    @OneToMany(mappedBy = "train", cascade = CascadeType.ALL)
    private List<Coach> coaches;
    @OneToMany(mappedBy = "train")
    private List<Departure> departures;
}
