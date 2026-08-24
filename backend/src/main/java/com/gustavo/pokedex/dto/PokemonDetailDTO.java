package com.gustavo.pokedex.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PokemonDetailDTO {
    private Integer id;
    private String name;
    private String imageUrl;
    private List<String> types;
    private Integer height;
    private Integer weight;
    private List<String> abilities;
    private Integer baseExperience;
    private List<StatDTO> stats;
    
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class StatDTO {
        private String name;
        private Integer value;
    }
}