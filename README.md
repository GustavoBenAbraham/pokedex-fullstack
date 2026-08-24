[README_POKEDEX.md](https://github.com/user-attachments/files/31382411/README_POKEDEX.md)

# 🔴 Pokédex Full Stack

![Java](https://img.shields.io/badge/Java-21-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.1.1-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

> Uma Pokédex funcional e responsiva construída com **Java Spring Boot** no backend e **JavaScript puro** no frontend, consumindo a [PokeAPI](https://pokeapi.co).

---

## ✨ Funcionalidades

- 🔍 **Busca por nome ou número** do Pokémon
- 📋 **Listagem paginada** com 20 Pokémons por página
- 🎨 **Filtro por tipo** (Fogo, Água, Planta, Elétrico, Psíquico)
- 📊 **Modal de detalhes** com estatísticas, altura, peso e habilidades
- 📱 **Design responsivo** para mobile e desktop
- ⚡ **Animações** e interface inspirada nos jogos Pokémon

---

## 🛠️ Tecnologias

### Backend
- **Java 21** — Linguagem principal
- **Spring Boot 4.1.1** — Framework web
- **Spring Web** — API REST
- **Lombok** — Redução de boilerplate
- **RestTemplate** — Consumo da PokeAPI

### Frontend
- **HTML5** — Estrutura semântica
- **CSS3** — Estilização moderna com variáveis e animações
- **JavaScript (ES6+)** — Lógica e consumo da API
- **Fetch API** — Requisições assíncronas

### Ferramentas
- **Git & GitHub** — Versionamento
- **VS Code** — Editor de código
- **Live Server** — Servidor de desenvolvimento

---

## 🚀 Como rodar localmente

### Pré-requisitos
- Java 21+
- Maven
- Navegador moderno

### 1. Clone o repositório
```bash
git clone https://github.com/GustavoBenAbraham/pokedex-fullstack.git
cd pokedex-fullstack
```

### 2. Inicie o Backend
```bash
cd backend
./mvnw spring-boot:run
```
O servidor iniciará em `http://localhost:8080`

### 3. Inicie o Frontend
Abra a pasta `frontend` no VS Code e use a extensão **Live Server**, ou abra o `index.html` em um servidor local.

### 4. Acesse a aplicação
```
http://localhost:5500  (ou a porta do seu Live Server)
```

---

## 📸 Preview

![Preview da Pokédex](<img width="1336" height="655" alt="image" src="https://github.com/user-attachments/assets/430dd0bb-da9f-4d40-9d31-b4b3c3599820" />
)

---

## 🔗 API Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/pokemon` | Listar Pokémons (paginado) |
| GET | `/api/pokemon/{id}` | Buscar Pokémon por ID |
| GET | `/api/pokemon/search?name={nome}` | Buscar Pokémon por nome |

---

## 📚 O que aprendi com este projeto

- ✅ Consumo de API externa com **RestTemplate**
- ✅ Criação de **API REST** com Spring Boot
- ✅ Separação de responsabilidades com **camadas** (Controller, Service, DTO)
- ✅ Manipulação do DOM e requisições **assíncronas** com JavaScript
- ✅ **CORS** e comunicação entre frontend e backend
- ✅ Design **responsivo** com CSS Grid e Flexbox

---

## 🎯 Próximos passos

- [ ] Adicionar mais filtros de tipo
- [ ] Testes unitários no backend
- [ ] Deploy do backend em nuvem

---

## 👨‍💻 Autor

**Gustavo Ben Abraham**

[![GitHub](https://img.shields.io/badge/GitHub-@GustavoBenAbraham-181717?style=flat&logo=github)](https://github.com/GustavoBenAbraham)
[![ORCID](https://img.shields.io/badge/ORCID-0009--0002--8023--217X-A6CE39?style=flat&logo=orcid)](https://orcid.org/0009-0002-8023-217X)

---

> Projeto desenvolvido para fins de aprendizado e portfólio.
