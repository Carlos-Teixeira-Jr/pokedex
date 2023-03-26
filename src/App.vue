<template>
  
  <div id="app">
    
    <div class="column is-half is-offset-one-quarter">
      <img src="./assets/pokemon-logo-png-1428.png">
      <h1 class="gradient-text" style="font-family: 'MyCustomFont';">{Carlos | Teixeira}</h1>
      <hr class="hr-blue">
      <h4 class="is-size-4">Pokedex</h4>
      <input class="input is-rounded" type="text" placeholder="Buscar pokemon pelo nome" v-model="busca">
      <button class="button is-normal is-success" id="buscaBtn" @click="buscar">Buscar</button>
      <div v-for="(poke,index) in filteredPokemons" :key="poke.url">
        <Pokemon :name="poke.name" :url="poke.url" :num="index + 1"/>
      </div>
    </div>
  </div>
</template>

<style>
.gradient-text {
  background: linear-gradient(to right, #ffcb05, #3c5aa6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 50px;
  font-weight:900;
}

.hr-blue {
  background-color:#3c5aa6;
  height: 1px;
  border: none;
  margin: 1em 0;
}
</style>

<script>

import axios from "axios";//Lib para fazer requisições http com Vue;
import Pokemon from "./components/Pokemon.vue";//Importação das variáveis declaradas no componente Pokemon;

export default {
  name: 'App',
  data(){
    return {
      pokemons: [],//Variável que receberá os dados da requisição;
      filteredPokemons: [],//Variável para gerar lista filtrada de pokemons no sistema de busca;
      busca: ''//Variavel para o sistema de busca;
    }
  },
  created: function(){//É uma função que será executada assim que a página for carregada;
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0").then(res => {//Faz a requisição para a api indicada e retorna o resultado;
      console.log("Pegou a lista de pokemons");
      this.pokemons = res.data.results;//Dados da requisição foram atribuídos ao valor da variavel pokemons;
      this.filteredPokemons = res.data.results;
    })
  },
  components:{
    Pokemon
  },
  methods:{
    buscar: function(){
      this.filteredPokemons = this.pokemons;
      if(this.busca == '' || this.busca == ' '){
        this.filteredPokemons = this.pokemons;
      }else{
        this.filteredPokemons = this.pokemons.filter(pokemon => pokemon.name.includes(this.busca.toLowerCase()));
      }
      
    }
  },
  computed: {
    /*resultadoBusca: function(){
      if(this.busca == '' || this.busca == ' '){
        return this.pokemons;
      }else{
        return this.pokemons.filter(pokemon => pokemon.name == this.busca);
      }
    }*/
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#buscaBtn{
  margin-top: 2%;
}

@font-face {
  font-family: 'MyCustomFont';
  src: url('~fonts/YesevaOne-Regular.ttf');
}
</style>
