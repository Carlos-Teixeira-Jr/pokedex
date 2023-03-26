<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div id="pokemon">

    <div class="card">
      <div class="card-image">
        <figure>
          <img :src="currentImg">
        </figure>
      </div>
      <div class="card-content custom-bg">
        <div class="media">
          <div class="media-content">
            <p class="title is-4">{{num}} - {{upper}}</p>
            <p class="subtitle is-6">{{pokemon.type}}</p>
          </div>
        </div>

        <div class="content custom-bg">
          <button class="button is-medium is-fullwidth" @click="mudarSprite" >Mudar sprite</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

import axios from "axios";

export default {
  created: function(){//Função que pega a url de cada pokemon para acessar seus dados;
    axios.get(this.url).then(res => {
      this.pokemon.type = res.data.types[0].type.name;
      this.pokemon.front = res.data.sprites.front_default;
      this.pokemon.back = res.data.sprites.back_default;
      this.currentImg = this.pokemon.front;
      console.log(this.pokemon);
    })
  },
  data(){
    return {
      isFront: true,
      currentImg: '',
      pokemon: {//Isso serve apenas para tornar reativos os dados criados na área CREATED;
        type: '',
        front: '',
        back: ''
      }
    }
  },
  props: {//Estabelçece variáveis que receberão dados da requisição como valor e esse valor pode mudar dependendo da requisição;
    num: Number,
    name: String,
    url: String
  },
  computed: {
    upper(){//Com isso a primira letra do nom de cada pokmon é formatar para maiuscula;
      let newName = this.name[0].toUpperCase() + this.name.slice(1);
      return newName;
    }
  },
  methods: {
    mudarSprite: function(){
      if(this.isFront){
        this.isFront = false;
        this.currentImg = this.pokemon.back;
      }else{
        this.isFront = true;
        this.currentImg = this.pokemon.front;
      }
    }
  }
}
</script>

<style>
  #pokemon{
    margin-top: 2%
  }

  .custom-bg {
  background-color: rgba(74, 144, 226, 0.35);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 10px;
}


</style>