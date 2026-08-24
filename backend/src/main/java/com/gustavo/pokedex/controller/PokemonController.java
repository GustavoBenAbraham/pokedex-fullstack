package com.gustavo.pokedex.controller;

import com.gustavo.pokedex.dto.PokemonDetailDTO;
import com.gustavo.pokedex.dto.PokemonSummaryDTO;
import com.gustavo.pokedex.service.PokeApiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pokemon")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PokemonController {

    private final PokeApiService pokeApiService;

    @GetMapping
    public ResponseEntity<List<PokemonSummaryDTO>> listar(
            @RequestParam(defaultValue = "20") int limit,
            @RequestParam(defaultValue = "0") int offset) {
        return ResponseEntity.ok(pokeApiService.listarPokemons(limit, offset));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PokemonDetailDTO> buscarPorId(@PathVariable int id) {
        return ResponseEntity.ok(pokeApiService.buscarPokemonPorId(id));
    }

    @GetMapping("/search")
    public ResponseEntity<PokemonDetailDTO> buscarPorNome(@RequestParam String name) {
        return ResponseEntity.ok(pokeApiService.buscarPokemonPorNome(name));
    }
}