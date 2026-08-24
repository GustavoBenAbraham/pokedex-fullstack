package com.gustavo.pokedex.service;

import com.gustavo.pokedex.dto.PokemonDetailDTO;
import com.gustavo.pokedex.dto.PokemonSummaryDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class PokeApiService {

    private final RestTemplate restTemplate = new RestTemplate();
    private static final String POKEAPI_URL = "https://pokeapi.co/api/v2";

    public List<PokemonSummaryDTO> listarPokemons(int limit, int offset) {
        String url = POKEAPI_URL + "/pokemon?limit=" + limit + "&offset=" + offset;
        Map<String, Object> response = restTemplate.getForObject(url, Map.class);
        
        List<Map<String, Object>> results = (List<Map<String, Object>>) response.get("results");
        List<PokemonSummaryDTO> pokemons = new ArrayList<>();
        
        for (Map<String, Object> result : results) {
            String pokemonUrl = (String) result.get("url");
            Integer id = extrairIdDaUrl(pokemonUrl);
            
            pokemons.add(PokemonSummaryDTO.builder()
                .id(id)
                .name(capitalizar((String) result.get("name")))
                .imageUrl("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + id + ".png")
                .type(buscarTipoPrincipal(id))
                .build());
        }
        
        return pokemons;
    }

    public PokemonDetailDTO buscarPokemonPorId(int id) {
        String url = POKEAPI_URL + "/pokemon/" + id;
        Map<String, Object> response = restTemplate.getForObject(url, Map.class);
        
        List<Map<String, Object>> types = (List<Map<String, Object>>) response.get("types");
        List<Map<String, Object>> abilities = (List<Map<String, Object>>) response.get("abilities");
        List<Map<String, Object>> stats = (List<Map<String, Object>>) response.get("stats");
        
        return PokemonDetailDTO.builder()
            .id(id)
            .name(capitalizar((String) response.get("name")))
            .imageUrl("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + id + ".png")
            .types(extrairNomes(types, "type"))
            .height((Integer) response.get("height"))
            .weight((Integer) response.get("weight"))
            .abilities(extrairNomes(abilities, "ability"))
            .baseExperience((Integer) response.get("base_experience"))
            .stats(extrairStats(stats))
            .build();
    }

    public PokemonDetailDTO buscarPokemonPorNome(String nome) {
        String url = POKEAPI_URL + "/pokemon/" + nome.toLowerCase();
        Map<String, Object> response = restTemplate.getForObject(url, Map.class);
        Integer id = (Integer) response.get("id");
        return buscarPokemonPorId(id);
    }

    private Integer extrairIdDaUrl(String url) {
        String[] partes = url.split("/");
        return Integer.parseInt(partes[partes.length - 1]);
    }
    
    private String capitalizar(String texto) {
        if (texto == null || texto.isEmpty()) return texto;
        return texto.substring(0, 1).toUpperCase() + texto.substring(1);
    }
    
    private String buscarTipoPrincipal(int id) {
        try {
            String url = POKEAPI_URL + "/pokemon/" + id;
            Map<String, Object> response = restTemplate.getForObject(url, Map.class);
            List<Map<String, Object>> types = (List<Map<String, Object>>) response.get("types");
            Map<String, Object> type = (Map<String, Object>) types.get(0).get("type");
            return capitalizar((String) type.get("name"));
        } catch (Exception e) {
            return "Desconhecido";
        }
    }
    
    private List<String> extrairNomes(List<Map<String, Object>> lista, String chave) {
        List<String> nomes = new ArrayList<>();
        for (Map<String, Object> item : lista) {
            Map<String, Object> detalhe = (Map<String, Object>) item.get(chave);
            nomes.add(capitalizar((String) detalhe.get("name")));
        }
        return nomes;
    }
    
    private List<PokemonDetailDTO.StatDTO> extrairStats(List<Map<String, Object>> stats) {
        List<PokemonDetailDTO.StatDTO> lista = new ArrayList<>();
        for (Map<String, Object> stat : stats) {
            Map<String, Object> statInfo = (Map<String, Object>) stat.get("stat");
            lista.add(PokemonDetailDTO.StatDTO.builder()
                .name(capitalizar((String) statInfo.get("name")))
                .value((Integer) stat.get("base_stat"))
                .build());
        }
        return lista;
    }
}